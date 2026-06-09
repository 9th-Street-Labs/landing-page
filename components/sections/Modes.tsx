import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Waveform } from "@/components/demos/Waveform";
import { TypingDemo } from "@/components/demos/TypingDemo";
import { TrackpadTrace } from "@/components/demos/TrackpadTrace";
import { PresenterPulse } from "@/components/demos/PresenterPulse";

const demos = {
  voice: Waveform,
  keyboard: TypingDemo,
  trackpad: TrackpadTrace,
  remote: PresenterPulse,
} as const;

export function Modes() {
  return (
    <section
      id="modes"
      aria-labelledby="modes-heading"
      className="mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <Reveal>
        <SectionHeading
          number="02"
          name="modes"
          headline="four ways to whip."
          id="modes-heading"
        />
      </Reveal>
      <div className="mt-16 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {site.modes.map((mode, i) => {
          const Demo = demos[mode.name as keyof typeof demos];
          return (
            <Reveal
              key={mode.name}
              delay={i * 0.08}
              className="min-w-[280px] snap-start sm:min-w-0"
            >
              <article className="flex h-full flex-col gap-5 rounded-2xl border border-white/10 bg-surface p-6 transition-colors hover:border-white/20">
                <div className="rounded-xl bg-surface-2 py-3">
                  <Demo />
                </div>
                <h3 className="text-lg font-bold lowercase">
                  {mode.name}{" "}
                  <span className="font-normal text-faint">
                    ({mode.qualifier})
                  </span>
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted">
                  {mode.copy}
                </p>
                <p className="font-mono text-xs text-faint">{mode.footnote}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
