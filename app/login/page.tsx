"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

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

    // After login, go to the Scholarships page
    router.push("/scholarships");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDE7DD] px-6 py-10">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-[0.08em] text-[#3F4A30]">
            PORTFOLIO STUDIO
          </h1>

          <p className="mt-2 text-sm font-medium text-[#6B7280]">
            Create a portfolio that represents you.
          </p>
        </div>

        {/* LOGIN FORM */}
        <form
          onSubmit={handleLogin}
          className="w-full rounded-3xl bg-white p-8 shadow-xl sm:p-10"
        >
          {/* TITLE */}
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-[#403547]">
              Welcome back
            </h2>

            <p className="mt-1 text-sm text-[#8B8175]">
              Log in to continue to your portfolio.
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#403547]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="
                w-full
                rounded-xl
                border
                border-[#DED8CF]
                bg-[#FAF9F7]
                px-4
                py-3.5
                text-[#403547]
                outline-none
                transition
                placeholder:text-[#B0A79E]
                focus:border-[#8E77A8]
                focus:ring-2
                focus:ring-[#8E77A8]/20
              "
            />
          </div>

          {/* PASSWORD */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-[#403547]"
            >
              Password
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#DED8CF]
                  bg-[#FAF9F7]
                  px-4
                  py-3.5
                  pr-12
                  text-[#403547]
                  outline-none
                  transition
                  placeholder:text-[#B0A79E]
                  focus:border-[#8E77A8]
                  focus:ring-2
                  focus:ring-[#8E77A8]/20
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  rounded-lg
                  p-2
                  text-[#8B8175]
                  transition
                  hover:bg-[#F3F0EA]
                  hover:text-[#8E77A8]
                "
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* MESSAGE */}
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
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* REGISTER LINK */}
          <div className="mt-7 text-center">
            <p className="text-sm text-[#6B7280]">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="
                  font-semibold
                  text-[#8E77A8]
                  transition
                  hover:text-[#6F5989]
                  hover:underline
                "
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-xs text-[#8B8175]">
          Your work. Your story. Your portfolio.
        </p>
      </div>
    </main>
  );
}