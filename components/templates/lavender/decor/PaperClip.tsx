interface PaperClipProps {
  className?: string;
  rotate?: number;
}

/**
 * A realistic metal paperclip, used to "attach" polaroid photos and
 * note cards to the page — echoing the reference mood board.
 * Decorative only.
 */
export default function PaperClip({ className = "", rotate = -8 }: PaperClipProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 88"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
    >
      <defs>
        <linearGradient id="paperclip-metal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F8F0FA" />
          <stop offset="35%" stopColor="#E0C3E8" />
          <stop offset="60%" stopColor="#B98FC7" />
          <stop offset="100%" stopColor="#6E3F7C" />
        </linearGradient>
        <filter id="paperclip-shadow" x="-40%" y="-20%" width="180%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="2.5" floodColor="#3A2740" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* dark contact shadow, as if resting on paper */}
      <path
        d="M13 10 V60 a9 9 0 0 0 18 0 V16 a13 13 0 0 0-26 0 V66 a17 17 0 0 0 34 0 V22"
        stroke="#3A2740"
        strokeOpacity="0.25"
        strokeWidth="6.5"
        strokeLinecap="round"
        transform="translate(1.5, 2)"
      />

      {/* main wire body, with a metallic gradient for realism */}
      <path
        d="M13 10 V60 a9 9 0 0 0 18 0 V16 a13 13 0 0 0-26 0 V66 a17 17 0 0 0 34 0 V22"
        stroke="url(#paperclip-metal)"
        strokeWidth="5"
        strokeLinecap="round"
        filter="url(#paperclip-shadow)"
      />

      {/* thin bright highlight down one edge, to sell the round wire */}
      <path
        d="M11.4 12 V60 a9 9 0 0 0 15 6.2"
        stroke="#FFFFFF"
        strokeOpacity="0.75"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}
