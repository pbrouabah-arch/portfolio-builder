"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            ? "border-b border-[#DCCBA8] bg-[#F6F0E4]/90 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-none items-center justify-between px-6 lg:px-8">

          <a
            href="#"
            className={`${scriptFont.className} text-3xl text-[#46392E]`}
          >
            {data.name}
          </a>

          <nav className="hidden items-center gap-6 lg:flex">

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm uppercase tracking-wider text-[#8B7B68] transition hover:text-[#46392E]"
              >
                {link.name}
              </a>
            ))}

          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-[#7C8264]/40 bg-[#7C8264] px-6 py-3 text-sm font-semibold text-[#F6F0E4] transition hover:scale-105 hover:bg-[#6B7256] lg:block"
          >
            Contact
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="text-[#46392E] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>
      </header>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#F6F0E4] lg:hidden"
          >

            <div className="flex h-full flex-col items-center justify-center gap-10">

              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`${scriptFont.className} text-4xl text-[#46392E]`}
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
