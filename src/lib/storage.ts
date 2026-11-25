"use client";

// ---------------------------------------------------------------------------
// Multi-layer resilient storage
//
// Writes go to ALL available layers; reads try each layer in priority order
// and use the first non-empty valid value. Layers:
//
//   1. localStorage        — primary, per-device, long-lived
//   2. IndexedDB           — long-lived, larger capacity, survives cache wipe
//   3. sessionStorage      — per-tab, survives reload but not browser close
//   4. In-memory Map       — always available, lost on page close
//   5. Cookie              — small, sent with requests, ~7 day expiry
//
// On every read, if a higher-priority layer is empty but a lower one has data,
// we backfill the higher layer so the next read is fast & consistent.
// ---------------------------------------------------------------------------

const IDB_DB = "boardprep-store";
const IDB_STORE = "kv";
const IDB_VERSION = 1;

type Layer = "memory" | "session" | "local" | "indexed" | "cookie";

const memoryLayer = new Map<string, string>();

// ---- IndexedDB helpers ----
function idbOpen(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === "undefined") return Promise.resolve(null);
  return new Promise((resolve) => {
    try {
      const req = indexedDB.open(IDB_DB, IDB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IDB_STORE)) {
          db.createObjectStore(IDB_STORE);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbGet(key: string): Promise<string | null> {
  const db = await idbOpen();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(IDB_STORE, "readonly");
      const store = tx.objectStore(IDB_STORE);
      const r = store.get(key);
      r.onsuccess = () => resolve((r.result as string) ?? null);
      r.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbSet(key: string, value: string): Promise<void> {
  const db = await idbOpen();
  if (!db) return;
  try {
    const tx = db.transaction(IDB_STORE, "readwrite");
    const store = tx.objectStore(IDB_STORE);
    store.put(value, key);
  } catch {
    // ignore
  }
}

// ---- Cookie helpers (small data only) ----
function cookieGet(key: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const prefix = `${key}=`;
    const parts = document.cookie.split(";");
    for (const p of parts) {
      const c = p.trim();
      if (c.startsWith(prefix)) {
        return decodeURIComponent(c.slice(prefix.length));
      }
    }
    return null;
  } catch {
    return null;
  }
}

function cookieSet(key: string, value: string, days = 7) {
  if (typeof document === "undefined") return;
  try {
    // Cap cookie size — cookies have ~4KB limit
    if (value.length > 3500) return;
    const expires = new Date(Date.now() + days * 86400_000).toUTCString();
    document.cookie = `${key}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // ignore
  }
}

function cookieClear(key: string) {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  } catch {
    // ignore
  }
}

// ---- Layer primitives ----
function localGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function localSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // quota or disabled — fall through to other layers
  }
}

function localRemove(key: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

function sessionGet(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function sessionSet(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

function sessionRemove(key: string) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function resilientGet(key: string): Promise<string | null> {
  // 1. Memory
  if (memoryLayer.has(key)) return memoryLayer.get(key)!;

  // 2. LocalStorage
  const local = localGet(key);
  if (local !== null) {
    memoryLayer.set(key, local);
    return local;
  }

  // 3. IndexedDB
  const idb = await idbGet(key);
  if (idb !== null) {
    memoryLayer.set(key, idb);
    // Backfill localStorage so subsequent reads are sync
    localSet(key, idb);
    sessionSet(key, idb);
    return idb;
  }

  // 4. SessionStorage
  const sess = sessionGet(key);
  if (sess !== null) {
    memoryLayer.set(key, sess);
    localSet(key, sess); // backfill
    return sess;
  }

  // 5. Cookie
  const ck = cookieGet(key);
  if (ck !== null) {
    memoryLayer.set(key, ck);
    localSet(key, ck); // backfill
    sessionSet(key, ck);
    return ck;
  }

  return null;
}

export function resilientGetSync(key: string): string | null {
  // Sync version — checks memory, localStorage, sessionStorage, cookie only.
  if (memoryLayer.has(key)) return memoryLayer.get(key)!;
  const local = localGet(key);
  if (local !== null) {
    memoryLayer.set(key, local);
    return local;
  }
  const sess = sessionGet(key);
  if (sess !== null) {
    memoryLayer.set(key, sess);
    localSet(key, sess);
    return sess;
  }
  const ck = cookieGet(key);
  if (ck !== null) {
    memoryLayer.set(key, ck);
    localSet(key, ck);
    sessionSet(key, ck);
    return ck;
  }
  return null;
}

export async function resilientSet(key: string, value: string): Promise<void> {
  // Always write to memory + localStorage + sessionStorage + cookie
  memoryLayer.set(key, value);
  localSet(key, value);
  sessionSet(key, value);
  cookieSet(key, value);

  // IndexedDB is async — fire and forget but also await for safety
  await idbSet(key, value);
}

export function resilientSetSync(key: string, value: string): void {
  memoryLayer.set(key, value);
  localSet(key, value);
  sessionSet(key, value);
  cookieSet(key, value);
  // IndexedDB writes async (queued, will complete)
  void idbSet(key, value);
}

export async function resilientRemove(key: string): Promise<void> {
  memoryLayer.delete(key);
  localRemove(key);
  sessionRemove(key);
  cookieClear(key);
  // IndexedDB delete
  const db = await idbOpen();
  if (!db) return;
  try {
    const tx = db.transaction(IDB_STORE, "readwrite");
    tx.objectStore(IDB_STORE).delete(key);
  } catch {
    // ignore
  }
}

export function listLayers(key: string): Layer[] {
  const layers: Layer[] = [];
  if (memoryLayer.has(key)) layers.push("memory");
  if (localGet(key) !== null) layers.push("local");
  if (sessionGet(key) !== null) layers.push("session");
  if (cookieGet(key) !== null) layers.push("cookie");
  return layers;
}
