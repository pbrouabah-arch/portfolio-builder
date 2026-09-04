"use client";

import { motion } from "framer-motion";

import PaperGrain from "./decor/PaperGrain";
import Sparkle from "./decor/Sparkle";

export default function Background() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* satin-like base wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#DCE6F8] via-[#C9D9F2] to-[#AEC3E8]" />

      {/* soft diagonal sheen, like light on fabric */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(255,255,255,0.35) 0%, transparent 30%, transparent 60%, rgba(255,255,255,0.25) 100%)",
        }}
      />

      <PaperGrain />

      <motion.div
        animate={{ x: [0, 90, 0], y: [0, -60, 0] }}
        transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/40 blur-[170px]"
      />

      <motion.div
        animate={{ x: [0, -80, 0], y: [0, 70, 0] }}
        transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        className="absolute bottom-[-180px] right-[-120px] h-[480px] w-[480px] rounded-full bg-[#6E88C0]/30 blur-[170px]"
      />

      {/* scattered twinkles */}
      <Sparkle className="absolute left-[8%] top-[18%] h-4 w-4 opacity-80" />
      <Sparkle className="absolute left-[35%] top-[8%] h-3 w-3 opacity-60" />
      <Sparkle className="absolute right-[12%] top-[30%] h-5 w-5 opacity-70" />
      <Sparkle className="absolute right-[28%] bottom-[16%] h-3 w-3 opacity-60" />
      <Sparkle className="absolute left-[18%] bottom-[10%] h-4 w-4 opacity-70" />
    </div>
  );
}
