interface ButterflyProps {
  className?: string;
}

/**
 * A soft, glowing butterfly — echoing the recurring butterfly motif
 * from the reference mood board. Purely decorative.
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
          <stop offset="0%" stopColor="#F6ECF8" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#B98FC7" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      <path
        d="M32 28 C 22 6, 4 4, 3 16 C 2 27, 18 30, 32 28 Z"
        fill="url(#wing-glow)"
        stroke="#9B6FB0"
        strokeWidth="1"
      />
      <path
        d="M32 28 C 42 6, 60 4, 61 16 C 62 27, 46 30, 32 28 Z"
        fill="url(#wing-glow)"
        stroke="#9B6FB0"
        strokeWidth="1"
      />
      <path
        d="M32 28 C 24 40, 10 44, 11 50 C 12 55, 24 51, 32 30 Z"
        fill="url(#wing-glow)"
        stroke="#9B6FB0"
        strokeWidth="1"
        opacity="0.9"
      />
      <path
        d="M32 28 C 40 40, 54 44, 53 50 C 52 55, 40 51, 32 30 Z"
        fill="url(#wing-glow)"
        stroke="#9B6FB0"
        strokeWidth="1"
        opacity="0.9"
      />
      <path
        d="M32 12 L32 40"
        stroke="#7A4F87"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M32 13 C 29 9, 26 8, 24 6"
        stroke="#7A4F87"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path
        d="M32 13 C 35 9, 38 8, 40 6"
        stroke="#7A4F87"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
