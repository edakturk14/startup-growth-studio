export function Arrow({
  diagonal = false,
  className = "",
}: {
  diagonal?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        vectorEffect="non-scaling-stroke"
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
      />
    </svg>
  );
}
export function PlaybackIcon({ paused }: { paused: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      {paused ? (
        <path d="m5 3 8 5-8 5z" />
      ) : (
        <>
          <rect x="4" y="3" width="2.5" height="10" rx=".5" />
          <rect x="9.5" y="3" width="2.5" height="10" rx=".5" />
        </>
      )}
    </svg>
  );
}
