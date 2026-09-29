"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Mail, Send, MessageCircle, Link2, ArrowUpRight } from "lucide-react";
import WallMount from "./decor/WallMount";
import { scriptFont, serifFont } from "./fonts";

interface ContactProps { data: any; }

function platformIcon(platform: string) {
  const key = (platform || "").toLowerCase();
  if (key.includes("telegram")) return Send;
  if (key.includes("whatsapp")) return MessageCircle;
  if (key.includes("mail") || key.includes("email")) return Mail;
  return Link2;
}

const KNOWN_PLATFORM_LABELS: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  twitter: "X / Twitter",
};

function platformLabel(platform: string) {
  const key = (platform || "").toLowerCase().trim();
  if (KNOWN_PLATFORM_LABELS[key]) return KNOWN_PLATFORM_LABELS[key];
  if (!platform) return "Link";
  return platform.split(" ").filter(Boolean).map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}

export default function Contact({ data }: ContactProps) {
  const links = data.social ?? [];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".contact-link", { opacity: 0, y: 18, stagger: 0.08, duration: 0.65, ease: "power3.out" });
  }, { scope: container });

  return (
    <section id="contact" ref={container} className="relative px-5 py-20 pb-28 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-5xl">
        <WallMount rotate={0.35} nailPosition="corners" className="p-7 sm:p-12 lg:p-16">
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
            <div>
              <p className={`${scriptFont.className} text-3xl text-[#835B8D]`}>leave a note</p>
              <h2 className={`${serifFont.className} mt-2 text-4xl font-semibold leading-tight sm:text-5xl`}>Let&apos;s Work Together</h2>
              <p className="mt-6 text-sm leading-7 text-[#786978]">Interested in a project, collaboration, or simply want to say hello? Pick a door below.</p>
              <div className="mt-7 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#8A7885]"><span className="h-2 w-2 rounded-full bg-[#835B8D]" /> open to conversations</div>
            </div>
            {links.length === 0 ? (
              <div className="border border-dashed border-[#CDB7CA] p-10 text-center text-sm text-[#786978]">No contact links available.</div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {links.map((link: any) => {
                  const Icon = platformIcon(link.platform);
                  return (
                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="contact-link group flex items-center justify-between border border-[#DCCBD7] bg-white/45 px-5 py-4 transition hover:-translate-y-1 hover:border-[#A67BAE] hover:bg-white/75">
                      <span className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2D2030] text-[#F7F0E5]"><Icon size={16} /></span><span className="text-sm font-semibold text-[#433445]">{platformLabel(link.platform)}</span></span>
                      <ArrowUpRight size={16} className="text-[#835B8D] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </WallMount>
        <p className="mt-8 text-center text-[9px] font-bold uppercase tracking-[0.25em] text-white/45">end of the wall · thanks for staying awhile</p>
      </div>
    </section>
  );
}
