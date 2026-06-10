"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

export function RemoteSchematic() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const draw = (delay: number) => ({
    className: "stroke-schematic",
    initial: { pathLength: 0 },
    animate: inView ? { pathLength: 1 } : { pathLength: 0 },
    transition: { duration: 1.2, delay, ease: "easeInOut" as const },
  });

  return (
    <div ref={ref} className="mx-auto max-w-xs">
      <svg
        viewBox="0 0 200 420"
        className="w-full"
        role="img"
        aria-label="Line drawing of the whip remote: a slim wand with a scroll wheel, buttons, IMU chip and RGB LED"
      >
        {/* body outline */}
        <motion.rect
          x="55"
          y="20"
          width="90"
          height="380"
          rx="45"
          fill="none"
          strokeWidth="1.5"
          {...draw(0)}
        />
        {/* scroll wheel */}
        <motion.circle
          cx="100"
          cy="120"
          r="26"
          fill="none"
          strokeWidth="1.5"
          {...draw(0.3)}
        />
        <motion.circle
          cx="100"
          cy="120"
          r="10"
          fill="none"
          strokeWidth="1"
          {...draw(0.5)}
        />
        {/* left / right buttons */}
        <motion.path
          d="M 68 185 A 32 32 0 0 1 95 170 L 95 215 L 68 215 Z"
          fill="none"
          strokeWidth="1"
          {...draw(0.6)}
        />
        <motion.path
          d="M 132 185 A 32 32 0 0 0 105 170 L 105 215 L 132 215 Z"
          fill="none"
          strokeWidth="1"
          {...draw(0.6)}
        />
        {/* ok / back / home buttons */}
        <motion.circle
          cx="100"
          cy="250"
          r="18"
          fill="none"
          strokeWidth="1.5"
          {...draw(0.8)}
        />
        <motion.circle
          cx="75"
          cy="295"
          r="10"
          fill="none"
          strokeWidth="1"
          {...draw(0.9)}
        />
        <motion.circle
          cx="125"
          cy="295"
          r="10"
          fill="none"
          strokeWidth="1"
          {...draw(0.9)}
        />
        {/* IMU chip callout */}
        <motion.rect
          x="85"
          y="330"
          width="30"
          height="30"
          rx="3"
          fill="none"
          strokeWidth="1"
          strokeDasharray="3 3"
          {...draw(1.1)}
        />
        <motion.path
          d="M 115 345 L 165 345"
          fill="none"
          strokeWidth="1"
          {...draw(1.3)}
        />
        <text
          x="168"
          y="348"
          className="fill-faint"
          fontSize="9"
          fontFamily="var(--font-geist-mono)"
        >
          imu
        </text>
        {/* RGB LED */}
        <circle cx="100" cy="45" r="4" className="animate-led-glow fill-accent" />
        <motion.path
          d="M 104 45 L 160 45"
          fill="none"
          strokeWidth="1"
          {...draw(1.3)}
        />
        <text
          x="163"
          y="48"
          className="fill-faint"
          fontSize="9"
          fontFamily="var(--font-geist-mono)"
        >
          rgb
        </text>
      </svg>
    </div>
  );
}
