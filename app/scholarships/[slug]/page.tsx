"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Scholarship {
  id: string;
  title: string;
  slug: string;
  country: string | null;
  university: string | null;
  provider: string | null;
  degree_level: string | null;
  field_of_study: string | null;
  description: string | null;
  eligibility: string | null;
  benefits: string | null;
  funding_type: string | null;
  deadline: string | null;
  application_url: string | null;
  image_url: string | null;
  status: "draft" | "published" | "expired";
  application_status: "open" | "closed";
  created_at: string;
  updated_at: string;
}

export default function ScholarshipDetailsPage() {
  const router = useRouter();
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const [scholarship, setScholarship] =
    useState<Scholarship | null>(null);

  const [isInterested, setIsInterested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interestLoading, setInterestLoading] = useState(false);
  const [error, setError] = useState("");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      loadScholarship();
    }
  }, [slug]);

  async function loadScholarship() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error: scholarshipError } = await supabase
        .from("scholarships")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (scholarshipError) {
        throw scholarshipError;
      }

      setScholarship(data as Scholarship);

      const { data: interestData, error: interestError } =
        await supabase
          .from("scholarship_interests")
          .select("id")
          .eq("scholarship_id", data.id)
          .eq("user_id", user.id)
          .maybeSingle();

      if (interestError) {
        throw interestError;
      }

      setIsInterested(Boolean(interestData));
    } catch (err) {
      console.error("Error loading scholarship:", err);
      setError("This scholarship could not be found.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleInterest() {
    if (!scholarship) return;

    try {
      setInterestLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      if (isInterested) {
        const { error } = await supabase
          .from("scholarship_interests")
          .delete()
          .eq("scholarship_id", scholarship.id)
          .eq("user_id", user.id);

        if (error) throw error;

        setIsInterested(false);
      } else {
        const { error } = await supabase
          .from("scholarship_interests")
          .insert({
            scholarship_id: scholarship.id,
            user_id: user.id,
          });

        if (error) throw error;

        setIsInterested(true);
      }
    } catch (err) {
      console.error("Error updating interest:", err);
    } finally {
      setInterestLoading(false);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function formatDeadline(deadline: string | null) {
    if (!deadline) return "Deadline not specified";

    const date = new Date(deadline);

    if (Number.isNaN(date.getTime())) {
      return deadline;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function splitText(text: string | null) {
    if (!text) return [];

    return text
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F4EFE7]">
        <header className="border-b border-[#E1D8CC] bg-[#F4EFE7]">
          <div className="mx-auto flex h-20 max-w-7xl items-center px-5 sm:px-8">
            <div className="h-8 w-44 animate-pulse rounded-lg bg-[#E4DBD1]" />
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
          <div className="h-10 w-32 animate-pulse rounded-lg bg-[#E4DBD1]" />

          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm">
            <div className="h-72 animate-pulse bg-[#E5DDD4]" />

            <div className="space-y-5 p-8">
              <div className="h-8 w-2/3 animate-pulse rounded bg-[#E5DDD4]" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-[#E5DDD4]" />
              <div className="h-20 w-full animate-pulse rounded bg-[#E5DDD4]" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* =========================
     ERROR / NOT FOUND
  ========================= */

  if (error || !scholarship) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4EFE7] px-6">
        <div className="max-w-md rounded-3xl border border-[#E1D8CC] bg-white p-10 text-center shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EAF5] text-[#8E77A8]">
            <GraduationCap size={30} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-[#403547]">
            Scholarship not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#827887]">
            This scholarship may have been removed or is no longer
            published.
          </p>

          <button
            onClick={() => router.push("/scholarships")}
            className="mt-7 rounded-xl bg-[#8E77A8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#7C6597]"
          >
            Back to Scholarships
          </button>
        </div>
      </main>
    );
  }

  const eligibilityItems = splitText(scholarship.eligibility);
  const benefitItems = splitText(scholarship.benefits);

  return (
    <main className="min-h-screen bg-[#F4EFE7] text-[#30283A]">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="sticky top-0 z-50 border-b border-[#E1D8CC] bg-[#F4EFE7]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <button
            onClick={() => router.push("/scholarships")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8E77A8] text-white">
              <GraduationCap size={22} />
            </div>

            <div className="text-left">
              <p className="text-lg font-bold tracking-wide text-[#49385C]">
                SCHOLARSHIP HUB
              </p>

              <p className="hidden text-xs text-[#81768B] sm:block">
                Find opportunities for your future
              </p>
            </div>
          </button>

          {/* DESKTOP */}
          <div className="hidden items-center gap-3 md:flex">

            <button
              onClick={() => router.push("/scholarships")}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6B5B78] transition hover:bg-white"
            >
              Scholarships
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl bg-[#8E77A8] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7C6597]"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#756A7E] transition hover:bg-white hover:text-[#8E77A8]"
            >
              Logout
            </button>
          </div>

          {/* MOBILE */}
          <button
            onClick={() =>
              setMobileMenuOpen((current) => !current)
            }
            className="rounded-xl p-2.5 text-[#6B5B78] md:hidden"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#E1D8CC] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-2">

              <button
                onClick={() => router.push("/scholarships")}
                className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#6B5B78] hover:bg-white"
              >
                Scholarships
              </button>

              <button
                onClick={() => router.push("/dashboard")}
                className="rounded-xl bg-[#8E77A8] px-4 py-3 text-sm font-semibold text-white"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#756A7E] hover:bg-white"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================
          MAIN
      ========================= */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">

        {/* BACK */}
        <button
          onClick={() => router.push("/scholarships")}
          className="mb-8 flex items-center gap-2 text-sm font-semibold text-[#756A7E] transition hover:text-[#8E77A8]"
        >
          <ArrowLeft size={18} />
          Back to Scholarships
        </button>

        {/* HERO CARD */}
        <section className="overflow-hidden rounded-[2rem] border border-[#E1D8CC] bg-white shadow-sm">

          {/* IMAGE */}
          <div className="relative h-[280px] w-full overflow-hidden bg-[#E5DDD4] sm:h-[400px]">

            {scholarship.image_url ? (
              <img
                src={scholarship.image_url}
                alt={scholarship.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E7DFF0] to-[#D7CBDD]">
                <GraduationCap
                  size={90}
                  className="text-[#8E77A8]/50"
                />
              </div>
            )}

            {/* STATUS */}
            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
              {scholarship.application_status === "open" ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F6EC] px-4 py-2 text-sm font-bold text-[#2F7D46] shadow-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#3BA55D]" />
                  Applications Open
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full bg-[#FCE9E9] px-4 py-2 text-sm font-bold text-[#B34A4A] shadow-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#D85B5B]" />
                  Applications Closed
                </span>
              )}
            </div>
          </div>

          {/* HERO CONTENT */}
          <div className="p-6 sm:p-10 lg:p-12">

            {scholarship.provider && (
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#8E77A8]">
                {scholarship.provider}
              </p>
            )}

            <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-[#403547] sm:text-4xl lg:text-5xl">
              {scholarship.title}
            </h1>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

              {scholarship.country && (
                <div className="rounded-2xl bg-[#F7F3EE] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#968B9A]">
                    <MapPin size={15} />
                    Country
                  </div>

                  <p className="mt-2 font-bold text-[#51465A]">
                    {scholarship.country}
                  </p>
                </div>
              )}

              {scholarship.university && (
                <div className="rounded-2xl bg-[#F7F3EE] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#968B9A]">
                    <GraduationCap size={15} />
                    University
                  </div>

                  <p className="mt-2 font-bold text-[#51465A]">
                    {scholarship.university}
                  </p>
                </div>
              )}

              {scholarship.degree_level && (
                <div className="rounded-2xl bg-[#F7F3EE] p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#968B9A]">
                    <GraduationCap size={15} />
                    Degree
                  </div>

                  <p className="mt-2 font-bold text-[#51465A]">
                    {scholarship.degree_level}
                  </p>
                </div>
              )}

              <div className="rounded-2xl bg-[#F7F3EE] p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#968B9A]">
                  <CalendarDays size={15} />
                  Deadline
                </div>

                <p className="mt-2 font-bold text-[#51465A]">
                  {formatDeadline(scholarship.deadline)}
                </p>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={toggleInterest}
                disabled={interestLoading}
                className={`
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-6
                  py-3.5
                  text-sm
                  font-bold
                  transition
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    isInterested
                      ? "bg-[#F0EAF5] text-[#765D8B] hover:bg-[#E8DFF0]"
                      : "bg-[#8E77A8] text-white hover:bg-[#7C6597]"
                  }
                `}
              >
                {isInterested ? (
                  <>
                    <BookmarkCheck size={19} />
                    Interested
                  </>
                ) : (
                  <>
                    <Bookmark size={19} />
                    I'm Interested
                  </>
                )}
              </button>

              {scholarship.application_status === "open" &&
                scholarship.application_url && (
                  <a
                    href={scholarship.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8CCDF] bg-white px-6 py-3.5 text-sm font-bold text-[#765D8B] transition hover:bg-[#F7F2F9]"
                  >
                    Apply Now
                    <ExternalLink size={17} />
                  </a>
                )}
            </div>

            {scholarship.application_status === "closed" && (
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#F0D5D5] bg-[#FEF5F5] p-4">
                <X
                  size={20}
                  className="mt-0.5 shrink-0 text-[#C45A5A]"
                />

                <p className="text-sm leading-6 text-[#985252]">
                  Applications for this scholarship are currently
                  closed. You can still save it to your selected
                  scholarships for future reference.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* DETAILS */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">

          {/* LEFT */}
          <div className="space-y-8">

            {/* DESCRIPTION */}
            {scholarship.description && (
              <section className="rounded-3xl border border-[#E1D8CC] bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-[#403547]">
                  About this scholarship
                </h2>

                <p className="mt-5 whitespace-pre-line text-sm leading-7 text-[#746A79] sm:text-base">
                  {scholarship.description}
                </p>
              </section>
            )}

            {/* ELIGIBILITY */}
            {eligibilityItems.length > 0 && (
              <section className="rounded-3xl border border-[#E1D8CC] bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-[#403547]">
                  Eligibility
                </h2>

                <div className="mt-5 space-y-3">
                  {eligibilityItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#8E77A8]"
                      />

                      <p className="text-sm leading-6 text-[#746A79]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* BENEFITS */}
            {benefitItems.length > 0 && (
              <section className="rounded-3xl border border-[#E1D8CC] bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-2xl font-bold text-[#403547]">
                  Benefits & Funding
                </h2>

                <div className="mt-5 space-y-3">
                  {benefitItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={19}
                        className="mt-0.5 shrink-0 text-[#8E77A8]"
                      />

                      <p className="text-sm leading-6 text-[#746A79]">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                {scholarship.funding_type && (
                  <div className="mt-7 rounded-2xl bg-[#F5F0F7] p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#8E77A8]">
                      Funding Type
                    </p>

                    <p className="mt-2 font-bold text-[#51465A]">
                      {scholarship.funding_type}
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-28">

            {/* QUICK INFO */}
            <div className="rounded-3xl border border-[#E1D8CC] bg-white p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#403547]">
                Scholarship Overview
              </h3>

              <div className="mt-5 space-y-4">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#9A8F9E]">
                    Application Status
                  </p>

                  <p
                    className={`mt-1 font-bold ${
                      scholarship.application_status === "open"
                        ? "text-[#3B8650]"
                        : "text-[#B34A4A]"
                    }`}
                  >
                    {scholarship.application_status === "open"
                      ? "Applications Open"
                      : "Applications Closed"}
                  </p>
                </div>

                {scholarship.field_of_study && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9A8F9E]">
                      Field of Study
                    </p>

                    <p className="mt-1 font-bold text-[#51465A]">
                      {scholarship.field_of_study}
                    </p>
                  </div>
                )}

                {scholarship.degree_level && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9A8F9E]">
                      Degree Level
                    </p>

                    <p className="mt-1 font-bold text-[#51465A]">
                      {scholarship.degree_level}
                    </p>
                  </div>
                )}

                {scholarship.deadline && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#9A8F9E]">
                      Application Deadline
                    </p>

                    <p className="mt-1 font-bold text-[#51465A]">
                      {formatDeadline(scholarship.deadline)}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* APPLY */}
            {scholarship.application_status === "open" &&
              scholarship.application_url && (
                <div className="rounded-3xl bg-[#8E77A8] p-6 text-white shadow-sm">
                  <h3 className="text-lg font-bold">
                    Ready to apply?
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/80">
                    Visit the official application page to learn
                    more and submit your application.
                  </p>

                  <a
                    href={scholarship.application_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-[#765D8B] transition hover:bg-[#F7F3F9]"
                  >
                    Apply Now
                    <ExternalLink size={17} />
                  </a>
                </div>
              )}

            {/* DASHBOARD */}
            <button
              onClick={() => router.push("/dashboard")}
              className="flex w-full items-center justify-between rounded-2xl border border-[#DED5E3] bg-white px-5 py-4 text-sm font-bold text-[#765D8B] shadow-sm transition hover:bg-[#F7F2F9]"
            >
              Go to Dashboard
              <ArrowRight size={18} />
            </button>
          </aside>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-[#DED5CA] bg-[#E7DED3]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-sm text-[#827887] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} Scholarship Hub
          </p>

          <button
            onClick={() => router.push("/scholarships")}
            className="font-semibold text-[#765D8B] transition hover:text-[#5F4A70]"
          >
            Back to Scholarships
          </button>
        </div>
      </footer>
    </main>
  );
}