export default function PaymentAction() {
  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-10 shadow-sm">

      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Complete Payment
      </h2>

      <p className="mt-4 text-[#6B7280]">
        After completing your payment you will instantly receive:

      </p>

      <ul className="mt-8 space-y-4 text-[#5F6A55]">

        <li>✅ Permanent Portfolio Link</li>

        <li>✅ PDF Payment Receipt</li>

        <li>✅ Lifetime Dashboard Access</li>

        <li>✅ Portfolio Update Option ($5)</li>

      </ul>

      <button
        className="
          mt-10
          w-full
          rounded-3xl
          bg-[#8E77A8]
          py-5
          text-xl
          font-bold
          text-white
          transition
          hover:bg-[#7D6697]
        "
      >
        Complete Payment
      </button>

    </section>
  );
}