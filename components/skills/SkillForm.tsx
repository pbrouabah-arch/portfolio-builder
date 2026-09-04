"use client";

import { useEffect, useState } from "react";
import { Skill } from "@/lib/skills";

interface Props {
  skill: Skill | null;
  onSave: (skill: Partial<Skill>) => Promise<void>;
}

export default function SkillForm({
  skill,
  onSave,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [level, setLevel] = useState(80);
  const [category, setCategory] = useState("");
  const [icon, setIcon] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  useEffect(() => {
    if (!skill) {
      setName("");
      setLevel(80);
      setCategory("");
      setIcon("");
      setDisplayOrder(0);
      return;
    }

    setName(skill.name);
    setLevel(skill.level);
    setCategory(skill.category ?? "");
    setIcon(skill.icon ?? "");
    setDisplayOrder(skill.display_order);
  }, [skill]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    try {
      await onSave({
        id: skill?.id,
        name,
        level,
        category: category || null,
        icon: icon || null,
        display_order: displayOrder,
      });

      alert("Skill saved successfully.");
    } catch (error: any) {
      console.error(error);
      alert(error?.message || JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-[#CFC4B2] bg-white p-4 text-[#1F2937] placeholder:text-[#6B7280] outline-none transition focus:border-[#8E77A8] focus:ring-2 focus:ring-[#8E77A8]/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[#DDD4C5] bg-white p-8 shadow-sm"
    >
      <h2 className="mb-8 text-3xl font-bold text-[#2F3A25]">
        Skill
      </h2>

      <div className="grid gap-5">

        <input
          required
          placeholder="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
        />

        <div>
          <label className="mb-2 block font-medium text-[#2F3A25]">
            Skill Level ({level}%)
          </label>

          <input
            type="range"
            min="0"
            max="100"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full accent-[#8E77A8]"
          />
        </div>

        <input
          placeholder="Category (Optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        />

        <input
          placeholder="Icon (Optional)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          className={inputClass}
        />

        <input
          type="number"
          placeholder="Display Order"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(Number(e.target.value))}
          className={inputClass}
        />

      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 w-full rounded-2xl bg-[#8E77A8] py-4 text-lg font-semibold text-white transition hover:bg-[#7C6696] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Skill"}
      </button>

    </form>
  );
}