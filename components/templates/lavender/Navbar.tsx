"use client";

import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { serifFont } from "./fonts";

interface NavbarProps { data: any; }

const links = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({ data }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
        <div
          className={`mx-auto flex max-w-6xl items-center gap-4 rounded-full border px-4 py-3 transition-all duration-300 ${
            scrolled
              ? "border-white/40 bg-[#F7F0E5]/94 shadow-[0_18px_45px_rgba(15,8,20,.3)] backdrop-blur-xl"
              : "border-white/20 bg-[#211625]/55 text-white backdrop-blur-md"
          }`}
        >
          <a href="#" className="flex min-w-0 items-center gap-2">
            <span className={`${serifFont.className} truncate text-lg font-semibold`}>
              {data.name}
            </span>
            <Sparkles size={14} className="shrink-0 opacity-70" />
          </a>

          <nav className="hidden min-w-0 flex-1 items-center justify-center gap-5 overflow-x-auto px-2 whitespace-nowrap lg:flex [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`shrink-0 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                  scrolled ? "text-[#5B4A59] hover:text-[#8B5C98]" : "text-white/75 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className={`hidden shrink-0 rounded-full px-5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition lg:block ${
              scrolled
                ? "bg-[#6F4B78] text-white hover:bg-[#56365F]"
                : "bg-white text-[#3B273E] hover:bg-[#F7F0E5]"
            }`}
          >
            Connect
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`ml-auto rounded-full p-2 lg:hidden ${scrolled ? "text-[#2C2130]" : "text-white"}`}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-[#1C1020]/96 px-8 backdrop-blur-xl lg:hidden"
          >
            <div className="flex w-full max-w-sm flex-col items-center gap-5">
              {links.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.035 }}
                  className={`${serifFont.className} text-2xl text-[#F8F0E5] transition hover:text-[#D8A9E1]`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
