// Brand wordmark. "9" and "st" carry the accent, per the brand guide.
export function Wordmark({
  variant = "full",
  className = "text-lg",
}: {
  variant?: "full" | "short";
  className?: string;
}) {
  if (variant === "short") {
    return (
      <span className={`font-black lowercase tracking-tight ${className}`}>
        <span className="text-accent">9</span>
        <span className="text-foreground">st.ai</span>
      </span>
    );
  }
  return (
    <span
      className={`whitespace-nowrap font-black lowercase tracking-tight ${className}`}
    >
      <span className="text-accent">9</span>
      <span className="text-foreground">th </span>
      <span className="text-accent">st</span>
      <span className="text-foreground">reet labs</span>
    </span>
  );
}
