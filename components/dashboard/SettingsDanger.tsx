export default function SettingsDanger() {
  return (
    <section className="rounded-3xl border border-red-200 bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold text-red-600">
        Danger Zone
      </h2>

      <p className="mt-2 text-gray-500">
        These actions cannot be undone.
      </p>

      <div className="mt-10 space-y-6">

        <div className="flex items-center justify-between rounded-2xl border border-red-100 p-6">

          <div>

            <h3 className="font-semibold text-[#2F3A25]">
              Delete Portfolio
            </h3>

            <p className="text-sm text-gray-500">
              Remove all portfolio data permanently.
            </p>

          </div>

          <button
            disabled
            className="cursor-not-allowed rounded-2xl bg-red-500 px-6 py-3 font-semibold text-white opacity-50"
          >
            Coming Soon
          </button>

        </div>

        <div className="flex items-center justify-between rounded-2xl border border-red-100 p-6">

          <div>

            <h3 className="font-semibold text-[#2F3A25]">
              Delete Account
            </h3>

            <p className="text-sm text-gray-500">
              Permanently delete your account.
            </p>

          </div>

          <button
            disabled
            className="cursor-not-allowed rounded-2xl bg-red-700 px-6 py-3 font-semibold text-white opacity-50"
          >
            Coming Soon
          </button>

        </div>

      </div>

    </section>
  );
}