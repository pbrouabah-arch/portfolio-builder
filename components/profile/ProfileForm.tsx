"use client";

import { useEffect, useState } from "react";
import { Profile } from "@/lib/profiles";

interface Props {
  profile: Profile | null;
  onSave: (profile: Partial<Profile>) => Promise<void>;
}

export default function ProfileForm({ profile, onSave }: Props) {
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [about, setAbout] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    if (!profile) return;

    setFullName(profile.full_name || "");
    setUsername(profile.username || "");
    setJobTitle(profile.job_title || "");
    setAbout(profile.about || "");
    setCountry(profile.country || "");
    setCity(profile.city || "");
    setPhone(profile.phone || "");
    setWebsite(profile.website || "");
  }, [profile]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    await onSave({
      full_name: fullName,
      username,
      job_title: jobTitle,
      about,
      country,
      city,
      phone,
      website,
    });

    setLoading(false);

    alert("Profile saved successfully.");
  }

  const inputClass =
    "w-full rounded-2xl border border-[#CFC4B2] bg-white p-4 text-[#1F2937] placeholder:text-[#6B7280] outline-none transition focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-bold text-[#2F3A25]">
        Profile Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        <input
          required
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={inputClass}
        />

        <input
          required
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Job Title"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className={`${inputClass} md:col-span-2`}
        />

        <textarea
          placeholder="About Yourself"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={6}
          className={`${inputClass} md:col-span-2 resize-none`}
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-2xl bg-[#8E77A8] py-4 text-lg font-semibold text-white transition hover:bg-[#7C6696] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}