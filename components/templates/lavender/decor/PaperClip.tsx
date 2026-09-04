interface PaperClipProps {
  className?: string;
  rotate?: number;
}

/**
 * A metallic paperclip, used to "attach" polaroid photos and note
 * cards to the page — echoing the reference mood board. Decorative only.
 */
export default function PaperClip({ className = "", rotate = -8 }: PaperClipProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 70"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="#9FB4D8"
      strokeWidth="3.2"
      strokeLinecap="round"
    >
      <path d="M12 14 V50 a8 8 0 0 0 16 0 V10 a12 12 0 0 0-24 0 V54 a16 16 0 0 0 32 0 V18" />
    </svg>
  );
}
