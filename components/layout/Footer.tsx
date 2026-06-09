import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-black/5 dark:border-white/10"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <p className="text-sm text-foreground/60">
          © {site.name}. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
            className="text-foreground/70 transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
