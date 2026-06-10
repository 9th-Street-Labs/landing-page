import type { Metadata } from "next";
import { getDailyUsage } from "@/lib/api";
import { buildCalendar, totals } from "@/lib/usage";
import { UsageBars } from "@/components/dashboard/UsageBars";

export const metadata: Metadata = { title: "Usage — 9st Whip" };

export default async function UsagePage() {
  const daily = await getDailyUsage(365);
  const { cells } = buildCalendar(daily);
  const t = totals(cells);

  // Last 30 days for the bar chart.
  const last30 = cells.slice(-30);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Usage</h1>
        <p className="mt-1 text-sm text-muted">
          Voice transcription and Whip activity over the last year.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Voice minutes" value={`${t.sttMinutes}m`} accent />
        <Stat label="Voice sessions" value={t.sttCount} />
        <Stat label="Whip events" value={t.whipCount} />
        <Stat label="Active days" value={t.activeDays} />
      </div>

      <div className="rounded-2xl border border-line bg-surface-2/40 p-5">
        <h2 className="mb-4 text-sm font-semibold">Last 30 days</h2>
        <UsageBars cells={last30} />
      </div>

      <p className="text-xs text-faint">
        Voice usage is metered per Deepgram token grant. Whip activity is reported by the
        desktop app while you&apos;re driving your agents.
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface-2/40 px-4 py-4">
      <p className="text-xs uppercase tracking-wide text-faint">{label}</p>
      <p className={`mt-1.5 text-2xl font-semibold ${accent ? "text-accent" : ""}`}>{value}</p>
    </div>
  );
}
