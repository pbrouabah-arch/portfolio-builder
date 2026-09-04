"use client";

import { Trash2, Pencil } from "lucide-react";
import { Education } from "@/lib/education";

interface Props {
  education: Education;
  onDelete: (id: string) => void;
  onEdit?: (education: Education) => void;
}

export default function EducationCard({
  education,
  onDelete,
  onEdit,
}: Props) {
  return (
    <div className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm transition hover:shadow-lg">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-2xl font-bold text-[#4B543B]">
            {education.institution}
          </h2>

          <p className="mt-2 text-lg text-[#8E77A8]">
            {education.degree}
          </p>

          {education.field_of_study && (
            <p className="mt-2 text-gray-600">
              {education.field_of_study}
            </p>
          )}

          {(education.start_date || education.end_date) && (
            <p className="mt-4 text-sm text-gray-500">
              {education.start_date || "----"}{" "}
              {education.is_current
                ? "• Present"
                : education.end_date
                ? `→ ${education.end_date}`
                : ""}
            </p>
          )}

          {education.grade && (
            <p className="mt-2 font-medium text-[#4B543B]">
              Grade: {education.grade}
            </p>
          )}

          {education.description && (
            <p className="mt-5 leading-7 text-gray-600">
              {education.description}
            </p>
          )}

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit?.(education)}
            className="rounded-xl bg-[#F5F1E8] p-3 text-[#4B543B] transition hover:bg-[#E7E0D4]"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => onDelete(education.id)}
            className="rounded-xl bg-red-500 p-3 text-white transition hover:bg-red-600"
          >
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}