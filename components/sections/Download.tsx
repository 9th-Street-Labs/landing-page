import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";

export function Download() {
  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="border-t border-line"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 py-28 text-center sm:py-40">
        <Reveal>
          <h2
            id="download-heading"
            className="text-4xl font-medium tracking-tight sm:text-6xl"
          >
            Crack the <span className="text-accent">whip</span>.
          </h2>
          <p className="mt-4 text-lg text-muted">Your agents are waiting.</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {site.downloads.desktop.map((item) => (
              <Magnetic key={item.label}>
                <Button href={item.href}>{item.label}</Button>
              </Magnetic>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {site.downloads.stores.map((store) => (
              <span
                key={store.label}
                className="rounded-full border border-line-strong px-5 py-2 font-mono text-xs text-faint"
              >
                {store.label}
              </span>
            ))}
          </div>
          <p className="mt-6 font-mono text-xs text-faint">
            whip (remote) — coming soon
          </p>
        </Reveal>
      </div>
    </section>
  );
}
