const BARS = [0.4, 0.7, 1, 0.55, 0.85, 0.35, 0.95, 0.6, 0.8, 0.45, 0.9, 0.5];

export function Waveform() {
  return (
    <div
      className="flex h-24 items-center justify-center gap-1.5"
      aria-hidden="true"
    >
      {BARS.map((scale, i) => (
        <div
          key={i}
          className="animate-wave w-1 rounded-full bg-accent"
          style={{
            height: `${scale * 100}%`,
            animationDelay: `${i * 0.09}s`,
          }}
        />
      ))}
    </div>
  );
}
