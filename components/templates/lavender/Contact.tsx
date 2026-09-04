"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Mail,
  Send,
  MessageCircle,
  Link2,
} from "lucide-react";

import Butterfly from "./decor/Butterfly";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface ContactProps {
  data: any;
}

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

/**
 * The dashboard stores the platform ids from its own preset list
 * (e.g. "github", "linkedin") in lowercase, but lets users add fully
 * custom platform names too. This turns the raw stored value into
 * something readable without inventing or renaming the underlying
 * `platform` field itself.
 */
function platformLabel(platform: string) {
  const key = (platform || "").toLowerCase().trim();

  if (KNOWN_PLATFORM_LABELS[key]) {
    return KNOWN_PLATFORM_LABELS[key];
  }

  if (!platform) return "Link";

  return platform
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Contact({
  data,
}: ContactProps) {
  const links = data.social ?? [];
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".contact-tag", {
        opacity: 0,
        y: -24,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      });
    },
    { scope: container }
  );

  return (
    <section
      id="contact"
      ref={container}
      className="relative overflow-hidden bg-gradient-to-b from-[#E4ECF9] via-[#D6E1F4] to-[#C3D4F0] py-28 px-6 text-[#33415C] lg:px-8"
    >
      <Butterfly className="pointer-events-none absolute left-[10%] top-16 h-10 w-12 opacity-80" />
      <Butterfly className="pointer-events-none absolute right-[14%] bottom-20 h-8 w-10 rotate-12 opacity-70" />
      <Sparkle className="pointer-events-none absolute right-[30%] top-10 h-5 w-5 opacity-70" />

      <div className="relative mx-auto max-w-4xl text-center">

        <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>
          romanticize your inbox
        </span>

        <h2 className={`${serifFont.className} mt-1 text-4xl font-semibold italic lg:text-5xl`}>
          Let's Work Together
        </h2>

        <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#5A6B8C]">
          Interested in working together or have a project in mind?
          Feel free to reach out on any of these.
        </p>

        {links.length === 0 ? (

          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-[#B7CBEE] bg-white/70 p-12">
            <p className="text-[#7C8FAE]">
              No contact links available.
            </p>
          </div>

        ) : (

          <div className="mt-16 flex flex-wrap items-center justify-center gap-6">

            {links.map((link: any, index: number) => {
              const Icon = platformIcon(link.platform);
              const rotate = index % 3 === 0 ? -4 : index % 3 === 1 ? 3 : -2;

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-tag group relative flex flex-col items-center"
                >
                  <span
                    className="relative flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-7 shadow-[0_16px_32px_rgba(51,65,92,0.12)] transition-transform duration-300 group-hover:-translate-y-2"
                    style={{ transform: `rotate(${rotate}deg)` }}
                  >
                    <Icon size={24} className="text-[#7A97D1]" />

                    <span className={`${scriptFont.className} text-2xl text-[#33415C]`}>
                      {platformLabel(link.platform)}
                    </span>
                  </span>
                </a>
              );
            })}

          </div>

        )}

      </div>
    </section>
  );
}
