export function Wordmark({ className = "text-xl" }: { className?: string }) {
  return (
    <span className={`font-black tracking-tight ${className}`}>
      <span className="text-accent">9</span>
      <span className="text-foreground">st</span>
    </span>
  );
}
