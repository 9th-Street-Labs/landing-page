import type { DayCell } from "@/lib/usage";

// Simple CSS bar chart of per-day activity (voice + Whip event counts). No chart
// lib — keeps the bundle lean and matches the hand-built feel of the site.
export function UsageBars({ cells }: { cells: DayCell[] }) {
  const max = Math.max(1, ...cells.map((c) => c.sttCount + c.whipCount));

  return (
    <div>
      <div className="flex h-40 items-end gap-1">
        {cells.map((c) => {
          const total = c.sttCount + c.whipCount;
          const h = (total / max) * 100;
          return (
            <div
              key={c.date}
              className="group relative flex-1"
              title={`${c.date} — ${c.sttCount} voice, ${c.whipCount} Whip`}
            >
              <div
                className="w-full rounded-t bg-accent/70 transition-colors group-hover:bg-accent"
                style={{ height: `${Math.max(h, total > 0 ? 4 : 0)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-faint">
        <span>{cells[0]?.date}</span>
        <span>{cells[cells.length - 1]?.date}</span>
      </div>
    </div>
  );
}
