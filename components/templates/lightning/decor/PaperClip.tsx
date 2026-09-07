interface PaperClipProps {
  className?: string;
  rotate?: number;
}

/**
 * A wrought-iron hook, used to "hang" photo frames and note cards on
 * the page — the gothic counterpart of the paperclip motif. Decorative
 * only.
 */
export default function PaperClip({ className = "", rotate = -8 }: PaperClipProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 70"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, filter: "drop-shadow(0 0 6px rgba(143,211,255,0.6))" }}
      fill="none"
      stroke="#BFE8FF"
      strokeWidth="3.2"
      strokeLinecap="round"
    >
      <path d="M12 14 V50 a8 8 0 0 0 16 0 V10 a12 12 0 0 0-24 0 V54 a16 16 0 0 0 32 0 V18" />
    </svg>
  );
}
