"use client";

import { createElement, useRef, type ReactNode } from "react";
import { gsap, useGSAP, SplitText, padMasks } from "@/lib/gsap";

/**
 * Renders static text and reveals it line-by-line with a mask wipe when
 * scrolled into view. Children must be static text (plain string or inline
 * spans) — SplitText re-parents the text nodes, so it must never re-render.
 */
export function SplitReveal({
  as = "h2",
  id,
  className,
  start = "clamp(top 80%)",
  children,
}: {
  as?: "h1" | "h2" | "h3" | "p" | "div";
  id?: string;
  className?: string;
  /**
   * ScrollTrigger start. Elements at the very bottom of the page should pass
   * "clamp(top bottom)": clamp() pins an unreachable "top 80%" to exactly
   * maxScroll, which fractional page heights can leave the scroll a hair
   * short of — so the reveal never fires.
   */
  start?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(el, { autoAlpha: 0 });
        document.fonts.ready.then(() => {
          if (!el.isConnected) return;
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            aria: "auto",
            onSplit: (self) => {
              padMasks(self.lines);
              gsap.set(el, { autoAlpha: 1 });
              return gsap.from(self.lines, {
                yPercent: 130,
                duration: 0.8,
                stagger: 0.09,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: el,
                  start,
                  once: true,
                },
              });
            },
          });
        });
      });
    },
    { scope: ref }
  );

  return createElement(as, { ref, id, className }, children);
}
