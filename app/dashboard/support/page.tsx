import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Support — 9st Whip" };

const CHANNELS = [
  {
    title: "Email support",
    blurb: "Questions, bugs, or account help — we usually reply within a day.",
    cta: "support@9thstreetlabs.com",
    href: "mailto:support@9thstreetlabs.com",
  },
  {
    title: "GitHub",
    blurb: "Track issues and follow development in the open.",
    cta: "github.com/9th-Street-Labs",
    href: site.social.github,
  },
];

const FAQ = [
  {
    q: "How do I pair my phone?",
    a: "Open the desktop app, then scan the QR code shown there from the 9st Whip phone app. The phone links to whichever account the desktop is signed in to.",
  },
  {
    q: "Where does my voice audio go?",
    a: "Audio streams directly from your device to Deepgram using a short-lived token minted by our backend — the API key never touches your phone, and we don't store the audio.",
  },
  {
    q: "Does Whip work without shared Wi-Fi?",
    a: "Yes. Whip falls back to a direct BLE radio lane between phone and desktop, so input keeps working even with Wi-Fi off on both ends.",
  },
  {
    q: "How is usage measured?",
    a: "Voice minutes are metered per transcription session. Whip activity is reported by the desktop app while you're actively driving your agents.",
  },
];

export default function SupportPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Support</h1>
        <p className="mt-1 text-sm text-muted">Get help and answers about 9st Whip.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {CHANNELS.map((c) => (
          <a
            key={c.title}
            href={c.href}
            className="group rounded-2xl border border-line bg-surface-2/40 p-5 transition-colors hover:border-line-strong"
          >
            <h2 className="text-sm font-semibold">{c.title}</h2>
            <p className="mt-1.5 text-sm text-muted">{c.blurb}</p>
            <p className="mt-3 text-sm font-medium text-accent group-hover:underline">{c.cta}</p>
          </a>
        ))}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold">Frequently asked</h2>
        <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {FAQ.map((f) => (
            <details key={f.q} className="group bg-surface-2/40 px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium">
                {f.q}
                <span className="text-faint transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
