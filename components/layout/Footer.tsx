import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <Wordmark />
          <p className="font-mono text-xs text-faint">
            made on the local network. no cloud was harmed.
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <Link
            href={site.social.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted transition-colors hover:text-foreground"
          >
            GitHub
          </Link>
          <p className="text-faint">© {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
