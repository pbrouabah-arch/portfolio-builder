"use client";

import { useState } from "react";
import { Award, ExternalLink, X, ZoomIn } from "lucide-react";
import styles from "./gothic.module.css";

interface CertificatesProps {
  data: any;
}

export default function Certificates({ data }: CertificatesProps) {
  const certificates = Array.isArray(data?.certificates) ? data.certificates : [];
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <section id="certificates" className={`${styles.page} ${styles.section}`}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={`${styles.kicker} ${styles.kickerLeft}`}>Credentials</span>
          <h2 className={styles.heading}>Certificates</h2>
        </div>
        <span className={styles.headerCode}>VERIFIED / {certificates.length}</span>
      </div>

      {certificates.length === 0 ? (
        <div className={`${styles.frame} ${styles.empty}`}>No certificates have been published yet.</div>
      ) : (
        <div className={styles.certificateList}>
          {certificates.map((certificate: any, index: number) => (
            <button
              type="button"
              key={certificate?.id || index}
              className={`${styles.frame} ${styles.certificate}`}
              onClick={() => setSelected(certificate)}
              aria-label={`View ${certificate?.title || "certificate"}`}
            >
              {certificate?.image_url ? (
                <img
                  src={certificate.image_url}
                  alt={certificate?.title || "Certificate"}
                  className={styles.certificateThumb}
                />
              ) : (
                <div className={styles.certificateFallback}>
                  <Award size={20} />
                </div>
              )}

              <div className={styles.certificateInfo}>
                <h3 className={styles.certificateTitle}>{certificate?.title || "Certificate"}</h3>
                <p className={styles.certificateOrg}>{certificate?.organization || ""}</p>
              </div>

              <p className={styles.certificateDate}>{certificate?.issue_date || ""}</p>

              <span className={styles.certificateView}>
                <ZoomIn size={15} />
                View
              </span>
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className={styles.certificateModal} role="dialog" aria-modal="true" aria-label="Certificate preview">
          <button
            type="button"
            className={styles.modalBackdrop}
            aria-label="Close certificate preview"
            onClick={() => setSelected(null)}
          />

          <div className={styles.certificateModalPanel}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className={styles.modalHeader}>
              <div>
                <span className={styles.kicker}>Certificate / Preview</span>
                <h3>{selected?.title || "Certificate"}</h3>
                <p>
                  {[selected?.organization, selected?.issue_date].filter(Boolean).join(" · ")}
                </p>
              </div>

              {selected?.credential_url && (
                <a
                  href={selected.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.modalCredential}
                >
                  <ExternalLink size={14} />
                  Credential
                </a>
              )}
            </div>

            <div className={styles.modalCertificateImage}>
              {selected?.image_url ? (
                <img
                  src={selected.image_url}
                  alt={selected?.title || "Certificate"}
                />
              ) : (
                <div className={styles.modalFallback}>
                  <Award size={50} />
                  <span>Certificate preview unavailable</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
