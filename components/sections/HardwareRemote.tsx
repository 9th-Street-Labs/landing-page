import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { RemoteSchematic } from "@/components/demos/RemoteSchematic";

export function HardwareRemote() {
  return (
    <section
      id="remote"
      aria-labelledby="remote-heading"
      className="border-y border-line bg-surface"
    >
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 sm:py-36 lg:grid-cols-2 lg:items-center">
        <div>
          <Reveal>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 font-mono text-xs text-accent">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
              in bring-up
            </span>
            <SectionHeading
              number="04"
              name="remote"
              headline="==accent:whip (remote)== — coming soon."
              id="remote-heading"
            />
            <p className="mt-6 max-w-xl text-muted">
              A physical whip for when the phone is across the room. Dual
              personality: standard{" "}
              <span className="text-foreground">BLE HID</span> mouse — pairs
              with anything,{" "}
              <span className="text-foreground">zero software</span> — or{" "}
              <span className="text-foreground">companion mode</span> for full
              mesh integration and desktop-side tuning. Board is in bring-up.{" "}
              <span className="text-foreground">
                No renders, no promises — this is the actual schematic.
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-faint">
              {site.remoteSpecs.map((spec) => (
                <li key={spec}>{spec}</li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href={site.social.github} variant="ghost">
                notify me
              </Button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <RemoteSchematic />
        </Reveal>
      </div>
    </section>
  );
}
