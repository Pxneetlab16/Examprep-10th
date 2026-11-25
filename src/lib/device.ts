"use client";

import * as React from "react";

// ---------------------------------------------------------------------------
// Device identification
//
// Each browser instance gets a unique, persistent device ID stored locally.
// Two different physical devices (mobile A, mobile B, PC) will each have
// their OWN device ID because each generates its own. This guarantees that
// progress is isolated per device, even though all devices load the same URL.
//
// We also keep a registry of all known device IDs (up to 20) so that the
// app can prune old/inactive devices if storage somehow gets shared
// (e.g. via browser sync) — though in practice localStorage is per-device
// by default.
// ---------------------------------------------------------------------------

const DEVICE_ID_KEY = "boardprep-device-id-v1";
const DEVICE_ID_COOKIE = "boardprep-did";
const DEVICE_REGISTRY_KEY = "boardprep-device-registry-v1";
const MAX_DEVICES = 20;

export type DeviceInfo = {
  id: string;
  fingerprint: string;
  label: string;
  createdAt: number;
  lastSeen: number;
};

function uuid(): string {
  // RFC4122 v4 (crypto-safe where available)
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }
  // Fallback
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function buildFingerprint(): string {
  if (typeof window === "undefined") return "ssr";
  const parts = [
    navigator.userAgent,
    navigator.language,
    navigator.platform,
    screen.width + "x" + screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
    Intl.DateTimeFormat().resolvedOptions().timeZone,
    navigator.hardwareConcurrency || "n",
    (navigator as Navigator & { deviceMemory?: number }).deviceMemory || "n",
  ];
  return parts.join("|");
}

function deviceLabel(): string {
  if (typeof navigator === "undefined") return "Unknown device";
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPod/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);
  let os = "Unknown OS";
  if (/Windows/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua)) os = "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/iPhone|iPad|iPod/i.test(ua)) os = "iOS";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "Browser";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/Chrome\//i.test(ua) && !/Chromium/i.test(ua)) browser = "Chrome";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";
  else if (/Safari\//i.test(ua)) browser = "Safari";

  const kind = isTablet ? "Tablet" : isMobile ? "Mobile" : "Desktop";
  return `${kind} · ${os} · ${browser}`;
}

function readRegistry(): DeviceInfo[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(DEVICE_REGISTRY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (d) =>
        d &&
        typeof d.id === "string" &&
        typeof d.lastSeen === "number",
    );
  } catch {
    return [];
  }
}

function writeRegistry(devices: DeviceInfo[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      DEVICE_REGISTRY_KEY,
      JSON.stringify(devices.slice(0, MAX_DEVICES * 2)),
    );
  } catch {
    // ignore quota errors
  }
}

let cachedDevice: DeviceInfo | null = null;

// --- Cookie helpers for device-id backup ---
function cookieGetDeviceId(): string | null {
  if (typeof document === "undefined") return null;
  try {
    const prefix = `${DEVICE_ID_COOKIE}=`;
    const parts = document.cookie.split(";");
    for (const p of parts) {
      const c = p.trim();
      if (c.startsWith(prefix)) return decodeURIComponent(c.slice(prefix.length));
    }
    return null;
  } catch {
    return null;
  }
}

function cookieSetDeviceId(id: string) {
  if (typeof document === "undefined") return;
  try {
    // Persist for 1 year so device identity survives localStorage clears
    const expires = new Date(Date.now() + 365 * 86400_000).toUTCString();
    document.cookie = `${DEVICE_ID_COOKIE}=${encodeURIComponent(id)}; expires=${expires}; path=/; SameSite=Lax`;
  } catch {
    // ignore
  }
}

export function getDeviceInfo(): DeviceInfo {
  if (cachedDevice) return cachedDevice;
  if (typeof window === "undefined") {
    return {
      id: "ssr",
      fingerprint: "ssr",
      label: "SSR",
      createdAt: 0,
      lastSeen: 0,
    };
  }

  // Read device ID from localStorage first, then fall back to cookie
  // (so it survives localStorage being cleared by the user / browser cache).
  let id: string | null = null;
  try {
    id = localStorage.getItem(DEVICE_ID_KEY);
  } catch {
    id = null;
  }
  if (!id) {
    id = cookieGetDeviceId();
    if (id) {
      // Restore to localStorage
      try {
        localStorage.setItem(DEVICE_ID_KEY, id);
      } catch {
        // ignore
      }
    }
  }
  if (!id) {
    id = uuid();
    try {
      localStorage.setItem(DEVICE_ID_KEY, id);
    } catch {
      // ignore
    }
    cookieSetDeviceId(id);
  } else {
    // Make sure cookie is also set (in case it expired)
    cookieSetDeviceId(id);
  }

  const now = Date.now();
  const info: DeviceInfo = {
    id,
    fingerprint: buildFingerprint(),
    label: deviceLabel(),
    createdAt: now,
    lastSeen: now,
  };

  // Update registry — add or refresh this device, prune to MAX_DEVICES
  try {
    const registry = readRegistry();
    const existingIdx = registry.findIndex((d) => d.id === id);
    if (existingIdx >= 0) {
      registry[existingIdx] = {
        ...registry[existingIdx],
        lastSeen: now,
        label: info.label,
        fingerprint: info.fingerprint,
      };
    } else {
      registry.push(info);
    }
    // Sort by lastSeen desc, keep newest MAX_DEVICES
    registry.sort((a, b) => b.lastSeen - a.lastSeen);
    writeRegistry(registry.slice(0, MAX_DEVICES));
  } catch {
    // ignore
  }

  cachedDevice = info;
  return info;
}

export function touchDevice() {
  // Refresh lastSeen in registry on each app focus/load
  if (typeof window === "undefined") return;
  try {
    const info = getDeviceInfo();
    const registry = readRegistry();
    const idx = registry.findIndex((d) => d.id === info.id);
    if (idx >= 0) {
      registry[idx].lastSeen = Date.now();
      writeRegistry(registry);
    }
  } catch {
    // ignore
  }
}

export function getKnownDevices(): DeviceInfo[] {
  return readRegistry();
}

export const MAX_DEVICES_COUNT = MAX_DEVICES;
