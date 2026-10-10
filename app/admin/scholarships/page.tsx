"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Edit3,
  ExternalLink,
  GraduationCap,
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Scholarship {
  id: string;
  title: string;
  slug: string;
  country: string | null;
  university: string | null;
  provider: string | null;
  degree_level: string | null;
  field_of_study: string | null;
  description: string | null;
  eligibility: string | null;
  benefits: string | null;
  funding_type: string | null;
  deadline: string | null;
  application_url: string | null;
  image_url: string | null;
  status: "draft" | "published" | "expired";
  application_status: "open" | "closed";
  created_at: string;
  updated_at: string;
}

interface ScholarshipForm {
  title: string;
  slug: string;
  country: string;
  university: string;
  provider: string;
  degree_level: string;
  field_of_study: string;
  description: string;
  eligibility: string;
  benefits: string;
  funding_type: string;
  deadline: string;
  application_url: string;
  image_url: string;
  status: "draft" | "published" | "expired";
  application_status: "open" | "closed";
}

const emptyForm: ScholarshipForm = {
  title: "",
  slug: "",
  country: "",
  university: "",
  provider: "",
  degree_level: "",
  field_of_study: "",
  description: "",
  eligibility: "",
  benefits: "",
  funding_type: "",
  deadline: "",
  application_url: "",
  image_url: "",
  status: "draft",
  application_status: "open",
};

export default function AdminScholarshipsPage() {
  const router = useRouter();

  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [form, setForm] = useState<ScholarshipForm>(emptyForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    checkAdminAndLoad();
  }, []);

  async function checkAdminAndLoad() {
    try {
      setLoading(true);
      setError("");

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        throw adminError;
      }

      if (!adminData) {
        router.push("/scholarships");
        return;
      }

      await loadScholarships();
    } catch (err) {
      console.error(err);
      setError("Unable to load the admin page.");
    } finally {
      setLoading(false);
    }
  }

  async function loadScholarships() {
    const { data, error: scholarshipError } = await supabase
      .from("scholarships")
      .select("*")
      .order("created_at", { ascending: false });

    if (scholarshipError) {
      throw scholarshipError;
    }

    setScholarships((data || []) as Scholarship[]);
  }

  function createSlug(title: string) {
    return title
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function updateField<K extends keyof ScholarshipForm>(
    field: K,
    value: ScholarshipForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => ({
      ...current,
      title: value,
      slug: editingId ? current.slug : createSlug(value),
    }));
  }

  function openCreateForm() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEditForm(scholarship: Scholarship) {
    setEditingId(scholarship.id);

    setForm({
      title: scholarship.title,
      slug: scholarship.slug,
      country: scholarship.country || "",
      university: scholarship.university || "",
      provider: scholarship.provider || "",
      degree_level: scholarship.degree_level || "",
      field_of_study: scholarship.field_of_study || "",
      description: scholarship.description || "",
      eligibility: scholarship.eligibility || "",
      benefits: scholarship.benefits || "",
      funding_type: scholarship.funding_type || "",
      deadline: scholarship.deadline || "",
      application_url: scholarship.application_url || "",
      image_url: scholarship.image_url || "",
      status: scholarship.status,
      application_status:
        scholarship.application_status || "open",
    });

    setMessage("");
    setError("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setMessage("");
    setError("");
  }

  async function handleSave() {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      if (!form.title.trim()) {
        setError("Scholarship title is required.");
        return;
      }

      if (!form.slug.trim()) {
        setError("Scholarship slug is required.");
        return;
      }

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        country: form.country.trim() || null,
        university: form.university.trim() || null,
        provider: form.provider.trim() || null,
        degree_level: form.degree_level.trim() || null,
        field_of_study: form.field_of_study.trim() || null,
        description: form.description.trim() || null,
        eligibility: form.eligibility.trim() || null,
        benefits: form.benefits.trim() || null,
        funding_type: form.funding_type.trim() || null,
        deadline: form.deadline || null,
        application_url: form.application_url.trim() || null,
        image_url: form.image_url.trim() || null,
        status: form.status,
        application_status: form.application_status,
        updated_at: new Date().toISOString(),
      };

      if (editingId) {
        const { error: updateError } = await supabase
          .from("scholarships")
          .update(payload)
          .eq("id", editingId);

        if (updateError) {
          throw updateError;
        }

        setMessage("Scholarship updated successfully.");
      } else {
        const { error: insertError } = await supabase
          .from("scholarships")
          .insert(payload);

        if (insertError) {
          throw insertError;
        }

        setMessage("Scholarship created successfully.");
      }

      await loadScholarships();

      setTimeout(() => {
        closeForm();
      }, 700);
    } catch (err: any) {
      console.error(err);

      if (err?.code === "23505") {
        setError(
          "This slug already exists. Please choose another one."
        );
      } else {
        setError(
          err?.message ||
            "Something went wrong while saving the scholarship."
        );
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(scholarship: Scholarship) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${scholarship.title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(scholarship.id);
      setError("");
      setMessage("");

      const { error: deleteError } = await supabase
        .from("scholarships")
        .delete()
        .eq("id", scholarship.id);

      if (deleteError) {
        throw deleteError;
      }

      setScholarships((current) =>
        current.filter((item) => item.id !== scholarship.id)
      );

      setMessage("Scholarship deleted successfully.");
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Something went wrong while deleting the scholarship."
      );
    } finally {
      setDeletingId(null);
    }
  }

  async function togglePublish(scholarship: Scholarship) {
    try {
      setError("");
      setMessage("");

      const newStatus =
        scholarship.status === "published"
          ? "draft"
          : "published";

      const { error: updateError } = await supabase
        .from("scholarships")
        .update({
          status: newStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", scholarship.id);

      if (updateError) {
        throw updateError;
      }

      setScholarships((current) =>
        current.map((item) =>
          item.id === scholarship.id
            ? {
                ...item,
                status: newStatus,
              }
            : item
        )
      );

      setMessage(
        newStatus === "published"
          ? "Scholarship published."
          : "Scholarship moved back to draft."
      );
    } catch (err: any) {
      console.error(err);
      setError(
        err?.message ||
          "Unable to change the scholarship status."
      );
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  function formatDeadline(deadline: string | null) {
    if (!deadline) return "No deadline";

    const date = new Date(deadline);

    if (Number.isNaN(date.getTime())) {
      return deadline;
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F4EFE7]">
        <div className="flex items-center gap-3 text-[#6F6178]">
          <Loader2 className="animate-spin" size={22} />
          Loading admin panel...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4EFE7] text-[#30283A]">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#E1D8CC] bg-[#F4EFE7]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#8E77A8] text-white">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-wide text-[#49385C]">
                SCHOLARSHIP ADMIN
              </h1>

              <p className="text-xs text-[#81768B]">
                Manage scholarship opportunities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">

            <button
              onClick={() => router.push("/scholarships")}
              className="hidden items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6B5B78] transition hover:bg-white sm:flex"
            >
              <ExternalLink size={17} />
              View Scholarships
            </button>

            <button
              onClick={handleLogout}
              className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#756A7E] transition hover:bg-white hover:text-[#8E77A8]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">

        {/* TOP */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

          <div>
            <button
              onClick={() => router.push("/scholarships")}
              className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#756A7E] transition hover:text-[#8E77A8]"
            >
              <ArrowLeft size={17} />
              Back to Scholarships
            </button>

            <h2 className="text-3xl font-bold text-[#403547] sm:text-4xl">
              Scholarships
            </h2>

            <p className="mt-2 text-sm text-[#827887]">
              Create, manage and publish scholarship opportunities.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#8E77A8] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#7C6597]"
          >
            <Plus size={19} />
            Add Scholarship
          </button>
        </div>

        {/* MESSAGES */}
        {message && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-medium text-green-700">
            <Check size={18} />
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-600">
            <X size={18} />
            {error}
          </div>
        )}

        {/* FORM */}
        {showForm && (
          <section className="mt-8 rounded-3xl border border-[#E1D8CC] bg-white p-6 shadow-sm sm:p-8">

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold text-[#403547]">
                  {editingId
                    ? "Edit Scholarship"
                    : "Add Scholarship"}
                </h3>

                <p className="mt-1 text-sm text-[#827887]">
                  Fill in the scholarship information below.
                </p>
              </div>

              <button
                onClick={closeForm}
                className="rounded-xl p-2 text-[#827887] transition hover:bg-[#F4EFE7] hover:text-[#403547]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">

              {/* TITLE */}
              <Field label="Scholarship Title *">
                <input
                  value={form.title}
                  onChange={(e) =>
                    handleTitleChange(e.target.value)
                  }
                  placeholder="e.g. Türkiye Scholarships 2027"
                  className={inputClass}
                />
              </Field>

              {/* SLUG */}
              <Field label="Slug *">
                <input
                  value={form.slug}
                  onChange={(e) =>
                    updateField("slug", e.target.value)
                  }
                  placeholder="turkiye-scholarships-2027"
                  className={inputClass}
                />
              </Field>

              {/* PROVIDER */}
              <Field label="Provider">
                <input
                  value={form.provider}
                  onChange={(e) =>
                    updateField("provider", e.target.value)
                  }
                  placeholder="e.g. Government of Türkiye"
                  className={inputClass}
                />
              </Field>

              {/* COUNTRY */}
              <Field label="Country">
                <input
                  value={form.country}
                  onChange={(e) =>
                    updateField("country", e.target.value)
                  }
                  placeholder="e.g. Türkiye"
                  className={inputClass}
                />
              </Field>

              {/* UNIVERSITY */}
              <Field label="University">
                <input
                  value={form.university}
                  onChange={(e) =>
                    updateField("university", e.target.value)
                  }
                  placeholder="e.g. Multiple Universities"
                  className={inputClass}
                />
              </Field>

              {/* DEGREE */}
              <Field label="Degree Level">
                <input
                  value={form.degree_level}
                  onChange={(e) =>
                    updateField("degree_level", e.target.value)
                  }
                  placeholder="e.g. Bachelor's"
                  className={inputClass}
                />
              </Field>

              {/* FIELD */}
              <Field label="Field of Study">
                <input
                  value={form.field_of_study}
                  onChange={(e) =>
                    updateField("field_of_study", e.target.value)
                  }
                  placeholder="e.g. Computer Science"
                  className={inputClass}
                />
              </Field>

              {/* FUNDING */}
              <Field label="Funding Type">
                <input
                  value={form.funding_type}
                  onChange={(e) =>
                    updateField("funding_type", e.target.value)
                  }
                  placeholder="e.g. Fully Funded"
                  className={inputClass}
                />
              </Field>

              {/* DEADLINE */}
              <Field label="Application Deadline">
                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#978B9D]"
                  />

                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) =>
                      updateField("deadline", e.target.value)
                    }
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </Field>

              {/* APPLICATION STATUS */}
              <Field label="Application Status">
                <select
                  value={form.application_status}
                  onChange={(e) =>
                    updateField(
                      "application_status",
                      e.target.value as "open" | "closed"
                    )
                  }
                  className={inputClass}
                >
                  <option value="open">
                    🟢 Applications Open
                  </option>

                  <option value="closed">
                    🔴 Applications Closed
                  </option>
                </select>
              </Field>

              {/* PUBLISH STATUS */}
              <Field label="Publication Status">
                <select
                  value={form.status}
                  onChange={(e) =>
                    updateField(
                      "status",
                      e.target.value as
                        | "draft"
                        | "published"
                        | "expired"
                    )
                  }
                  className={inputClass}
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="published">
                    Published
                  </option>

                  <option value="expired">
                    Expired
                  </option>
                </select>
              </Field>

              {/* APPLICATION URL */}
              <Field label="Application URL">
                <input
                  type="url"
                  value={form.application_url}
                  onChange={(e) =>
                    updateField(
                      "application_url",
                      e.target.value
                    )
                  }
                  placeholder="https://..."
                  className={inputClass}
                />
              </Field>

              {/* IMAGE URL */}
              <Field label="Image URL">
                <div className="relative">
                  <ImageIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#978B9D]"
                  />

                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) =>
                      updateField(
                        "image_url",
                        e.target.value
                      )
                    }
                    placeholder="https://..."
                    className={`${inputClass} pl-11`}
                  />
                </div>
              </Field>

              {/* DESCRIPTION */}
              <Field
                label="Description"
                fullWidth
              >
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                  rows={6}
                  placeholder="Describe the scholarship..."
                  className={`${inputClass} resize-y`}
                />
              </Field>

              {/* ELIGIBILITY */}
              <Field
                label="Eligibility"
                fullWidth
              >
                <textarea
                  value={form.eligibility}
                  onChange={(e) =>
                    updateField(
                      "eligibility",
                      e.target.value
                    )
                  }
                  rows={6}
                  placeholder={`Enter eligibility requirements.

You can use one requirement per line.`}
                  className={`${inputClass} resize-y`}
                />
              </Field>

              {/* BENEFITS */}
              <Field
                label="Benefits"
                fullWidth
              >
                <textarea
                  value={form.benefits}
                  onChange={(e) =>
                    updateField(
                      "benefits",
                      e.target.value
                    )
                  }
                  rows={6}
                  placeholder={`Enter scholarship benefits.

For example:
Full tuition
Monthly stipend
Accommodation`}
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            {/* IMAGE PREVIEW */}
            {form.image_url && (
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-[#51465A]">
                  Image Preview
                </p>

                <div className="overflow-hidden rounded-2xl border border-[#E1D8CC] bg-[#F5F0E9]">
                  <img
                    src={form.image_url}
                    alt="Scholarship preview"
                    className="max-h-72 w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}

            {/* FORM ACTIONS */}
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

              <button
                onClick={closeForm}
                disabled={saving}
                className="rounded-xl border border-[#DDD4C9] px-6 py-3 text-sm font-semibold text-[#6F6374] transition hover:bg-[#F7F3EE] disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#8E77A8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#7C6597] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    {editingId
                      ? "Save Changes"
                      : "Create Scholarship"}
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {/* SCHOLARSHIPS LIST */}
        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#403547]">
                All Scholarships
              </h3>

              <p className="mt-1 text-sm text-[#827887]">
                {scholarships.length} total scholarship
                {scholarships.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {scholarships.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-[#D4C8B9] bg-white px-6 py-16 text-center">
              <GraduationCap
                size={42}
                className="mx-auto text-[#A99BB0]"
              />

              <h3 className="mt-5 text-xl font-bold text-[#51465A]">
                No scholarships yet
              </h3>

              <p className="mt-2 text-sm text-[#827887]">
                Create your first scholarship to make it
                available on the Scholarships page.
              </p>

              <button
                onClick={openCreateForm}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#8E77A8] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#7C6597]"
              >
                <Plus size={18} />
                Add Scholarship
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {scholarships.map((scholarship) => (
                <article
                  key={scholarship.id}
                  className="overflow-hidden rounded-3xl border border-[#E1D8CC] bg-white shadow-sm"
                >
                  <div className="flex flex-col lg:flex-row">

                    {/* IMAGE */}
                    <div className="h-48 w-full shrink-0 bg-[#E8E0D7] lg:h-auto lg:w-56">
                      {scholarship.image_url ? (
                        <img
                          src={scholarship.image_url}
                          alt={scholarship.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-[#A99BB0]">
                          <GraduationCap size={50} />
                        </div>
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 p-5 sm:p-6">

                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            {/* PUBLICATION */}
                            {scholarship.status ===
                            "published" ? (
                              <span className="rounded-full bg-[#E8F6EC] px-3 py-1 text-xs font-bold text-[#3B8650]">
                                Published
                              </span>
                            ) : scholarship.status ===
                              "draft" ? (
                              <span className="rounded-full bg-[#F3EDF7] px-3 py-1 text-xs font-bold text-[#765D8B]">
                                Draft
                              </span>
                            ) : (
                              <span className="rounded-full bg-[#FCE9E9] px-3 py-1 text-xs font-bold text-[#B34A4A]">
                                Expired
                              </span>
                            )}

                            {/* APPLICATION */}
                            {scholarship.application_status ===
                            "open" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8F6EC] px-3 py-1 text-xs font-bold text-[#3B8650]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#3BA55D]" />
                                Open
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FCE9E9] px-3 py-1 text-xs font-bold text-[#B34A4A]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#D85B5B]" />
                                Closed
                              </span>
                            )}
                          </div>

                          <h4 className="mt-3 text-xl font-bold text-[#403547]">
                            {scholarship.title}
                          </h4>

                          <p className="mt-1 text-sm text-[#827887]">
                            /{scholarship.slug}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#756A7E]">

                            {scholarship.country && (
                              <span>
                                📍 {scholarship.country}
                              </span>
                            )}

                            {scholarship.degree_level && (
                              <span>
                                🎓{" "}
                                {scholarship.degree_level}
                              </span>
                            )}

                            {scholarship.deadline && (
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={15} />
                                {formatDeadline(
                                  scholarship.deadline
                                )}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="flex shrink-0 flex-wrap gap-2">

                          <button
                            onClick={() =>
                              openEditForm(scholarship)
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-[#DDD4E2] px-4 py-2.5 text-sm font-semibold text-[#765D8B] transition hover:bg-[#F5F0F7]"
                          >
                            <Edit3 size={16} />
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              togglePublish(scholarship)
                            }
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                              scholarship.status ===
                              "published"
                                ? "bg-[#F5EEE9] text-[#876D59] hover:bg-[#EDE3DB]"
                                : "bg-[#E8F6EC] text-[#3B8650] hover:bg-[#DDF1E2]"
                            }`}
                          >
                            {scholarship.status ===
                            "published" ? (
                              <>
                                <X size={16} />
                                Unpublish
                              </>
                            ) : (
                              <>
                                <Check size={16} />
                                Publish
                              </>
                            )}
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(scholarship)
                            }
                            disabled={
                              deletingId === scholarship.id
                            }
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                          >
                            {deletingId === scholarship.id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2 size={16} />
                            )}

                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================
   FIELD COMPONENT
========================= */

function Field({
  label,
  children,
  fullWidth = false,
}: {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "lg:col-span-2" : ""}>
      <label className="mb-2 block text-sm font-semibold text-[#51465A]">
        {label}
      </label>

      {children}
    </div>
  );
}

/* =========================
   INPUT STYLE
========================= */

const inputClass = `
  w-full
  rounded-xl
  border
  border-[#DDD4C9]
  bg-white
  px-4
  py-3.5
  text-sm
  text-[#403547]
  outline-none
  transition
  placeholder:text-[#AAA1AC]
  focus:border-[#8E77A8]
  focus:ring-4
  focus:ring-[#8E77A8]/10
`;