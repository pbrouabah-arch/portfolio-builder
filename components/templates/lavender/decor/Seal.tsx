interface SealProps {
  className?: string;
  rotate?: number;
}

/**
 * A soft, embossed circular seal — echoing the wax-stamp motif
 * between the photo and notes on the reference mood board.
 * Decorative only.
 */
export default function Seal({ className = "", rotate = -6 }: SealProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <circle cx="50" cy="50" r="46" fill="#EADFF0" opacity="0.9" />
      <circle cx="50" cy="50" r="46" fill="none" stroke="#D9B8E0" strokeWidth="1.5" />
      <circle cx="50" cy="50" r="37" fill="none" stroke="#D9B8E0" strokeWidth="1" strokeDasharray="2 4" />
      <g fill="none" stroke="#B98FC7" strokeWidth="1.4" strokeLinecap="round">
        <path d="M50 30 C 44 38, 44 46, 50 52 C 56 46, 56 38, 50 30 Z" />
        <path d="M50 52 C 42 52, 36 56, 33 62" />
        <path d="M50 52 C 58 52, 64 56, 67 62" />
        <path d="M50 52 L50 70" />
      </g>
    </svg>
  );
}
