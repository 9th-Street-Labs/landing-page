"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

/**
 * Infinite marquee whose speed and skew react to scroll velocity
 * (gsap.com-style). Falls back to the CSS marquee keyframe when JS or
 * full motion is unavailable.
 */
export function TickerTrack({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = ref.current;
      if (!track) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // GSAP owns the loop from here; drop the CSS fallback animation.
        track.classList.remove("animate-marquee");

        const loop = gsap.to(track, {
          xPercent: -50,
          duration: 30,
          ease: "none",
          repeat: -1,
        });

        const speedDecay = gsap.to(loop, {
          timeScale: 1,
          duration: 1.2,
          ease: "power2.out",
          paused: true,
        });
        const skewSetter = gsap.quickTo(track, "skewX", {
          duration: 0.4,
          ease: "power2.out",
        });

        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = self.getVelocity();
            loop.timeScale(gsap.utils.clamp(-4, 4, 1 + v / 1200));
            skewSetter(gsap.utils.clamp(-6, 6, v / 250));
            speedDecay.invalidate().restart();
            gsap.delayedCall(0.15, () => skewSetter(0));
          },
        });

        return () => st.kill();
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="animate-marquee flex w-max gap-0" aria-hidden="true">
      {children}
    </div>
  );
}
