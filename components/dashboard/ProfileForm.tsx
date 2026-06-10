"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8787";

export function ProfileForm({
  initialName,
  initialAvatar,
}: {
  initialName: string;
  initialAvatar: string;
}) {
  const router = useRouter();
  const [displayName, setDisplayName] = useState(initialName);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar);
  const [pending, setPending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setStatus(null);

    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setStatus({ ok: false, msg: "Session expired — please sign in again." });
      setPending(false);
      return;
    }

    const body: Record<string, string> = { displayName };
    if (avatarUrl.trim()) body.avatarUrl = avatarUrl.trim();

    const res = await fetch(`${API_BASE}/v1/profile`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setStatus({ ok: true, msg: "Saved." });
      router.refresh();
    } else {
      const detail = (await res.json().catch(() => ({}))) as { error?: string };
      setStatus({ ok: false, msg: detail.error ?? "Couldn't save changes." });
    }
    setPending(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted">Display name</span>
        <input
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          maxLength={200}
          className="w-full max-w-sm rounded-xl border border-line-strong bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium text-muted">Avatar URL</span>
        <input
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          placeholder="https://…"
          className="w-full max-w-sm rounded-xl border border-line-strong bg-surface px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
        />
        <span className="mt-1 block text-xs text-faint">Must be an https:// image URL.</span>
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {status && (
          <span className={`text-sm ${status.ok ? "text-muted" : "text-accent"}`}>{status.msg}</span>
        )}
      </div>
    </form>
  );
}
