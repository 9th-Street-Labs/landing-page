"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PERCENTILES = [
  { label: "p50", height: 28 },
  { label: "p95", height: 52 },
  { label: "p99", height: 74 },
  { label: "max", height: 100 },
];

export function PercentileBars() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(gsap.utils.toArray(".pct-bar", root), {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.9,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: root,
            start: "clamp(top 85%)",
            once: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-background p-6">
      <p className="font-mono text-xs text-faint">
        diagnostics / one-way latency
      </p>
      <div className="mt-6 flex h-32 items-end gap-6">
        {PERCENTILES.map((p, i) => (
          <div key={p.label} className="flex flex-1 flex-col items-center gap-2">
            <div
              className={`pct-bar w-full rounded-t ${
                i === 1 ? "bg-accent" : "bg-fill-strong"
              }`}
              style={{ height: `${p.height}%` }}
            />
            <span className="font-mono text-xs text-faint">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
