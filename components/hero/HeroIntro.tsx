"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, padMasks } from "@/lib/gsap";

/**
 * Owns the hero entrance choreography. Children are server-rendered; elements
 * tagged with data-hero (eyebrow | title | caret | tagline | ctas | ticker)
 * are picked up here and sequenced. Without JS (or with reduced motion) the
 * server HTML simply stays visible.
 */
export function HeroIntro({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const q = (name: string) =>
        root.querySelector<HTMLElement>(`[data-hero="${name}"]`);
      const eyebrow = q("eyebrow");
      const title = q("title");
      const caret = q("caret");
      const tagline = q("tagline");
      const ctas = q("ctas");
      const ticker = q("ticker");
      if (!title) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = [eyebrow, title, caret, tagline, ctas, ticker].filter(
          Boolean
        ) as HTMLElement[];
        // Hide before first paint; revealed by the timeline below.
        gsap.set(targets, { autoAlpha: 0 });

        document.fonts.ready.then(() => {
          if (!root.isConnected) return;
          SplitText.create(title, {
            type: "chars",
            mask: "chars",
            aria: "auto",
            onSplit: (self) => {
              padMasks(self.chars);
              const tl = gsap.timeline({
                defaults: { ease: "expo.out" },
              });
              gsap.set(title, { autoAlpha: 1 });
              tl.from(self.chars, {
                yPercent: 130,
                duration: 0.9,
                stagger: 0.05,
              });
              if (eyebrow) {
                tl.to(eyebrow, { autoAlpha: 1, duration: 0.5 }, 0.1).from(
                  eyebrow,
                  { y: 12, duration: 0.5 },
                  0.1
                );
              }
              if (caret) {
                tl.to(caret, { autoAlpha: 1, duration: 0.2 }, "-=0.5");
              }
              if (tagline) {
                tl.to(tagline, { autoAlpha: 1, duration: 0.01 }, "-=0.45");
                SplitText.create(tagline, {
                  type: "lines",
                  mask: "lines",
                  autoSplit: true,
                  aria: "auto",
                  onSplit: (lineSplit) => {
                    padMasks(lineSplit.lines);
                    return tl.from(
                      lineSplit.lines,
                      {
                        yPercent: 130,
                        duration: 0.7,
                        stagger: 0.08,
                      },
                      "-=0.45"
                    );
                  },
                });
              }
              if (ctas) {
                tl.to(ctas, { autoAlpha: 1, duration: 0.5 }, "-=0.35").from(
                  ctas,
                  { y: 14, duration: 0.5 },
                  "-=0.35"
                );
              }
              if (ticker) {
                tl.to(ticker, { autoAlpha: 1, duration: 0.6 }, "-=0.25");
              }
              return tl;
            },
          });
        });
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
}
