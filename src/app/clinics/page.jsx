"use client";

import { useState } from "react";
import {
  FaRegClipboard,
  FaStar,
  FaBullhorn,
  FaHospital,
  FaChartLine,
  FaChartBar,
  FaCogs,
  FaBars,
} from "react-icons/fa";
import { HiOutlineSupport } from "react-icons/hi";

export default function Layout() {
  // 📌 Sidebar always collapsed on desktop
  const [collapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Requests");

  // 📌 ADD ANY NUMBER OF MENUS (supports +25)
  const menu = [
    { name: "Requests", icon: FaRegClipboard },
    { name: "Reviews", icon: FaStar },
    { name: "Advertising", icon: FaBullhorn },
    { name: "Clinic", icon: FaHospital },
    { name: "Sales analytics", icon: FaChartLine },
    { name: "User analytics", icon: FaChartBar },
    { name: "Agency settings", icon: FaCogs },
    
    // ...Array.from({ length: 20 }, (_, i) => ({
    //   name: `Extra Menu ${i + 1}`,
    //   icon: FaRegClipboard,
    // })),
  ];

  return (
    <div className="flex h-screen w-full bg-[#F5F6FA] overflow-hidden">

      {/* Sidebar */}
      <aside
        className={`
          bg-white border-r border-gray-200 flex flex-col
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-30" : "w-60"}
          ${mobileOpen ? "fixed left-0 top-0 z-50 h-full w-60" : "hidden"}
          sm:flex sm:relative sm:h-full
        `}
      >

        {/* Logo (Fixed Top) */}
        <div
          className={`
            bg-[#1ABC9C] text-white px-3 flex flex-col justify-center
            transition-all duration-300 flex-shrink-0
            ${collapsed ? "h-16 items-center text-center" : "h-20"}
          `}
        >
          <span className="font-bold text-[18px] leading-none">Bookimed</span>
          <span className="text-[12px] tracking-wide leading-none mt-[4px]">
            partner`s cabinet
          </span>
        </div>

        {/* Scrollable Menu */}
        <ul className="mt-2 text-[15px] text-[#2C2C2C] overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300">
          {menu.map((m) => {
            const Icon = m.icon;
            const isActive = active === m.name;

            return (
              <li
                key={m.name}
                className={`
                  cursor-pointer transition-all hover:bg-gray-100
                  px-0 py-4 flex flex-col items-center
                  ${isActive ? "bg-[#F8FFE6] border-t-4 border-[#1ABC9C] text-[#689B0D]" : ""}
                `}
                onClick={() => setActive(m.name)}
              >
                <Icon size={20} className="opacity-90" />
                <span className="text-[11px] mt-1 text-center leading-none">
                  {m.name}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Help (Fixed Bottom) */}
        <div
          className="bg-[#08A88A] text-white m-3 rounded-md
            cursor-pointer flex flex-col items-center justify-center flex-shrink-0 py-3"
        >
          <HiOutlineSupport size={19} />
          <span className="text-[11px] mt-1">Help</span>
        </div>
      </aside>

      {/* Main Page */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <header className="h-14 bg-[#1ABC9C] text-white flex items-center justify-between px-6 shadow">

          {/* Mobile Sidebar Toggle */}
          <button className="sm:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            <FaBars size={20} />
          </button>

          <div className="font-bold text-lg"></div>

          <div className="flex items-center gap-4">
            
            <button className="bg-white text-[#1ABC9C] px-3 py-1 rounded-full text-sm font-semibold">
              Log out
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto">
          <h2 className="text-lg font-bold">Selected Page: {active}</h2>
        </main>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </div>
  );
}
