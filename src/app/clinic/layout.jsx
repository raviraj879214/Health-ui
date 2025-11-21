"use client";

import { useState } from "react";
import { ClinicHeader } from "../../components-clinic/shared/HeaderClinic";
import { ClinicSidebar } from "../../components-clinic/shared/SidebarClinic";

export default function ClinicLayout({children}) {
  const [collapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Requests");

  return (
    <div className="flex h-screen w-full bg-[#F5F6FA] overflow-hidden">

      {/* Sidebar */}
      <ClinicSidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        active={active}
        setActive={setActive}
        toggleMobile={setMobileOpen}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <ClinicHeader onToggleSidebar={() => setMobileOpen(!mobileOpen)} />

        <main className="p-6 overflow-y-auto">
          <h2 className="text-lg font-bold text-gray-700">
           
            {children}
          </h2>
        </main>
      </div>

      {/* Overlay for mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </div>
  );
}
