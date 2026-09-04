"use client";

import { useEffect, useState } from "react";
import { Certificate } from "@/lib/certificates";
import { uploadCertificateImage } from "@/lib/certificate-storage";

interface Props {
  certificate: Certificate | null;
  onSave: (
    certificate: Partial<Certificate>
  ) => Promise<void>;
}

export default function CertificateForm({
  certificate,
  onSave,
}: Props) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [title, setTitle] = useState("");
  const [organization, setOrganization] =
    useState("");

  const [issueDate, setIssueDate] =
    useState("");

  const [credentialUrl, setCredentialUrl] =
    useState("");

  const [imageUrl, setImageUrl] =
    useState("");

  const [displayOrder, setDisplayOrder] =
    useState(0);

  useEffect(() => {
    if (!certificate) {
      setTitle("");
      setOrganization("");
      setIssueDate("");
      setCredentialUrl("");
      setImageUrl("");
      setDisplayOrder(0);
      return;
    }

    setTitle(certificate.title);

    setOrganization(
      certificate.organization
    );

    setIssueDate(
      certificate.issue_date ?? ""
    );

    setCredentialUrl(
      certificate.credential_url ?? ""
    );

    setImageUrl(
      certificate.image_url ?? ""
    );

    setDisplayOrder(
      certificate.display_order
    );
  }, [certificate]);

  async function handleImage(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    if (!e.target.files?.length) return;

    try {
      setUploading(true);

      const url =
        await uploadCertificateImage(
          e.target.files[0]
        );

      setImageUrl(url);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSave({
        id: certificate?.id,

        title,

        organization,

        issue_date:
          issueDate || null,

        credential_url:
          credentialUrl || null,

        image_url:
          imageUrl || null,

        display_order:
          displayOrder,
      });

      alert(
        "Certificate saved successfully."
      );
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ||
          JSON.stringify(error)
      );
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-[#CFC4B2] bg-white p-4 text-[#1F2937] placeholder:text-[#6B7280] outline-none transition focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-bold text-[#2F3A25]">
        Certificate
      </h2>

      <div className="grid gap-5">

        <input
          required
          placeholder="Certificate Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className={inputClass}
        />

        <input
          required
          placeholder="Organization"
          value={organization}
          onChange={(e) =>
            setOrganization(
              e.target.value
            )
          }
          className={inputClass}
        />

        <input
          type="date"
          value={issueDate}
          onChange={(e) =>
            setIssueDate(
              e.target.value
            )
          }
          className={inputClass}
        />

        <input
          placeholder="Credential URL"
          value={credentialUrl}
          onChange={(e) =>
            setCredentialUrl(
              e.target.value
            )
          }
          className={inputClass}
        />

        <div>

          <label className="mb-2 block font-medium text-[#2F3A25]">
            Certificate Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className={inputClass}
          />

          {uploading && (
            <p className="mt-3 text-[#8E77A8]">
              Uploading...
            </p>
          )}

          {imageUrl && (
            <img
              src={imageUrl}
              alt="Certificate"
              className="mt-5 h-60 w-full rounded-2xl border border-[#DDD4C5] object-cover"
            />
          )}

        </div>

        <input
          type="number"
          placeholder="Display Order"
          value={displayOrder}
          onChange={(e) =>
            setDisplayOrder(
              Number(e.target.value)
            )
          }
          className={inputClass}
        />

      </div>

      <button
        type="submit"
        disabled={
          loading || uploading
        }
        className="mt-8 w-full rounded-2xl bg-[#8E77A8] py-4 text-lg font-semibold text-white transition hover:bg-[#7C6696] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : "Save Certificate"}
      </button>

    </form>
  );
}