/* eslint-disable @next/next/no-img-element */

// Avatar with graceful fallback to a brand-tinted initial. Plain <img> (not
// next/image) keeps it trivial for arbitrary remote avatar URLs.
export function Avatar({
  name,
  url,
  size = 40,
}: {
  name: string;
  url: string | null;
  size?: number;
}) {
  const initial = (name?.trim()?.[0] ?? "?").toUpperCase();

  if (url) {
    return (
      <img
        src={url}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover ring-1 ring-line"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <span
      className="flex items-center justify-center rounded-full bg-accent/15 font-semibold text-accent ring-1 ring-accent/30"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden
    >
      {initial}
    </span>
  );
}
