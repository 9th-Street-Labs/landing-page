"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export function Stat({
  value,
  prefix = "",
  suffix = "",
  label,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(numRef.current, {
          textContent: 0,
          duration: 1.4,
          ease: "expo.out",
          snap: { textContent: 1 },
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
    <div ref={ref} className="flex flex-col gap-2">
      <p className="font-mono text-5xl font-bold tracking-tight sm:text-6xl">
        <span className="text-faint">{prefix}</span>
        <span ref={numRef} className="text-accent">
          {value}
        </span>
        <span className="text-faint">{suffix}</span>
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
