"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setMessage(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        const trialDate = new Date();
        trialDate.setDate(trialDate.getDate() + 7);

        await supabase.from("profiles").insert({
          id: data.user.id,
          email,
          username,
          full_name: fullName,
          trial_ends_at: trialDate.toISOString(),
          is_public: false,
        });
      }

      setMessage(
        "Account created successfully. Check your email to confirm your account."
      );

      setTimeout(() => {
        router.push("/login");
      }, 2500);
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {/* REGISTER CARD */}
        <form
          onSubmit={handleRegister}
          className="w-full rounded-3xl bg-white p-8 shadow-xl sm:p-10"
        >

          {/* TITLE */}
          <div className="mb-8">
            <h2 className="text-center text-4xl font-bold text-[#3F4A30]">
              Create Account
            </h2>

            <p className="mt-2 text-center text-sm text-[#6B7280]">
              Start building your portfolio today.
            </p>
          </div>

          {/* FULL NAME */}
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-[#3F4A30]"
            >
              Full Name
            </label>

            <input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              autoComplete="name"
              className="
                w-full
                rounded-xl
                border border-[#D8D2C8]
                bg-white
                px-4 py-4
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

          {/* USERNAME */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-[#3F4A30]"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="
                w-full
                rounded-xl
                border border-[#D8D2C8]
                bg-white
                px-4 py-4
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
                border border-[#D8D2C8]
                bg-white
                px-4 py-4
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

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                autoComplete="new-password"
                className="
                  w-full
                  rounded-xl
                  border border-[#D8D2C8]
                  bg-white
                  px-4 py-4
                  pr-12
                  text-[#2F3A25]
                  placeholder:text-[#9CA3AF]
                  outline-none
                  transition
                  focus:border-[#8E77A8]
                  focus:ring-2
                  focus:ring-[#8E77A8]/20
                "
              />

              {/* SHOW / HIDE PASSWORD */}
              <button
                type="button"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
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

            <p className="mt-2 text-xs text-[#8B8175]">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* MESSAGE */}
          {message && (
            <div
              className={`mb-5 rounded-xl border px-4 py-3 ${
                message.includes("successfully")
                  ? "border-green-200 bg-green-50"
                  : "border-red-200 bg-red-50"
              }`}
            >
              <p
                className={`text-center text-sm font-medium ${
                  message.includes("successfully")
                    ? "text-green-700"
                    : "text-red-600"
                }`}
              >
                {message}
              </p>
            </div>
          )}

          {/* CREATE ACCOUNT */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-[#8E77A8]
              px-4 py-4
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
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

          {/* LOGIN LINK */}
          <div className="mt-7 text-center">
            <p className="text-sm text-[#6B7280]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="
                  font-semibold
                  text-[#8E77A8]
                  transition
                  hover:text-[#6F5989]
                  hover:underline
                "
              >
                Login
              </Link>
            </p>
          </div>
        </form>

        {/* FOOTER */}
        <p className="mt-6 text-center text-xs text-[#8B8175]">
          Your work. Your story. Your portfolio.
          Check your inbox 📩
        </p>
       
         
        

      </div>
    </main>
  );
}