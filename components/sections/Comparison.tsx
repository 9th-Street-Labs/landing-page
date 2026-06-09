import { site } from "@/lib/site";

function Check({ on, accent }: { on: boolean; accent?: boolean }) {
  if (!on) return <span className="text-faint">—</span>;
  return (
    <span className={accent ? "text-accent" : "text-muted"} aria-label="yes">
      ✓
    </span>
  );
}

export function Comparison() {
  const { competitors, rows, links } = site.comparison;
  return (
    <div>
      <h3 className="text-2xl font-bold lowercase tracking-tight">
        whip vs the desktop-only KVMs
      </h3>
      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/15 text-left font-mono text-xs text-faint">
              <th className="py-3 pr-4 font-normal">feature</th>
              <th className="px-4 py-3 font-bold text-accent">whip</th>
              {competitors.map((name) => (
                <th key={name} className="px-4 py-3 font-normal">
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.feature} className="border-b border-white/[0.06]">
                <td className="py-3 pr-4 text-muted">{row.feature}</td>
                <td className="px-4 py-3">
                  <Check on={row.whip} accent />
                </td>
                {row.others.map((on, i) => (
                  <td key={i} className="px-4 py-3">
                    <Check on={on} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 font-mono text-xs text-faint">
        all solid tools — they&apos;re just desktop-only:{" "}
        {links.map((link, i) => (
          <span key={link.label}>
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-white/20 underline-offset-2 hover:text-muted"
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
