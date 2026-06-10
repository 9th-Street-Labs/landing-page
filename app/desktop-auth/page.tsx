"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Wordmark } from "@/components/ui/Wordmark";

// Hand-off page for the desktop app's "Sign in in browser" flow. After the user
// authenticates here (OTP / Google / Apple), we bounce the session back to the
// Electron app via its custom-scheme deep link. The tokens ride in the URL
// fragment (never sent to a server); the app calls setSession with them.
const DESKTOP_DEEP_LINK = "com.ninthstreetlabs.whip://auth/callback";

export default function DesktopAuthPage() {
  const router = useRouter();
  const [link, setLink] = useState<string | null>(null);
  const [status, setStatus] = useState("Connecting…");

  const openApp = useCallback((url: string) => {
    window.location.href = url;
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      const s = data.session;
      if (!s) {
        // Not signed in yet — send them through the normal login, then back here.
        router.replace("/login?next=/desktop-auth");
        return;
      }
      const fragment = new URLSearchParams({
        access_token: s.access_token,
        refresh_token: s.refresh_token,
        expires_at: String(s.expires_at ?? ""),
        token_type: s.token_type ?? "bearer",
      });
      const url = `${DESKTOP_DEEP_LINK}#${fragment.toString()}`;
      setLink(url);
      setStatus("Returning you to the 9st Whip app…");
      // Auto-attempt; some browsers require a user gesture, hence the button too.
      openApp(url);
    });
  }, [router, openApp]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Wordmark className="mb-8 text-xl" />
      <div className="w-full max-w-sm rounded-2xl border border-line bg-surface-2/40 p-6">
        <h1 className="text-lg font-semibold">{status}</h1>
        {link ? (
          <>
            <p className="mt-2 text-sm text-muted">
              If the app didn&apos;t open, click below — then you can close this tab.
            </p>
            <button
              onClick={() => openApp(link)}
              className="mt-5 inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
            >
              Open 9st Whip
            </button>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted">One moment…</p>
        )}
      </div>
    </main>
  );
}
