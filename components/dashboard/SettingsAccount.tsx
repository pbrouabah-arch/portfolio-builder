"use client";

export default function SettingsAccount() {
  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Account
      </h2>

      <p className="mt-2 text-[#6B7280]">
        Manage your email and password.
      </p>

      <div className="mt-10 space-y-8">

        <div>
          <label className="mb-2 block font-medium text-[#2F3A25]">
            Email
          </label>

          <input
            type="email"
            disabled
            placeholder="Loading..."
            className="w-full rounded-2xl border border-[#CFC4B2] bg-[#F8F8F8] p-4"
          />

          <button
            className="mt-4 rounded-2xl bg-[#8E77A8] px-6 py-3 font-semibold text-white transition hover:bg-[#7C6696]"
          >
            Change Email
          </button>
        </div>

        <hr className="border-[#E6E0D6]" />

        <div>

          <label className="mb-2 block font-medium text-[#2F3A25]">
            Password
          </label>

          <input
            type="password"
            disabled
            value="***************"
            className="w-full rounded-2xl border border-[#CFC4B2] bg-[#F8F8F8] p-4"
          />

          <button
            className="mt-4 rounded-2xl bg-[#2F3A25] px-6 py-3 font-semibold text-white transition hover:bg-[#25301E]"
          >
            Change Password
          </button>

        </div>

      </div>

    </section>
  );
}