import type { Metadata } from "next";
import { getDevices, type Device } from "@/lib/api";

export const metadata: Metadata = { title: "Devices — 9st Whip" };

const KIND_LABEL: Record<Device["kind"], string> = {
  desktop: "Desktop",
  phone: "Phone",
  hardware: "Remote",
};

export default async function DevicesPage() {
  const devices = await getDevices();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Devices</h1>
        <p className="mt-1 text-sm text-muted">
          Desktops, phones, and remotes linked to your account.
        </p>
      </div>

      {devices.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line-strong bg-surface-2/30 px-6 py-12 text-center">
          <p className="text-sm text-muted">No devices linked yet.</p>
          <p className="mt-1 text-xs text-faint">
            Open the desktop app and scan the QR code in the phone app to pair.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {devices.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-4 bg-surface-2/40 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/12 text-accent">
                  <KindIcon kind={d.kind} />
                </span>
                <div>
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-faint">
                    {KIND_LABEL[d.kind]}
                    {d.last_seen_at
                      ? ` · last seen ${new Date(d.last_seen_at).toLocaleDateString()}`
                      : " · never connected"}
                  </p>
                </div>
              </div>
              <span className="text-xs text-faint">
                added {new Date(d.created_at).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function KindIcon({ kind }: { kind: Device["kind"] }) {
  if (kind === "phone") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M10 18h4" />
      </svg>
    );
  }
  if (kind === "hardware") {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
        <rect x="7" y="3" width="10" height="18" rx="3" />
        <circle cx="12" cy="8" r="1.4" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-[18px] w-[18px]">
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}
