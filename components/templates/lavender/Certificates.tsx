"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Seal from "./decor/Seal";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface CertificatesProps {
  data: any;
}

export default function Certificates({ data }: CertificatesProps) {
  const certificates = data.certificates ?? [];
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <section
      id="certificates"
      className="relative overflow-hidden bg-gradient-to-b from-[#D6E1F4] to-[#E4ECF9] py-28 px-6 lg:px-8"
    >
      <Sparkle className="pointer-events-none absolute left-[12%] top-16 h-5 w-5 opacity-70" />

      <div className="mx-auto max-w-6xl text-center">
        <span className={`${scriptFont.className} text-2xl text-[#7A97D1]`}>
          proof of the work
        </span>

        <h2 className={`${serifFont.className} mb-16 mt-1 text-4xl font-semibold italic text-[#33415C] lg:text-5xl`}>
          Certificates
        </h2>

        {certificates.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#B7CBEE] bg-white/70 p-12">
            <h3 className="text-2xl font-bold text-[#33415C]">
              No Certificates Yet
            </h3>
            <p className="mt-4 text-[#7C8FAE]">
              Certificates will appear here after adding them from the dashboard.
            </p>
          </div>
        ) : (
          <div className="grid gap-10 pt-4 text-left sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate: any, index: number) => (
              <button
                type="button"
                key={certificate.id}
                onClick={() => setSelected(certificate)}
                className="group relative overflow-hidden rounded-2xl bg-white text-left shadow-[0_16px_35px_rgba(51,65,92,0.1)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(51,65,92,0.16)]"
                style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >
                {certificate.image_url ? (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={certificate.image_url}
                      alt={certificate.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#33415C]/65 via-transparent to-transparent p-4 opacity-0 transition group-hover:opacity-100">
                      <span className={`${scriptFont.className} text-xl text-white`}>
                        view certificate
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative flex h-48 items-center justify-center bg-[#E4ECF9]">
                    <Seal className="h-20 w-20 opacity-90" rotate={-8} />
                  </div>
                )}

                <div className="p-6">
                  <h3 className={`${serifFont.className} text-lg font-bold italic text-[#33415C]`}>
                    {certificate.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#7C8FAE]">
                    {certificate.organization}
                  </p>
                  {certificate.issue_date && (
                    <p className={`${scriptFont.className} mt-2 text-xl text-[#7A97D1]`}>
                      issued {certificate.issue_date}
                    </p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#33415C]/70 p-5 backdrop-blur-sm"
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
              className="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#33415C] text-white shadow-lg transition hover:bg-[#5A73A8]"
            >
              <X size={20} />
            </button>

            {selected.image_url ? (
              <img
                src={selected.image_url}
                alt={selected.title}
                className="max-h-[92vh] max-w-full rounded-xl object-contain shadow-[0_30px_80px_rgba(51,65,92,0.35)]"
              />
            ) : (
              <div className="flex h-[420px] w-[420px] max-w-full items-center justify-center rounded-xl bg-[#F3F6FC] shadow-[0_30px_80px_rgba(51,65,92,0.35)]">
                <Seal className="h-28 w-28" rotate={-8} />
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
