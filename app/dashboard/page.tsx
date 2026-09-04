"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getProfile, type Profile } from "@/lib/profiles";
import {
  Image as ImageIcon,
  Upload,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  Globe,
  Code2,
  BriefcaseBusiness,
  Camera,
  AtSign,
  Plus,
  Trash2,
  Save,
} from "lucide-react";

interface SocialLink {
  id?: string;
  user_id?: string;
  platform: string;
  url: string;
  display_order?: number;
}

const SOCIAL_PLATFORMS = [
  {
    id: "github",
    name: "GitHub",
    icon: Code2,
    placeholder: "https://github.com/username",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: BriefcaseBusiness,
    placeholder: "https://linkedin.com/in/username",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: Camera,
    placeholder: "https://instagram.com/username",
  },
  {
    id: "twitter",
    name: "X / Twitter",
    icon: AtSign,
    placeholder: "https://x.com/username",
  },
];

export default function DashboardPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  const [projectsCount, setProjectsCount] = useState(0);
  const [skillsCount, setSkillsCount] = useState(0);
  const [certificatesCount, setCertificatesCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [savingContact, setSavingContact] = useState(false);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] =
    useState<"success" | "error">("success");

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const profileData = await getProfile();

      setProfile(profileData);

      if (profileData?.avatar_url) {
        setPreviewUrl(profileData.avatar_url);
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not found.");
      }

      const [
        socialResult,
        projectsResult,
        skillsResult,
        certificatesResult,
      ] = await Promise.all([
        supabase
          .from("social_links")
          .select("*")
          .eq("user_id", user.id)
          .order("display_order"),

        supabase
          .from("projects")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id),

        supabase
          .from("skills")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id),

        supabase
          .from("certificates")
          .select("id", {
            count: "exact",
            head: true,
          })
          .eq("user_id", user.id),
      ]);

      if (socialResult.error) {
        console.error(
          "Social links error:",
          socialResult.error
        );
      }

      setSocialLinks(
        (socialResult.data ?? []) as SocialLink[]
      );

      setProjectsCount(projectsResult.count ?? 0);
      setSkillsCount(skillsResult.count ?? 0);
      setCertificatesCount(
        certificatesResult.count ?? 0
      );
    } catch (error) {
      console.error(
        "Dashboard loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  function handleImageSelect(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setMessage(null);

    if (!file.type.startsWith("image/")) {
      setMessageType("error");
      setMessage("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setMessageType("error");
      setMessage("Image must be smaller than 2MB.");
      return;
    }

    setSelectedImage(file);

    const localPreview =
      URL.createObjectURL(file);

    setPreviewUrl(localPreview);
  }

  /*
   * Extract the Storage path from a Supabase public URL.
   *
   * Example:
   * https://xxx.supabase.co/storage/v1/object/public/avatars/user-id/avatar-123.jpg
   *
   * becomes:
   * user-id/avatar-123.jpg
   */
  function getAvatarStoragePath(
    avatarUrl: string | null | undefined
  ): string | null {
    if (!avatarUrl) return null;

    try {
      const marker =
        "/storage/v1/object/public/avatars/";

      const index = avatarUrl.indexOf(marker);

      if (index === -1) {
        return null;
      }

      const path = avatarUrl.slice(
        index + marker.length
      );

      if (!path) {
        return null;
      }

      return decodeURIComponent(path);
    } catch (error) {
      console.error(
        "Failed to extract avatar path:",
        error
      );

      return null;
    }
  }

  async function uploadAvatar() {
    if (!selectedImage) return;

    setUploading(true);
    setMessage(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("You must be logged in.");
      }

      /*
       * Save the old URL BEFORE replacing it.
       */
      const oldAvatarUrl = profile?.avatar_url ?? null;

      const oldAvatarPath =
        getAvatarStoragePath(oldAvatarUrl);

      /*
       * Generate a new unique file path.
       */
      const extension =
        selectedImage.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const filePath =
        `${user.id}/avatar-${Date.now()}.${extension}`;

      /*
       * Upload the new image first.
       */
      const { error: uploadError } =
        await supabase.storage
          .from("avatars")
          .upload(
            filePath,
            selectedImage,
            {
              cacheControl: "3600",
              upsert: true,
              contentType: selectedImage.type,
            }
          );

      if (uploadError) {
        throw uploadError;
      }

      /*
       * Get the public URL of the new image.
       */
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      /*
       * Update the profile with the new URL.
       *
       * We do this BEFORE deleting the old image.
       * This way we never end up without a working avatar.
       */
      const { error: profileError } =
        await supabase
          .from("profiles")
          .update({
            avatar_url: publicUrl,
          })
          .eq("user_id", user.id);

      /*
       * If updating the profile failed,
       * delete the newly uploaded image because
       * it is no longer being used.
       */
      if (profileError) {
        await supabase.storage
          .from("avatars")
          .remove([filePath]);

        throw profileError;
      }

      /*
       * Update local state.
       */
      setProfile((current) =>
        current
          ? {
              ...current,
              avatar_url: publicUrl,
            }
          : current
      );

      setPreviewUrl(publicUrl);
      setSelectedImage(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      /*
       * Delete the OLD image.
       *
       * This happens only after:
       * 1. New image uploaded successfully.
       * 2. New URL saved successfully.
       */
      if (
        oldAvatarPath &&
        oldAvatarPath !== filePath
      ) {
        const { error: deleteError } =
          await supabase.storage
            .from("avatars")
            .remove([oldAvatarPath]);

        if (deleteError) {
          /*
           * The new image is already working,
           * so we don't show the user an upload failure.
           *
           * We only log the cleanup problem.
           */
          console.error(
            "Old avatar cleanup failed:",
            deleteError
          );
        }
      }

      setMessageType("success");

      setMessage(
        "Profile photo updated successfully."
      );
    } catch (error) {
      console.error(
        "Avatar upload error:",
        error
      );

      setMessageType("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to upload profile photo."
      );
    } finally {
      setUploading(false);
    }
  }

  function updateSocialLink(
    platform: string,
    url: string
  ) {
    setSocialLinks((current) => {
      const existing = current.find(
        (link) =>
          link.platform === platform
      );

      if (existing) {
        return current.map((link) =>
          link.platform === platform
            ? {
                ...link,
                url,
              }
            : link
        );
      }

      return [
        ...current,
        {
          platform,
          url,
          display_order: current.length,
        },
      ];
    });
  }

  function addCustomSocial() {
    setSocialLinks((current) => [
      ...current,
      {
        platform: "",
        url: "",
        display_order: current.length,
      },
    ]);
  }

  function removeSocialLink(index: number) {
    setSocialLinks((current) =>
      current.filter((_, i) => i !== index)
    );
  }

  async function saveContactInformation() {
    setSavingContact(true);
    setMessage(null);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        throw userError;
      }

      if (!user) {
        throw new Error("You must be logged in.");
      }

      /*
       * Save basic contact information.
       */
      const { error: profileError } =
        await supabase
          .from("profiles")
          .update({
            email:
              profile?.email ||
              user.email ||
              null,
            phone:
              profile?.phone || null,
            website:
              profile?.website || null,
          })
          .eq("user_id", user.id);

      if (profileError) {
        throw profileError;
      }

      /*
       * Save social links.
       */
      for (
        let index = 0;
        index < socialLinks.length;
        index++
      ) {
        const link = socialLinks[index];

        if (
          !link.platform.trim() ||
          !link.url.trim()
        ) {
          continue;
        }

        const existing = link.id
          ? link
          : null;

        if (existing) {
          const { error } =
            await supabase
              .from("social_links")
              .update({
                platform:
                  link.platform.trim(),
                url:
                  link.url.trim(),
                display_order: index,
              })
              .eq("id", link.id)
              .eq("user_id", user.id);

          if (error) {
            throw error;
          }
        } else {
          const {
            data,
            error,
          } = await supabase
            .from("social_links")
            .insert({
              user_id: user.id,
              platform:
                link.platform.trim(),
              url:
                link.url.trim(),
              display_order: index,
            })
            .select()
            .single();

          if (error) {
            throw error;
          }

          if (data) {
            setSocialLinks((current) =>
              current.map(
                (item, itemIndex) =>
                  itemIndex === index
                    ? {
                        ...item,
                        id: data.id,
                      }
                    : item
              )
            );
          }
        }
      }

      setProfile((current) =>
        current
          ? {
              ...current,
              email:
                profile?.email ||
                user.email ||
                null,
              phone:
                profile?.phone || null,
              website:
                profile?.website || null,
            }
          : current
      );

      setMessageType("success");

      setMessage(
        "Contact information saved successfully."
      );

      await loadDashboard();
    } catch (error) {
      console.error(
        "Contact save error:",
        error
      );

      setMessageType("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to save contact information."
      );
    } finally {
      setSavingContact(false);
    }
  }

  const fullName =
    profile?.full_name || "Your Name";

  const jobTitle =
    profile?.job_title ||
    "Portfolio Creator";

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-[#4B543B] lg:text-5xl">
          Welcome,{" "}
          {loading
            ? "..."
            : fullName.split(" ")[0]}{" "}
          
        </h1>

        <p className="mt-3 text-lg text-gray-600">
          Manage your portfolio and make it
          stand out.
        </p>
      </div>

      {/* Profile Card */}
      <div className="overflow-hidden rounded-3xl border border-[#DDD4C5] bg-white shadow-sm">

        <div className="h-3 bg-gradient-to-r from-[#8E77A8] via-[#A78CC4] to-[#D9B24C]" />

        <div className="flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex flex-col items-center gap-6 sm:flex-row">

            {/* Avatar */}
            <div className="relative">

              <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-[#F5F1E8] bg-[#E8E2D8] shadow-md">

                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt={fullName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <ImageIcon
                      size={42}
                      className="text-[#8E77A8]"
                    />
                  </div>
                )}

              </div>

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-[#8E77A8] text-white shadow-md transition hover:scale-105 hover:opacity-90"
              >
                <Upload size={18} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageSelect}
                className="hidden"
              />

            </div>

            {/* Profile information */}
            <div className="text-center sm:text-left">

              <p className="text-sm font-medium text-[#8E77A8]">
                Your Profile
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#4B543B]">
                {fullName}
              </h2>

              <p className="mt-1 text-gray-500">
                {jobTitle}
              </p>

              {profile?.country && (
                <p className="mt-2 text-sm text-gray-400">
                  {profile.city
                    ? `${profile.city}, `
                    : ""}
                  {profile.country}
                </p>
              )}

            </div>

          </div>

          {/* Photo actions */}
          <div className="flex flex-col items-center gap-3 lg:items-end">

            <button
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
              className="rounded-2xl border border-[#DDD4C5] px-6 py-3 font-semibold text-[#4B543B] transition hover:bg-[#F5F1E8]"
            >
              Change Photo
            </button>

            {selectedImage && (
              <button
                type="button"
                disabled={uploading}
                onClick={uploadAvatar}
                className="flex items-center gap-2 rounded-2xl bg-[#8E77A8] px-6 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                <Upload size={17} />

                {uploading
                  ? "Uploading..."
                  : "Save Photo"}
              </button>
            )}

            <p className="text-xs text-gray-400">
              JPG, PNG or WebP • Max 2MB
            </p>

          </div>

        </div>

        {/* Status message */}
        {message && (
          <div className="border-t border-[#EEE8DF] px-8 py-4">

            <div className="flex items-center gap-2 text-sm">

              {messageType === "success" ? (
                <CheckCircle2
                  size={17}
                  className="text-green-600"
                />
              ) : (
                <AlertCircle
                  size={17}
                  className="text-red-500"
                />
              )}

              <span className="text-gray-600">
                {message}
              </span>

            </div>

          </div>
        )}

      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">
          <p className="text-gray-500">
            Projects
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#4B543B]">
            {projectsCount}
          </h2>

          <p className="mt-3 text-sm text-[#8E77A8]">
            {projectsCount === 0
              ? "No projects yet"
              : `${projectsCount} project${
                  projectsCount > 1
                    ? "s"
                    : ""
                }`}
          </p>
        </div>

        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">
          <p className="text-gray-500">
            Skills
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#4B543B]">
            {skillsCount}
          </h2>

          <p className="mt-3 text-sm text-[#8E77A8]">
            {skillsCount === 0
              ? "Add your first skill"
              : `${skillsCount} skill${
                  skillsCount > 1
                    ? "s"
                    : ""
                }`}
          </p>
        </div>

        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">
          <p className="text-gray-500">
            Certificates
          </p>

          <h2 className="mt-4 text-5xl font-bold text-[#4B543B]">
            {certificatesCount}
          </h2>

          <p className="mt-3 text-sm text-[#8E77A8]">
            {certificatesCount === 0
              ? "Upload certificates"
              : `${certificatesCount} certificate${
                  certificatesCount > 1
                    ? "s"
                    : ""
                }`}
          </p>
        </div>

        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">
          <p className="text-gray-500">
            Profile Status
          </p>

          <h2 className="mt-4 text-3xl font-bold text-[#8E77A8]">
            {profile?.is_public
              ? "Public"
              : "Private"}
          </h2>

          <p className="mt-3 text-sm text-gray-500">
            {profile?.is_public
              ? "Your portfolio is visible."
              : "Your portfolio is hidden."}
          </p>
        </div>

      </div>

      {/* Contact & Social Links */}
      <div className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-3xl font-bold text-[#4B543B]">
              Contact & Social Links
            </h2>

            <p className="mt-2 text-gray-500">
              Keep your contact information up to date so visitors can easily reach you.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F0EAF5]">
            <Globe
              size={22}
              className="text-[#8E77A8]"
            />
          </div>

        </div>

        {/* Basic Contact */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">

          {/* Email */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#4B543B]">
              <Mail size={16} />
              Email
            </label>

            <input
              type="email"
              value={profile?.email ?? ""}
              onChange={(event) =>
                setProfile((current) =>
                  current
                    ? {
                        ...current,
                        email:
                          event.target.value,
                      }
                    : current
                )
              }
              placeholder="your@email.com"
              className="w-full rounded-2xl border border-[#DDD4C5] bg-[#FCFAF6] px-4 py-3 text-[#4B543B] outline-none transition focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/10"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#4B543B]">
              <Phone size={16} />
              Phone
            </label>

            <input
              type="tel"
              value={profile?.phone ?? ""}
              onChange={(event) =>
                setProfile((current) =>
                  current
                    ? {
                        ...current,
                        phone:
                          event.target.value,
                      }
                    : current
                )
              }
              placeholder="+213 ..."
              className="w-full rounded-2xl border border-[#DDD4C5] bg-[#FCFAF6] px-4 py-3 text-[#4B543B] outline-none transition focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/10"
            />
          </div>

          {/* Website */}
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#4B543B]">
              <Globe size={16} />
              Website
            </label>

            <input
              type="url"
              value={profile?.website ?? ""}
              onChange={(event) =>
                setProfile((current) =>
                  current
                    ? {
                        ...current,
                        website:
                          event.target.value,
                      }
                    : current
                )
              }
              placeholder="https://yourwebsite.com"
              className="w-full rounded-2xl border border-[#DDD4C5] bg-[#FCFAF6] px-4 py-3 text-[#4B543B] outline-none transition focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/10"
            />
          </div>

        </div>

        {/* Social links */}
        <div className="mt-10">

          <div className="mb-5 flex items-center justify-between">

            <div>
              <h3 className="text-xl font-bold text-[#4B543B]">
                Social Links
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Add the platforms you want visitors to find.
              </p>
            </div>

            <button
              type="button"
              onClick={addCustomSocial}
              className="flex items-center gap-2 rounded-xl border border-[#DDD4C5] px-4 py-2 text-sm font-semibold text-[#4B543B] transition hover:bg-[#F5F1E8]"
            >
              <Plus size={16} />
              Add Link
            </button>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {SOCIAL_PLATFORMS.map(
              (platform) => {
                const Icon = platform.icon;

                const existing =
                  socialLinks.find(
                    (link) =>
                      link.platform.toLowerCase() ===
                      platform.id
                  );

                return (
                  <div
                    key={platform.id}
                    className="rounded-2xl border border-[#E6DFD5] bg-[#FCFAF6] p-4"
                  >

                    <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#4B543B]">

                      <Icon
                        size={18}
                        className="text-[#8E77A8]"
                      />

                      {platform.name}

                    </label>

                    <input
                      type="url"
                      value={existing?.url ?? ""}
                      onChange={(event) =>
                        updateSocialLink(
                          platform.id,
                          event.target.value
                        )
                      }
                      placeholder={
                        platform.placeholder
                      }
                      className="w-full rounded-xl border border-[#DDD4C5] bg-white px-4 py-3 text-sm text-[#4B543B] outline-none transition focus:border-[#8E77A8]"
                    />

                  </div>
                );
              }
            )}

          </div>

          {/* Custom links */}
          {socialLinks
            .filter(
              (link) =>
                !SOCIAL_PLATFORMS.some(
                  (platform) =>
                    platform.id ===
                    link.platform.toLowerCase()
                )
            )
            .map((link, index) => {

              const actualIndex =
                socialLinks.indexOf(link);

              return (
                <div
                  key={
                    link.id ??
                    `custom-${index}`
                  }
                  className="mt-5 rounded-2xl border border-[#E6DFD5] bg-[#FCFAF6] p-4"
                >

                  <div className="grid gap-4 sm:grid-cols-[180px_1fr_auto]">

                    <input
                      type="text"
                      value={link.platform}
                      onChange={(event) => {
                        const value =
                          event.target.value;

                        setSocialLinks(
                          (current) =>
                            current.map(
                              (
                                item,
                                itemIndex
                              ) =>
                                itemIndex ===
                                actualIndex
                                  ? {
                                      ...item,
                                      platform:
                                        value,
                                    }
                                  : item
                            )
                        );
                      }}
                      placeholder="Platform"
                      className="rounded-xl border border-[#DDD4C5] bg-white px-4 py-3 text-sm text-[#4B543B] outline-none focus:border-[#8E77A8]"
                    />

                    <input
                      type="url"
                      value={link.url}
                      onChange={(event) => {
                        const value =
                          event.target.value;

                        setSocialLinks(
                          (current) =>
                            current.map(
                              (
                                item,
                                itemIndex
                              ) =>
                                itemIndex ===
                                actualIndex
                                  ? {
                                      ...item,
                                      url: value,
                                    }
                                  : item
                            )
                        );
                      }}
                      placeholder="https://..."
                      className="rounded-xl border border-[#DDD4C5] bg-white px-4 py-3 text-sm text-[#4B543B] outline-none focus:border-[#8E77A8]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeSocialLink(
                          actualIndex
                        )
                      }
                      className="flex items-center justify-center rounded-xl border border-red-100 px-4 py-3 text-red-500 transition hover:bg-red-50"
                      aria-label="Remove social link"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>
              );
            })}

          {/* Save */}
          <div className="mt-8 flex justify-end">

            <button
              type="button"
              onClick={saveContactInformation}
              disabled={savingContact}
              className="flex items-center gap-2 rounded-2xl bg-[#8E77A8] px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-[#7D6699] disabled:cursor-not-allowed disabled:opacity-50"
            >

              <Save size={18} />

              {savingContact
                ? "Saving..."
                : "Save Changes"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}