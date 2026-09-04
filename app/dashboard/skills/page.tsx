"use client";

import { useEffect, useState } from "react";
import SkillForm from "@/components/skills/SkillForm";
import {
  Skill,
  getSkills,
  saveSkill,
  deleteSkill,
} from "@/lib/skills";

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSave(skill: Partial<Skill>) {
    try {
      await saveSkill(skill);

      await loadSkills();

      setSelectedSkill(null);
      setShowForm(false);
    } catch (error: any) {
      console.error(error);
      alert(error?.message || JSON.stringify(error));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this skill?")) return;

    try {
      await deleteSkill(id);
      await loadSkills();
    } catch (error: any) {
      console.error(error);
      alert(error?.message || JSON.stringify(error));
    }
  }

  return (
    <main className="space-y-10">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-5xl font-bold text-[#2F3A25]">
            Skills
          </h1>

          <p className="mt-2 text-[#4B5563]">
            Manage your professional skills.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedSkill(null);
            setShowForm(true);
          }}
          className="rounded-xl bg-[#8E77A8] px-6 py-3 font-semibold text-white transition hover:bg-[#7C6696]"
        >
          + Add Skill
        </button>

      </div>

      {showForm && (
        <SkillForm
          skill={selectedSkill}
          onSave={handleSave}
        />
      )}

      {skills.length === 0 ? (

        <div className="rounded-3xl border border-[#DDD4C5] bg-white p-16 text-center">

          <h2 className="text-3xl font-bold text-[#2F3A25]">
            No Skills Yet
          </h2>

          <p className="mt-4 text-[#4B5563]">
            Add your first professional skill.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {skills.map((skill) => (

            <div
              key={skill.id}
              className="rounded-3xl border border-[#DDD4C5] bg-white p-6 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div className="flex-1">

                  <div className="flex items-center justify-between">

                    <h2 className="text-2xl font-bold text-[#2F3A25]">
                      {skill.name}
                    </h2>

                    <span className="font-semibold text-[#8E77A8]">
                      {skill.level}%
                    </span>

                  </div>

                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-[#E8E2D8]">

                    <div
                      className="h-full rounded-full bg-[#8E77A8]"
                      style={{
                        width: `${skill.level}%`,
                      }}
                    />

                  </div>

                  {skill.category && (
                    <p className="mt-3 text-sm text-[#6B7280]">
                      Category: {skill.category}
                    </p>
                  )}

                  {skill.icon && (
                    <p className="mt-1 text-sm text-[#6B7280]">
                      Icon: {skill.icon}
                    </p>
                  )}

                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <button
                  onClick={() => {
                    setSelectedSkill(skill);
                    setShowForm(true);
                  }}
                  className="flex-1 rounded-xl bg-[#8E77A8] py-3 font-semibold text-white hover:bg-[#7C6696]"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(skill.id)}
                  className="flex-1 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}