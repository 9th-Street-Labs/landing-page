import type { DailyUsage } from "@/lib/api";

// Pure helpers for turning the backend's per-day usage rows into a calendar grid,
// streaks, and intensity levels for the activity heatmap. No I/O — safe on server
// and client.

export interface DayCell {
  date: string; // YYYY-MM-DD
  whipSeconds: number;
  whipCount: number;
  sttSeconds: number;
  sttCount: number;
}

export type Metric = "all" | "whip" | "voice";

export const METRIC_LABELS: Record<Metric, string> = {
  all: "All activity",
  whip: "Whip usage",
  voice: "Voice minutes",
};

// A day's "value" for a metric. Counts are the reliable signal (seconds can be
// null for plain token grants), with minutes folded in when present.
export function cellValue(c: DayCell, metric: Metric): number {
  switch (metric) {
    case "whip":
      return c.whipCount + c.whipSeconds / 60;
    case "voice":
      return c.sttCount + c.sttSeconds / 60;
    default:
      return c.whipCount + c.sttCount + (c.whipSeconds + c.sttSeconds) / 60;
  }
}

export function isActive(c: DayCell, metric: Metric = "all"): boolean {
  return cellValue(c, metric) > 0;
}

function toKey(d: Date): string {
  // Local Y-M-D so the grid aligns with the user's calendar.
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

// Build a Sunday-aligned week grid covering the most recent `days` days ending today.
// Returns columns (weeks) of 7 DayCells; leading days before the window are null.
export function buildCalendar(
  data: DailyUsage[],
  days = 364,
): { weeks: (DayCell | null)[][]; cells: DayCell[]; monthLabels: { col: number; label: string }[] } {
  const byDate = new Map<string, DailyUsage>();
  for (const row of data) byDate.set(row.day, row);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - (days - 1));
  // Back up to the preceding Sunday so column 0 is a full week.
  start.setDate(start.getDate() - start.getDay());

  const cells: DayCell[] = [];
  const weeks: (DayCell | null)[][] = [];
  const monthLabels: { col: number; label: string }[] = [];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const cursor = new Date(start);
  let col = 0;
  let lastMonth = -1;

  while (cursor <= today) {
    const week: (DayCell | null)[] = [];
    for (let dow = 0; dow < 7; dow++) {
      if (cursor > today) {
        week.push(null);
      } else {
        const key = toKey(cursor);
        const row = byDate.get(key);
        const cell: DayCell = {
          date: key,
          whipSeconds: Number(row?.whip_seconds ?? 0),
          whipCount: Number(row?.whip_count ?? 0),
          sttSeconds: Number(row?.stt_seconds ?? 0),
          sttCount: Number(row?.stt_count ?? 0),
        };
        week.push(cell);
        cells.push(cell);
        // Record a month label at the first column the month appears in.
        if (dow === 0 && cursor.getMonth() !== lastMonth) {
          lastMonth = cursor.getMonth();
          monthLabels.push({ col, label: months[cursor.getMonth()] });
        }
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
    col++;
  }

  return { weeks, cells, monthLabels };
}

// 0 (empty) .. 4 (most) intensity bucket, relative to the busiest day in range.
export function levelFor(value: number, max: number): 0 | 1 | 2 | 3 | 4 {
  if (value <= 0) return 0;
  if (max <= 0) return 1;
  const r = Math.min(value / max, 0.999);
  return (1 + Math.floor(r * 4)) as 1 | 2 | 3 | 4;
}

// Current and longest run of consecutive active days (by metric). "Current" only
// counts if it includes today or yesterday (so an old streak reads as 0).
export function computeStreaks(
  cells: DayCell[],
  metric: Metric = "all",
): { current: number; longest: number } {
  let longest = 0;
  let run = 0;
  for (const c of cells) {
    if (isActive(c, metric)) {
      run++;
      longest = Math.max(longest, run);
    } else {
      run = 0;
    }
  }

  // Current streak: walk back from the most recent day.
  let current = 0;
  for (let i = cells.length - 1; i >= 0; i--) {
    if (isActive(cells[i], metric)) current++;
    else break;
  }
  // If the most recent day is inactive but yesterday's run exists, current is 0 —
  // already handled because the loop above breaks on the first inactive (today).

  return { current, longest };
}

export function totals(cells: DayCell[]): {
  whipCount: number;
  sttCount: number;
  sttMinutes: number;
  activeDays: number;
} {
  let whipCount = 0;
  let sttCount = 0;
  let sttSeconds = 0;
  let activeDays = 0;
  for (const c of cells) {
    whipCount += c.whipCount;
    sttCount += c.sttCount;
    sttSeconds += c.sttSeconds;
    if (isActive(c)) activeDays++;
  }
  return { whipCount, sttCount, sttMinutes: Math.round(sttSeconds / 60), activeDays };
}
