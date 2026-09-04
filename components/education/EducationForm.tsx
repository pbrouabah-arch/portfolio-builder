"use client";

import { useState } from "react";

interface Props {
  onSubmit: (data: {
    institution: string;
    degree: string;
    field_of_study: string;
    start_date: string;
    end_date: string;
    grade: string;
    description: string;
  }) => Promise<void>;
}

export default function EducationForm({ onSubmit }: Props) {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [grade, setGrade] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    await onSubmit({
      institution,
      degree,
      field_of_study: fieldOfStudy,
      start_date: startDate,
      end_date: endDate,
      grade,
      description,
    });

    setInstitution("");
    setDegree("");
    setFieldOfStudy("");
    setStartDate("");
    setEndDate("");
    setGrade("");
    setDescription("");

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-bold text-[#4B543B]">
        Add Education
      </h2>

      <div className="space-y-5">

        <input
          value={institution}
          onChange={(e) => setInstitution(e.target.value)}
          placeholder="University"
          required
          className="w-full rounded-2xl border border-[#DDD4C5] p-4 text-[#4B543B] outline-none focus:border-[#8E77A8]"
        />

        <input
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="Degree"
          required
          className="w-full rounded-2xl border border-[#DDD4C5] p-4 text-[#4B543B] outline-none focus:border-[#8E77A8]"
        />

        <input
          value={fieldOfStudy}
          onChange={(e) => setFieldOfStudy(e.target.value)}
          placeholder="Field of Study"
          className="w-full rounded-2xl border border-[#DDD4C5] p-4 text-[#4B543B] outline-none focus:border-[#8E77A8]"
        />

        <div className="grid gap-4 md:grid-cols-2">

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-2xl border border-[#DDD4C5] p-4 text-[#4B543B] outline-none focus:border-[#8E77A8]"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-2xl border border-[#DDD4C5] p-4 text-[#4B543B] outline-none focus:border-[#8E77A8]"
          />

        </div>

        <input
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Grade"
          className="w-full rounded-2xl border border-[#DDD4C5] p-4 text-[#4B543B] outline-none focus:border-[#8E77A8]"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          rows={5}
          className="w-full rounded-2xl border border-[#DDD4C5] p-4 text-[#4B543B] outline-none focus:border-[#8E77A8]"
        />

        <button
          disabled={loading}
          className="w-full rounded-2xl bg-[#8E77A8] py-4 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Education"}
        </button>

      </div>

    </form>
  );
}