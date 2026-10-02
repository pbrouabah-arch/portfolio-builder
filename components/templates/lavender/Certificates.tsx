"use client";

import { useState } from "react";
import { X, Award, ExternalLink } from "lucide-react";
import Nail from "./decor/Nail";
import { scriptFont, serifFont } from "./fonts";

interface CertificatesProps { data: any; }

export default function Certificates({ data }: CertificatesProps) {
  const certificates = data.certificates ?? [];
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <section id="certificates" className="relative px-5 py-20 sm:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center text-[#F7F0E5]">
          <p className={`${scriptFont.className} text-3xl text-[#DDB8E5]`}>proof that made it onto the wall</p>
          <h2 className={`${serifFont.className} mt-1 text-5xl font-semibold tracking-tight`}>Certificates</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/70">
            Hover a certificate to reveal its story. Click it to view the original certificate.
          </p>
        </div>

        {certificates.length === 0 ? (
          <div className="mx-auto max-w-md border border-white/20 bg-[#F7F0E5]/95 p-10 text-center text-sm text-[#5B405F] shadow-[0_20px_45px_rgba(10,5,14,.25)]">
            No certificates added yet.
          </div>
        ) : (
          <div className="grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate: any, index: number) => {
              const description =
                certificate.description ||
                certificate.details ||
                certificate.credential_description ||
                "A certificate reflecting my commitment to learning and personal development.";

              return (
                <button
                  type="button"
                  key={certificate.id ?? index}
                  onClick={() => setSelected(certificate)}
                  aria-label={`View certificate: ${certificate.title}`}
                  className="group relative pt-6 text-left [perspective:1200px]"
                  style={{ transform: `rotate(${index % 2 ? 1.7 : -1.5}deg)` }}
                >
                  <span className="absolute left-1/2 top-0 z-30 h-7 w-px -translate-x-1/2 bg-gradient-to-b from-[#5E574F] to-[#B8B0A7]" />
                  <Nail
                    className="absolute left-1/2 top-0 z-40 h-10 w-9"
                    rotate={index % 2 ? 6 : -6}
                  />

                  <div className="relative min-h-[360px] overflow-visible">
                    <div className="absolute inset-x-0 top-0 z-10 h-full min-h-[360px] rounded-[2px] bg-[#F7F0E5]/95 shadow-[0_28px_55px_rgba(8,3,12,.42)] transition-transform duration-700 [transform-style:preserve-3d] group-hover:-translate-y-2 group-hover:rotate-0 group-hover:[transform:rotateY(180deg)]">
                      {/* FRONT */}
                      <div className="absolute inset-0 overflow-hidden border border-white/85 bg-[#F7F0E5] p-3 pb-5 [backface-visibility:hidden]">
                        {certificate.image_url ? (
                          <div className="relative h-52 overflow-hidden bg-[#E2D5DF]">
                            <img
                              src={certificate.image_url}
                              alt={certificate.title}
                              className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#24132A]/35 via-transparent to-white/10" />
                          </div>
                        ) : (
                          <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#E8DCE7] to-[#D9C6DB]">
                            <Award size={55} className="text-[#70457B]" />
                          </div>
                        )}

                        <div className="px-2 pt-5">
                          <h3 className={`${serifFont.className} text-lg font-semibold text-[#5A2D66]`}>
                            {certificate.title}
                          </h3>
                          <p className="mt-2 text-sm font-medium text-[#684B6D]">
                            {certificate.organization}
                          </p>
                          {certificate.issue_date && (
                            <p className={`${scriptFont.className} mt-2 text-xl text-[#75477F]`}>
                              {certificate.issue_date}
                            </p>
                          )}
                          <span className="mt-4 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.16em] text-[#8B6392]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8B6392]" />
                            hover to read
                          </span>
                        </div>
                      </div>

                      {/* BACK */}
                      <div className="absolute inset-0 flex flex-col justify-between overflow-hidden border border-[#C9AACA] bg-[linear-gradient(145deg,#F9F0F8,#E8D9E9)] p-7 text-[#4D2857] [backface-visibility:hidden] [transform:rotateY(180deg)]">
                        <div>
                          <div className="flex items-center justify-between gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#6E4777] text-[#F9F0F8] shadow-[0_8px_20px_rgba(68,37,76,.2)]">
                              <Award size={18} />
                            </span>
                            <span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#8B6392]">
                              Certificate {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>

                          <h3 className={`${serifFont.className} mt-8 text-2xl font-semibold leading-tight text-[#54275F]`}>
                            {certificate.title}
                          </h3>

                          {certificate.organization && (
                            <p className="mt-3 text-sm font-semibold text-[#6D4A72]">
                              {certificate.organization}
                            </p>
                          )}

                          <div className="my-6 h-px w-14 bg-[#9B70A2]" />

                          <p className="text-sm leading-7 text-[#614765]">
                            {description}
                          </p>
                        </div>

                        <div className="flex items-end justify-between gap-4 border-t border-[#CDB4D0] pt-4">
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#8B6392]">
                              {certificate.issue_date || "Portfolio record"}
                            </p>
                            <p className={`${scriptFont.className} mt-1 text-xl text-[#75477F]`}>
                              click to view
                            </p>
                          </div>
                          <ExternalLink size={17} className="text-[#70457B]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#120A15]/92 p-5 backdrop-blur-md"
          onClick={() => setSelected(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
            className="relative max-h-[92vh] max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close certificate"
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F0E5] text-[#4D2857] shadow-lg transition hover:scale-105 hover:bg-white"
            >
              <X size={20} />
            </button>

            {selected.image_url ? (
              <img
                src={selected.image_url}
                alt={selected.title}
                className="max-h-[92vh] max-w-full border-8 border-[#F7F0E5] object-contain shadow-[0_30px_80px_rgba(0,0,0,.5)]"
              />
            ) : (
              <div className="flex h-[420px] w-[420px] max-w-full items-center justify-center bg-[#F7F0E5]">
                <Award size={100} className="text-[#70457B]" />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
