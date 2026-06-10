"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const STRENGTH = 0.3;
const MAX_OFFSET = 8;

/** Subtle magnetic pull toward the pointer; springs back on leave. */
export function Magnetic({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(
        "(hover: hover) and (prefers-reduced-motion: no-preference)",
        () => {
          const xTo = gsap.quickTo(el, "x", {
            duration: 0.4,
            ease: "power3.out",
          });
          const yTo = gsap.quickTo(el, "y", {
            duration: 0.4,
            ease: "power3.out",
          });

          const onMove = (e: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const dx = e.clientX - (rect.left + rect.width / 2);
            const dy = e.clientY - (rect.top + rect.height / 2);
            xTo(gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, dx * STRENGTH));
            yTo(gsap.utils.clamp(-MAX_OFFSET, MAX_OFFSET, dy * STRENGTH));
          };
          const onLeave = () => {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.7,
              ease: "elastic.out(1, 0.4)",
            });
          };

          el.addEventListener("pointermove", onMove);
          el.addEventListener("pointerleave", onLeave);
          return () => {
            el.removeEventListener("pointermove", onMove);
            el.removeEventListener("pointerleave", onLeave);
          };
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="inline-block">
      {children}
    </div>
  );
}
