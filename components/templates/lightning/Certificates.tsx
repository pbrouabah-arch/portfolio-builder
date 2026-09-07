import { Award, ExternalLink } from "lucide-react";
import styles from "./gothic.module.css";

interface CertificatesProps {
  data: any;
}

export default function Certificates({ data }: CertificatesProps) {
  const certificates = Array.isArray(data?.certificates) ? data.certificates : [];

  return (
    <section id="certificates" className={`${styles.page} ${styles.section}`}>
      <div className={styles.sectionHeader}>
        <div>
          <span className={`${styles.kicker} ${styles.kickerLeft}`}>
            Credentials
          </span>
          <h2 className={styles.heading}>Certificates</h2>
        </div>

        <span className={styles.headerCode}>
          VERIFIED / {certificates.length}
        </span>
      </div>

      {certificates.length === 0 ? (
        <div className={`${styles.frame} ${styles.empty}`}>
          No certificates have been published yet.
        </div>
      ) : (
        <div className={styles.certificateList}>
          {certificates.map((certificate: any, index: number) => (
            <div
              key={certificate?.id || index}
              className={`${styles.frame} ${styles.certificate}`}
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

              <div>
                <h3 className={styles.certificateTitle}>
                  {certificate?.title || "Certificate"}
                </h3>
                <p className={styles.certificateOrg}>
                  {certificate?.organization || ""}
                </p>
              </div>

              <p className={styles.certificateDate}>
                {certificate?.issue_date || ""}
              </p>

              {certificate?.credential_url && (
                <a
                  href={certificate.credential_url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.certificateLink}
                  aria-label={`Open ${certificate?.title || "certificate"} credential`}
                >
                  <ExternalLink size={16} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
