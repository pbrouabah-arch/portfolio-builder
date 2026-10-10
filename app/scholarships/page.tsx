"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CalendarDays,
  ChevronRight,
  GraduationCap,
  LogOut,
  Menu,
  Search,
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
  deadline: string | null;
  application_url: string | null;
  image_url: string | null;
  status: "draft" | "published" | "expired";
  application_status: "open" | "closed";
  created_at: string;
  updated_at: string;
}

interface ScholarshipInterest {
  scholarship_id: string;
}

export default function ScholarshipsPage() {
  const router = useRouter();

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarships, setSelectedScholarships] = useState<
    Scholarship[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [interestLoading, setInterestLoading] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Full image modal
  const [fullImage, setFullImage] = useState<string | null>(null);
  const [fullImageAlt, setFullImageAlt] = useState("");

  // Admin state
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    loadScholarships();
  }, []);

  // Close the image modal with Escape and prevent background scrolling
  useEffect(() => {
    if (!fullImage) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setFullImage(null);
      }
    }

    window.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [fullImage]);

  async function loadScholarships() {
    try {
      setLoading(true);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      // Check whether the current user is an admin
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        console.error("Error checking admin status:", adminError);
        setIsAdmin(false);
      } else {
        setIsAdmin(!!adminData);
      }

      // Get published scholarships
      const { data: scholarshipData, error: scholarshipError } =
        await supabase
          .from("scholarships")
          .select("*")
          .eq("status", "published")
          .order("deadline", { ascending: true, nullsFirst: false });

      if (scholarshipError) {
        throw scholarshipError;
      }

      // Get the user's selected scholarships
      const { data: interestData, error: interestError } = await supabase
        .from("scholarship_interests")
        .select("scholarship_id")
        .eq("user_id", user.id);

      if (interestError) {
        throw interestError;
      }

      const allScholarships = (scholarshipData || []) as Scholarship[];
      const interests = (interestData || []) as ScholarshipInterest[];

      const selectedIds = new Set(
        interests.map((interest) => interest.scholarship_id)
      );

      setScholarships(allScholarships);

      setSelectedScholarships(
        allScholarships.filter((scholarship) =>
          selectedIds.has(scholarship.id)
        )
      );
    } catch (error) {
      console.error("Error loading scholarships:", error);
      setMessage("Unable to load scholarships. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function toggleInterest(scholarship: Scholarship) {
    try {
      setInterestLoading(scholarship.id);
      setMessage("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const isSelected = selectedScholarships.some(
        (item) => item.id === scholarship.id
      );

      if (isSelected) {
        const { error } = await supabase
          .from("scholarship_interests")
          .delete()
          .eq("scholarship_id", scholarship.id)
          .eq("user_id", user.id);

        if (error) {
          throw error;
        }

        setSelectedScholarships((current) =>
          current.filter((item) => item.id !== scholarship.id)
        );
      } else {
        const { error } = await supabase
          .from("scholarship_interests")
          .insert({
            scholarship_id: scholarship.id,
            user_id: user.id,
          });

        if (error) {
          throw error;
        }

        setSelectedScholarships((current) => [...current, scholarship]);
      }
    } catch (error) {
      console.error("Error updating interest:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setInterestLoading(null);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const filteredScholarships = scholarships.filter((scholarship) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      scholarship.title.toLowerCase().includes(query) ||
      scholarship.country?.toLowerCase().includes(query) ||
      scholarship.university?.toLowerCase().includes(query) ||
      scholarship.provider?.toLowerCase().includes(query) ||
      scholarship.degree_level?.toLowerCase().includes(query) ||
      scholarship.field_of_study?.toLowerCase().includes(query)
    );
  });

  function formatDeadline(deadline: string | null) {
    if (!deadline) return "Deadline not specified";

    const date = new Date(deadline);

    if (Number.isNaN(date.getTime())) {
      return deadline;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function openScholarship(slug: string) {
    router.push(`/scholarships/${slug}`);
  }

  // Open the full image
  function openFullImage(imageUrl: string, title: string) {
    setFullImage(imageUrl);
    setFullImageAlt(title);
  }

  return (
    <main className="min-h-screen bg-[#F4EFE7] text-[#30283A]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#E1D8CC] bg-[#F4EFE7]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          {/* LOGO */}
          <button
            onClick={() => router.push("/scholarships")}
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8E77A8] text-white shadow-sm">
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

          {/* DESKTOP NAV */}
          <div className="hidden items-center gap-3 md:flex">
            {isAdmin && (
              <button
                onClick={() => router.push("/admin/scholarships")}
                className="rounded-xl border border-[#8E77A8] bg-white px-5 py-2.5 text-sm font-semibold text-[#765D8B] shadow-sm transition hover:bg-[#F3EDF7]"
              >
                Admin
              </button>
            )}

            <button
              onClick={() => {
                document
                  .getElementById("selected-scholarships")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6B5B78] transition hover:bg-white"
            >
              Selected
              {selectedScholarships.length > 0 && (
                <span className="ml-2 rounded-full bg-[#8E77A8] px-2 py-0.5 text-xs text-white">
                  {selectedScholarships.length}
                </span>
              )}
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl bg-[#8E77A8] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#7C6597]"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl p-2.5 text-[#756A7E] transition hover:bg-white hover:text-[#8E77A8]"
              title="Logout"
            >
              <LogOut size={19} />
            </button>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen((current) => !current)}
            className="rounded-xl p-2.5 text-[#6B5B78] transition hover:bg-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="border-t border-[#E1D8CC] bg-[#F4EFE7] px-5 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    router.push("/admin/scholarships");
                  }}
                  className="rounded-xl border border-[#8E77A8] bg-white px-4 py-3 text-left text-sm font-semibold text-[#765D8B] hover:bg-[#F3EDF7]"
                >
                  Admin Panel
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  document
                    .getElementById("selected-scholarships")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-[#6B5B78] hover:bg-white"
              >
                <span>Selected Scholarships</span>

                {selectedScholarships.length > 0 && (
                  <span className="rounded-full bg-[#8E77A8] px-2 py-0.5 text-xs text-white">
                    {selectedScholarships.length}
                  </span>
                )}
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

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCCFE8] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#765F8B]">
            <span className="h-2 w-2 rounded-full bg-[#8E77A8]" />
            Scholarships & Opportunities
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#3F3548] sm:text-5xl lg:text-6xl">
            Find the opportunity
            <span className="block text-[#8E77A8]">
              that fits your future.
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#756B7B] sm:text-lg">
            Explore available scholarships, discover new opportunities,
            and save the ones you are interested in.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mt-10 max-w-2xl">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9B91A0]"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by scholarship, country, university..."
              className="w-full rounded-2xl border border-[#DDD4C9] bg-white py-4 pl-12 pr-5 text-sm text-[#3F3548] outline-none shadow-sm transition placeholder:text-[#AAA1AC] focus:border-[#8E77A8] focus:ring-4 focus:ring-[#8E77A8]/10"
            />
          </div>
        </div>
      </section>

      {/* ERROR MESSAGE */}
      {message && (
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            {message}
          </div>
        </div>
      )}

      {/* SCHOLARSHIPS */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#8E77A8]">
              Explore
            </p>

            <h2 className="mt-1 text-2xl font-bold text-[#403547] sm:text-3xl">
              Available Scholarships
            </h2>
          </div>

          {!loading && (
            <p className="text-sm text-[#827887]">
              {filteredScholarships.length}{" "}
              {filteredScholarships.length === 1
                ? "opportunity"
                : "opportunities"}
            </p>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-3xl border border-[#E3DBD1] bg-white shadow-sm"
              >
                <div className="h-52 animate-pulse bg-[#E8E1D8]" />

                <div className="space-y-3 p-6">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#E8E1D8]" />
                  <div className="h-7 w-3/4 animate-pulse rounded bg-[#E8E1D8]" />
                  <div className="h-4 w-full animate-pulse rounded bg-[#E8E1D8]" />
                  <div className="h-4 w-2/3 animate-pulse rounded bg-[#E8E1D8]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredScholarships.length === 0 && (
          <div className="rounded-3xl border border-[#E3DBD1] bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F0EAF5] text-[#8E77A8]">
              <Search size={28} />
            </div>

            <h3 className="mt-5 text-xl font-bold text-[#403547]">
              No scholarships found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#827887]">
              Try another search term or check back later for new
              scholarship opportunities.
            </p>
          </div>
        )}

        {/* CARDS */}
        {!loading && filteredScholarships.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredScholarships.map((scholarship) => {
              const isSelected = selectedScholarships.some(
                (item) => item.id === scholarship.id
              );

              const isInterestLoading =
                interestLoading === scholarship.id;

              return (
                <article
                  key={scholarship.id}
                  className="group overflow-hidden rounded-3xl border border-[#E1D8CD] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* IMAGE: CLICK TO VIEW FULL SIZE */}
                  <button
                    type="button"
                    onClick={() => {
                      if (scholarship.image_url) {
                        openFullImage(
                          scholarship.image_url,
                          scholarship.title
                        );
                      }
                    }}
                    className="relative block h-56 w-full overflow-hidden bg-[#E7E0D7] text-left"
                    aria-label={`View full image of ${scholarship.title}`}
                    title={
                      scholarship.image_url
                        ? "View full image"
                        : scholarship.title
                    }
                  >
                    {scholarship.image_url ? (
                      <img
                        src={scholarship.image_url}
                        alt={scholarship.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E6DCEF] to-[#D8CCDF]">
                        <GraduationCap
                          size={58}
                          className="text-[#8E77A8]/60"
                        />
                      </div>
                    )}

                    {/* OPEN / CLOSED */}
                    <div className="absolute left-4 top-4">
                      {scholarship.application_status === "open" ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#E8F6EC] px-3 py-1.5 text-xs font-bold text-[#2F7D46] shadow-sm">
                          <span className="h-2 w-2 rounded-full bg-[#3BA55D]" />
                          Applications Open
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#FCE9E9] px-3 py-1.5 text-xs font-bold text-[#B34A4A] shadow-sm">
                          <span className="h-2 w-2 rounded-full bg-[#D85B5B]" />
                          Applications Closed
                        </span>
                      )}
                    </div>

                    {/* SELECTED ICON */}
                    {isSelected && (
                      <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#8E77A8] shadow-md">
                        <BookmarkCheck size={19} />
                      </div>
                    )}
                  </button>

                  {/* CONTENT */}
                  <div className="p-6">
                    {scholarship.provider && (
                      <p className="text-xs font-bold uppercase tracking-wider text-[#8E77A8]">
                        {scholarship.provider}
                      </p>
                    )}

                    <button
                      onClick={() => openScholarship(scholarship.slug)}
                      className="mt-2 block text-left"
                    >
                      <h3 className="text-xl font-bold leading-snug text-[#403547] transition group-hover:text-[#8E77A8]">
                        {scholarship.title}
                      </h3>
                    </button>

                    <div className="mt-4 space-y-2 text-sm text-[#776D7D]">
                      {scholarship.country && (
                        <p className="flex items-center gap-2">
                          <span className="text-[#9A8AA6]">📍</span>
                          {scholarship.country}
                        </p>
                      )}

                      {scholarship.degree_level && (
                        <p className="flex items-center gap-2">
                          <GraduationCap
                            size={16}
                            className="text-[#9A8AA6]"
                          />
                          {scholarship.degree_level}
                        </p>
                      )}

                      {scholarship.deadline && (
                        <p className="flex items-center gap-2">
                          <CalendarDays
                            size={16}
                            className="text-[#9A8AA6]"
                          />
                          Deadline: {formatDeadline(scholarship.deadline)}
                        </p>
                      )}
                    </div>

                    {scholarship.description && (
                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#827887]">
                        {scholarship.description}
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className="mt-6 flex gap-3">
                      <button
                        onClick={() => toggleInterest(scholarship)}
                        disabled={isInterestLoading}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
                          isSelected
                            ? "bg-[#F0EAF5] text-[#765D8B] hover:bg-[#E8DFF0]"
                            : "bg-[#8E77A8] text-white hover:bg-[#7C6597]"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <BookmarkCheck size={17} />
                            Interested
                          </>
                        ) : (
                          <>
                            <Bookmark size={17} />
                            Interested
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => openScholarship(scholarship.slug)}
                        className="flex items-center justify-center rounded-xl border border-[#DED5E3] px-4 text-[#765D8B] transition hover:bg-[#F6F1F8]"
                        title="View details"
                        aria-label={`View details for ${scholarship.title}`}
                      >
                        <ChevronRight size={19} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* SELECTED SCHOLARSHIPS */}
      <section
        id="selected-scholarships"
        className="border-t border-[#E1D8CC] bg-[#EDE6DC]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-[#8E77A8]">
                Your list
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#403547] sm:text-3xl">
                Selected Scholarships
              </h2>

              <p className="mt-2 text-sm text-[#827887]">
                Scholarships you are interested in.
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#8E77A8] text-lg font-bold text-white shadow-sm">
              {selectedScholarships.length}
            </div>
          </div>

          {selectedScholarships.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-[#D4C8B9] bg-white/60 px-6 py-12 text-center">
              <Bookmark
                size={30}
                className="mx-auto text-[#A99BB0]"
              />

              <h3 className="mt-4 font-bold text-[#51465A]">
                No selected scholarships yet
              </h3>

              <p className="mt-2 text-sm text-[#827887]">
                Click "Interested" on a scholarship to save it here.
              </p>
            </div>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedScholarships.map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="flex items-center gap-4 rounded-2xl border border-[#E1D8CC] bg-white p-4 shadow-sm"
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#E7E0D7]">
                    {scholarship.image_url ? (
                      <button
                        type="button"
                        onClick={() =>
                          openFullImage(
                            scholarship.image_url!,
                            scholarship.title
                          )
                        }
                        className="h-full w-full"
                        aria-label={`View full image of ${scholarship.title}`}
                      >
                        <img
                          src={scholarship.image_url}
                          alt={scholarship.title}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[#8E77A8]">
                        <GraduationCap size={25} />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <button
                      onClick={() => openScholarship(scholarship.slug)}
                      className="text-left"
                    >
                      <h3 className="line-clamp-2 text-sm font-bold text-[#403547] hover:text-[#8E77A8]">
                        {scholarship.title}
                      </h3>
                    </button>

                    <p
                      className={`mt-1 text-xs font-semibold ${
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

                  <button
                    onClick={() => toggleInterest(scholarship)}
                    disabled={interestLoading === scholarship.id}
                    className="shrink-0 rounded-xl p-2 text-[#8E77A8] transition hover:bg-[#F1EBF4]"
                    title="Remove from selected"
                    aria-label="Remove from selected scholarships"
                  >
                    <BookmarkCheck size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FULL IMAGE MODAL */}
      {fullImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setFullImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Full scholarship image"
        >
          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={() => setFullImage(null)}
            className="absolute right-4 top-4 z-[101] rounded-full bg-white/15 p-3 text-white transition hover:bg-white/30"
            aria-label="Close image"
            title="Close image"
          >
            <X size={24} />
          </button>

          {/* FULL-SIZE IMAGE */}
          <img
            src={fullImage}
            alt={fullImageAlt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[92vh] max-w-full object-contain"
          />
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[#DED5CA] bg-[#E7DED3]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-[#827887] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Scholarship Hub</p>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 font-semibold text-[#765D8B] transition hover:text-[#5F4A70]"
          >
            Go to Dashboard
            <ArrowRight size={16} />
          </button>
        </div>
      </footer>
    </main>
  );
}