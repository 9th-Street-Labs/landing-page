import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";

const PERCENTILES = [
  { label: "p50", height: 28 },
  { label: "p95", height: 52 },
  { label: "p99", height: 74 },
  { label: "max", height: 100 },
];

export function Measured() {
  return (
    <section
      aria-labelledby="measured-heading"
      className="border-y border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
        <Reveal>
          <SectionHeading
            number="05"
            name="measured"
            headline="performance is measured, not promised."
            id="measured-heading"
          />
          <p className="mt-6 max-w-2xl text-muted">
            whip ships with clock-synced one-way latency instrumentation.
            Percentiles update live in the app — if it gets slow, you see it
            before you feel it.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
        <Reveal className="mt-20">
          <div className="rounded-2xl border border-line bg-background p-6">
            <p className="font-mono text-xs text-faint">
              diagnostics / one-way latency
            </p>
            <div className="mt-6 flex h-32 items-end gap-6">
              {PERCENTILES.map((p, i) => (
                <div
                  key={p.label}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className={`w-full rounded-t ${
                      i === 1 ? "bg-accent" : "bg-fill-strong"
                    }`}
                    style={{ height: `${p.height}%` }}
                  />
                  <span className="font-mono text-xs text-faint">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
