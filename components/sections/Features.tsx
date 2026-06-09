const features = [
  {
    title: "Fast",
    description: "Built on a modern stack for instant loads and smooth interactions.",
  },
  {
    title: "Focused",
    description: "Every product solves a real problem, with nothing in the way.",
  },
  {
    title: "Crafted",
    description: "Designed and engineered with attention to the details that matter.",
  },
];

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        What we&apos;re about
      </h2>
      <div className="mt-14 grid gap-6 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-black/5 p-8 transition-colors hover:bg-foreground/[0.02] dark:border-white/10"
          >
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="mt-3 text-foreground/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
