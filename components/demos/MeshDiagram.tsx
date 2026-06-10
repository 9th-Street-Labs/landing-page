"use client";

import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

// Node positions in a 800x420 viewBox.
const NODES = {
  phone: { x: 400, y: 330, w: 56, h: 96, label: "whip (app)" },
  left: { x: 130, y: 110, w: 170, h: 110, label: "linux" },
  mid: { x: 400, y: 90, w: 170, h: 110, label: "macos" },
  right: { x: 670, y: 110, w: 170, h: 110, label: "windows" },
} as const;

const EDGES: Array<[keyof typeof NODES, keyof typeof NODES]> = [
  ["phone", "left"],
  ["phone", "mid"],
  ["phone", "right"],
  ["left", "mid"],
  ["mid", "right"],
];

function edgePath(a: keyof typeof NODES, b: keyof typeof NODES) {
  const na = NODES[a];
  const nb = NODES[b];
  return `M ${na.x} ${na.y} L ${nb.x} ${nb.y}`;
}

export function MeshDiagram() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const edges = gsap.utils.toArray<SVGElement>(".mesh-edge", root);
        const nodes = gsap.utils.toArray<SVGElement>(".mesh-node", root);
        const packets = gsap.utils.toArray<SVGElement>(".mesh-packet", root);
        const cursor = root.querySelector<SVGElement>(".mesh-cursor");

        // Build phase: edges draw + nodes pop, scrubbed to scroll.
        const build = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "clamp(top 80%)",
            end: "top 35%",
            scrub: 0.5,
          },
        });
        build
          .from(nodes, {
            scale: 0.9,
            autoAlpha: 0,
            transformOrigin: "center center",
            stagger: 0.12,
            duration: 0.5,
            ease: "power2.out",
          })
          .from(
            edges,
            { drawSVG: 0, stagger: 0.1, duration: 0.6, ease: "none" },
            "<0.1"
          );

        // Live phase: packets travel edges, cursor hops between screens.
        // Loops run only while the diagram is on screen.
        const loops: gsap.core.Tween[] = [];
        packets.forEach((packet, i) => {
          loops.push(
            gsap.to(packet, {
              motionPath: { path: edgePath(...EDGES[i % EDGES.length]) },
              duration: 2.2 + i * 0.5,
              repeat: -1,
              ease: "none",
              paused: true,
            })
          );
        });
        if (cursor) {
          const waypoints = [NODES.left, NODES.mid, NODES.right, NODES.left];
          loops.push(
            gsap.to(cursor, {
              motionPath: {
                path: waypoints.map((n) => ({ x: n.x, y: n.y })),
              },
              duration: 7,
              repeat: -1,
              ease: "power1.inOut",
              paused: true,
            })
          );
          gsap.set(cursor, { x: NODES.left.x, y: NODES.left.y });
        }
        gsap.set(packets, { autoAlpha: 0 });

        const live = ScrollTrigger.create({
          trigger: root,
          start: "clamp(top 80%)",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(packets, { autoAlpha: 1, duration: 0.4, delay: 0.3 });
              loops.forEach((l) => l.play());
            } else {
              loops.forEach((l) => l.pause());
            }
          },
        });

        return () => {
          live.kill();
          loops.forEach((l) => l.kill());
        };
      });
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-line bg-surface p-4 sm:p-8"
    >
      <svg
        viewBox="0 0 800 420"
        className="w-full"
        role="img"
        aria-label="Diagram: a phone connected to Linux, macOS and Windows desktops in a local mesh, with input packets flowing between them"
      >
        {/* edges */}
        {EDGES.map(([a, b]) => (
          <path
            key={`${a}-${b}`}
            d={edgePath(a, b)}
            className="mesh-edge stroke-line"
            strokeWidth="1.5"
            fill="none"
          />
        ))}

        {/* traveling packets */}
        {EDGES.map(([a, b]) => (
          <circle
            key={`p-${a}-${b}`}
            r="4"
            className="mesh-packet fill-accent opacity-0"
          />
        ))}

        {/* desktop nodes */}
        {(["left", "mid", "right"] as const).map((key) => {
          const n = NODES[key];
          return (
            <g key={key} className="mesh-node">
              <rect
                x={n.x - n.w / 2}
                y={n.y - n.h / 2}
                width={n.w}
                height={n.h}
                rx="10"
                className="fill-diagram-node stroke-line-strong"
                strokeWidth="1.5"
              />
              {/* screen content lines */}
              <line
                x1={n.x - n.w / 2 + 16}
                y1={n.y - 18}
                x2={n.x + n.w / 2 - 40}
                y2={n.y - 18}
                className="stroke-line"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1={n.x - n.w / 2 + 16}
                y1={n.y - 2}
                x2={n.x + n.w / 2 - 70}
                y2={n.y - 2}
                className="stroke-accent/50"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text
                x={n.x}
                y={n.y + n.h / 2 + 24}
                textAnchor="middle"
                className="fill-faint"
                fontSize="14"
                fontFamily="var(--font-geist-mono)"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* cursor crossing between screens */}
        <g
          className="mesh-cursor"
          transform={`translate(${NODES.left.x}, ${NODES.left.y})`}
        >
          <path
            d="M0 -6 L0 8 L4 4.5 L7 11 L9.5 10 L6.5 3.5 L12 3 Z"
            className="fill-cursor stroke-background"
            strokeWidth="1"
          />
        </g>

        {/* phone node */}
        <g className="mesh-node">
          <rect
            x={NODES.phone.x - NODES.phone.w / 2}
            y={NODES.phone.y - NODES.phone.h / 2}
            width={NODES.phone.w}
            height={NODES.phone.h}
            rx="14"
            className="fill-surface-2 stroke-accent"
            strokeWidth="1.5"
          />
          <circle
            cx={NODES.phone.x}
            cy={NODES.phone.y + 28}
            r="3"
            className="animate-pulse-dot fill-accent"
          />
          <text
            x={NODES.phone.x}
            y={NODES.phone.y + NODES.phone.h / 2 + 24}
            textAnchor="middle"
            className="fill-faint"
            fontSize="14"
            fontFamily="var(--font-geist-mono)"
          >
            {NODES.phone.label}
          </text>
        </g>
      </svg>
    </div>
  );
}
