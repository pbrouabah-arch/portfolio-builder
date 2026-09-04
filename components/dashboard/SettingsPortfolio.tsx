"use client";

import { useEffect, useState } from "react";
import { getProfile, saveProfile } from "@/lib/profiles";

export default function SettingsPortfolio() {
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const profile = await getProfile();

      if (!profile) return;

      setUsername(profile.username);
      setIsPublic(profile.is_public);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggle() {
    const value = !isPublic;

    setIsPublic(value);

    try {
      await saveProfile({
        username,
        is_public: value,
      });
    } catch (error) {
      console.error(error);

      setIsPublic(!value);

      alert("Failed to update.");
    }
  }

  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Portfolio
      </h2>

      <p className="mt-2 text-[#6B7280]">
        Manage your public portfolio settings.
      </p>

      <div className="mt-10 space-y-8">

        <div>

          <label className="mb-2 block font-medium text-[#2F3A25]">
            Username
          </label>

          <input
            value={loading ? "Loading..." : username}
            disabled
            className="w-full rounded-2xl border border-[#CFC4B2] bg-[#F8F8F8] p-4"
          />

        </div>

        <hr className="border-[#E6E0D6]" />

        <div className="flex items-center justify-between">

          <div>

            <h3 className="font-semibold text-[#2F3A25]">
              Public Portfolio
            </h3>

            <p className="text-sm text-[#6B7280]">
              Anyone with your portfolio link can view it.
            </p>

          </div>

          <button
            onClick={handleToggle}
            className={`relative h-8 w-16 rounded-full transition ${
              isPublic
                ? "bg-[#8E77A8]"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                isPublic
                  ? "left-9"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        <hr className="border-[#E6E0D6]" />

        <div>

          <h3 className="font-semibold text-[#2F3A25]">
            Search Engine Indexing
          </h3>

          <p className="mt-2 text-[#6B7280]">
            Coming Soon
          </p>

        </div>

      </div>

    </section>
  );
}
