import Seal from "./decor/Seal";
import Sparkle from "./decor/Sparkle";
import { scriptFont, serifFont } from "./fonts";

interface CertificatesProps {
  data: any;
}

export default function Certificates({
  data,
}: CertificatesProps) {
  const certificates = data.certificates;

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

              <div
                key={certificate.id}
                className="relative overflow-hidden rounded-2xl bg-white shadow-[0_16px_35px_rgba(51,65,92,0.1)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_48px_rgba(51,65,92,0.16)]"
                style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
              >

                {certificate.image_url ? (

                  <img
                    src={certificate.image_url}
                    alt={certificate.title}
                    className="h-48 w-full object-cover"
                  />

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

                  {certificate.credential_url && (
                    <a
                      href={certificate.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-block rounded-full bg-[#7A97D1] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-[#5A73A8]"
                    >
                      View Credential
                    </a>
                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}
