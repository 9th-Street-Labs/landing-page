"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Passwordless auth, matching the mobile app: email OTP + Google/Apple SSO.
// signInWithOtp doubles as sign-up (shouldCreateUser), so there's no separate
// login/signup flow and no password.
export function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/dashboard";

  const [supabase] = useState(() => createClient());
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const callbackUrl = (path = "/auth/callback") =>
    `${window.location.origin}${path}?next=${encodeURIComponent(next)}`;

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    setNotice(null);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true, emailRedirectTo: callbackUrl() },
    });
    setPending(false);
    if (error) {
      setError(error.message);
      return;
    }
    setStep("code");
    setNotice(`We sent a 6-digit code to ${email.trim()}.`);
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setError(null);
    const { error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: "email",
    });
    setPending(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push(next);
    router.refresh();
  }

  async function oauth(provider: "google" | "apple") {
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: callbackUrl() },
    });
    if (error) setError(error.message);
  }

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-semibold tracking-tight">
        {step === "email" ? "Sign in to 9st Whip" : "Check your email"}
      </h1>
      <p className="mt-2 text-sm text-muted">
        {step === "email"
          ? "No password needed — we'll email you a code."
          : `Enter the code we sent to ${email.trim()}.`}
      </p>

      {step === "email" ? (
        <>
          <div className="mt-7 space-y-2.5">
            <button
              onClick={() => oauth("google")}
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              onClick={() => oauth("apple")}
              type="button"
              className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm font-medium transition-colors hover:border-foreground/40"
            >
              <AppleIcon />
              Continue with Apple
            </button>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs text-faint">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>

          <form onSubmit={sendCode} className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-muted">Email</span>
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent"
              />
            </label>

            {error && <p className="text-sm text-accent">{error}</p>}

            <button
              type="submit"
              disabled={pending || !email.includes("@")}
              className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:opacity-60"
            >
              {pending ? "Sending…" : "Send code"}
            </button>
          </form>
        </>
      ) : (
        <form onSubmit={verify} className="mt-7 space-y-3">
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            autoFocus
            placeholder="000000"
            maxLength={8}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            className="w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-center text-2xl tracking-[0.5em] outline-none transition-colors placeholder:text-faint focus:border-accent"
          />

          {notice && <p className="text-sm text-muted">{notice}</p>}
          {error && <p className="text-sm text-accent">{error}</p>}

          <button
            type="submit"
            disabled={pending || code.length < 6}
            className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-bright disabled:opacity-60"
          >
            {pending ? "Verifying…" : "Verify & continue"}
          </button>

          <div className="flex items-center justify-between pt-1 text-sm">
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setError(null);
                setNotice(null);
              }}
              className="text-muted underline-offset-4 hover:text-foreground hover:underline"
            >
              Use a different email
            </button>
            <button
              type="button"
              disabled={pending}
              onClick={() => sendCode(new Event("submit") as unknown as React.FormEvent)}
              className="text-muted underline-offset-4 hover:text-foreground hover:underline disabled:opacity-60"
            >
              Resend code
            </button>
          </div>
        </form>
      )}

      <p className="mt-6 text-center text-xs text-faint">
        By continuing you agree to our Terms and Privacy Policy.
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden className="fill-foreground">
      <path d="M17.05 12.04c-.03-2.6 2.12-3.85 2.22-3.91-1.21-1.77-3.09-2.01-3.76-2.04-1.6-.16-3.12.94-3.93.94-.81 0-2.06-.92-3.39-.89-1.74.03-3.35 1.01-4.25 2.57-1.81 3.14-.46 7.79 1.3 10.34.86 1.25 1.88 2.65 3.22 2.6 1.29-.05 1.78-.83 3.34-.83 1.56 0 2 .83 3.37.81 1.39-.03 2.27-1.27 3.12-2.53.98-1.45 1.39-2.85 1.41-2.92-.03-.01-2.7-1.04-2.73-4.12-.02-2.57 2.1-3.81 2.2-3.87M14.5 4.4c.71-.86 1.19-2.06 1.06-3.25-1.02.04-2.26.68-3 1.54-.66.76-1.24 1.98-1.08 3.15 1.14.09 2.31-.58 3.02-1.44" />
    </svg>
  );
}
