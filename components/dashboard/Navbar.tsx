"use client";

import { useEffect, useState } from "react";
import { Search, UserCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { getProfile, type Profile } from "@/lib/profiles";

export default function Navbar() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

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

  const fullName = profile?.full_name || "User";

  const jobTitle =
    profile?.job_title || "Portfolio Creator";

  const avatarUrl =
    profile?.avatar_url || null;

  return (
    <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between gap-6 border-b border-[#DDD4C5] bg-[#F5F1E8]/90 px-6 py-3 backdrop-blur-lg lg:px-10">

      {/* Left side */}
      <div className="min-w-0">
        <h2 className="truncate text-2xl font-bold text-[#4B543B] lg:text-3xl">
          Good afternoon,{" "}
          {loading
            ? "..."
            : fullName.split(" ")[0]}{" "}
          
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Let's make your portfolio stand out.
        </p>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-3 lg:gap-5">

        {/* User */}
        <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-sm lg:px-4">

          {/* Avatar */}
          {avatarUrl ? (
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#8E77A8]/30">
              <Image
                src={avatarUrl}
                alt={fullName}
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
          ) : (
            <UserCircle
              size={40}
              className="text-[#8E77A8]"
            />
          )}

          {/* User information */}
          <div className="hidden md:block">
            <h3 className="max-w-32 truncate font-semibold text-[#4B543B]">
              {loading ? "Loading..." : fullName}
            </h3>

            <p className="max-w-32 truncate text-sm text-gray-500">
              {loading ? "..." : jobTitle}
            </p>
          </div>

        </div>

      </div>
    </header>
  );
}