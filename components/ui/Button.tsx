import Link from "next/link";
import type { ReactNode } from "react";

const variants = {
  accent:
    "bg-accent text-black hover:bg-accent-bright font-semibold",
  ghost:
    "border border-white/15 text-muted hover:border-white/30 hover:text-foreground",
} as const;

export function Button({
  href,
  variant = "accent",
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}
