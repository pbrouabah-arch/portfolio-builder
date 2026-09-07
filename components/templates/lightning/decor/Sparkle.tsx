interface SparkleProps {
  className?: string;
}

/**
 * A small four-point electric spark, scattered across the page for a
 * charged, crackling accent. Decorative only.
 */
export default function Sparkle({ className = "" }: SparkleProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
    >
      <path
        d="M12 0 C12.5 6.5 13.5 8.5 12 12 C13.5 15.5 12.5 17.5 12 24 C11.5 17.5 10.5 15.5 12 12 C10.5 8.5 11.5 6.5 12 0 Z"
        fill="#EAF6FF"
      />
      <path
        d="M0 12 C6.5 11.5 8.5 10.5 12 12 C15.5 10.5 17.5 11.5 24 12 C17.5 12.5 15.5 13.5 12 12 C8.5 13.5 6.5 12.5 0 12 Z"
        fill="#EAF6FF"
      />
    </svg>
  );
}
