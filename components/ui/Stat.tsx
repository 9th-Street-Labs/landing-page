"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <p className="font-mono text-5xl font-bold tracking-tight sm:text-6xl">
        <span className="text-faint">{prefix}</span>
        <span className="text-accent">{display}</span>
        <span className="text-faint">{suffix}</span>
      </p>
      <p className="text-sm text-muted">{label}</p>
    </div>
  );
}
