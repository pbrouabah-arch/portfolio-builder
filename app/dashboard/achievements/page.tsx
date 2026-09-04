"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Trophy,
  CalendarDays,
} from "lucide-react";

import {
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  type Achievement,
} from "@/lib/achievements";

interface FormData {
  title: string;
  description: string;
  achievement_year: string;
  display_order: string;
}

const emptyForm: FormData = {
  title: "",
  description: "",
  achievement_year: "",
  display_order: "0",
};

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] =
    useState<Achievement | null>(null);

  const [form, setForm] = useState<FormData>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState("");

  const [mounted, setMounted] = useState(false);

  /* =====================================================
     MOUNT
  ===================================================== */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =====================================================
     LOAD ACHIEVEMENTS
  ===================================================== */

  useEffect(() => {
    loadAchievements();
  }, []);

  async function loadAchievements() {
    try {
      setLoading(true);
      setError("");

      const data = await getAchievements();

      setAchievements(data || []);
    } catch (err) {
      console.error(
        "Failed to load achievements:",
        err
      );

      setError(
        "Failed to load achievements."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =====================================================
     PREVENT BACKGROUND SCROLL
  ===================================================== */

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

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

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [modalOpen, saving]);

  /* =====================================================
     OPEN ADD MODAL
  ===================================================== */

  function openAddModal() {
    setEditingAchievement(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  }

  /* =====================================================
     OPEN EDIT MODAL
  ===================================================== */

  function openEditModal(
    achievement: Achievement
  ) {
    setEditingAchievement(achievement);

    setForm({
      title: achievement.title || "",
      description:
        achievement.description || "",
      achievement_year:
        achievement.achievement_year !== null &&
        achievement.achievement_year !== undefined
          ? String(
              achievement.achievement_year
            )
          : "",
      display_order:
        achievement.display_order !== null &&
        achievement.display_order !== undefined
          ? String(
              achievement.display_order
            )
          : "0",
    });

    setError("");
    setModalOpen(true);
  }

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  function closeModal() {
    if (saving) return;

    setModalOpen(false);
    setEditingAchievement(null);
    setForm(emptyForm);
    setError("");
  }

  /* =====================================================
     UPDATE FORM
  ===================================================== */

  function updateForm(
    field: keyof FormData,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  /* =====================================================
     SAVE
  ===================================================== */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!form.title.trim()) {
      setError(
        "Achievement title is required."
      );

      return;
    }

    try {
      setSaving(true);
      setError("");

      const achievementData = {
        title: form.title.trim(),

        description:
          form.description.trim() || "",

        achievement_year:
          form.achievement_year.trim()
            ? Number(form.achievement_year)
            : null,

        display_order:
          Number(form.display_order) || 0,
      };

      /* ================================================
         UPDATE
      ================================================= */

      if (editingAchievement) {
        await updateAchievement(
          editingAchievement.id,
          achievementData
        );
      }

      /* ================================================
         CREATE
      ================================================= */

      else {
        await createAchievement(
          achievementData
        );
      }

      closeModal();

      await loadAchievements();
    } catch (err) {
      console.error(
        "Failed to save achievement:",
        err
      );

      setError(
        "Failed to save achievement. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =====================================================
     DELETE
  ===================================================== */

  async function handleDelete(
    achievementId: string
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this achievement?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(achievementId);

      await deleteAchievement(
        achievementId
      );

      await loadAchievements();
    } catch (err) {
      console.error(
        "Failed to delete achievement:",
        err
      );

      alert(
        "Failed to delete achievement."
      );
    } finally {
      setDeletingId(null);
    }
  }

  /* =====================================================
     ACHIEVEMENT MODAL
  ===================================================== */

  const modal =
    modalOpen &&
    mounted &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            className="
              fixed
              inset-0
              z-[2147483647]
              flex
              items-start
              justify-center
              overflow-y-auto
              bg-black/40
              p-4
              pt-24
              backdrop-blur-sm
              sm:p-6
              sm:pt-28
              lg:pt-24
            "
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
                my-4
                w-full
                max-w-2xl
                overflow-hidden
                rounded-3xl
                border
                border-[#DDD4C5]
                bg-white
                shadow-2xl
                sm:my-8
              "
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >
              {/* =========================================
                  MODAL HEADER
              ========================================= */}

              <div
                className="
                  flex
                  items-start
                  justify-between
                  gap-5
                  border-b
                  border-[#EEE8DE]
                  px-6
                  py-6
                  sm:px-8
                  sm:py-7
                "
              >
                <div>
                  <p
                    className="
                      text-sm
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-[#8E77A8]
                    "
                  >
                    {editingAchievement
                      ? "Edit achievement"
                      : "New achievement"}
                  </p>

                  <h2
                    className="
                      mt-2
                      text-3xl
                      font-bold
                      text-[#2F3A25]
                      sm:text-4xl
                    "
                  >
                    {editingAchievement
                      ? "Edit Achievement"
                      : "Add Achievement"}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-base
                      text-[#6B7280]
                    "
                  >
                    Add an achievement you want
                    to showcase in your portfolio.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  aria-label="Close"
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#DDD4C5]
                    bg-white
                    text-[#6B7280]
                    transition
                    hover:bg-[#F5F1E8]
                    hover:text-[#2F3A25]
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                  "
                >
                  <X size={22} />
                </button>
              </div>

              {/* =========================================
                  FORM
              ========================================= */}

              <form
                onSubmit={handleSubmit}
                className="
                  max-h-[calc(100vh-220px)]
                  overflow-y-auto
                  px-6
                  py-6
                  sm:px-8
                  sm:py-8
                "
              >
                {/* TITLE */}

                <div>
                  <label
                    htmlFor="achievement-title"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#2F3A25]
                    "
                  >
                    Title
                  </label>

                  <input
                    id="achievement-title"
                    type="text"
                    value={form.title}
                    onChange={(event) =>
                      updateForm(
                        "title",
                        event.target.value
                      )
                    }
                    placeholder="e.g. Hackathon Winner"
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

                {/* YEAR */}

                <div className="mt-6">
                  <label
                    htmlFor="achievement-year"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#2F3A25]
                    "
                  >
                    Year
                  </label>

                  <div className="relative">
                    <CalendarDays
                      size={18}
                      className="
                        pointer-events-none
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#8E77A8]
                      "
                    />

                    <input
                      id="achievement-year"
                      type="number"
                      min="1900"
                      max="2100"
                      value={
                        form.achievement_year
                      }
                      onChange={(event) =>
                        updateForm(
                          "achievement_year",
                          event.target.value
                        )
                      }
                      placeholder="2026"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-[#DDD4C5]
                        bg-white
                        py-3
                        pl-11
                        pr-4
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

                {/* DESCRIPTION */}

                <div className="mt-6">
                  <label
                    htmlFor="achievement-description"
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
                    id="achievement-description"
                    value={form.description}
                    onChange={(event) =>
                      updateForm(
                        "description",
                        event.target.value
                      )
                    }
                    rows={6}
                    placeholder="Describe this achievement..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-[#DDD4C5]
                      bg-white
                      px-4
                      py-3
                      leading-7
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

                {/* DISPLAY ORDER */}

                <div className="mt-6">
                  <label
                    htmlFor="achievement-order"
                    className="
                      mb-2
                      block
                      text-sm
                      font-semibold
                      text-[#2F3A25]
                    "
                  >
                    Display Order
                  </label>

                  <input
                    id="achievement-order"
                    type="number"
                    min="0"
                    value={form.display_order}
                    onChange={(event) =>
                      updateForm(
                        "display_order",
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
                  />
                </div>

                {/* ERROR */}

                {error && (
                  <div
                    className="
                      mt-6
                      rounded-xl
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

                {/* =====================================
                    FOOTER
                ===================================== */}

                <div
                  className="
                    mt-8
                    flex
                    flex-col-reverse
                    gap-3
                    border-t
                    border-[#EEE8DE]
                    pt-6
                    sm:flex-row
                    sm:justify-end
                  "
                >
                  <button
                    type="button"
                    onClick={closeModal}
                    disabled={saving}
                    className="
                      rounded-2xl
                      border
                      border-[#DDD4C5]
                      bg-white
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
                      rounded-2xl
                      bg-[#8E77A8]
                      px-7
                      py-3
                      font-semibold
                      text-white
                      shadow-sm
                      transition
                      hover:bg-[#7D6698]
                      hover:shadow-md
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  >
                    {saving
                      ? "Saving..."
                      : editingAchievement
                      ? "Save Changes"
                      : "Add Achievement"}
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )
      : null;

  /* =====================================================
     PAGE
  ===================================================== */

  return (
    <>
      <main
        className="
          min-h-[calc(100vh-80px)]
          bg-[#F5F1E8]
        "
      >
        {/* ===============================================
            HEADER
        =============================================== */}

        <div
          className="
            mb-10
            flex
            flex-col
            justify-between
            gap-5
            md:flex-row
            md:items-center
          "
        >
          <div>
            <h1
              className="
                text-4xl
                font-bold
                text-[#2F3A25]
                lg:text-5xl
              "
            >
              Achievements
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-lg
                text-[#6B7280]
              "
            >
              Showcase the achievements and
              accomplishments you are proud of.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="
              flex
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

            Add Achievement
          </button>
        </div>

        {/* ===============================================
            ERROR
        =============================================== */}

        {error && !modalOpen && (
          <div
            className="
              mb-6
              rounded-2xl
              border
              border-red-200
              bg-red-50
              px-5
              py-4
              text-red-600
            "
          >
            {error}
          </div>
        )}

        {/* ===============================================
            LOADING
        =============================================== */}

        {loading ? (
          <div
            className="
              flex
              min-h-[300px]
              items-center
              justify-center
            "
          >
            <div className="text-center">
              <div
                className="
                  mx-auto
                  h-10
                  w-10
                  animate-spin
                  rounded-full
                  border-4
                  border-[#DDD4C5]
                  border-t-[#8E77A8]
                "
              />

              <p
                className="
                  mt-4
                  text-[#6B7280]
                "
              >
                Loading achievements...
              </p>
            </div>
          </div>
        ) : achievements.length === 0 ? (
          /* =============================================
             EMPTY STATE
          ============================================= */

          <div
            className="
              rounded-3xl
              border
              border-[#DDD4C5]
              bg-white
              p-12
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
                bg-[#F0EAF5]
                text-[#8E77A8]
              "
            >
              <Trophy size={30} />
            </div>

            <h2
              className="
                mt-6
                text-2xl
                font-bold
                text-[#2F3A25]
              "
            >
              No achievements yet
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-lg
                text-[#6B7280]
              "
            >
              Add your awards, competitions,
              accomplishments, or other achievements
              to display them in your portfolio.
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
                hover:bg-[#7D6698]
              "
            >
              <Plus size={19} />

              Add your first achievement
            </button>
          </div>
        ) : (
          /* =============================================
             ACHIEVEMENT CARDS
          ============================================= */

          <div
            className="
              grid
              gap-5
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {achievements.map(
              (achievement, index) => (
                <article
                  key={achievement.id}
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
                    hover:shadow-xl
                    sm:p-7
                  "
                >
                  {/* Decorative accent */}

                  <div
                    className="
                      absolute
                      right-0
                      top-0
                      h-24
                      w-24
                      rounded-bl-full
                      bg-[#F0EAF5]
                    "
                  />

                  <div
                    className="
                      relative
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >
                    <div
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#F0EAF5]
                        text-[#8E77A8]
                      "
                    >
                      <Trophy size={23} />
                    </div>

                    <div
                      className="
                        flex
                        gap-2
                        opacity-100
                        transition
                        lg:opacity-0
                        lg:group-hover:opacity-100
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openEditModal(
                            achievement
                          )
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
                          bg-white
                          text-[#6B7280]
                          transition
                          hover:border-[#8E77A8]
                          hover:bg-[#F5F1E8]
                          hover:text-[#8E77A8]
                        "
                        aria-label="Edit achievement"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(
                            achievement.id
                          )
                        }
                        disabled={
                          deletingId ===
                          achievement.id
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
                          bg-white
                          text-[#6B7280]
                          transition
                          hover:border-red-200
                          hover:bg-red-50
                          hover:text-red-500
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                        aria-label="Delete achievement"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>

                  <div className="relative mt-6">
                    <h2
                      className="
                        text-xl
                        font-bold
                        leading-tight
                        text-[#2F3A25]
                      "
                    >
                      {achievement.title}
                    </h2>

                    {achievement.achievement_year !==
                      null &&
                      achievement.achievement_year !==
                        undefined && (
                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-medium
                            text-[#8E77A8]
                          "
                        >
                          <CalendarDays
                            size={16}
                          />

                          {achievement.achievement_year}
                        </div>
                      )}

                    {achievement.description && (
                      <p
                        className="
                          mt-5
                          border-t
                          border-[#EEE8DE]
                          pt-5
                          leading-7
                          text-[#6B7280]
                        "
                      >
                        {achievement.description}
                      </p>
                    )}
                  </div>

                  <div
                    className="
                      mt-6
                      text-xs
                      font-medium
                      uppercase
                      tracking-widest
                      text-[#B0A79A]
                    "
                  >
                    Achievement #{index + 1}
                  </div>
                </article>
              )
            )}
          </div>
        )}
      </main>

      {/* ===============================================
          PORTAL MODAL
      =============================================== */}

      {modal}
    </>
  );
}