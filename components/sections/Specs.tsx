import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Comparison } from "@/components/sections/Comparison";

export function Specs() {
  return (
    <section
      id="specs"
      aria-labelledby="specs-heading"
      className="mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <Reveal>
        <SectionHeading
          number="06"
          name="specs"
          headline="under the hood."
          id="specs-heading"
        />
      </Reveal>

      <Reveal className="mt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <ol className="relative flex flex-col">
            {site.connectivity.map((lane, i) => (
              <li
                key={lane.name}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-3 w-3 shrink-0 rounded-full ${
                      i === 0 ? "bg-accent" : "bg-white/25"
                    }`}
                  />
                  {i < site.connectivity.length - 1 && (
                    <span className="w-px flex-1 bg-white/15" />
                  )}
                </div>
                <div className="-mt-1">
                  <h3 className="font-mono text-base text-foreground">
                    {lane.name}{" "}
                    <span className="text-faint">({lane.qualifier})</span>
                  </h3>
                  <p className="mt-1 text-sm text-muted">{lane.copy}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-6">
            <p className="font-mono text-xs text-faint">trust model</p>
            <ul className="flex flex-col gap-2 font-mono text-sm text-muted">
              {site.trust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-2 border-t border-white/10 pt-4 text-sm font-semibold text-accent">
              no cloud relay — everything stays on your network.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-24">
        <Comparison />
      </Reveal>
    </section>
  );
}
