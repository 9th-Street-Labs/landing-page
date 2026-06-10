import { SplitReveal } from "@/components/ui/SplitReveal";
import { Highlight } from "@/components/ui/Highlight";

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
      <SplitReveal
        as="h2"
        id={id}
        className="max-w-3xl text-4xl font-medium tracking-tight sm:text-6xl"
      >
        <Highlight>{headline}</Highlight>
      </SplitReveal>
    </div>
  );
}
