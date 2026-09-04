export default function FinalHero() {
  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-10 shadow-sm">

      <h1 className="text-5xl font-bold text-[#2F3A25]">
        Final Portfolio
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">

        <div>

          <h2 className="text-2xl font-semibold text-[#2F3A25]">
            🇺🇸 English
          </h2>

          <p className="mt-4 leading-8 text-[#6B7280]">
            Your portfolio is ready to be published.

            Complete your payment to receive your permanent portfolio link,
            payment receipt, and lifetime dashboard access.

            Future portfolio updates are available for only $5.
          </p>

        </div>

        <div dir="rtl">

          <h2 className="text-2xl font-semibold text-[#2F3A25]">
            🇩🇿 العربية
          </h2>

          <p className="mt-4 leading-8 text-[#6B7280]">
            أصبح البورتفوليو الخاص بك جاهزًا للنشر.

            بعد إتمام عملية الدفع ستحصل على الرابط النهائي،
            وفاتورة PDF،
            وستبقى لوحة التحكم متاحة لك بشكل دائم.

            ويمكنك نشر أي تعديلات مستقبلية مقابل 5 دولارات فقط.
          </p>

        </div>

      </div>

    </section>
  );
}