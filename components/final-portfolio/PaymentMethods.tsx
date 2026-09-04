"use client";

import { CreditCard } from "lucide-react";
import { Landmark } from "lucide-react";
import { useState } from "react";

export default function PaymentMethods() {
  const [method, setMethod] = useState("visa");

  return (
    <section className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">

      <h2 className="text-3xl font-bold text-[#2F3A25]">
        Payment Method
      </h2>

      <p className="mt-3 text-[#6B7280]">
        Select your preferred payment method.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <button
          onClick={() => setMethod("visa")}
          className={`rounded-3xl border p-8 text-left transition ${
            method === "visa"
              ? "border-[#8E77A8] ring-2 ring-[#8E77A8]"
              : "border-[#DDD4C5]"
          }`}
        >
          <CreditCard
            className="mb-5 text-[#8E77A8]"
            size={45}
          />

          <h3 className="text-2xl font-bold">
            Visa / Mastercard
          </h3>

          <p className="mt-3 text-[#6B7280]">
            Pay securely in USD.
          </p>

        </button>

        <button
          onClick={() => setMethod("edahabia")}
          className={`rounded-3xl border p-8 text-left transition ${
            method === "edahabia"
              ? "border-[#8E77A8] ring-2 ring-[#8E77A8]"
              : "border-[#DDD4C5]"
          }`}
        >
          <Landmark
            className="mb-5 text-[#8E77A8]"
            size={45}
          />

          <h3 className="text-2xl font-bold">
            Carte Edahabia
          </h3>

          <p className="mt-3 text-[#6B7280]">
            الدفع بالدينار الجزائري.
          </p>

        </button>

      </div>

    </section>
  );
}