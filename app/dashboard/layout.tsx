import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/dashboard/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">

      <Sidebar />

      <div className="lg:ml-72">

        <Navbar />

        <main className="min-h-[calc(100vh-80px)] p-6 lg:p-10">
          {children}
        </main>

      </div>

    </div>
  );
}