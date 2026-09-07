interface TapeProps {
  className?: string;
  rotate?: number;
  tone?: "tape" | "blush";
}

/**
 * A washi-tape strip with a soft diagonal stripe pattern, used to
 * "stick" cards and photos to the page. Purely decorative — aria-hidden
 * so it never reaches assistive tech.
 */
export default function Tape({
  className = "",
  rotate = -4,
  tone = "tape",
}: TapeProps) {
  const base = tone === "blush" ? "#E3C9E8" : "#EADFF0";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-7 w-20 shadow-[0_2px_5px_rgba(46,58,85,0.18)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(4% 0, 96% 0, 100% 100%, 0% 100%)",
        backgroundColor: `${base}CC`,
        backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.55) 0px, rgba(255,255,255,0.55) 3px, transparent 3px, transparent 9px)`,
      }}
    />
  );
}
