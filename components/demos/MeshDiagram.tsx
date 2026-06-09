"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

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
  const inView = useInView(ref, { once: false, margin: "-80px" });

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-surface p-4 sm:p-8">
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
            stroke="rgba(255,255,255,0.12)"
            strokeWidth="1.5"
            fill="none"
          />
        ))}

        {/* traveling packets */}
        {inView &&
          EDGES.map(([a, b], i) => (
            <circle key={`p-${a}-${b}`} r="4" fill="#ff3d00">
              <animateMotion
                dur={`${2.2 + i * 0.5}s`}
                repeatCount="indefinite"
                path={edgePath(a, b)}
              />
            </circle>
          ))}

        {/* desktop nodes */}
        {(["left", "mid", "right"] as const).map((key) => {
          const n = NODES[key];
          return (
            <g key={key}>
              <rect
                x={n.x - n.w / 2}
                y={n.y - n.h / 2}
                width={n.w}
                height={n.h}
                rx="10"
                fill="#0a0a0a"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1.5"
              />
              {/* screen content lines */}
              <line
                x1={n.x - n.w / 2 + 16}
                y1={n.y - 18}
                x2={n.x + n.w / 2 - 40}
                y2={n.y - 18}
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <line
                x1={n.x - n.w / 2 + 16}
                y1={n.y - 2}
                x2={n.x + n.w / 2 - 70}
                y2={n.y - 2}
                stroke="rgba(255,61,0,0.5)"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text
                x={n.x}
                y={n.y + n.h / 2 + 24}
                textAnchor="middle"
                fill="#6b6b6b"
                fontSize="14"
                fontFamily="var(--font-geist-mono)"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        {/* cursor crossing between screens */}
        {inView && (
          <motion.g
            initial={false}
            animate={{
              x: [NODES.left.x, NODES.mid.x, NODES.right.x, NODES.left.x],
              y: [NODES.left.y, NODES.mid.y, NODES.right.y, NODES.left.y],
            }}
            transition={{
              duration: 7,
              times: [0, 0.4, 0.75, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <path
              d="M0 -6 L0 8 L4 4.5 L7 11 L9.5 10 L6.5 3.5 L12 3 Z"
              fill="#f5f5f5"
              stroke="#000"
              strokeWidth="1"
            />
          </motion.g>
        )}

        {/* phone node */}
        <g>
          <rect
            x={NODES.phone.x - NODES.phone.w / 2}
            y={NODES.phone.y - NODES.phone.h / 2}
            width={NODES.phone.w}
            height={NODES.phone.h}
            rx="14"
            fill="#141414"
            stroke="#ff3d00"
            strokeWidth="1.5"
          />
          <circle
            cx={NODES.phone.x}
            cy={NODES.phone.y + 28}
            r="3"
            fill="#ff3d00"
            className="animate-pulse-dot"
          />
          <text
            x={NODES.phone.x}
            y={NODES.phone.y + NODES.phone.h / 2 + 24}
            textAnchor="middle"
            fill="#6b6b6b"
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
