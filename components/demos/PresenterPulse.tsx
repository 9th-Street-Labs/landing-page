const KEYS = ["◀", "▶", "F5", "⏯", "−", "+"];

export function PresenterPulse() {
  return (
    <div
      className="flex h-24 items-center justify-center gap-2"
      aria-hidden="true"
    >
      {KEYS.map((key, i) => (
        <span
          key={key}
          className="flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs"
          style={{
            animation: `key-pulse 3.6s ease-in-out ${i * 0.6}s infinite`,
            backgroundColor: "var(--fill)",
            color: "var(--muted)",
          }}
        >
          {key}
        </span>
      ))}
    </div>
  );
}
