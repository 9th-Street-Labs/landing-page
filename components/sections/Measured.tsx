import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Stat } from "@/components/ui/Stat";
import { PercentileBars } from "@/components/demos/PercentileBars";

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
            headline="performance is ==accent:measured==, not promised."
            id="measured-heading"
          />
          <p className="mt-6 max-w-2xl text-muted">
            whip ships with{" "}
            <span className="text-foreground">
              clock-synced one-way latency instrumentation
            </span>
            . Percentiles update live in the app — if it gets slow,{" "}
            <span className="text-foreground">
              you see it before you feel it
            </span>
            .
          </p>
        </Reveal>
        <div className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
        <Reveal className="mt-20">
          <PercentileBars />
        </Reveal>
      </div>
    </section>
  );
}
