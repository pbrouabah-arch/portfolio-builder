"use client";

import { useEffect, useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import Sparkle from "./decor/Sparkle";
import { scriptFont } from "./fonts";

interface NavbarProps {
  data: any;
}

const links = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar({
  data,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full px-4 pt-4 lg:px-8">
        <div
          className={`mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full px-6 transition-all duration-300 ${
            scrolled
              ? "bg-white/70 shadow-[0_8px_30px_rgba(51,65,92,0.15)] backdrop-blur-xl"
              : "bg-white/40 backdrop-blur-md"
          } border border-white/70`}
        >

          <a
            href="#"
            className={`${scriptFont.className} flex items-center gap-1.5 text-2xl text-[#33415C]`}
          >
            {data.name}
            <Heart size={14} className="fill-[#8FAEE0] text-[#8FAEE0]" />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium uppercase tracking-[0.15em] text-[#5A6B8C] transition hover:text-[#33415C]"
              >
                {link.name}
              </a>
            ))}

          </nav>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-[#7A97D1] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:scale-105 hover:bg-[#5A73A8] lg:flex"
          >
            Say hello
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="text-[#33415C] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-[#DCE6F8] to-[#AEC3E8] lg:hidden"
          >

            <Sparkle className="absolute left-10 top-24 h-5 w-5 opacity-70" />
            <Sparkle className="absolute right-12 bottom-28 h-6 w-6 opacity-70" />

            <div className="flex h-full flex-col items-center justify-center gap-8">

              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`${scriptFont.className} text-4xl text-[#33415C]`}
                >
                  {link.name}
                </a>
              ))}

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}
