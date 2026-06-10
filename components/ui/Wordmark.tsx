// Brand wordmark: "Whip" carries the accent, per the brand guide.
export function Wordmark({
  variant = "full",
  className = "text-lg",
}: {
  variant?: "full" | "short";
  className?: string;
}) {
  void variant; // both variants render the product brand
  return (
    <span className={`whitespace-nowrap font-semibold tracking-tight ${className}`}>
      <span className="text-foreground">9st</span>
      <span className="text-accent"> Whip</span>
    </span>
  );
}
