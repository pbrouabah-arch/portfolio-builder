interface TapeProps {
  className?: string;
  rotate?: number;
  tone?: "tape" | "blush";
}

/**
 * A crackling lightning-glass strip, used to "seal" cards and photo
 * frames to the page — echoing the electric border motif from the
 * reference mood board. Purely decorative — aria-hidden so it never
 * reaches assistive tech.
 */
export default function Tape({
  className = "",
  rotate = -4,
  tone = "tape",
}: TapeProps) {
  const base = tone === "blush" ? "#BFE8FF" : "#8FD3FF";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-7 w-20 shadow-[0_0_14px_rgba(143,211,255,0.55)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0% 100%)",
        backgroundColor: `${base}33`,
        border: `1px solid ${base}CC`,
        backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.25) 0px, rgba(255,255,255,0.25) 3px, transparent 3px, transparent 9px)`,
      }}
    />
  );
}
