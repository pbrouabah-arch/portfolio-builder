interface TapeProps {
  className?: string;
  rotate?: number;
  tone?: "tape" | "blush";
}

/**
 * A small washi-tape strip used to "stick" cards and photos to the page.
 * Purely decorative — aria-hidden so it never reaches assistive tech.
 */
export default function Tape({
  className = "",
  rotate = -4,
  tone = "tape",
}: TapeProps) {
  const bg = tone === "blush" ? "bg-[#D9B9A6]/80" : "bg-[#E4D3B0]/85";

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-16 ${bg} shadow-[0_2px_4px_rgba(70,57,46,0.15)] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath: "polygon(3% 0, 97% 0, 100% 100%, 0% 100%)",
      }}
    />
  );
}
