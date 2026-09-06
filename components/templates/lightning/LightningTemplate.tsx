"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Download,
  Mail,
  Menu,
  X,
  ExternalLink,
  Award,
  Database,
  Code2,
  Palette,
  Terminal,
  Sparkles,
  Zap,
  Send,
  MessageCircle,
  Link2,
} from "lucide-react";

import "./lightning.css";

interface LightningTemplateProps {
  data: any;
}

const nav = [
  ["Home", "#"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Certificates", "#certificates"],
  ["Contact", "#contact"],
];

function safeArray(value: any) {
  return Array.isArray(value) ? value : [];
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

function platformLabel(platform: string) {
  const key = (platform || "").toLowerCase().trim();

  if (KNOWN_PLATFORM_LABELS[key]) {
    return KNOWN_PLATFORM_LABELS[key];
  }

  if (!platform) return "Link";

  return platform
    .split(" ")
    .filter(Boolean)
    .map(
      (word) =>
        word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");
}

function LightningFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`lightning-frame ${className}`}>
      <span className="frame-corner frame-corner-tl" />
      <span className="frame-corner frame-corner-br" />
      {children}
    </div>
  );
}

export default function LightningTemplate({
  data,
}: LightningTemplateProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const projects = safeArray(data?.projects);
  const skills = safeArray(data?.skills);
  const certificates = safeArray(data?.certificates);
  const stats = safeArray(data?.stats);
  const social = safeArray(data?.social);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [menuOpen]);

  const featuredProjects = projects.slice(0, 4);

  const groupedSkills = skills.reduce(
    (acc: Record<string, any[]>, skill: any) => {
      const key = skill?.category || "Core Skills";

      (acc[key] ||= []).push(skill);

      return acc;
    },
    {}
  );

  return (
    <main className="lightning-site">
      <div
        className="storm-bg"
        aria-hidden="true"
      />

      <div
        className="storm-vignette"
        aria-hidden="true"
      />

      <div
        className="scanlines"
        aria-hidden="true"
      />

      <header
        className={`lightning-nav ${
          scrolled ? "is-scrolled" : ""
        }`}
      >
        <a
          href="#home"
          className="brand-mark"
          onClick={() => setMenuOpen(false)}
        >
          <Zap size={18} strokeWidth={2.5} />
          <span>{data?.name || "Abismo"}</span>
        </a>

        <nav className="desktop-nav">
          {nav.map(([name, href]) => (
            <a key={`${name}-${href}`} href={href}>
              {name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="nav-contact"
        >
          Open channel
          <ArrowUpRight size={15} />
        </a>

        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={menuOpen}
          aria-controls="lightning-mobile-menu"
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      {menuOpen && (
        <nav
          id="lightning-mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {nav.map(([name, href]) => (
            <a
              key={`${name}-${href}`}
              href={href}
              onClick={() => setMenuOpen(false)}
            >
              {name}
            </a>
          ))}
        </nav>
      )}

      <section
        className="hero-lightning"
        id="home"
      >
        <div className="hero-grid">
          <div className="hero-copy reveal-in">
            <div className="eyebrow">
              <span className="live-dot" />
              DIGITAL PORTFOLIO / 2026
            </div>

            <h1>
              {data?.name || "Abismo"}
            </h1>

            <div className="hero-role">
              {data?.role ||
                "Gothic Interface Designer"}
            </div>

            <p className="hero-description">
              {data?.description ||
                "A creator of dark-themed, data-rich interfaces, blending gothic aesthetics with modern technology."}
            </p>

            <div className="hero-actions">
              <a
                className="electric-button"
                href="#projects"
              >
                Explore work
                <ArrowUpRight size={17} />
              </a>

              {data?.cv && (
                <a
                  className="quiet-button"
                  href={data.cv}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download size={16} />
                  CV
                </a>
              )}
            </div>

            <div className="hero-meta">
              <span>BASED IN</span>

              <strong>
                {[data?.city, data?.country]
                  .filter(Boolean)
                  .join(", ") || "—"}
              </strong>

              <i />

              <span>AVAILABLE</span>

              <strong>
                FOR SELECTED WORK
              </strong>
            </div>
          </div>

          <div className="hero-portrait-wrap reveal-in">
            <div
              className="portrait-orbit orbit-one"
              aria-hidden="true"
            />

            <div
              className="portrait-orbit orbit-two"
              aria-hidden="true"
            />

            <div className="portrait-badge">
              <Sparkles size={13} />
              VISUAL SYSTEMS
            </div>

            {data?.image ? (
              <img
                src={data.image}
                alt={
                  data?.name ||
                  "Profile portrait"
                }
                className="hero-portrait"
              />
            ) : (
              <div className="portrait-empty">
                <Zap size={42} />
              </div>
            )}

            <div className="portrait-caption">
              <span>01</span>

              <span>
                IDENTITY / PORTRAIT
              </span>
            </div>
          </div>

          <aside className="hero-stats">
            {stats
              .slice(0, 4)
              .map(
                (
                  item: any,
                  i: number
                ) => (
                  <LightningFrame
                    key={
                      item?.title || i
                    }
                    className="stat-block"
                  >
                    <span className="stat-index">
                      0{i + 1}
                    </span>

                    <strong>
                      {item?.number ?? "—"}
                    </strong>

                    <small>
                      {item?.title ||
                        "Metric"}
                    </small>
                  </LightningFrame>
                )
              )}
          </aside>
        </div>
      </section>

      <section
        className="manifesto-section"
        id="about"
      >
        <div className="section-kicker">
          // PROFILE
        </div>

        <div className="manifesto-grid">
          <h2>
            Interfaces with
            <br />
            <em>atmosphere.</em>
          </h2>

          <LightningFrame className="manifesto-panel">
            <p>
              {data?.description ||
                data?.about ||
                "A creator of dark-themed, data-rich interfaces, blending gothic aesthetics with modern technology."}
            </p>

            <div className="panel-footer">
              <span>PROFILE.LOG</span>
              <span>READ_ONLY</span>
            </div>
          </LightningFrame>
        </div>
      </section>

      <section
        className="skills-section"
        id="skills"
      >
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              // CAPABILITIES
            </div>

            <h2>
              Skills / Systems
            </h2>
          </div>

          <span className="heading-code">
            SYS_0{skills.length}
          </span>
        </div>

        <div className="skills-grid">
          {Object.entries(groupedSkills).map(
            (
              [category, items],
              idx
            ) => (
              <LightningFrame
                key={category}
                className="skill-cluster"
              >
                <div className="cluster-icon">
                  {idx % 3 === 0 ? (
                    <Code2 />
                  ) : idx % 3 === 1 ? (
                    <Palette />
                  ) : (
                    <Database />
                  )}
                </div>

                <div className="cluster-title">
                  <span>
                    0{idx + 1}
                  </span>

                  <h3>
                    {category}
                  </h3>
                </div>

                <div className="skill-list">
                  {items.map(
                    (
                      skill: any,
                      i: number
                    ) => (
                      <div
                        className="skill-row"
                        key={
                          skill?.id || i
                        }
                      >
                        <span>
                          {skill?.name ||
                            "Skill"}
                        </span>

                        <span className="skill-meter">
                          <i
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  Number(
                                    skill?.level
                                  ) || 0
                                )
                              )}%`,
                            }}
                          />
                        </span>

                        <b>
                          {skill?.level !=
                          null
                            ? `${skill.level}%`
                            : "—"}
                        </b>
                      </div>
                    )
                  )}
                </div>
              </LightningFrame>
            )
          )}

          {skills.length === 0 && (
            <LightningFrame className="empty-state">
              <Terminal size={22} />

              <p>
                No skills have been
                published yet.
              </p>
            </LightningFrame>
          )}
        </div>
      </section>

      <section
        className="projects-section"
        id="projects"
      >
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              // SELECTED WORK
            </div>

            <h2>
              Project Archive
            </h2>
          </div>

          <span className="heading-code">
            INDEX /{" "}
            {String(
              projects.length
            ).padStart(2, "0")}
          </span>
        </div>

        {featuredProjects.length ? (
          <div className="project-archive">
            {featuredProjects.map(
              (
                project: any,
                i: number
              ) => (
                <article
                  className={`project-entry project-${
                    i % 2
                      ? "wide"
                      : "normal"
                  }`}
                  key={
                    project?.id || i
                  }
                >
                  <LightningFrame className="project-frame">
                    <div className="project-number">
                      0{i + 1}
                    </div>

                    <div className="project-image-wrap">
                      {project?.cover_image ? (
                        <img
                          src={
                            project.cover_image
                          }
                          alt={
                            project?.title ||
                            "Project"
                          }
                          className="project-image"
                        />
                      ) : (
                        <div className="project-placeholder">
                          <Database
                            size={32}
                          />
                        </div>
                      )}

                      <span className="image-label">
                        PROJECT /{" "}
                        {String(
                          i + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    <div className="project-info">
                      <div>
                        <h3>
                          {project?.title ||
                            "Untitled project"}
                        </h3>

                        <p>
                          {project?.description ||
                            "No description available."}
                        </p>
                      </div>

                      <div className="project-links">
                        {project?.github_url && (
                          <a
                            href={
                              project.github_url
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Link2 size={15} />
                            SOURCE
                          </a>
                        )}

                        {project?.live_url && (
                          <a
                            href={
                              project.live_url
                            }
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ArrowUpRight
                              size={15}
                            />
                            LIVE
                          </a>
                        )}
                      </div>
                    </div>
                  </LightningFrame>
                </article>
              )
            )}
          </div>
        ) : (
          <LightningFrame className="empty-state">
            <Database size={22} />

            <p>
              No projects have been
              published yet.
            </p>
          </LightningFrame>
        )}
      </section>

      <section
        className="cert-section"
        id="certificates"
      >
        <div className="section-heading">
          <div>
            <div className="section-kicker">
              // CREDENTIALS
            </div>

            <h2>
              Certificates
            </h2>
          </div>

          <span className="heading-code">
            VERIFIED /{" "}
            {certificates.length}
          </span>
        </div>

        {certificates.length ? (
          <div className="certificate-list">
            {certificates.map(
              (
                cert: any,
                i: number
              ) => (
                <LightningFrame
                  key={
                    cert?.id || i
                  }
                  className="certificate-row"
                >
                  <div className="cert-no">
                    0{i + 1}
                  </div>

                  {cert?.image_url ? (
                    <img
                      src={
                        cert.image_url
                      }
                      alt={
                        cert?.title ||
                        "Certificate"
                      }
                      className="cert-thumb"
                    />
                  ) : (
                    <div className="cert-icon">
                      <Award />
                    </div>
                  )}

                  <div className="cert-main">
                    <h3>
                      {cert?.title ||
                        "Certificate"}
                    </h3>

                    <p>
                      {cert?.organization ||
                        ""}
                    </p>
                  </div>

                  <div className="cert-date">
                    {cert?.issue_date ||
                      ""}
                  </div>

                  {cert?.credential_url && (
                    <a
                      href={
                        cert.credential_url
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="cert-open"
                      aria-label={`Open ${
                        cert?.title ||
                        "certificate"
                      }`}
                    >
                      <ExternalLink
                        size={17}
                      />
                    </a>
                  )}
                </LightningFrame>
              )
            )}
          </div>
        ) : (
          <LightningFrame className="empty-state">
            <Award size={22} />

            <p>
              No certificates have been
              published yet.
            </p>
          </LightningFrame>
        )}
      </section>

      <section
        className="contact-section"
        id="contact"
      >
        <div className="contact-inner">
          <div className="section-kicker">
            // CONTACT
          </div>

          <h2>
            Open a <em>channel.</em>
          </h2>

          <p>
            For collaborations, selected
            projects, or simply to connect.
          </p>

          {data?.email && (
            <a
              href={`mailto:${data.email}`}
              className="email-link"
            >
              <Mail size={18} />

              {data.email}

              <ArrowUpRight size={17} />
            </a>
          )}

          <div className="social-grid">
            {social.map(
              (link: any) => {
                const Icon =
                  platformIcon(
                    link?.platform
                  );

                return (
                  <a
                    key={
                      link?.id ||
                      link?.url
                    }
                    href={link?.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon size={17} />

                    <span>
                      {platformLabel(
                        link?.platform
                      )}
                    </span>

                    <ArrowUpRight
                      size={15}
                    />
                  </a>
                );
              }
            )}
          </div>

          {!social.length && (
            <span className="muted-contact">
              No social links available.
            </span>
          )}
        </div>
      </section>

      <footer className="lightning-footer">
        <span>
          {(
            data?.name ||
            "PORTFOLIO"
          ).toUpperCase()}
        </span>

        <span>
          GOTHIC DIGITAL SYSTEM / 2026
        </span>

        <a href="#home">
          BACK TO TOP ↑
        </a>
      </footer>
    </main>
  );
}