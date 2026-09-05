"use client";

import { useState } from "react";
import { X, ExternalLink } from "lucide-react";
import { scriptFont, serifFont } from "./fonts";
import Tape from "./decor/Tape";
interface CertificatesProps { data: any; }

export default function Certificates({ data }: CertificatesProps) {
  const certificates = data.certificates ?? [];
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <section id="certificates" className="bg-[#EDE2CE] px-8 py-32">
      <div className="mx-auto max-w-7xl">
        <span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>proof of the work</span>
        <h2 className={`${serifFont.className} mt-2 text-5xl font-semibold text-[#46392E]`}>Certificates</h2>
        <p className="mt-5 max-w-3xl text-[#8B7B68]">Certifications and professional achievements earned throughout my learning journey.</p>

        {certificates.length === 0 ? (
          <div className="mt-16 rounded-sm border border-dashed border-[#DCCBA8] bg-[#FFFDF8] p-12 text-center">
            <h3 className="text-2xl font-bold text-[#46392E]">No Certificates Yet</h3>
            <p className="mt-4 text-[#8B7B68]">Certificates will appear here after adding them from the dashboard.</p>
          </div>
        ) : (
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate: any) => (
              <button key={certificate.id} type="button" onClick={() => setSelected(certificate)} className="group overflow-hidden rounded-sm border border-[#DCCBA8] bg-[#FFFDF8] text-left shadow-[0_14px_30px_rgba(70,57,46,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(70,57,46,0.14)]">
                {certificate.image_url ? (
                  <img src={certificate.image_url} alt={certificate.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                ) : (
                  <div className="flex h-56 items-center justify-center bg-[#EDE2CE]">
                    <span className={`${scriptFont.className} -rotate-12 rounded-full border-2 border-[#7C8264]/60 px-6 py-3 text-2xl text-[#7C8264]`}>earned it</span>
                  </div>
                )}
                <div className="p-7">
                  <h3 className="text-2xl font-bold text-[#46392E]">{certificate.title}</h3>
                  <p className="mt-3 text-[#8B7B68]">{certificate.organization}</p>
                  {certificate.issue_date && <p className={`${scriptFont.className} mt-2 text-xl text-[#7C8264]`}>issued {certificate.issue_date}</p>}
                  <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-[#7C8264]">Click to view</p>
                </div>
              </button>
              
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#362C23]/70 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
          <div className="relative my-8 w-full max-w-6xl overflow-hidden rounded-2xl border border-[#DCCBA8] bg-[#FFFDF8] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Close certificate" onClick={() => setSelected(null)} className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#DCCBA8] bg-[#FFFDF8]/95 text-[#46392E] shadow-md transition hover:bg-[#EDE2CE]"><X size={22} /></button>
            <div className="grid lg:grid-cols-[1.4fr_0.8fr]">
              <div className="flex min-h-[320px] items-center justify-center bg-[#EDE2CE] p-5 sm:p-8">
                {selected.image_url ? <img src={selected.image_url} alt={selected.title} className="max-h-[75vh] w-full object-contain" /> : <div className="p-16 text-center"><span className={`${scriptFont.className} text-5xl text-[#7C8264]`}>earned it</span></div>}
              </div>
              <div className="p-8 sm:p-10">
                <span className={`${scriptFont.className} text-2xl text-[#7C8264]`}>certificate</span>
                <h3 className={`${serifFont.className} mt-2 text-4xl font-semibold text-[#46392E]`}>{selected.title}</h3>
                {selected.organization && <p className="mt-6 text-lg text-[#8B7B68]">{selected.organization}</p>}
                {selected.issue_date && <p className="mt-2 text-sm uppercase tracking-wider text-[#7C8264]">Issued {selected.issue_date}</p>}
                {selected.description && <p className="mt-7 leading-8 text-[#5E5142]">{selected.description}</p>}
                {selected.credential_url && <a href={selected.credential_url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#7C8264] px-6 py-3 font-semibold text-[#FFFDF8] transition hover:bg-[#6B7256]">View Credential <ExternalLink size={17} /></a>}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
