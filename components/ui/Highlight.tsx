import type { ReactNode } from "react";

const COLOR_CLASSES: Record<string, string> = {
  accent: "text-accent",
  white: "text-foreground",
};

/**
 * Renders copy strings with `==accent:words==` / `==white:words==` markers as
 * emphasized spans — superheat-style: one brand accent, plus white-vs-muted
 * tonal emphasis. Keeps highlightable copy in lib/site.ts as plain strings.
 */
export function Highlight({ children }: { children: string }): ReactNode {
  const parts = children.split(/(==[a-z]+:[^=]+==)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^==([a-z]+):([^=]+)==$/);
        if (!m) return part;
        return (
          <span key={i} className={COLOR_CLASSES[m[1]] ?? "text-foreground"}>
            {m[2]}
          </span>
        );
      })}
    </>
  );
}
