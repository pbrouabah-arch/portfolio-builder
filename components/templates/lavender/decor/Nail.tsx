interface NailProps {
  className?: string;
  rotate?: number;
}

/**
 * Small decorative wall nail used to make cards/photos feel physically
 * mounted on the stone wall rather than floating above it.
 */
export default function Nail({ className = "", rotate = 0 }: NailProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 54"
      className={className}
      style={{ transform: `translateX(-50%) rotate(${rotate}deg)` }}
      fill="none"
    >
      <defs>
        <linearGradient id="nail-metal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F8F5EF" />
          <stop offset="30%" stopColor="#CFC8BD" />
          <stop offset="60%" stopColor="#7F776D" />
          <stop offset="100%" stopColor="#4A443E" />
        </linearGradient>
        <filter id="nail-shadow" x="-80%" y="-80%" width="260%" height="300%">
          <feDropShadow
            dx="1"
            dy="3"
            stdDeviation="2"
            floodColor="#160D1B"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      {/* tiny wall hole / contact shadow */}
      <ellipse
        cx="22"
        cy="9"
        rx="8"
        ry="4.5"
        fill="#170D1C"
        fillOpacity="0.42"
      />

      {/* nail shaft */}
      <path
        d="M22 10 C22 17 22 23 22 32"
        stroke="url(#nail-metal)"
        strokeWidth="3.2"
        strokeLinecap="round"
        filter="url(#nail-shadow)"
      />

      {/* nail head */}
      <ellipse
        cx="22"
        cy="8"
        rx="8.5"
        ry="5.5"
        fill="url(#nail-metal)"
        filter="url(#nail-shadow)"
      />

      <ellipse
        cx="19.5"
        cy="6.5"
        rx="2.4"
        ry="1.4"
        fill="#FFFFFF"
        fillOpacity="0.7"
      />
    </svg>
  );
}
