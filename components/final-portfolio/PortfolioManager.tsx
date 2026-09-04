export default function PortfolioManager() {
  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-10 shadow-sm">

      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Portfolio Updates
      </h2>

      <p className="mt-4 text-[#6B7280]">
        Already purchased your portfolio?
        Publish your latest edits for only $5.
      </p>

      <div className="mt-8">

        <textarea
          rows={6}
          placeholder="Describe what has changed..."
          className="
            w-full
            rounded-2xl
            border
            border-[#DDD4C5]
            p-5
            outline-none
            focus:border-[#8E77A8]
          "
        />

      </div>

      <button
        className="
          mt-8
          rounded-3xl
          bg-[#2F3A25]
          px-10
          py-4
          font-bold
          text-white
          transition
          hover:bg-[#23301C]
        "
      >
        Request Portfolio Update ($5)
      </button>

    </section>
  );
}