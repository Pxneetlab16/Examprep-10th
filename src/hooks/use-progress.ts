"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  resilientGet,
  resilientSet,
  resilientRemove,
} from "@/lib/storage";
import { getDeviceInfo, touchDevice } from "@/lib/device";

export type ChapterState = {
  completed: boolean;
  revisions: [boolean, boolean, boolean];
};

export type ProgressMap = Record<string, ChapterState>;

function emptyState(): ChapterState {
  return { completed: false, revisions: [false, false, false] };
}

function isValidProgress(v: unknown): v is ProgressMap {
  if (!v || typeof v !== "object") return false;
  const obj = v as Record<string, unknown>;
  for (const k of Object.keys(obj)) {
    const entry = obj[k];
    if (!entry || typeof entry !== "object") return false;
    const e = entry as Record<string, unknown>;
    if (typeof e.completed !== "boolean") return false;
    if (!Array.isArray(e.revisions) || e.revisions.length !== 3) return false;
    if (!e.revisions.every((r) => typeof r === "boolean")) return false;
  }
  return true;
}

// Each device gets its own namespaced progress key. The device ID is unique
// per browser/device, so progress is fully isolated across devices.
function progressKey(): string {
  const dev = getDeviceInfo();
  return `boardprep-progress-${dev.id}`;
}

const EVENT_KEY = "boardprep-progress-changed";

export function useProgress() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [hydrated, setHydrated] = useState(false);
  const keyRef = useRef<string>("");
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ---- Hydration: load from resilient storage on mount ----
  useEffect(() => {
    let cancelled = false;
    const key = progressKey();
    keyRef.current = key;

    async function load() {
      const raw = await resilientGet(key);
      if (cancelled) return;
      if (!raw) {
        setProgress({});
        setHydrated(true);
        return;
      }
      try {
        const parsed = JSON.parse(raw);
        if (isValidProgress(parsed)) {
          setProgress(parsed);
        } else {
          // Corrupt data — start fresh but keep a backup
          try {
            localStorage.setItem(`${key}.bak`, raw);
          } catch {
            // ignore
          }
          setProgress({});
        }
      } catch {
        // Corrupt JSON — start fresh
        setProgress({});
      }
      setHydrated(true);
      touchDevice();
    }

    load();

    // ---- Cross-tab sync: listen to storage events ----
    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (isValidProgress(parsed)) {
            setProgress(parsed);
          }
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener("storage", onStorage);

    // ---- Cross-component sync: custom event (same tab) ----
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<{ key: string; data: ProgressMap }>;
      if (ce.detail?.key === key) {
        setProgress(ce.detail.data);
      }
    };
    window.addEventListener(EVENT_KEY, onCustom);

    // ---- Save on tab hide / page hide / beforeunload ----
    const persistCurrent = () => {
      setProgress((cur) => {
        const json = JSON.stringify(cur);
        // Synchronous write for unload (async may not complete)
        try {
          localStorage.setItem(key, json);
          sessionStorage.setItem(key, json);
        } catch {
          // ignore
        }
        return cur;
      });
    };
    const onVisibility = () => {
      if (document.visibilityState === "hidden") persistCurrent();
    };
    const onPageHide = () => persistCurrent();
    const onBeforeUnload = () => persistCurrent();

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onBeforeUnload);

    // ---- Periodic auto-save every 30s (safety net) ----
    const periodic = setInterval(() => {
      setProgress((cur) => {
        const json = JSON.stringify(cur);
        void resilientSet(key, json);
        return cur;
      });
    }, 30_000);

    // ---- Refresh device lastSeen on focus ----
    const onFocus = () => touchDevice();
    window.addEventListener("focus", onFocus);

    return () => {
      cancelled = true;
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_KEY, onCustom);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onBeforeUnload);
      window.removeEventListener("focus", onFocus);
      clearInterval(periodic);
      // Flush any pending debounced save
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
        saveTimerRef.current = null;
      }
    };
  }, []);

  // ---- Persist with debounce (writes to all layers) ----
  const persist = useCallback((next: ProgressMap) => {
    setProgress(next);
    const key = keyRef.current;
    const json = JSON.stringify(next);

    // Sync write immediately (memory + localStorage + sessionStorage + cookie)
    // via resilientSetSync semantics baked into resilientSet's sync portion
    // (resilientSet also kicks off async IndexedDB write).
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    // Immediate sync write to highest-priority layers — guarantees the tick
    // is captured even if the user closes the tab in the next millisecond.
    try {
      localStorage.setItem(key, json);
      sessionStorage.setItem(key, json);
    } catch {
      // ignore
    }

    // Debounced async write (covers IndexedDB + cookie) — 150ms
    saveTimerRef.current = setTimeout(() => {
      void resilientSet(key, json);
      // Notify other components on the same tab
      window.dispatchEvent(
        new CustomEvent(EVENT_KEY, { detail: { key, data: next } }),
      );
    }, 150);
  }, []);

  const getState = useCallback(
    (key: string): ChapterState => progress[key] ?? emptyState(),
    [progress],
  );

  const toggleCompleted = useCallback(
    (key: string) => {
      const cur = progress[key] ?? emptyState();
      const next: ProgressMap = {
        ...progress,
        [key]: { ...cur, completed: !cur.completed },
      };
      persist(next);
    },
    [progress, persist],
  );

  const toggleRevision = useCallback(
    (key: string, index: 0 | 1 | 2) => {
      const cur = progress[key] ?? emptyState();
      const prevOk = index === 0 ? cur.completed : cur.revisions[index - 1];
      if (!prevOk) return;
      const revisions = [...cur.revisions] as [boolean, boolean, boolean];
      revisions[index] = !revisions[index];
      if (!revisions[index]) {
        for (let i = index + 1; i < 3; i++) revisions[i] = false;
      }
      const next: ProgressMap = {
        ...progress,
        [key]: { ...cur, revisions },
      };
      persist(next);
    },
    [progress, persist],
  );

  const resetAll = useCallback(() => {
    persist({});
    // Also explicitly remove from all storage layers
    void resilientRemove(keyRef.current);
  }, [persist]);

  return {
    progress,
    hydrated,
    getState,
    toggleCompleted,
    toggleRevision,
    resetAll,
  };
}
