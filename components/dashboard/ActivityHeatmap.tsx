"use client";

import { useMemo, useState } from "react";
import type { DailyUsage } from "@/lib/api";
import {
  buildCalendar,
  cellValue,
  levelFor,
  METRIC_LABELS,
  type Metric,
} from "@/lib/usage";

// GitHub-style contribution heatmap of Whip + voice activity. Orange-tinted to
// match the brand. Intensity is relative to the busiest day in range.
const LEVEL_BG = [
  "bg-fill", // 0 — empty
  "bg-accent/25",
  "bg-accent/50",
  "bg-accent/75",
  "bg-accent",
] as const;

const DOW_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ActivityHeatmap({ data }: { data: DailyUsage[] }) {
  const [metric, setMetric] = useState<Metric>("all");

  const { weeks, monthLabels, max } = useMemo(() => {
    const cal = buildCalendar(data);
    let max = 0;
    for (const c of cal.cells) max = Math.max(max, cellValue(c, metric));
    return { ...cal, max };
  }, [data, metric]);

  return (
    <div className="rounded-2xl border border-line bg-surface-2/40 p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-semibold">Activity</h2>
        <div className="flex gap-1 rounded-full border border-line bg-surface p-0.5 text-xs">
          {(Object.keys(METRIC_LABELS) as Metric[]).map((m) => (
            <button
              key={m}
              onClick={() => setMetric(m)}
              className={`rounded-full px-3 py-1 transition-colors ${
                metric === m
                  ? "bg-accent text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {METRIC_LABELS[m]}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto pb-1">
        <div className="inline-flex flex-col gap-1.5">
          {/* month labels — explicit height so the grid below doesn't overlap it
              (absolute children give the row zero height otherwise). paddingLeft
              matches the day-label column (w-7 = 28px) + the gap-1.5 (6px). */}
          <div className="flex text-[11px] text-faint" style={{ paddingLeft: 34 }}>
            <div className="relative h-4" style={{ width: weeks.length * 15 }}>
              {monthLabels.map((m) => (
                <span
                  key={`${m.col}-${m.label}`}
                  className="absolute top-0 whitespace-nowrap"
                  style={{ left: m.col * 15 }}
                >
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-1.5">
            {/* day-of-week labels */}
            <div className="flex w-7 flex-col gap-[3px] text-[10px] text-faint">
              {DOW_LABELS.map((d, i) => (
                <span key={i} className="flex h-[12px] items-center">
                  {d}
                </span>
              ))}
            </div>

            {/* week columns */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((cell, di) => {
                    if (!cell) return <div key={di} className="h-[12px] w-[12px]" />;
                    const v = cellValue(cell, metric);
                    const level = levelFor(v, max);
                    return (
                      <div
                        key={di}
                        title={tooltip(cell.date, cell)}
                        className={`h-[12px] w-[12px] rounded-[3px] ${LEVEL_BG[level]} ring-1 ring-inset ring-line`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* legend — outside the horizontal scroll area so it's never clipped */}
      <div className="mt-3 flex items-center justify-end gap-1.5 text-[11px] text-faint">
        <span>Less</span>
        {LEVEL_BG.map((bg, i) => (
          <span key={i} className={`h-[12px] w-[12px] rounded-[3px] ${bg} ring-1 ring-inset ring-line`} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}

function tooltip(
  date: string,
  c: { whipCount: number; sttCount: number; sttSeconds: number },
): string {
  const parts: string[] = [];
  if (c.whipCount) parts.push(`${c.whipCount} Whip`);
  if (c.sttCount) parts.push(`${c.sttCount} voice`);
  if (c.sttSeconds) parts.push(`${Math.round(c.sttSeconds / 60)}m spoken`);
  return `${date}${parts.length ? " — " + parts.join(", ") : " — no activity"}`;
}
