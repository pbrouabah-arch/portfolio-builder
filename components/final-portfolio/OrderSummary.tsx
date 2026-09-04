export default function OrderSummary() {
  return (
    <section className="sticky top-8 rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Order Summary
      </h2>

      <div className="mt-8 space-y-6">

        <SummaryRow
          title="Template"
          value="Modern"
        />

        <SummaryRow
          title="Portfolio Price"
          value="$10"
        />

        <SummaryRow
          title="Future Update"
          value="$5"
        />

        <SummaryRow
          title="Status"
          value="Waiting For Payment"
        />

      </div>

    </section>
  );
}

function SummaryRow({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">

      <span className="text-[#6B7280]">
        {title}
      </span>

      <span className="font-semibold text-[#2F3A25]">
        {value}
      </span>

    </div>
  );
}