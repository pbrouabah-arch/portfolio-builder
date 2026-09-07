interface ButterflyProps {
  className?: string;
}

/**
 * A soft, glowing bat silhouette — the gothic counterpart to the
 * winged motif from the reference mood board. Purely decorative.
 */
export default function Butterfly({ className = "" }: ButterflyProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 64 56"
      className={className}
      fill="none"
    >
      <defs>
        <radialGradient id="wing-glow" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#EAF6FF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#4FA8E0" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      <path
        d="M32 24 C 24 8, 6 6, 2 18 C 8 20, 14 20, 18 24 C 12 26, 6 30, 4 38 C 12 38, 20 34, 26 28 C 28 30, 30 30, 32 30 Z"
        fill="url(#wing-glow)"
        stroke="#8FD3FF"
        strokeWidth="1"
      />
      <path
        d="M32 24 C 40 8, 58 6, 62 18 C 56 20, 50 20, 46 24 C 52 26, 58 30, 60 38 C 52 38, 44 34, 38 28 C 36 30, 34 30, 32 30 Z"
        fill="url(#wing-glow)"
        stroke="#8FD3FF"
        strokeWidth="1"
      />
      <path
        d="M32 20 C 30 26, 30 32, 32 36 C 34 32, 34 26, 32 20 Z"
        fill="#0B0F1A"
        stroke="#8FD3FF"
        strokeWidth="1"
      />
      <circle cx="30" cy="21" r="1.1" fill="#EAF6FF" />
      <circle cx="34" cy="21" r="1.1" fill="#EAF6FF" />
    </svg>
  );
}
