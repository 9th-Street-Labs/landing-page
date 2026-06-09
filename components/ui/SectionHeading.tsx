export function SectionHeading({
  number,
  name,
  headline,
  id,
}: {
  number: string;
  name: string;
  headline: string;
  id?: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-mono text-sm text-faint">
        <span className="text-accent">{number}</span> / {name}
      </p>
      <h2
        id={id}
        className="max-w-3xl text-4xl font-extrabold lowercase tracking-tight sm:text-6xl"
      >
        {headline}
      </h2>
    </div>
  );
}
