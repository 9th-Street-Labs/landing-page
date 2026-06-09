"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

export function AirMouseDemo() {
  const frameRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.55);
  const springX = useSpring(x, { stiffness: 300, damping: 28 });
  const springY = useSpring(y, { stiffness: 300, damping: 28 });

  const cursorLeft = useTransform(springX, (v) => `${v * 100}%`);
  const cursorTop = useTransform(springY, (v) => `${v * 100}%`);
  const phoneRotY = useTransform(springX, [0, 1], [-22, 22]);
  const phoneRotX = useTransform(springY, [0, 1], [14, -14]);

  const [latency, setLatency] = useState(18);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setLatency((prev) => {
        const next = prev + (Math.random() - 0.5) * 4;
        return Math.round(Math.min(24, Math.max(14, next)));
      });
    }, 600);
    return () => clearInterval(id);
  }, []);

  // Idle autoplay path so touch / no-hover visitors still see the effect.
  useEffect(() => {
    if (active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.008;
      x.set(0.5 + 0.32 * Math.sin(t));
      y.set(0.55 + 0.2 * Math.sin(t * 1.7));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, x, y]);

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setActive(true);
    x.set(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
    y.set(Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height)));
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_200px]">
      {/* desktop screen */}
      <div
        ref={frameRef}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActive(false)}
        className="relative aspect-video cursor-none overflow-hidden rounded-2xl border border-white/15 bg-surface"
      >
        {/* mock agent terminal */}
        <div className="pointer-events-none absolute inset-0 p-5 font-mono text-xs leading-relaxed text-faint sm:p-8 sm:text-sm">
          <p className="text-muted">$ claude</p>
          <p className="mt-2">✻ refactoring auth middleware…</p>
          <p>✻ 14 files changed, tests passing</p>
          <div className="mt-4 max-w-sm rounded-lg border border-white/15 bg-surface-2 p-4">
            <p className="text-foreground">
              agent wants to run{" "}
              <span className="text-accent">npm run deploy</span>
            </p>
            <div className="mt-3 flex gap-2">
              <span className="rounded bg-accent px-3 py-1 font-semibold text-black">
                allow
              </span>
              <span className="rounded border border-white/20 px-3 py-1">
                deny
              </span>
            </div>
          </div>
        </div>

        {/* simulated cursor */}
        <motion.div
          className="pointer-events-none absolute z-10"
          style={{ left: cursorLeft, top: cursorTop }}
          aria-hidden="true"
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <path
              d="M2 1 L2 15 L6 11.5 L9 18 L11.5 17 L8.5 10.5 L14 10 Z"
              fill="#ff3d00"
              stroke="#000"
              strokeWidth="1"
            />
          </svg>
        </motion.div>

        {/* latency readout */}
        <div className="pointer-events-none absolute right-4 top-4 rounded-md border border-white/10 bg-background/70 px-3 py-1.5 font-mono text-xs backdrop-blur">
          <span className="text-faint">latency </span>
          <span className="text-accent">{latency}ms</span>
          <span className="pl-2 text-faint">· simulated</span>
        </div>
      </div>

      {/* tilting phone */}
      <div
        className="mx-auto hidden lg:block"
        style={{ perspective: "600px" }}
        aria-hidden="true"
      >
        <motion.div
          className="flex h-64 w-32 flex-col items-center justify-between rounded-[1.75rem] border border-white/20 bg-surface-2 p-3"
          style={{ rotateX: phoneRotX, rotateY: phoneRotY }}
        >
          <span className="h-1 w-10 rounded-full bg-white/15" />
          <span className="font-mono text-[10px] lowercase text-faint">
            whip (app)
          </span>
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-accent" />
        </motion.div>
        <p className="mt-4 text-center font-mono text-xs text-faint">
          your phone, pointing
        </p>
      </div>
    </div>
  );
}
