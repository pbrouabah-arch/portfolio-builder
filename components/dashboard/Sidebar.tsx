"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  User,
  FolderKanban,
  Code2,
  Award,
  Palette,
  Settings,
  LogOut,
  Briefcase,
  Wallet,
  BookOpen,
  Trophy,
  X,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

const links = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
  {
    title: "Skills",
    href: "/dashboard/skills",
    icon: Code2,
  },
  {
    title: "Certificates",
    href: "/dashboard/certificates",
    icon: Award,
  },
  {
    title: "Education",
    href: "/dashboard/education",
    icon: BookOpen,
  },
  {
    title: "Experience",
    href: "/dashboard/experience",
    icon: Briefcase,
  },
  {
    title: "Achievements",
    href: "/dashboard/achievements",
    icon: Trophy,
  },
  {
    title: "Templates",
    href: "/dashboard/templates",
    icon: Palette,
  },
  {
    title: "Final Portfolio",
    href: "/dashboard/final-portfolio",
    icon: Wallet,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleToggle() {
      setIsOpen((previous) => !previous);
    }

    window.addEventListener("toggle-mobile-sidebar", handleToggle);

    return () => {
      window.removeEventListener("toggle-mobile-sidebar", handleToggle);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  async function logout() {
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-[#DDD4C5] bg-white shadow-xl transition-transform duration-300 lg:z-50 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ==================================================
            LOGO
        ================================================== */}

        <div className="flex shrink-0 items-center justify-between border-b border-[#DDD4C5] p-8">
          <div>
            <h1 className="text-3xl font-extrabold text-[#4B543B]">
              Portfolio
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Builder
            </p>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close sidebar"
            className="rounded-xl p-2 text-[#4B543B] transition hover:bg-[#F5F1E8] lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* ==================================================
            NAVIGATION
        ================================================== */}

        <nav className="min-h-0 flex-1 overflow-y-auto p-5">
          <div className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              const active =
                pathname === link.href ||
                (link.href !== "/dashboard" &&
                  pathname.startsWith(`${link.href}/`));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? "bg-[#8E77A8] text-white shadow-lg"
                      : "text-[#4B543B] hover:bg-[#F5F1E8]"
                  }`}
                >
                  <Icon size={22} />

                  <span className="font-medium">
                    {link.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* ==================================================
            LOGOUT
        ================================================== */}

        <div className="shrink-0 border-t border-[#DDD4C5] bg-white p-5">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={22} />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}