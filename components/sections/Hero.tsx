import Link from "next/link";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-28 text-center sm:py-36">
      <span className="mb-6 rounded-full border border-black/10 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground/70 dark:border-white/15">
        Now building
      </span>
      <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-6xl">
        {site.name}
      </h1>
      <p className="mt-6 max-w-xl text-balance text-lg text-foreground/70">
        {site.description}
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="#features"
          className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90"
        >
          Explore
        </Link>
        <Link
          href="#contact"
          className="rounded-full border border-black/10 px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground/5 dark:border-white/15"
        >
          Contact us
        </Link>
      </div>
    </section>
  );
}
