export function TrackpadTrace() {
  return (
    <div
      className="relative mx-auto flex h-24 w-40 items-stretch overflow-hidden rounded-xl border border-line-strong"
      aria-hidden="true"
    >
      <div className="relative flex-1 border-r border-line">
        <svg viewBox="0 0 120 96" className="absolute inset-0 h-full w-full">
          <path
            id="trace-path"
            d="M 20 70 C 40 20, 70 20, 95 50"
            fill="none"
            className="stroke-line"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span
          className="absolute h-2.5 w-2.5 rounded-full bg-accent"
          style={{
            offsetPath: "path('M 20 70 C 40 20, 70 20, 95 50')",
            animation: "trace 2.6s ease-in-out infinite",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 flex h-5 border-t border-line">
          <div className="flex-1 border-r border-line" />
          <div className="flex-1" />
        </div>
      </div>
      <div className="flex w-4 flex-col items-center justify-center gap-1 bg-fill">
        <span className="h-0.5 w-1.5 rounded bg-fill-strong" />
        <span className="h-0.5 w-1.5 rounded bg-fill-strong" />
        <span className="h-0.5 w-1.5 rounded bg-fill-strong" />
      </div>
    </div>
  );
}
