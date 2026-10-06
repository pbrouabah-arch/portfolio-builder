"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getProfile } from "@/lib/profiles";

export default function PortfolioManager() {
  const [username, setUsername] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [publicUrl, setPublicUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getProfile();

        if (!profile) {
          setError("Profile not found.");
          return;
        }

        setUsername(profile.username);

        const published = profile.is_public === true;

        setIsPublished(published);

        if (published && profile.username) {
          setPublicUrl(
            `${window.location.origin}/u/${profile.username}`
          );
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load your portfolio.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function publishPortfolio() {
    if (!username) {
      setError("Username not found.");
      return;
    }

    setPublishing(true);
    setError("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("You must be logged in to publish your portfolio.");
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

      const url = `${window.location.origin}/u/${username}`;

      setPublicUrl(url);
      setIsPublished(true);
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while publishing your portfolio."
      );
    } finally {
      setPublishing(false);
    }
  }

  async function copyLink() {
    if (!publicUrl) return;

    try {
      await navigator.clipboard.writeText(publicUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      setError("Unable to copy the link.");
    }
  }

  if (loading) {
    return (
      <section className="rounded-3xl border border-[#DDD4C5] bg-white p-10 shadow-sm">
        <p className="text-[#6B7280]">
          Loading your portfolio...
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-10 shadow-sm">
      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Publish Your Portfolio
      </h2>

      {!isPublished ? (
        <>
          <p className="mt-4 leading-8 text-[#6B7280]">
            Your portfolio is ready.
            <br />
            Publish it to make it publicly accessible through your personal
            portfolio link.
          </p>

          <div dir="rtl" className="mt-6">
            <p className="leading-8 text-[#6B7280]">
              بورتفوليو الخاص بك جاهز للنشر.
              <br />
              اضغط على الزر أدناه لجعله متاحًا للعامة والحصول على رابطك
              الخاص.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            onClick={publishPortfolio}
            disabled={publishing}
            className="
              mt-8
              rounded-3xl
              bg-[#2F3A25]
              px-10
              py-4
              font-bold
              text-white
              transition
              hover:bg-[#23301C]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {publishing ? "Publishing..." : "Publish My Portfolio"}
          </button>
        </>
      ) : (
        <>
          <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-5">
            <p className="font-semibold text-green-700">
              ✓ Your portfolio is published!
            </p>

            <p className="mt-2 text-sm text-green-700">
              Your portfolio is now publicly accessible.
            </p>
          </div>

          <div className="mt-8">
            <label className="text-sm font-semibold text-[#2F3A25]">
              Your Portfolio Link
            </label>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={publicUrl}
                readOnly
                className="
                  min-w-0
                  flex-1
                  rounded-2xl
                  border
                  border-[#DDD4C5]
                  bg-[#FAF8F4]
                  px-5
                  py-4
                  text-sm
                  text-[#6B7280]
                  outline-none
                "
              />

              <button
                onClick={copyLink}
                className="
                  rounded-2xl
                  border
                  border-[#2F3A25]
                  px-6
                  py-4
                  font-semibold
                  text-[#2F3A25]
                  transition
                  hover:bg-[#2F3A25]
                  hover:text-white
                "
              >
                {copied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                rounded-3xl
                bg-[#2F3A25]
                px-10
                py-4
                text-center
                font-bold
                text-white
                transition
                hover:bg-[#23301C]
              "
            >
              Open Portfolio
            </a>

            <a
              href="/dashboard"
              className="
                rounded-3xl
                border
                border-[#DDD4C5]
                px-10
                py-4
                text-center
                font-bold
                text-[#2F3A25]
                transition
                hover:bg-[#F7F3EC]
              "
            >
              Back to Dashboard
            </a>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </>
      )}
    </section>
  );
}