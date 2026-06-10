import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getProfile, getDailyUsage, getDevices } from "@/lib/api";
import { buildCalendar, computeStreaks, totals } from "@/lib/usage";
import { ActivityHeatmap } from "@/components/dashboard/ActivityHeatmap";
import { Avatar } from "@/components/dashboard/Avatar";

export const metadata: Metadata = { title: "Overview — 9st Whip" };

export default async function OverviewPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [profile, daily, devices] = await Promise.all([
    getProfile(),
    getDailyUsage(365),
    getDevices(),
  ]);

  const { cells } = buildCalendar(daily);
  const streaks = computeStreaks(cells);
  const t = totals(cells);

  const name = profile?.displayName ?? user?.email?.split("@")[0] ?? "You";
  const handle = user?.email?.split("@")[0] ?? "you";

  return (
    <div className="space-y-8">
      {/* profile header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar name={name} url={profile?.avatarUrl ?? null} size={56} />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{name}</h1>
            <p className="text-sm text-faint">@{handle}</p>
          </div>
        </div>
      </div>

      {/* stat tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Voice minutes" value={`${t.sttMinutes}m`} />
        <Stat label="Active days" value={t.activeDays} />
        <Stat label="Longest streak" value={`${streaks.longest}d`} accent />
        <Stat label="Current streak" value={`${streaks.current}d`} />
      </div>

      {/* heatmap */}
      <ActivityHeatmap data={daily} />

      {/* quick facts */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Stat label="Devices linked" value={devices.length} />
        <Stat label="Voice sessions" value={t.sttCount} />
        <Stat label="Whip events" value={t.whipCount} />
      </div>
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
