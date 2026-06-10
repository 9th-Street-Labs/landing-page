import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AirMouseDemo } from "@/components/demos/AirMouseDemo";

export function Point() {
  return (
    <section
      id="point"
      aria-labelledby="point-heading"
      className="mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <Reveal>
        <SectionHeading
          number="01"
          name="point"
          headline="your agent asked a question. answer it from the ==accent:couch==."
          id="point-heading"
        />
        <p className="mt-6 max-w-2xl text-muted">
          Point your phone at any screen like a{" "}
          <span className="text-foreground">magic remote</span> —
          roll-compensated angular pointing, cursor appears the moment you
          move. Approve the permission prompt, click the button, scroll the
          diff.{" "}
          <span className="text-foreground">
            Without walking to the desk.
          </span>
        </p>
      </Reveal>
      <Reveal className="mt-14" delay={0.1}>
        <AirMouseDemo />
        <p className="mt-4 font-mono text-xs text-faint">
          move your mouse over the screen — that&apos;s what pointing your
          phone feels like. the real thing:{" "}
          <span className="text-foreground">&lt;25ms sensor-to-cursor</span>.
        </p>
      </Reveal>
    </section>
  );
}
