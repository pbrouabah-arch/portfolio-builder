import { ReactNode } from "react";
import Nail from "./Nail";

interface WallMountProps {
  children: ReactNode;
  className?: string;
  rotate?: number;
  tone?: "paper" | "dark";
  nailPosition?: "center" | "corners";
}

export default function WallMount({
  children,
  className = "",
  rotate = 0,
  tone = "paper",
  nailPosition = "center",
}: WallMountProps) {
  const surface =
    tone === "dark"
      ? "bg-[#211625]/90 text-[#FFF9F1] border-white/10"
      : "bg-[#F7F0E5]/98 text-[#4E2858] border-[#FFFDF8]/90";

  return (
    <div className="relative pt-7">
      {nailPosition === "center" ? (
        <>
          <span className="absolute left-1/2 top-0 z-20 h-7 w-px -translate-x-1/2 bg-gradient-to-b from-[#4C443D] to-[#A8A096]" />
          <Nail className="absolute left-1/2 top-0 z-30 h-10 w-9" />
        </>
      ) : (
        <>
          <Nail className="absolute left-10 top-0 z-30 h-9 w-8" rotate={-5} />
          <Nail className="absolute right-10 top-0 z-30 h-9 w-8" rotate={5} />
        </>
      )}

      <div
        className={`relative overflow-visible border shadow-[0_30px_65px_rgba(15,8,20,0.40)] transition-transform duration-500 hover:rotate-0 ${surface} ${className}`}
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.28),transparent_35%,rgba(60,30,60,.05))]" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}
