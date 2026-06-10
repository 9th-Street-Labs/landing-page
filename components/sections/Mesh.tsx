import { site } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MeshDiagram } from "@/components/demos/MeshDiagram";
import { Highlight } from "@/components/ui/Highlight";

export function Mesh() {
  return (
    <section
      id="mesh"
      aria-labelledby="mesh-heading"
      className="mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <Reveal>
        <SectionHeading
          number="03"
          name="mesh"
          headline="agents on three machines. ==accent:one whip==."
          id="mesh-heading"
        />
        <p className="mt-6 max-w-2xl text-muted">
          whip (desktop) is also a full software KVM across{" "}
          <span className="text-foreground">Windows, macOS and Linux</span>.
          Switch which desktop the phone drives in one tap, push your cursor
          across screen edges, sling files and clipboard between machines —
          with{" "}
          <span className="text-foreground">&lt;3ms p95 added latency</span>.
        </p>
      </Reveal>
      <Reveal className="mt-14" delay={0.1}>
        <MeshDiagram />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {site.mesh.features.map((feature, i) => (
          <Reveal key={feature.name} delay={i * 0.08}>
            <div className="rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
              <h3 className="font-bold lowercase">
                {feature.name}{" "}
                <span className="font-normal text-faint">
                  ({feature.qualifier})
                </span>
              </h3>
              <p className="mt-2 text-sm text-muted">
                <Highlight>{feature.copy}</Highlight>
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
