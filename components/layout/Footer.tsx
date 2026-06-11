import Link from "next/link";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/ui/Wordmark";
import { SplitReveal } from "@/components/ui/SplitReveal";

export function Footer() {
  return (
    <footer
      data-theme="dark"
      className="mt-auto overflow-hidden border-t border-line bg-background text-foreground"
    >
      <div className="mx-auto max-w-6xl px-6 pt-16">
        {/* link columns */}
        <div className="grid gap-12 pb-16 sm:grid-cols-[1fr_auto_auto] sm:gap-20">
          <div className="flex flex-col gap-3">
            <Wordmark variant="short" />
            <p className="max-w-xs text-sm text-muted">{site.tagline}.</p>
            <p className="font-mono text-xs text-faint">
              Made on the local network. No cloud was harmed.
            </p>
          </div>
          <nav aria-label="Product" className="flex flex-col gap-3">
            <p className="font-mono text-xs text-faint">Product</p>
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#download"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Download
            </Link>
          </nav>
          <nav aria-label="Company" className="flex flex-col gap-3">
            <p className="font-mono text-xs text-faint">Company</p>
            <Link
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
            <Link
              href={`https://${site.domain}`}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {site.domain}
            </Link>
          </nav>
        </div>

        {/* legal row */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-6">
          <p className="font-mono text-xs text-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="font-mono text-xs text-faint">{site.domain}</p>
        </div>
      </div>

      {/* giant company wordmark, gsap.com-style — spans the full footer width */}
      <SplitReveal
        as="div"
        start="clamp(top bottom)"
        className="pointer-events-none w-full pb-4 text-center text-[clamp(2.5rem,11vw,12rem)] font-medium leading-none tracking-[-0.04em] whitespace-nowrap select-none"
      >
        <span aria-hidden="true">
          <span className="text-accent">9</span>
          <span className="text-foreground">th </span>
          <span className="text-accent">St</span>
          <span className="text-foreground">reet Labs</span>
        </span>
      </SplitReveal>
    </footer>
  );
}
