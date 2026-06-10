import { site } from "@/lib/site";

/**
 * Superheat-style split panel: the black side is the status quo, the accent
 * side is whip. Deliberately uses fixed colors (black / accent / white) in
 * both themes — it's a designed surface, not themed UI.
 */
export function Comparison() {
  const { others, whip, links } = site.comparison;
  return (
    <div>
      <div className="grid overflow-hidden rounded-3xl md:grid-cols-2">
        {/* the others */}
        <div className="flex flex-col gap-12 bg-black p-8 sm:p-12">
          <h3 className="text-3xl font-medium tracking-tight text-white/40 sm:text-4xl md:text-right">
            {others.headline}
          </h3>
          <div className="flex flex-1 flex-col justify-end gap-6 md:items-end md:text-right">
            <p className="text-xl font-medium text-white/60">
              {others.name}
            </p>
            <dl className="flex flex-col gap-5">
              {others.rows.map((row) => (
                <div key={row.label} className="md:text-right">
                  <dd className="text-2xl font-semibold text-white/45">
                    {row.value}
                    {row.unit && (
                      <span className="pl-1 text-base font-normal text-white/30">
                        {row.unit}
                      </span>
                    )}
                  </dd>
                  <dt className="font-mono text-xs tracking-wide text-white/30 uppercase">
                    {row.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* whip */}
        <div className="flex flex-col gap-12 bg-accent p-8 sm:p-12">
          <h3 className="text-3xl font-medium tracking-tight text-white sm:text-4xl">
            Whip drives your agents.{" "}
            <span className="text-black/40">And everything else.</span>
          </h3>
          <div className="flex flex-1 flex-col justify-end gap-6">
            <p className="text-xl font-medium text-white">
              {whip.name}
            </p>
            <dl className="flex flex-col gap-5">
              {whip.rows.map((row) => (
                <div key={row.label}>
                  <dd className="text-2xl font-semibold text-white">
                    {row.value}
                    {row.unit && (
                      <span className="pl-1 text-base font-normal text-black/50">
                        {row.unit}
                      </span>
                    )}
                  </dd>
                  <dt className="font-mono text-xs tracking-wide text-black/50 uppercase">
                    {row.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
      <p className="mt-4 font-mono text-xs text-faint">
        The others — all solid tools, just desktop-only:{" "}
        {links.map((link, i) => (
          <span key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-faint/40 underline-offset-2 hover:text-muted"
            >
              {link.label}
            </a>
            {i < links.length - 1 ? " · " : ""}
          </span>
        ))}
      </p>
    </div>
  );
}
