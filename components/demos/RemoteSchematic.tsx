"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Line-drawing of the remote that draws itself as you scroll (scrubbed).
 * Elements with .schematic-draw are stroked in DOM order; labels fade last.
 */
export function RemoteSchematic() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const shapes = gsap.utils.toArray<SVGElement>(".schematic-draw", root);
        const labels = gsap.utils.toArray<SVGElement>(".schematic-label", root);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "clamp(top 80%)",
            end: "center 45%",
            scrub: 0.6,
          },
        });
        tl.from(shapes, {
          drawSVG: 0,
          stagger: 0.18,
          duration: 1,
          ease: "none",
        }).from(labels, { autoAlpha: 0, duration: 0.4 }, "-=0.2");
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="mx-auto max-w-xs">
      <svg
        viewBox="0 0 200 420"
        className="w-full"
        role="img"
        aria-label="Line drawing of the whip remote: a slim wand with a scroll wheel, buttons, IMU chip and RGB LED"
      >
        {/* body outline */}
        <rect
          x="55"
          y="20"
          width="90"
          height="380"
          rx="45"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1.5"
        />
        {/* scroll wheel */}
        <circle
          cx="100"
          cy="120"
          r="26"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1.5"
        />
        <circle
          cx="100"
          cy="120"
          r="10"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1"
        />
        {/* left / right buttons */}
        <path
          d="M 68 185 A 32 32 0 0 1 95 170 L 95 215 L 68 215 Z"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1"
        />
        <path
          d="M 132 185 A 32 32 0 0 0 105 170 L 105 215 L 132 215 Z"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1"
        />
        {/* ok / back / home buttons */}
        <circle
          cx="100"
          cy="250"
          r="18"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1.5"
        />
        <circle
          cx="75"
          cy="295"
          r="10"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1"
        />
        <circle
          cx="125"
          cy="295"
          r="10"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1"
        />
        {/* IMU chip callout — dashed stroke can't be drawSVG'd; fades with labels */}
        <rect
          x="85"
          y="330"
          width="30"
          height="30"
          rx="3"
          fill="none"
          className="schematic-label stroke-schematic"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <path
          d="M 115 345 L 165 345"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1"
        />
        <text
          x="168"
          y="348"
          className="schematic-label fill-faint"
          fontSize="9"
          fontFamily="var(--font-geist-mono)"
        >
          imu
        </text>
        {/* RGB LED */}
        <circle cx="100" cy="45" r="4" className="animate-led-glow fill-accent" />
        <path
          d="M 104 45 L 160 45"
          fill="none"
          className="schematic-draw stroke-schematic"
          strokeWidth="1"
        />
        <text
          x="163"
          y="48"
          className="schematic-label fill-faint"
          fontSize="9"
          fontFamily="var(--font-geist-mono)"
        >
          rgb
        </text>
      </svg>
    </div>
  );
}
