import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { DotGrid } from "@/components/hero/DotGrid";
import { HeroIntro } from "@/components/hero/HeroIntro";
import { Ticker } from "@/components/hero/Ticker";

export function Hero() {
  return (
    <HeroIntro className="relative flex min-h-screen flex-col justify-end overflow-hidden">
      <DotGrid />
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-8 px-6 pt-32 pb-20">
        <p data-hero="eyebrow" className="font-mono text-sm text-faint">
          9th street labs presents
        </p>
        <h1 className="max-w-4xl text-[clamp(2.75rem,6vw,5.5rem)] font-medium leading-[1.05] tracking-[-0.03em]">
          <span data-hero="title">
            This is the <span className="text-accent">{site.product}</span> for
            your agents.
          </span>
          <span data-hero="caret" className="animate-caret text-accent">
            _
          </span>
        </h1>
        <p
          data-hero="tagline"
          className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          They code on your desktops — you drive them from the couch.{" "}
          <span className="text-foreground">Point, type, talk.</span>{" "}
          <span className="text-foreground">
            Never babysit a terminal again.
          </span>
        </p>
        <div
          data-hero="ctas"
          className="pointer-events-auto flex flex-wrap items-center gap-4 pt-2"
        >
          <Magnetic>
            <Button href="#download">crack the whip — download</Button>
          </Magnetic>
          <Magnetic>
            <Button href="#remote" variant="ghost">
              <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
              whip (remote) — coming soon
            </Button>
          </Magnetic>
        </div>
      </div>
      <div data-hero="ticker" className="relative z-10">
        <Ticker />
      </div>
    </HeroIntro>
  );
}
