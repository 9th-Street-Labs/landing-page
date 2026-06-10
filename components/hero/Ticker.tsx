import { site } from "@/lib/site";
import { TickerTrack } from "@/components/hero/TickerTrack";

export function Ticker() {
  const items = [...site.ticker, ...site.ticker];
  return (
    <div
      className="w-full overflow-hidden border-y border-line py-3"
      aria-label={site.ticker.join(", ")}
    >
      <TickerTrack>
        {items.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-8 font-mono text-sm text-faint"
          >
            {item}
            <span className="pl-16 text-accent">·</span>
          </span>
        ))}
      </TickerTrack>
    </div>
  );
}
