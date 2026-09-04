"use client";

import { useEffect, useState } from "react";
import CertificateForm from "@/components/certificates/CertificateForm";
import {
  Certificate,
  getCertificates,
  saveCertificate,
  deleteCertificate,
} from "@/lib/certificates";

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(
    certificate: Partial<Certificate>
  ) {
    try {
      await saveCertificate(certificate);

      await loadCertificates();

      setSelectedCertificate(null);
      setShowForm(false);
    } catch (error: any) {
      console.error(error);
      alert(error?.message || JSON.stringify(error));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this certificate?"))
      return;

    try {
      await deleteCertificate(id);

      await loadCertificates();
    } catch (error: any) {
      console.error(error);
      alert(error?.message || JSON.stringify(error));
    }
  }

  return (
    <main className="space-y-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-bold text-[#2F3A25]">
            Certificates
          </h1>

          <p className="mt-2 text-[#4B5563]">
            Manage your certificates.
          </p>

        </div>

        <button
          onClick={() => {
            setSelectedCertificate(null);
            setShowForm(true);
          }}
          className="rounded-xl bg-[#8E77A8] px-6 py-3 font-semibold text-white hover:bg-[#7C6696]"
        >
          + Add Certificate
        </button>

      </div>

      {showForm && (
        <CertificateForm
          certificate={selectedCertificate}
          onSave={handleSave}
        />
      )}

      {certificates.length === 0 ? (

        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-16 text-center">

          <h2 className="text-3xl font-bold text-[#2F3A25]">
            No Certificates Yet
          </h2>

          <p className="mt-4 text-[#6B7280]">
            Add your first certificate.
          </p>

        </div>

      ) : (

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {certificates.map((certificate) => (

            <div
              key={certificate.id}
              className="overflow-hidden rounded-3xl border border-[#DDD4C5] bg-white shadow-sm transition hover:shadow-xl"
            >

              {certificate.image_url ? (

                <img
                  src={certificate.image_url}
                  alt={certificate.title}
                  className="h-56 w-full object-cover"
                />

              ) : (

                <div className="flex h-56 items-center justify-center bg-[#F6F1EA]">

                  <span className="text-6xl">
                    🏆
                  </span>

                </div>

              )}

              <div className="space-y-4 p-6">

                <h2 className="text-2xl font-bold text-[#2F3A25]">
                  {certificate.title}
                </h2>

                <p className="text-[#6B7280]">
                  {certificate.organization}
                </p>

                {certificate.issue_date && (

                  <p className="text-sm text-[#8E77A8]">
                    Issued: {certificate.issue_date}
                  </p>

                )}

                {certificate.credential_url && (

                  <a
                    href={certificate.credential_url}
                    target="_blank"
                    className="inline-block text-[#8E77A8] underline"
                  >
                    View Credential
                  </a>

                )}

                <div className="flex gap-3">

                  <button
                    onClick={() => {
                      setSelectedCertificate(certificate);
                      setShowForm(true);
                    }}
                    className="flex-1 rounded-xl bg-[#8E77A8] py-3 font-semibold text-white hover:bg-[#7C6696]"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(certificate.id)
                    }
                    className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}