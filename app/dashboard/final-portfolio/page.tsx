"use client";

import { useEffect, useState } from "react";
import {
  User,
  LayoutTemplate,
  Briefcase,
  MapPinned,
  Globe,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Send,
  X,
} from "lucide-react";

import { getProfile, type Profile } from "@/lib/profiles";

export default function FinalPortfolioPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmitRequest() {
    setShowModal(true);
  }

  function handleWhatsApp() {
    if (!profile) return;

    const message = `
Hello, I would like to publish my portfolio.

━━━━━━━━━━━━━━━━━━
PORTFOLIO DETAILS
━━━━━━━━━━━━━━━━━━

Name: ${profile.full_name || "-"}
Username: ${profile.username || "-"}
Email: ${profile.email || "-"}
Phone: ${profile.phone || "-"}
Job Title: ${profile.job_title || "-"}
Selected Template: ${profile.template_id || "-"}

━━━━━━━━━━━━━━━━━━

My portfolio is ready for review and publication.

Thank you.
    `.trim();

    const phoneNumber = "213775480437";

    const whatsappUrl =
      `https://wa.me/${phoneNumber}?text=` +
      encodeURIComponent(message);

    window.open(whatsappUrl, "_blank");

    setShowModal(false);
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
    <>
      <main className="space-y-10 pb-16">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#8E77A8] via-[#80699B] to-[#625276] p-8 text-white shadow-xl md:p-12">

          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <ShieldCheck size={17} />
              Premium Publication Service
            </div>

            <h1 className="mt-7 text-4xl font-bold tracking-tight md:text-5xl">
              Publish Portfolio
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-8 text-white/90 md:text-lg">
              Your portfolio has been successfully generated and is ready
              for publication. Before publication, we personally review
              every portfolio to make sure everything looks professional.
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
              قبل نشره، نقوم بمراجعته يدويًا للتأكد من جودة التصميم،
              وسلامة المحتوى، وعمل الروابط، وتوافقه مع مختلف الأجهزة.
              <br />
              بعد إتمام عملية الدفع والموافقة على النشر، سنقوم بنشر
              البورتفوليو وإرسال الرابط الخاص بك.
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

        {/* HIDDEN PORTFOLIO LINK */}

        <section className="rounded-[32px] border border-[#DDD4C5] bg-[#F8F6F2] p-8 shadow-sm md:p-10">

          <div className="flex items-start gap-5">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#8E77A8] text-white">
              <Lock size={25} />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-[#2F3A25]">
                Portfolio Link
              </h2>

              <p className="mt-2 text-[#6B7280]">
                Hidden until your portfolio is published.
              </p>

            </div>

          </div>

          <div className="mt-7 rounded-2xl border border-dashed border-[#CFC4B2] bg-white p-6">

            <div className="flex items-center gap-3">

              <div className="h-3 w-3 rounded-full bg-[#CFC4B2]" />
              <div className="h-3 w-3 rounded-full bg-[#CFC4B2]" />
              <div className="h-3 w-3 rounded-full bg-[#CFC4B2]" />

              <span className="ml-2 text-sm text-[#9CA3AF]">
                Your permanent portfolio URL
              </span>

            </div>

            <p className="mt-5 text-base leading-7 text-[#6B7280]">
              The permanent link will only be generated after your
              publication request has been reviewed and approved.
            </p>

          </div>

        </section>

        {/* MANUAL REVIEW */}

        <section className="rounded-[32px] border border-[#DDD4C5] bg-white p-8 shadow-sm md:p-10">

          <h2 className="text-3xl font-bold text-[#2F3A25]">
            Why Manual Review?
          </h2>

          <p className="mt-3 max-w-3xl text-[#6B7280]">
            We do not simply generate a portfolio and leave you alone.
            Every portfolio goes through a final quality review before
            publication.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <ReviewItem
              title="Responsive Design"
              description="We check how your portfolio looks on different screen sizes."
            />

            <ReviewItem
              title="Content Review"
              description="We make sure your information is displayed correctly."
            />

            <ReviewItem
              title="Links Verification"
              description="Important links and buttons are checked before publication."
            />

            <ReviewItem
              title="Visual Quality"
              description="We review spacing, layout, images and overall presentation."
            />

            <ReviewItem
              title="Portfolio Performance"
              description="We make sure the final portfolio loads and works correctly."
            />

            <ReviewItem
              title="Final Quality Check"
              description="Your portfolio receives a final professional review."
            />

          </div>

        </section>

        {/* TIMELINE */}

        <section className="rounded-[32px] border border-[#DDD4C5] bg-white p-8 shadow-sm md:p-10">

          <h2 className="text-3xl font-bold text-[#2F3A25]">
            What Happens Next?
          </h2>

          <p className="mt-3 text-[#6B7280]">
            Your portfolio goes through a simple publication process.
          </p>

          <div className="mt-10 space-y-6">

            <TimelineStep
              number="1"
              title="Submit Your Request"
              description="Send us your publication request."
            />

            <TimelineStep
              number="2"
              title="Manual Review"
              description="We review your portfolio and make sure everything is ready."
            />

            <TimelineStep
              number="3"
              title="Payment"
              description="We provide you with the payment instructions."
            />

            <TimelineStep
              number="4"
              title="Publication"
              description="After payment confirmation, we publish your portfolio."
            />

            <TimelineStep
              number="5"
              title="Receive Your Link"
              description="You receive your permanent portfolio link."
              last
            />

          </div>

        </section>

        {/* MAIN CTA */}

        <section className="overflow-hidden rounded-[32px] bg-[#8E77A8] p-8 text-center text-white shadow-xl md:p-12">

          <div className="mx-auto max-w-3xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
              <Send size={28} />
            </div>

            <h2 className="mt-7 text-4xl font-bold">
              Ready to Publish?
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/90">
              Submit your request and contact us to complete the
              publication process. We will review your portfolio,
              provide payment instructions and publish it after
              payment confirmation.
            </p>

            <button
              onClick={handleSubmitRequest}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-lg font-semibold text-[#8E77A8] shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              <MessageCircle size={22} />
              Submit for Review
            </button>

          </div>

        </section>

        {/* FUTURE UPDATES */}

        <section className="rounded-[32px] border border-[#DDD4C5] bg-[#F8F6F2] p-8 md:p-10">

          <div className="flex items-start gap-5">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#2F3A25] text-white">
              <Clock3 size={24} />
            </div>

            <div>

              <h2 className="text-3xl font-bold text-[#2F3A25]">
                Future Updates
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#6B7280]">
                Your dashboard remains available after publication.
                You can continue changing your information and updating
                your portfolio whenever you want. Contact us when you
                want the updated version to be published.
              </p>

            </div>

          </div>

        </section>

      </main>

      {/* CONFIRMATION MODAL */}

      {showModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowModal(false)}
        >

          <div
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[32px] bg-white p-7 shadow-2xl md:p-10"
            onClick={(event) => event.stopPropagation()}
          >

            <div className="flex items-start justify-between gap-5">

              <div>

                <h2 className="text-3xl font-bold text-[#2F3A25]">
                  Confirm Your Request
                </h2>

                <p className="mt-3 leading-7 text-[#6B7280]">
                  Please check your information before contacting us.
                </p>

              </div>

              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-2 text-[#6B7280] transition hover:bg-[#F3F0EA] hover:text-[#2F3A25]"
                aria-label="Close"
              >
                <X size={22} />
              </button>

            </div>

            <div className="mt-8 space-y-4 rounded-3xl bg-[#F8F6F2] p-6">

              <InfoRow
                title="Full Name"
                value={profile.full_name}
              />

              <InfoRow
                title="Username"
                value={profile.username}
              />

              <InfoRow
                title="Email"
                value={profile.email}
              />

              <InfoRow
                title="Selected Template"
                value={profile.template_id}
              />

              <InfoRow
                title="Job Title"
                value={profile.job_title}
              />

            </div>

            <div className="mt-7 rounded-2xl border border-[#DDD4C5] p-5">

              <p className="text-sm leading-7 text-[#6B7280]">
                By continuing, WhatsApp will open with your portfolio
                information already prepared. You can then communicate
                with us to complete the review and payment process.
              </p>

            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => setShowModal(false)}
                className="flex-1 rounded-2xl border border-[#D7D1C5] px-6 py-4 font-semibold text-[#4B5563] transition hover:bg-[#F8F6F2]"
              >
                Cancel
              </button>

              <button
                onClick={handleWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#8E77A8] px-6 py-4 font-semibold text-white transition hover:bg-[#7C6696]"
              >
                <MessageCircle size={20} />
                Continue to WhatsApp
              </button>

            </div>

          </div>

        </div>

      )}

    </>
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

/* =========================
   TIMELINE STEP
========================= */

function TimelineStep({
  number,
  title,
  description,
  last = false,
}: {
  number: string;
  title: string;
  description: string;
  last?: boolean;
}) {
  return (
    <div className="flex gap-5">

      <div className="flex flex-col items-center">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#8E77A8] font-bold text-white shadow-md">
          {number}
        </div>

        {!last && (
          <div className="mt-2 h-full min-h-10 w-px bg-[#DDD4C5]" />
        )}

      </div>

      <div className="pb-4">

        <h3 className="text-xl font-bold text-[#2F3A25]">
          {title}
        </h3>

        <p className="mt-2 leading-7 text-[#6B7280]">
          {description}
        </p>

      </div>

    </div>
  );
}

/* =========================
   INFO ROW
========================= */

function InfoRow({
  title,
  value,
}: {
  title: string;
  value: string | null;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#E5DED1] pb-4 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">

      <span className="text-sm font-medium text-[#6B7280]">
        {title}
      </span>

      <span className="break-all font-semibold text-[#2F3A25] sm:text-right">
        {value || "-"}
      </span>

    </div>
  );
}