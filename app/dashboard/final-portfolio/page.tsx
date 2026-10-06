"use client";

import { useEffect, useState } from "react";
import {
  User,
  LayoutTemplate,
  Briefcase,
  MapPinned,
  Globe,
  CheckCircle2,
  Copy,
  ExternalLink,
  Check,
} from "lucide-react";

import { getProfile, type Profile } from "@/lib/profiles";
import { supabase } from "@/lib/supabase";

export default function FinalPortfolioPage() {
  const [profile, setProfile] = useState<Profile | null>(null);

  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const [published, setPublished] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");

  const [copied, setCopied] = useState(false);
  const [publishError, setPublishError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();

      setProfile(data);

      if (data?.is_public && data.username) {
        setPublished(true);
        setPublicUrl(
          `${window.location.origin}/u/${data.username}`
        );
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePublish() {
    if (!profile) return;

    setPublishing(true);
    setPublishError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error(
          "You must be logged in to publish your portfolio."
        );
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          is_public: true,
          publication_status: "published",
          published_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (updateError) {
        throw updateError;
      }

      const url =
        `${window.location.origin}/u/${profile.username}`;

      setPublicUrl(url);
      setPublished(true);

      setProfile({
        ...profile,
        is_public: true,
      });
    } catch (error) {
      console.error("Publish failed:", error);

      setPublishError(
        error instanceof Error
          ? error.message
          : "Failed to publish your portfolio."
      );
    } finally {
      setPublishing(false);
    }
  }

  async function handleCopyLink() {
    if (!publicUrl) return;

    try {
      await navigator.clipboard.writeText(publicUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Copy failed:", error);

      setPublishError("Unable to copy the portfolio link.");
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#DDD4C5] border-t-[#8E77A8]" />

          <p className="mt-5 text-[#6B7280]">
            Loading your portfolio...
          </p>
        </div>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-[#2F3A25]">
            Profile Not Found
          </h1>

          <p className="mt-4 text-[#6B7280]">
            Please complete your profile before publishing your portfolio.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-10 pb-16">

      {/* HERO */}
      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#8E77A8] via-[#80699B] to-[#625276] p-8 text-white shadow-xl md:p-12">

        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">

          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Globe size={17} />

            Portfolio Publication
          </div>

          <h1 className="mt-7 text-4xl font-bold tracking-tight md:text-5xl">
            Final Portfolio
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-8 text-white/90 md:text-lg">
            Your portfolio is ready. Publish it to make it publicly
            accessible and receive your personal portfolio link.
          </p>

        </div>
      </section>


      {/* ARABIC EXPLANATION */}
      <section className="rounded-[32px] border border-[#DDD4C5] bg-white p-8 shadow-sm md:p-10">

        <div className="max-w-4xl">

          <h2
            dir="rtl"
            className="text-3xl font-bold text-[#2F3A25]"
          >
            بورتفوليو الخاص بك أصبح جاهزًا
          </h2>

          <p
            dir="rtl"
            className="mt-5 text-lg leading-9 text-[#6B7280]"
          >
            تم إنشاء بورتفوليو الخاص بك بنجاح.
            <br />
            <br />
            يمكنك الآن نشره مباشرة ليصبح متاحًا للعامة والحصول على
            رابط خاص بك.
            <br />
            <br />
            بعد النشر، يمكنك مشاركة الرابط مع الجامعات والشركات
            وأي شخص تريد.
          </p>

        </div>

      </section>


      {/* PORTFOLIO SUMMARY */}
      <section className="rounded-[32px] border border-[#DDD4C5] bg-white p-8 shadow-sm md:p-10">

        <div>

          <h2 className="text-3xl font-bold text-[#2F3A25]">
            Portfolio Summary
          </h2>

          <p className="mt-2 text-[#6B7280]">
            Review the information that will be used for your portfolio.
          </p>

        </div>


        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          <SummaryCard
            icon={<User size={22} />}
            title="Full Name"
            value={profile.full_name}
          />

          <SummaryCard
            icon={<User size={22} />}
            title="Username"
            value={profile.username}
          />

          <SummaryCard
            icon={<LayoutTemplate size={22} />}
            title="Selected Template"
            value={profile.template_id}
          />

          <SummaryCard
            icon={<Briefcase size={22} />}
            title="Job Title"
            value={profile.job_title}
          />

          <SummaryCard
            icon={<Globe size={22} />}
            title="Country"
            value={profile.country}
          />

          <SummaryCard
            icon={<MapPinned size={22} />}
            title="City"
            value={profile.city}
          />

        </div>

      </section>


      {/* PUBLISH SECTION */}
      <section className="overflow-hidden rounded-[32px] bg-[#8E77A8] p-8 text-white shadow-xl md:p-12">

        <div className="mx-auto max-w-3xl text-center">

          {!published ? (
            <>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                <Globe size={28} />
              </div>

              <h2 className="mt-7 text-4xl font-bold">
                Publish Your Portfolio
              </h2>

              <p className="mt-5 text-lg leading-8 text-white/90">
                Your portfolio is ready to go live.
                Publish it now and get your public portfolio link.
              </p>

              <p
                dir="rtl"
                className="mt-4 text-lg leading-8 text-white/90"
              >
                بورتفوليو الخاص بك جاهز للنشر.
                اضغط على الزر لجعله متاحًا للعامة والحصول على رابطك الخاص.
              </p>


              {/* ERROR */}
              {publishError && (
                <div className="mt-6 rounded-2xl bg-red-500/20 p-4 text-sm text-white">
                  {publishError}
                </div>
              )}


              {/* PUBLISH BUTTON */}
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="
                  mt-9
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  bg-white
                  px-10
                  py-4
                  text-lg
                  font-bold
                  text-[#8E77A8]
                  shadow-lg
                  transition
                  hover:scale-105
                  hover:shadow-xl
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <Globe size={22} />

                {publishing
                  ? "Publishing..."
                  : "Publish My Portfolio"}
              </button>
            </>
          ) : (
            <>
              {/* SUCCESS ICON */}
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <Check size={32} className="text-[#2F3A25]" />
              </div>


              <h2 className="mt-7 text-4xl font-bold">
                Portfolio Published!
              </h2>


              <p className="mt-5 text-lg leading-8 text-white/90">
                Your portfolio is now publicly available.
              </p>


              <p
                dir="rtl"
                className="mt-3 text-lg leading-8 text-white/90"
              >
                تم نشر البورتفوليو الخاص بك بنجاح وأصبح متاحًا للعامة.
              </p>


              {/* PUBLIC LINK */}
              <div className="mt-8 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">

                <p className="mb-3 text-sm font-medium text-white/80">
                  Your Public Portfolio Link
                </p>

                <div className="flex flex-col gap-3 sm:flex-row">

                  <input
                    type="text"
                    value={publicUrl}
                    readOnly
                    className="
                      min-w-0
                      flex-1
                      rounded-xl
                      border-0
                      bg-white
                      px-4
                      py-3
                      text-sm
                      text-[#4B5563]
                      outline-none
                    "
                  />


                  {/* COPY */}
                  <button
                    onClick={handleCopyLink}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-white
                      px-5
                      py-3
                      font-semibold
                      text-[#8E77A8]
                      transition
                      hover:bg-[#F8F6F2]
                    "
                  >
                    {copied ? (
                      <>
                        <Check size={18} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copy Link
                      </>
                    )}
                  </button>

                </div>

              </div>


              {/* ACTION BUTTONS */}
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

                <a
                  href={publicUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-white
                    px-8
                    py-4
                    font-bold
                    text-[#8E77A8]
                    transition
                    hover:scale-105
                  "
                >
                  <ExternalLink size={20} />

                  Open Portfolio
                </a>


                <a
                  href="/dashboard"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/40
                    px-8
                    py-4
                    font-bold
                    text-white
                    transition
                    hover:bg-white/10
                  "
                >
                  Back to Dashboard
                </a>

              </div>

            </>
          )}

        </div>

      </section>


      {/* WHAT HAPPENS AFTER PUBLISHING */}
      <section className="rounded-[32px] border border-[#DDD4C5] bg-white p-8 shadow-sm md:p-10">

        <h2 className="text-3xl font-bold text-[#2F3A25]">
          What Happens After Publishing?
        </h2>

        <p className="mt-3 text-[#6B7280]">
          Once your portfolio is published, you can share your public link
          anywhere.
        </p>


        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <ReviewItem
            title="Public Access"
            description="Anyone with your portfolio link can view your public portfolio."
          />

          <ReviewItem
            title="Share Your Link"
            description="Use your portfolio URL on your CV, LinkedIn, scholarship applications and job applications."
          />

          <ReviewItem
            title="Your Dashboard"
            description="You can continue managing your portfolio from your dashboard."
          />

          <ReviewItem
            title="Professional Presentation"
            description="Your selected template will be displayed through your public portfolio page."
          />

        </div>

      </section>


      {/* FINAL INFO */}
      <section className="rounded-[32px] border border-[#DDD4C5] bg-[#F8F6F2] p-8 md:p-10">

        <div className="flex items-start gap-5">

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2F3A25] text-white">
            <CheckCircle2 size={24} />
          </div>

          <div>

            <h2 className="text-3xl font-bold text-[#2F3A25]">
              Your Portfolio, Your Link
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-[#6B7280]">
              Your portfolio belongs to you. Once published, you receive
              a public link that you can use to showcase your work,
              education, skills and achievements.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================
   SUMMARY CARD
========================= */

function SummaryCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | null;
}) {
  return (
    <div className="rounded-3xl border border-[#E5DED1] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-5 text-[#8E77A8]">
        {icon}
      </div>

      <p className="text-sm text-[#6B7280]">
        {title}
      </p>

      <h3 className="mt-2 break-words text-xl font-bold text-[#2F3A25]">
        {value || "-"}
      </h3>

    </div>
  );
}


/* =========================
   REVIEW ITEM
========================= */

function ReviewItem({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-[#E5DED1] p-6">

      <div className="flex items-start gap-4">

        <div className="mt-1 shrink-0 text-[#8E77A8]">
          <CheckCircle2 size={22} />
        </div>

        <div>

          <h3 className="text-lg font-bold text-[#2F3A25]">
            {title}
          </h3>

          <p className="mt-2 leading-7 text-[#6B7280]">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}