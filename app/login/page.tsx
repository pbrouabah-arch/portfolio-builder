"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDE7DD] px-6 py-10">
      <div className="w-full max-w-md">

        {/* SITE NAME */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-[0.08em] text-[#3F4A30]">
            PORTFOLIO STUDIO
          </h1>

          <p className="mt-2 text-sm font-medium text-[#6B7280]">
            Create a portfolio that represents you.
          </p>
        </div>

        {/* LOGIN CARD */}
        <form
          onSubmit={handleLogin}
          className="w-full rounded-3xl bg-white p-8 shadow-xl sm:p-10"
        >
          <div className="mb-8">
            <h2 className="text-center text-4xl font-bold text-[#3F4A30]">
              Welcome Back
            </h2>

            <p className="mt-2 text-center text-sm text-[#6B7280]">
              Sign in to continue building your portfolio.
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#3F4A30]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="
                w-full
                rounded-xl
                border
                border-[#D8D2C8]
                bg-white
                px-4
                py-4
                text-[#2F3A25]
                placeholder:text-[#9CA3AF]
                outline-none
                transition
                focus:border-[#8E77A8]
                focus:ring-2
                focus:ring-[#8E77A8]/20
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#3F4A30]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="
                w-full
                rounded-xl
                border
                border-[#D8D2C8]
                bg-white
                px-4
                py-4
                text-[#2F3A25]
                placeholder:text-[#9CA3AF]
                outline-none
                transition
                focus:border-[#8E77A8]
                focus:ring-2
                focus:ring-[#8E77A8]/20
              "
            />
          </div>

          {/* ERROR MESSAGE */}
          {message && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-center text-sm font-medium text-red-600">
                {message}
              </p>
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-[#8E77A8]
              px-4
              py-4
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#7C6597]
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          {/* REGISTER */}
          <div className="mt-7 text-center">
            <p className="text-sm text-[#6B7280]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#8E77A8] transition hover:text-[#6F5989] hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </form>

        {/* SMALL FOOTER */}
        <p className="mt-6 text-center text-xs text-[#8B8175]">
          Your work. Your story. Your portfolio.
        </p>
      </div>
    </main>
  );
}