export default function FinalHero() {
  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-10 shadow-sm">
      <h1 className="text-5xl font-bold text-[#2F3A25]">
        Final Portfolio
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* English */}
        <div>
          <h2 className="text-2xl font-semibold text-[#2F3A25]">
            🇺🇸 English
          </h2>

          <p className="mt-4 leading-8 text-[#6B7280]">
            Your portfolio is ready to be published.
            <br />
            <br />
            Click the publish button below to make your portfolio publicly
            available and receive your permanent portfolio link.
            <br />
            <br />
            You can continue managing your portfolio from your dashboard.
          </p>
        </div>

        {/* Arabic */}
        <div dir="rtl">
          <h2 className="text-2xl font-semibold text-[#2F3A25]">
            🇩🇿 العربية
          </h2>

          <p className="mt-4 leading-8 text-[#6B7280]">
            أصبح البورتفوليو الخاص بك جاهزًا للنشر.
            <br />
            <br />
            اضغط على زر النشر أدناه لجعل البورتفوليو متاحًا للعامة والحصول
            على رابط البورتفوليو الخاص بك.
            <br />
            <br />
            يمكنك الاستمرار في إدارة وتعديل البورتفوليو من لوحة التحكم.
          </p>
        </div>
      </div>
    </section>
  );
}