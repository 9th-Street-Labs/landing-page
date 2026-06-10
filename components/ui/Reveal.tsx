"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          autoAlpha: 0,
          y: 16,
          duration: 0.6,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "clamp(top 85%)",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
