import { site } from "@/lib/site";

export function Ticker() {
  const items = [...site.ticker, ...site.ticker];
  return (
    <div
      className="w-full overflow-hidden border-y border-white/10 py-3"
      aria-label={site.ticker.join(", ")}
    >
      <div className="animate-marquee flex w-max gap-0" aria-hidden="true">
        {items.map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-8 font-mono text-sm text-faint"
          >
            {item}
            <span className="pl-16 text-accent">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
