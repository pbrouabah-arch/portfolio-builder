"use client";

import { useEffect, useState } from "react";

import ProfileForm from "@/components/profile/ProfileForm";

import {
  Profile,
  getProfile,
  saveProfile,
} from "@/lib/profiles";

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      setProfile(data);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(data: Partial<Profile>) {
    await saveProfile(data);
    await loadProfile();
  }

  if (loading) {
    return (
      <main className="flex h-[70vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto mb-6 h-12 w-12 animate-spin rounded-full border-4 border-[#8E77A8] border-t-transparent"></div>

          <p className="text-gray-500">
            Loading profile...
          </p>

        </div>
      </main>
    );
  }

  return (
    <main className="space-y-10">

      <div>

        <h1 className="text-5xl font-bold text-[#4B543B]">
          Profile
        </h1>

        <p className="mt-3 text-gray-500">
          Complete your profile information.
        </p>

      </div>

      <ProfileForm
        profile={profile}
        onSave={handleSave}
      />

    </main>
  );
}
