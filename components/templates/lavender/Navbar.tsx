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
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
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
      <header
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 shadow-[0_8px_25px_rgba(51,65,92,0.1)] backdrop-blur-xl"
            : "bg-white/40 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-4 px-6 py-3 lg:px-8">

          <a
            href="#"
            className={`${scriptFont.className} flex shrink-0 items-center gap-1.5 text-2xl text-[#33415C]`}
          >
            {data.name}
            <Heart size={14} className="fill-[#8FAEE0] text-[#8FAEE0]" />
          </a>

          <nav
            className="hidden min-w-0 flex-1 items-center gap-5 overflow-x-auto whitespace-nowrap px-1 [&::-webkit-scrollbar]:hidden xl:flex"
            style={{ scrollbarWidth: "none" }}
          >

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="shrink-0 text-xs font-medium uppercase tracking-wide text-[#5A6B8C] transition hover:text-[#33415C]"
              >
                {link.name}
              </a>
            ))}

          </nav>

          <a
            href="#contact"
            className="hidden shrink-0 items-center gap-2 rounded-full bg-[#7A97D1] px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:scale-105 hover:bg-[#5A73A8] xl:flex"
          >
            Say hello
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="ml-auto text-[#33415C] xl:hidden"
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
            className="fixed inset-0 z-40 overflow-y-auto bg-gradient-to-b from-[#DCE6F8] to-[#AEC3E8] xl:hidden"
          >

            <Sparkle className="absolute left-10 top-24 h-5 w-5 opacity-70" />
            <Sparkle className="absolute right-12 bottom-28 h-6 w-6 opacity-70" />

            <div className="flex min-h-full flex-col items-center justify-center gap-7 py-24">

              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`${scriptFont.className} text-3xl text-[#33415C]`}
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
