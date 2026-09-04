interface SprigProps {
  className?: string;
}

/**
 * A small dried-flower sprig, echoing the baby's-breath doodles
 * used throughout the reference mood board. Purely decorative.
 */
export default function Sprig({ className = "" }: SprigProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 60 96"
      className={className}
      fill="none"
      stroke="#8B7B68"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M30 96 C 27 66, 34 46, 22 8" />
      <path d="M30 60 C 24 54, 16 52, 10 46" />
      <path d="M30 40 C 36 34, 42 32, 48 26" />
      <circle cx="22" cy="8" r="2.6" fill="#EDE2CE" />
      <circle cx="14" cy="16" r="2" fill="#EDE2CE" />
      <circle cx="30" cy="18" r="2" fill="#EDE2CE" />
      <circle cx="10" cy="46" r="1.8" fill="#EDE2CE" />
      <circle cx="48" cy="26" r="1.8" fill="#EDE2CE" />
      <circle cx="26" cy="30" r="2" fill="#EDE2CE" />
    </svg>
  );
}
