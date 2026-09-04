"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Briefcase,
  CalendarDays,
  MapPin,
} from "lucide-react";

import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "@/lib/experience";

interface Experience {
  id: string;
  user_id: string;
  company: string;
  position: string;
  location?: string | null;
  employment_type?: string | null;
  start_date?: string | null;
  end_date?: string | null;
  is_current: boolean;
  description?: string | null;
  display_order?: number | null;
  created_at?: string;
  updated_at?: string;
}

interface FormData {
  company: string;
  position: string;
  location: string;
  employment_type: string;
  start_date: string;
  end_date: string;
  is_current: boolean;
  description: string;
}

const emptyForm: FormData = {
  company: "",
  position: "",
  location: "",
  employment_type: "",
  start_date: "",
  end_date: "",
  is_current: false,
  description: "",
};

export default function ExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingExperience, setEditingExperience] =
    useState<Experience | null>(null);

  const [form, setForm] = useState<FormData>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState("");

  /*
   * Load experiences
   */
  useEffect(() => {
    loadExperiences();
  }, []);

  /*
   * Prevent the dashboard from scrolling
   * while the modal is open.
   */
  useEffect(() => {
    if (!modalOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [modalOpen]);

  /*
   * Close modal with Escape
   */
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (
        event.key === "Escape" &&
        modalOpen &&
        !saving
      ) {
        closeModal();
      }
    }

    if (modalOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [modalOpen, saving]);

  async function loadExperiences() {
    try {
      setLoading(true);
      setError("");

      const data = await getExperiences();

      setExperiences(data || []);
    } catch (err) {
      console.error(
        "Failed to load experiences:",
        err
      );

      setError("Failed to load experiences.");
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingExperience(null);
    setForm({ ...emptyForm });
    setError("");
    setModalOpen(true);
  }

  function openEditModal(
    experience: Experience
  ) {
    setEditingExperience(experience);

    setForm({
      company: experience.company || "",
      position: experience.position || "",
      location: experience.location || "",
      employment_type:
        experience.employment_type || "",
      start_date:
        experience.start_date || "",
      end_date:
        experience.end_date || "",
      is_current:
        experience.is_current || false,
      description:
        experience.description || "",
    });

    setError("");
    setModalOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingExperience(null);
    setForm({ ...emptyForm });
    setError("");
  }

  function updateForm<K extends keyof FormData>(
    field: K,
    value: FormData[K]
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

    if (!form.company.trim()) {
      setError("Please enter the company name.");
      return;
    }

    if (!form.position.trim()) {
      setError("Please enter your position.");
      return;
    }

    if (!form.start_date) {
      setError("Please select a start date.");
      return;
    }

    if (
      !form.is_current &&
      !form.end_date
    ) {
      setError(
        "Please select an end date or mark this experience as current."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const payload = {
        company: form.company.trim(),

        position: form.position.trim(),

        location:
          form.location.trim() || undefined,

        employment_type:
          form.employment_type.trim() ||
          undefined,

        start_date:
          form.start_date || undefined,

        end_date: form.is_current
          ? undefined
          : form.end_date || undefined,

        is_current:
          form.is_current,

        description:
          form.description.trim() ||
          undefined,
      };

      if (editingExperience) {
        await updateExperience(
          editingExperience.id,
          payload
        );
      } else {
        await createExperience(payload);
      }

      await loadExperiences();

      closeModal();
    } catch (err) {
      console.error(
        "Failed to save experience:",
        err
      );

      setError(
        "Failed to save experience. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    id: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      await deleteExperience(id);

      setExperiences((previous) =>
        previous.filter(
          (experience) =>
            experience.id !== id
        )
      );
    } catch (err) {
      console.error(
        "Failed to delete experience:",
        err
      );

      alert(
        "Failed to delete experience. Please try again."
      );
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(
    date?: string | null
  ) {
    if (!date) return "";

    const parsed = new Date(date);

    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {
      return date;
    }

    return parsed.toLocaleDateString(
      "en-US",
      {
        month: "short",
        year: "numeric",
      }
    );
  }

  /*
   * =========================================================
   * MODAL
   * =========================================================
   *
   * IMPORTANT:
   *
   * The modal is rendered directly inside document.body
   * using createPortal().
   *
   * This prevents:
   *
   * Dashboard Navbar
   * Sidebar
   * Dashboard containers
   * z-index contexts
   *
   * from covering the modal.
   */

  const modal =
    modalOpen &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            className="
              fixed
              inset-0
              z-[999999]
              flex
              h-[100dvh]
              w-screen
              items-center
              justify-center
              overflow-y-auto
              bg-black/60
              p-4
              backdrop-blur-sm
              sm:p-6
            "
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
            }}
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeModal();
              }
            }}
          >
            <div
              className="
                relative
                z-[1000000]
                my-auto
                w-full
                max-w-2xl
                overflow-hidden
                rounded-3xl
                bg-[#F8F6F2]
                shadow-2xl
              "
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >
              {/* ================================================= */}
              {/* MODAL HEADER                                      */}
              {/* ================================================= */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#DDD4C5]
                  bg-white
                  px-6
                  py-5
                  sm:px-8
                "
              >
                <div>
                  <h2 className="text-2xl font-bold text-[#2F3A25]">
                    {editingExperience
                      ? "Edit Experience"
                      : "Add Experience"}
                  </h2>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    {editingExperience
                      ? "Update your experience details."
                      : "Add a professional experience to your portfolio."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    text-[#6B7280]
                    transition
                    hover:bg-[#F3F0EA]
                    hover:text-[#2F3A25]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                  aria-label="Close modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* ================================================= */}
              {/* FORM                                              */}
              {/* ================================================= */}

              <form
                onSubmit={handleSubmit}
                className="
                  max-h-[calc(100dvh-120px)]
                  overflow-y-auto
                "
              >
                <div className="space-y-5 p-6 sm:p-8">

                  {/* ERROR */}

                  {error && (
                    <div
                      className="
                        rounded-2xl
                        border
                        border-red-200
                        bg-red-50
                        px-4
                        py-3
                        text-sm
                        text-red-600
                      "
                    >
                      {error}
                    </div>
                  )}

                  {/* COMPANY */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-[#2F3A25]
                      "
                    >
                      Company
                    </label>

                    <input
                      type="text"
                      value={form.company}
                      onChange={(event) =>
                        updateForm(
                          "company",
                          event.target.value
                        )
                      }
                      placeholder="Company name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#DDD4C5]
                        bg-white
                        px-4
                        py-3
                        text-[#2F3A25]
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-[#8E77A8]
                        focus:ring-2
                        focus:ring-[#8E77A8]/10
                      "
                      required
                    />
                  </div>

                  {/* POSITION */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-[#2F3A25]
                      "
                    >
                      Position
                    </label>

                    <input
                      type="text"
                      value={form.position}
                      onChange={(event) =>
                        updateForm(
                          "position",
                          event.target.value
                        )
                      }
                      placeholder="Your position or role"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#DDD4C5]
                        bg-white
                        px-4
                        py-3
                        text-[#2F3A25]
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-[#8E77A8]
                        focus:ring-2
                        focus:ring-[#8E77A8]/10
                      "
                      required
                    />
                  </div>

                  {/* LOCATION + TYPE */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        className="
                          mb-2
                          block
                          text-sm
                          font-semibold
                          text-[#2F3A25]
                        "
                      >
                        Location
                      </label>

                      <input
                        type="text"
                        value={form.location}
                        onChange={(event) =>
                          updateForm(
                            "location",
                            event.target.value
                          )
                        }
                        placeholder="Algiers, Algeria"
                        className="
                          w-full
                          rounded-xl
                          border
                          border-[#DDD4C5]
                          bg-white
                          px-4
                          py-3
                          text-[#2F3A25]
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-[#8E77A8]
                          focus:ring-2
                          focus:ring-[#8E77A8]/10
                        "
                      />
                    </div>

                    <div>
                      <label
                        className="
                          mb-2
                          block
                          text-sm
                          font-semibold
                          text-[#2F3A25]
                        "
                      >
                        Employment Type
                      </label>

                      <input
                        type="text"
                        value={
                          form.employment_type
                        }
                        onChange={(event) =>
                          updateForm(
                            "employment_type",
                            event.target.value
                          )
                        }
                        placeholder="Internship, Full-time..."
                        className="
                          w-full
                          rounded-xl
                          border
                          border-[#DDD4C5]
                          bg-white
                          px-4
                          py-3
                          text-[#2F3A25]
                          outline-none
                          transition
                          placeholder:text-gray-400
                          focus:border-[#8E77A8]
                          focus:ring-2
                          focus:ring-[#8E77A8]/10
                        "
                      />
                    </div>

                  </div>

                  {/* DATES */}

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div>
                      <label
                        className="
                          mb-2
                          block
                          text-sm
                          font-semibold
                          text-[#2F3A25]
                        "
                      >
                        Start Date
                      </label>

                      <input
                        type="date"
                        value={
                          form.start_date
                        }
                        onChange={(event) =>
                          updateForm(
                            "start_date",
                            event.target.value
                          )
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-[#DDD4C5]
                          bg-white
                          px-4
                          py-3
                          text-[#2F3A25]
                          outline-none
                          transition
                          focus:border-[#8E77A8]
                          focus:ring-2
                          focus:ring-[#8E77A8]/10
                        "
                        required
                      />
                    </div>

                    <div>
                      <label
                        className="
                          mb-2
                          block
                          text-sm
                          font-semibold
                          text-[#2F3A25]
                        "
                      >
                        End Date
                      </label>

                      <input
                        type="date"
                        value={
                          form.end_date
                        }
                        onChange={(event) =>
                          updateForm(
                            "end_date",
                            event.target.value
                          )
                        }
                        disabled={
                          form.is_current
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-[#DDD4C5]
                          bg-white
                          px-4
                          py-3
                          text-[#2F3A25]
                          outline-none
                          transition
                          focus:border-[#8E77A8]
                          focus:ring-2
                          focus:ring-[#8E77A8]/10
                          disabled:cursor-not-allowed
                          disabled:bg-gray-100
                          disabled:text-gray-400
                        "
                      />
                    </div>

                  </div>

                  {/* CURRENT */}

                  <label
                    className="
                      flex
                      cursor-pointer
                      items-center
                      gap-3
                      rounded-2xl
                      border
                      border-[#DDD4C5]
                      bg-white
                      px-4
                      py-4
                    "
                  >
                    <input
                      type="checkbox"
                      checked={
                        form.is_current
                      }
                      onChange={(event) =>
                        updateForm(
                          "is_current",
                          event.target.checked
                        )
                      }
                      className="
                        h-4
                        w-4
                        accent-[#8E77A8]
                      "
                    />

                    <div>
                      <p className="font-semibold text-[#2F3A25]">
                        I currently work here
                      </p>

                      <p className="mt-0.5 text-sm text-[#6B7280]">
                        The end date will be
                        automatically treated
                        as Present.
                      </p>
                    </div>
                  </label>

                  {/* DESCRIPTION */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-semibold
                        text-[#2F3A25]
                      "
                    >
                      Description
                    </label>

                    <textarea
                      value={
                        form.description
                      }
                      onChange={(event) =>
                        updateForm(
                          "description",
                          event.target.value
                        )
                      }
                      rows={5}
                      placeholder="Describe your responsibilities, achievements, or what you learned..."
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-[#DDD4C5]
                        bg-white
                        px-4
                        py-3
                        text-[#2F3A25]
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-[#8E77A8]
                        focus:ring-2
                        focus:ring-[#8E77A8]/10
                      "
                    />
                  </div>

                </div>

                {/* ================================================= */}
                {/* MODAL FOOTER                                      */}
                {/* ================================================= */}

                <div
                  className="
                    flex
                    flex-col-reverse
                    gap-3
                    border-t
                    border-[#DDD4C5]
                    bg-white
                    px-6
                    py-5
                    sm:flex-row
                    sm:justify-end
                    sm:px-8
                  "
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="
                      rounded-xl
                      border
                      border-[#DDD4C5]
                      px-6
                      py-3
                      font-semibold
                      text-[#6B7280]
                      transition
                      hover:bg-[#F5F1E8]
                      hover:text-[#2F3A25]
                      disabled:cursor-not-allowed
                      disabled:opacity-50
                    "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="
                      rounded-xl
                      bg-[#8E77A8]
                      px-6
                      py-3
                      font-semibold
                      text-white
                      transition
                      hover:bg-[#7C6695]
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {saving
                      ? "Saving..."
                      : editingExperience
                      ? "Update Experience"
                      : "Save Experience"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      : null;

  /*
   * =========================================================
   * PAGE
   * =========================================================
   */

  return (
    <>
      <main className="space-y-8 pb-16">

        {/* HEADER */}

        <div
          className="
            flex
            flex-col
            justify-between
            gap-5
            md:flex-row
            md:items-end
          "
        >
          <div>
            <h1 className="text-5xl font-bold text-[#2F3A25]">
              Experience
            </h1>

            <p className="mt-3 max-w-2xl text-lg leading-8 text-[#6B7280]">
              Add your professional
              experiences, internships,
              and other work experience.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-[#2F3A25]
              px-6
              py-3
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
            Add Experience
          </button>
        </div>

        {/* ERROR */}

        {error && !modalOpen && (
          <div
            className="
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-sm
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* CONTENT */}

        {loading ? (

          <div
            className="
              flex
              min-h-[40vh]
              items-center
              justify-center
            "
          >
            <div className="text-center">

              <div
                className="
                  mx-auto
                  h-12
                  w-12
                  animate-spin
                  rounded-full
                  border-4
                  border-[#DDD4C5]
                  border-t-[#8E77A8]
                "
              />

              <p className="mt-5 text-[#6B7280]">
                Loading experiences...
              </p>

            </div>
          </div>

        ) : experiences.length === 0 ? (

          <div
            className="
              rounded-3xl
              border
              border-[#DDD4C5]
              bg-white
              px-6
              py-20
              text-center
              shadow-sm
            "
          >
            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-[#F0EBF5]
                text-[#8E77A8]
              "
            >
              <Briefcase size={30} />
            </div>

            <h2
              className="
                mt-6
                text-2xl
                font-bold
                text-[#2F3A25]
              "
            >
              No experience added yet
            </h2>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-[#6B7280]
              "
            >
              Add your first professional
              experience to display it in
              your portfolio.
            </p>

            <button
              type="button"
              onClick={openAddModal}
              className="
                mt-7
                inline-flex
                items-center
                gap-2
                rounded-2xl
                bg-[#8E77A8]
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-[#7C6695]
              "
            >
              <Plus size={19} />
              Add Experience
            </button>
          </div>

        ) : (

          <div className="space-y-5">

            {experiences.map(
              (experience) => (

                <article
                  key={experience.id}
                  className="
                    rounded-3xl
                    border
                    border-[#DDD4C5]
                    bg-white
                    p-6
                    shadow-sm
                    transition
                    hover:shadow-md
                    lg:p-8
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      justify-between
                      gap-5
                      lg:flex-row
                    "
                  >
                    <div className="min-w-0">

                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-3
                        "
                      >
                        <h2
                          className="
                            text-2xl
                            font-bold
                            text-[#2F3A25]
                          "
                        >
                          {experience.position}
                        </h2>

                        {experience.is_current && (
                          <span
                            className="
                              rounded-full
                              bg-green-100
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              text-green-700
                            "
                          >
                            Current
                          </span>
                        )}
                      </div>

                      <p
                        className="
                          mt-2
                          text-lg
                          font-semibold
                          text-[#8E77A8]
                        "
                      >
                        {experience.company}
                      </p>

                      <div
                        className="
                          mt-4
                          flex
                          flex-wrap
                          gap-x-5
                          gap-y-2
                          text-sm
                          text-[#6B7280]
                        "
                      >
                        {(experience.start_date ||
                          experience.end_date ||
                          experience.is_current) && (

                          <span
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >
                            <CalendarDays
                              size={16}
                            />

                            {formatDate(
                              experience.start_date
                            )}

                            {" — "}

                            {experience.is_current
                              ? "Present"
                              : formatDate(
                                  experience.end_date
                                )}
                          </span>
                        )}

                        {experience.location && (
                          <span
                            className="
                              flex
                              items-center
                              gap-2
                            "
                          >
                            <MapPin size={16} />

                            {experience.location}
                          </span>
                        )}

                        {experience.employment_type && (
                          <span>
                            {
                              experience.employment_type
                            }
                          </span>
                        )}
                      </div>

                    </div>

                    {/* ACTIONS */}

                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-2
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            experience
                          )
                        }
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-[#DDD4C5]
                          text-[#6B7280]
                          transition
                          hover:border-[#8E77A8]
                          hover:bg-[#F3EEF7]
                          hover:text-[#8E77A8]
                        "
                        aria-label="Edit experience"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            experience.id
                          )
                        }
                        disabled={
                          deletingId ===
                          experience.id
                        }
                        className="
                          flex
                          h-11
                          w-11
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-red-100
                          text-red-400
                          transition
                          hover:bg-red-50
                          hover:text-red-600
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                        aria-label="Delete experience"
                      >
                        {deletingId ===
                        experience.id ? (

                          <div
                            className="
                              h-4
                              w-4
                              animate-spin
                              rounded-full
                              border-2
                              border-red-200
                              border-t-red-500
                            "
                          />

                        ) : (

                          <Trash2 size={18} />

                        )}
                      </button>
                    </div>
                  </div>

                  {experience.description && (
                    <p
                      className="
                        mt-6
                        max-w-4xl
                        whitespace-pre-line
                        leading-7
                        text-[#6B7280]
                      "
                    >
                      {experience.description}
                    </p>
                  )}
                </article>
              )
            )}

          </div>

        )}

      </main>

      {/* ===================================================== */}
      {/* PORTAL MODAL                                          */}
      {/* ===================================================== */}

      {modal}

    </>
  );
}