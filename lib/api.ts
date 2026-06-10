import { createClient } from "@/lib/supabase/server";

// Base URL of the 9st Whip backend (Railway). Falls back to local dev.
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8787";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Server-side fetch against the backend, authenticated with the caller's
// Supabase access token. Throws ApiError on non-2xx so callers can branch.
async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new ApiError(401, "Not authenticated");

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    throw new ApiError(res.status, (detail as { error?: string }).error ?? res.statusText);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ── Typed shapes mirroring the backend responses ────────────────────────────

export interface Profile {
  id: string;
  displayName: string | null;
  avatarUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Me {
  id: string;
  email: string | null;
  createdAt: string;
}

export interface Device {
  id: string;
  name: string;
  kind: "desktop" | "phone" | "hardware";
  last_seen_at: string | null;
  created_at: string;
}

export interface UsageRow {
  id: number;
  kind: string;
  seconds: number | null;
  created_at: string;
}

export interface DailyUsage {
  day: string; // YYYY-MM-DD
  stt_seconds: number;
  stt_count: number;
  whip_seconds: number;
  whip_count: number;
}

// ── Endpoint wrappers (each catches auth/availability and degrades gracefully) ─

export async function getProfile(): Promise<Profile | null> {
  try {
    // The backend returns the profile as a flat object (camelCase), not wrapped.
    return await apiFetch<Profile>("/v1/profile");
  } catch {
    return null;
  }
}

export async function getMe(): Promise<Me | null> {
  try {
    return await apiFetch<Me>("/v1/me");
  } catch {
    return null;
  }
}

export async function getDevices(): Promise<Device[]> {
  try {
    const { devices } = await apiFetch<{ devices: Device[] }>("/v1/devices");
    return devices ?? [];
  } catch {
    return [];
  }
}

export async function getRecentUsage(limit = 100): Promise<UsageRow[]> {
  try {
    const { usage } = await apiFetch<{ usage: UsageRow[] }>(`/v1/usage?limit=${limit}`);
    return usage ?? [];
  } catch {
    return [];
  }
}

export async function getDailyUsage(days = 365): Promise<DailyUsage[]> {
  try {
    const { usage } = await apiFetch<{ usage: DailyUsage[] }>(`/v1/usage/daily?days=${days}`);
    return usage ?? [];
  } catch {
    return [];
  }
}
