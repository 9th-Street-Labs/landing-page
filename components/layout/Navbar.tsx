"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Magnetic } from "@/components/ui/Magnetic";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={`mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 rounded-full border border-line-strong py-1 pr-2 pl-6 shadow-[0_12px_32px_-8px_var(--shadow-soft)] backdrop-blur-xl transition-colors duration-300 ${
          scrolled ? "bg-surface-2/90" : "bg-surface-2/75"
        }`}
      >
        <Link href="/" aria-label={site.name} className="shrink-0">
          <Wordmark className="text-lg" />
        </Link>
        <ul className="hidden items-center gap-7 text-[15px] md:flex">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />
          <Link
            href="/login"
            className="hidden h-10 items-center rounded-full px-4 text-sm text-muted transition-colors hover:text-foreground sm:flex"
          >
            Sign in
          </Link>
          <Magnetic>
            <Link
              href="#download"
              className="flex h-10 items-center rounded-full bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-bright"
            >
              Download
            </Link>
          </Magnetic>
        </div>
      </nav>
    </header>
  );
}
