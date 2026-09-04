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

import Tape from "./decor/Tape";
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
      className="relative overflow-hidden bg-[#F6F0E4] py-32 px-8 text-[#46392E]"
    >
      <div className="relative mx-auto max-w-4xl text-center">

        <span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>
          keep in touch
        </span>

        <h2 className={`${serifFont.className} mt-2 text-5xl font-semibold`}>
          Let's Work Together
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-[#8B7B68]">
          Interested in working together or have a project in mind?
          Feel free to reach out on any of these.
        </p>

        {links.length === 0 ? (

          <div className="mt-16 rounded-sm border border-dashed border-[#DCCBA8] bg-[#FFFDF8] p-12">
            <p className="text-[#8B7B68]">
              No contact links available.
            </p>
          </div>

        ) : (

          <div className="relative mt-24">

            {/* the twine the tags hang from */}
            <div className="absolute left-0 right-0 top-0 border-t-2 border-dashed border-[#8B7B68]/40" />

            <div className="flex flex-wrap items-start justify-center gap-x-10 gap-y-16 pt-10">

              {links.map((link: any, index: number) => {
                const Icon = platformIcon(link.platform);
                const rotate = index % 3 === 0 ? -5 : index % 3 === 1 ? 4 : -2;

                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-tag group relative -mt-10 flex flex-col items-center"
                  >
                    {/* string from twine to tag */}
                    <span className="h-8 w-px bg-[#8B7B68]/40" />

                    <span
                      className="relative flex flex-col items-center gap-3 border border-[#DCCBA8] bg-[#FFFDF8] px-7 py-6 shadow-[0_14px_28px_rgba(70,57,46,0.12)] transition-transform duration-300 group-hover:-translate-y-2"
                      style={{ transform: `rotate(${rotate}deg)` }}
                    >
                      <Tape
                        className="left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"
                        rotate={rotate < 0 ? 8 : -8}
                      />

                      <Icon size={26} className="text-[#5F6650]" />

                      <span className={`${scriptFont.className} text-2xl text-[#46392E]`}>
                        {platformLabel(link.platform)}
                      </span>
                    </span>
                  </a>
                );
              })}

            </div>

          </div>

        )}

      </div>
    </section>
  );
}
