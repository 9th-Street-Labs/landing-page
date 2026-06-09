"use client";

import { useEffect, useState } from "react";

const LINES = [
  "yes, apply the fix",
  "run the tests first",
  "use the staging db",
  "ship it",
];

export function TypingDemo() {
  const [text, setText] = useState("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(LINES[0]);
      return;
    }
    let line = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = LINES[line];
      if (!deleting) {
        char++;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, 1600);
          return;
        }
        timer = setTimeout(tick, 60 + Math.random() * 60);
      } else {
        char--;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          line = (line + 1) % LINES.length;
        }
        timer = setTimeout(tick, 24);
      }
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="flex h-24 items-center justify-center px-4"
      aria-hidden="true"
    >
      <p className="font-mono text-sm text-foreground">
        <span className="text-faint">&gt; </span>
        {text}
        <span className="animate-caret text-accent">▌</span>
      </p>
    </div>
  );
}
