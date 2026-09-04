"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  GraduationCap,
  X,
  Save,
} from "lucide-react";

import {
  createEducation,
  deleteEducation,
  getEducation,
  updateEducation,
  type Education,
} from "@/lib/education";

interface EducationForm {
  institution: string;
  degree: string;
  field_of_study: string;
  start_date: string;
  end_date: string;
  grade: string;
}

const emptyForm: EducationForm = {
  institution: "",
  degree: "",
  field_of_study: "",
  start_date: "",
  end_date: "",
  grade: "",
};

export default function EducationPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [form, setForm] = useState<EducationForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [error, setError] = useState("");

  useEffect(() => {
    loadEducation();
  }, []);

  async function loadEducation() {
    try {
      setLoading(true);
      setError("");

      const data = await getEducation();

      setEducation(data);
    } catch (err) {
      console.error("Failed to load education:", err);
      setError("Failed to load your education information.");
    } finally {
      setLoading(false);
    }
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
    setShowForm(true);
  }

  function openEditForm(item: Education) {
    setEditingId(item.id);

    setForm({
      institution: item.institution || "",
      degree: item.degree || "",
      field_of_study: item.field_of_study || "",
      start_date: item.start_date || "",
      end_date: item.end_date || "",
      grade: item.grade || "",
    });

    setError("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  function updateField(
    field: keyof EducationForm,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.institution.trim()) {
      setError("Institution is required.");
      return;
    }

    if (!form.degree.trim()) {
      setError("Degree is required.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      const payload = {
        institution: form.institution.trim(),
        degree: form.degree.trim(),
        field_of_study: form.field_of_study.trim(),
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        grade: form.grade.trim() || null,
      };

      if (editingId) {
        await updateEducation(editingId, payload);
      } else {
        await createEducation(payload);
      }

      await loadEducation();

      closeForm();
    } catch (err) {
      console.error(
        "Failed to save education:",
        err
      );

      setError(
        "Failed to save your education information."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education record?"
    );

    if (!confirmed) return;

    try {
      setError("");

      await deleteEducation(id);

      setEducation((previous) =>
        previous.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(
        "Failed to delete education:",
        err
      );

      setError(
        "Failed to delete the education record."
      );
    }
  }

  return (
    <main className="space-y-10 pb-16">

      {/* ================================================= */}
      {/* HEADER                                            */}
      {/* ================================================= */}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E7DDF0] text-[#8E77A8]">
              <GraduationCap size={25} />
            </div>

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8E77A8]">
              Education
            </span>
          </div>

          <h1 className="text-5xl font-bold text-[#2F3A25]">
            Your Education
          </h1>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-[#6B7280]">
            Add your academic background and keep
            your portfolio up to date.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="
            flex
            shrink-0
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-[#2F3A25]
            px-6
            py-3.5
            font-semibold
            text-white
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:bg-[#25301E]
            hover:shadow-lg
          "
        >
          <Plus size={20} />
          Add Education
        </button>

      </div>

      {/* ================================================= */}
      {/* ERROR                                             */}
      {/* ================================================= */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* ================================================= */}
      {/* FORM                                              */}
      {/* ================================================= */}

      {showForm && (
        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-6 shadow-sm lg:p-8">

          <div className="mb-8 flex items-start justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold text-[#2F3A25]">
                {editingId
                  ? "Edit Education"
                  : "Add Education"}
              </h2>

              <p className="mt-1 text-[#6B7280]">
                Add the academic information you want
                to show in your portfolio.
              </p>
            </div>

            <button
              type="button"
              onClick={closeForm}
              disabled={saving}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-[#F5F1E8]
                text-[#4B543B]
                transition
                hover:bg-[#E7DDF0]
              "
            >
              <X size={20} />
            </button>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            <div className="grid gap-6 md:grid-cols-2">

              {/* Institution */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4B543B]">
                  Institution
                </label>

                <input
                  type="text"
                  value={form.institution}
                  onChange={(event) =>
                    updateField(
                      "institution",
                      event.target.value
                    )
                  }
                  placeholder="University or school"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#DDD4C5]
                    bg-[#FCFAF6]
                    px-4
                    py-3.5
                    text-[#2F3A25]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#8E77A8]
                    focus:ring-4
                    focus:ring-[#8E77A8]/10
                  "
                  required
                />
              </div>

              {/* Degree */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4B543B]">
                  Degree
                </label>

                <input
                  type="text"
                  value={form.degree}
                  onChange={(event) =>
                    updateField(
                      "degree",
                      event.target.value
                    )
                  }
                  placeholder="Bachelor's degree"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#DDD4C5]
                    bg-[#FCFAF6]
                    px-4
                    py-3.5
                    text-[#2F3A25]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#8E77A8]
                    focus:ring-4
                    focus:ring-[#8E77A8]/10
                  "
                  required
                />
              </div>

              {/* Field of study */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#4B543B]">
                  Field of Study
                </label>

                <input
                  type="text"
                  value={form.field_of_study}
                  onChange={(event) =>
                    updateField(
                      "field_of_study",
                      event.target.value
                    )
                  }
                  placeholder="Computer Science"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#DDD4C5]
                    bg-[#FCFAF6]
                    px-4
                    py-3.5
                    text-[#2F3A25]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#8E77A8]
                    focus:ring-4
                    focus:ring-[#8E77A8]/10
                  "
                />
              </div>

              {/* Start date */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4B543B]">
                  Start Date
                </label>

                <input
                  type="date"
                  value={form.start_date}
                  onChange={(event) =>
                    updateField(
                      "start_date",
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#DDD4C5]
                    bg-[#FCFAF6]
                    px-4
                    py-3.5
                    text-[#2F3A25]
                    outline-none
                    transition
                    focus:border-[#8E77A8]
                    focus:ring-4
                    focus:ring-[#8E77A8]/10
                  "
                />
              </div>

              {/* End date */}

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#4B543B]">
                  End Date
                </label>

                <input
                  type="date"
                  value={form.end_date}
                  onChange={(event) =>
                    updateField(
                      "end_date",
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#DDD4C5]
                    bg-[#FCFAF6]
                    px-4
                    py-3.5
                    text-[#2F3A25]
                    outline-none
                    transition
                    focus:border-[#8E77A8]
                    focus:ring-4
                    focus:ring-[#8E77A8]/10
                  "
                />
              </div>

              {/* Grade */}

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#4B543B]">
                  Grade
                </label>

                <input
                  type="text"
                  value={form.grade}
                  onChange={(event) =>
                    updateField(
                      "grade",
                      event.target.value
                    )
                  }
                  placeholder="Optional"
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-[#DDD4C5]
                    bg-[#FCFAF6]
                    px-4
                    py-3.5
                    text-[#2F3A25]
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-[#8E77A8]
                    focus:ring-4
                    focus:ring-[#8E77A8]/10
                  "
                />
              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-col-reverse gap-3 border-t border-[#EEE8DE] pt-6 sm:flex-row sm:justify-end">

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="
                  rounded-2xl
                  border
                  border-[#DDD4C5]
                  px-6
                  py-3
                  font-semibold
                  text-[#4B543B]
                  transition
                  hover:bg-[#F5F1E8]
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-[#8E77A8]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#7C6597]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <Save size={18} />

                {saving
                  ? "Saving..."
                  : editingId
                  ? "Save Changes"
                  : "Add Education"}
              </button>

            </div>

          </form>

        </div>
      )}

      {/* ================================================= */}
      {/* EDUCATION LIST                                    */}
      {/* ================================================= */}

      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center rounded-3xl border border-[#DDD4C5] bg-white">
          <div className="text-center">

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#DDD4C5] border-t-[#8E77A8]" />

            <p className="mt-4 text-[#6B7280]">
              Loading education...
            </p>

          </div>
        </div>
      ) : education.length === 0 ? (

        <div className="rounded-3xl border border-dashed border-[#D7CDBE] bg-white p-12 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E7DDF0] text-[#8E77A8]">
            <GraduationCap size={30} />
          </div>

          <h2 className="mt-6 text-2xl font-bold text-[#2F3A25]">
            No education added yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-[#6B7280]">
            Add your academic background to display
            it in your portfolio.
          </p>

          <button
            type="button"
            onClick={openCreateForm}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-[#2F3A25]
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-[#25301E]
            "
          >
            <Plus size={19} />
            Add Education
          </button>

        </div>

      ) : (

        <div className="grid gap-6">

          {education.map((item) => (

            <article
              key={item.id}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-[#DDD4C5]
                bg-white
                p-6
                shadow-sm
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-lg
                lg:p-8
              "
            >

              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

                <div className="flex min-w-0 gap-5">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E7DDF0] text-[#8E77A8]">
                    <GraduationCap size={27} />
                  </div>

                  <div className="min-w-0">

                    <h2 className="text-2xl font-bold text-[#2F3A25]">
                      {item.institution}
                    </h2>

                    <p className="mt-1 text-lg font-semibold text-[#8E77A8]">
                      {item.degree}
                    </p>

                    {item.field_of_study && (
                      <p className="mt-1 text-[#6B7280]">
                        {item.field_of_study}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">

                      {item.start_date && (
                        <span className="rounded-full bg-[#F5F1E8] px-3 py-1 text-sm font-medium text-[#5E6B43]">
                          {formatDate(item.start_date)}
                        </span>
                      )}

                      {item.end_date && (
                        <span className="rounded-full bg-[#F5F1E8] px-3 py-1 text-sm font-medium text-[#5E6B43]">
                          {formatDate(item.end_date)}
                        </span>
                      )}

                      {item.grade && (
                        <span className="rounded-full bg-[#E7DDF0] px-3 py-1 text-sm font-medium text-[#6B5189]">
                          Grade: {item.grade}
                        </span>
                      )}

                    </div>

                  </div>

                </div>

                <div className="flex shrink-0 gap-2">

                  <button
                    type="button"
                    onClick={() =>
                      openEditForm(item)
                    }
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#DDD4C5]
                      text-[#4B543B]
                      transition
                      hover:border-[#8E77A8]
                      hover:bg-[#E7DDF0]
                      hover:text-[#6B5189]
                    "
                    aria-label="Edit education"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-red-100
                      text-red-500
                      transition
                      hover:bg-red-50
                    "
                    aria-label="Delete education"
                  >
                    <Trash2 size={17} />
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      )}

    </main>
  );
}

function formatDate(
  value: string
): string {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(date);
}