"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Eye, Check } from "lucide-react";

import { templates } from "@/lib/templates";
import { getProfile, updateTemplate } from "@/lib/profiles";
import { getMyPortfolioData } from "@/lib/portfolio";
import { mapPortfolio } from "@/lib/portfolioMapper";
import TemplateRenderer from "@/components/templates/TemplateRenderer";

export default function TemplatesPage() {
  const [currentTemplate, setCurrentTemplate] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [previewTemplate, setPreviewTemplate] =
    useState<string | null>(null);

  const [portfolioData, setPortfolioData] =
    useState<any>(null);

  const [previewLoading, setPreviewLoading] =
    useState(false);

  const [mounted, setMounted] = useState(false);

  /* -------------------------------------------------------
     MOUNT
  ------------------------------------------------------- */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* -------------------------------------------------------
     LOAD PROFILE
  ------------------------------------------------------- */

  useEffect(() => {
    loadProfile();
  }, []);

  /* -------------------------------------------------------
     LOCK BODY SCROLL WHEN PREVIEW IS OPEN
  ------------------------------------------------------- */

  useEffect(() => {
    if (previewTemplate) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [previewTemplate]);

  /* -------------------------------------------------------
     LOAD PROFILE
  ------------------------------------------------------- */

  async function loadProfile() {
    try {
      const profile = await getProfile();

      setCurrentTemplate(
        profile?.template_id || "minimal"
      );
    } catch (error) {
      console.error(
        "Failed to load profile:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  /* -------------------------------------------------------
     SELECT TEMPLATE
  ------------------------------------------------------- */

  async function handleSelect(
    templateId: string
  ) {
    try {
      setSaving(true);

      await updateTemplate(templateId);

      setCurrentTemplate(templateId);

      alert("Template updated successfully.");
    } catch (error) {
      console.error(
        "Failed to update template:",
        error
      );

      alert("Failed to update template.");
    } finally {
      setSaving(false);
    }
  }

  /* -------------------------------------------------------
     OPEN PREVIEW
  ------------------------------------------------------- */

  async function handlePreview(
    templateId: string
  ) {
    try {
      setPreviewLoading(true);

      setPreviewTemplate(templateId);

      setPortfolioData(null);

      const data =
        await getMyPortfolioData();

      if (!data) {
        alert(
          "Please complete your portfolio first."
        );

        setPreviewTemplate(null);

        return;
      }

      const mappedData =
        mapPortfolio(data);

      setPortfolioData(mappedData);
    } catch (error) {
      console.error(
        "Failed to load portfolio preview:",
        error
      );

      alert(
        "Failed to load portfolio preview."
      );

      setPreviewTemplate(null);
    } finally {
      setPreviewLoading(false);
    }
  }

  /* -------------------------------------------------------
     CLOSE PREVIEW
  ------------------------------------------------------- */

  function closePreview() {
    setPreviewTemplate(null);
    setPortfolioData(null);
    setPreviewLoading(false);
  }

  /* -------------------------------------------------------
     ESCAPE KEY
  ------------------------------------------------------- */

  useEffect(() => {
    function handleEscape(
      event: KeyboardEvent
    ) {
      if (
        event.key === "Escape" &&
        previewTemplate
      ) {
        closePreview();
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
  }, [previewTemplate]);

  /* -------------------------------------------------------
     LOADING PAGE
  ------------------------------------------------------- */

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">

          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#DDD4C5] border-t-[#8E77A8]" />

          <p className="mt-5 text-[#6B7280]">
            Loading templates...
          </p>

        </div>
      </main>
    );
  }

  /* -------------------------------------------------------
     FULL SCREEN PORTFOLIO PREVIEW
  ------------------------------------------------------- */

  const preview =
    previewTemplate &&
    mounted &&
    typeof document !== "undefined"
      ? createPortal(
          <div
            id="portfolio-preview-root"
            className="
              fixed
              inset-0
              z-[999999]
              h-screen
              w-screen
              overflow-hidden
              bg-white
            "
          >

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={closePreview}
              aria-label="Close portfolio preview"
              className="
                fixed
                right-6
                top-6
                z-[1000000]
                flex
                h-12
                w-12
                cursor-pointer
                items-center
                justify-center
                rounded-full
                bg-black/70
                text-white
                shadow-xl
                backdrop-blur-md
                transition-all
                duration-200
                hover:scale-110
                hover:bg-black
                active:scale-95
              "
            >
              <X
                size={26}
                strokeWidth={2.5}
              />
            </button>

            {/* PORTFOLIO */}

            <div
              className="
                absolute
                inset-0
                h-screen
                w-screen
                overflow-x-hidden
                overflow-y-auto
                bg-white
              "
            >

              {previewLoading ||
              !portfolioData ? (

                <div
                  className="
                    flex
                    min-h-screen
                    w-full
                    items-center
                    justify-center
                    bg-white
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
                      Building your portfolio preview...
                    </p>

                  </div>

                </div>

              ) : (

                <div
                  className="
                    min-h-screen
                    w-full
                    bg-white
                  "
                >
                  <TemplateRenderer
                    template={previewTemplate}
                    data={portfolioData}
                  />
                </div>

              )}

            </div>

          </div>,

          document.body
        )
      : null;

  return (
    <>
      {/* ---------------------------------------------------
          TEMPLATES DASHBOARD
      --------------------------------------------------- */}

      <main className="space-y-10 pb-16">

        <div>
          <h1 className="text-5xl font-bold text-[#2F3A25]">
            Templates
          </h1>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-[#6B7280]">
            Choose the template that best represents
            your portfolio. Preview your portfolio
            before publishing it.
          </p>
        </div>

        {/* TEMPLATE CARDS */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {templates.map((template) => {

            const selected =
              template.id === currentTemplate;

            return (
              <div
                key={template.id}
                className={`
                  overflow-hidden
                  rounded-3xl
                  border
                  bg-white
                  shadow-sm
                  transition
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  ${
                    selected
                      ? "border-[#8E77A8] ring-2 ring-[#8E77A8]"
                      : "border-[#DDD4C5]"
                  }
                `}
              >

                {/* IMAGE */}

                <div
                  className="
                    relative
                    h-64
                    w-full
                    bg-[#EFE8DE]
                  "
                >
                  <Image
                    src={template.preview}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* INFORMATION */}

                <div className="space-y-4 p-6">

                  <div className="flex items-center justify-between gap-3">

                    <h2 className="text-2xl font-bold text-[#2F3A25]">
                      {template.name}
                    </h2>

                    {selected && (
                      <span
                        className="
                          flex
                          shrink-0
                          items-center
                          gap-1
                          rounded-full
                          bg-green-100
                          px-3
                          py-1
                          text-sm
                          font-semibold
                          text-green-700
                        "
                      >
                        <Check size={14} />
                        Selected
                      </span>
                    )}

                  </div>

                  <p className="text-[#6B7280]">
                    {template.description}
                  </p>

                  {/* BADGES */}

                  <div className="flex flex-wrap gap-2">

                    {template.premium && (
                      <span
                        className="
                          rounded-full
                          bg-yellow-100
                          px-3
                          py-1
                          text-sm
                          font-medium
                          text-yellow-700
                        "
                      >
                        Premium
                      </span>
                    )}

                    {!template.available && (
                      <span
                        className="
                          rounded-full
                          bg-gray-100
                          px-3
                          py-1
                          text-sm
                          font-medium
                          text-gray-600
                        "
                      >
                        Coming Soon
                      </span>
                    )}

                  </div>

                  {/* PREVIEW */}

                  <button
                    type="button"
                    disabled={
                      !template.available ||
                      previewLoading
                    }
                    onClick={() =>
                      handlePreview(
                        template.id
                      )
                    }
                    className={`
                      mt-4
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-2xl
                      border
                      py-3
                      font-semibold
                      transition
                      ${
                        template.available
                          ? "border-[#8E77A8] text-[#8E77A8] hover:bg-[#8E77A8] hover:text-white"
                          : "cursor-not-allowed border-gray-200 text-gray-400"
                      }
                    `}
                  >

                    <Eye size={19} />

                    {previewLoading &&
                    previewTemplate ===
                      template.id
                      ? "Loading Preview..."
                      : "Preview Portfolio"}

                  </button>

                  {/* SELECT */}

                  <button
                    type="button"
                    disabled={
                      !template.available ||
                      selected ||
                      saving
                    }
                    onClick={() =>
                      handleSelect(
                        template.id
                      )
                    }
                    className={`
                      w-full
                      rounded-2xl
                      py-3
                      font-semibold
                      transition
                      ${
                        selected
                          ? "bg-[#8E77A8] text-white"
                          : template.available
                          ? "bg-[#2F3A25] text-white hover:bg-[#25301E]"
                          : "cursor-not-allowed bg-gray-200 text-gray-500"
                      }
                    `}
                  >

                    {selected
                      ? "Current Template"
                      : template.available
                      ? saving
                        ? "Saving..."
                        : "Select Template"
                      : "Unavailable"}

                  </button>

                </div>

              </div>
            );
          })}

        </div>

      </main>

      {/* PORTAL */}

      {preview}

    </>
  );
}