"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  UserCircle,
} from "lucide-react";
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

  function openMobileSidebar() {
    window.dispatchEvent(new Event("toggle-mobile-sidebar"));
  }

  const fullName = profile?.full_name || "User";

  const jobTitle =
    profile?.job_title || "Portfolio Creator";

  const avatarUrl =
    profile?.avatar_url || null;

  return (
    <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between gap-4 border-b border-[#DDD4C5] bg-[#F5F1E8]/90 px-4 py-3 backdrop-blur-lg sm:px-6 lg:px-10">
      {/* Left side */}
      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={openMobileSidebar}
          aria-label="Open sidebar"
          className="flex shrink-0 items-center justify-center rounded-xl bg-white p-2.5 text-[#4B543B] shadow-sm transition hover:bg-[#EDE8DD] lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-[#4B543B] sm:text-2xl lg:text-3xl">
            Take a look around,{" "}
            {loading
              ? "..."
              : fullName.split(" ")[0]}
          </h2>

          <p className="mt-1 hidden text-sm text-gray-500 sm:block">
            Let's make your portfolio stand out.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex shrink-0 items-center gap-3 lg:gap-5">
        {/* User */}
        <div className="flex items-center gap-2 rounded-2xl bg-white px-2.5 py-2 shadow-sm sm:gap-3 sm:px-3 lg:px-4">
          {/* Avatar */}
          {avatarUrl ? (
            <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-[#8E77A8]/30 sm:h-10 sm:w-10">
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
              size={36}
              className="text-[#8E77A8] sm:h-10 sm:w-10"
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