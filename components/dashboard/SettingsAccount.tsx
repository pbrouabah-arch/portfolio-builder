"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SettingsAccount() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingUsername, setSavingUsername] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadAccount();
  }, []);

  async function loadAccount() {
    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("User not found.");
      setLoading(false);
      return;
    }

    setEmail(user.email ?? "");

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (profileError) {
      
      setError("Could not load your username.");
    } else {
      setUsername(profile?.username ?? "");
      setOriginalUsername(profile?.username ?? "");
    }

    setLoading(false);
  }

  async function handleUsernameUpdate() {
    setMessage("");
    setError("");

    const cleanUsername = username.trim();

    if (!cleanUsername) {
      setError("Username cannot be empty.");
      return;
    }

    if (cleanUsername === originalUsername) {
      setMessage("Your username is already up to date.");
      return;
    }

    setSavingUsername(true);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not found.");
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          username: cleanUsername,
        })
        .eq("id", user.id);

      if (updateError) {
        if (updateError.code === "23505") {
          throw new Error("This username is already taken.");
        }

        throw updateError;
      }

      setUsername(cleanUsername);
      setOriginalUsername(cleanUsername);
      setMessage("Username updated successfully.");
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while updating your username."
      );
    } finally {
      setSavingUsername(false);
    }
  }

  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Account
      </h2>

      <p className="mt-2 text-[#4B5563]">
        Manage your account information and username.
      </p>

      <div className="mt-10 space-y-8">
        {/* Email */}
        <div>
          <label className="mb-2 block font-semibold text-[#2F3A25]">
            Email
          </label>

          <input
            type="email"
            disabled
            value={loading ? "" : email}
            placeholder={loading ? "Loading..." : "Your email"}
            className="w-full rounded-2xl border border-[#CFC4B2] bg-[#F5F3EF] p-4 text-[#2F3A25] outline-none placeholder:text-[#6B7280]"
          />

          <p className="mt-2 text-sm text-[#5F6368]">
            Your email address is connected to your account.
          </p>
        </div>

        <hr className="border-[#E6E0D6]" />

        {/* Username */}
        <div>
          <label className="mb-2 block font-semibold text-[#2F3A25]">
            Username
          </label>

          <input
            type="text"
            value={username}
            disabled={loading || savingUsername}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full rounded-2xl border border-[#CFC4B2] bg-white p-4 text-[#2F3A25] outline-none transition placeholder:text-[#6B7280] focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/20 disabled:bg-[#F5F3EF]"
          />

          <p className="mt-2 text-sm text-[#5F6368]">
            This username is used for your public portfolio URL.
          </p>

          <button
            type="button"
            onClick={handleUsernameUpdate}
            disabled={loading || savingUsername || !username.trim()}
            className="mt-4 rounded-2xl bg-[#8E77A8] px-6 py-3 font-semibold text-white transition hover:bg-[#7C6696] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {savingUsername ? "Saving..." : "Change Username"}
          </button>
        </div>

        <hr className="border-[#E6E0D6]" />

        {/* Password */}
        <div>
          <label className="mb-2 block font-semibold text-[#2F3A25]">
            Password
          </label>

          <input
            type="password"
            disabled
            value="***************"
            className="w-full rounded-2xl border border-[#CFC4B2] bg-[#F5F3EF] p-4 text-[#2F3A25]"
          />

          <button
            type="button"
            className="mt-4 rounded-2xl bg-[#2F3A25] px-6 py-3 font-semibold text-white transition hover:bg-[#25301E]"
          >
            Change Password
          </button>
        </div>

        {/* Messages */}
        {message && (
          <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
      </div>
    </section>
  );
}