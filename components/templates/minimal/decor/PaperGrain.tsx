/**
 * A very subtle paper-grain overlay so flat colour fields read as
 * paper rather than a flat digital fill. Kept at low opacity so it
 * never affects text contrast.
 */
export default function PaperGrain() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.035]"
    >
      <filter id="paper-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-grain)" />
    </svg>
  );
}
