"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  FaRegClipboard,
  FaStar,
  FaBullhorn,
  FaHospital,
  FaChartLine,
  FaChartBar,
  FaCogs,
  FaUserCircle,
  FaWolfPackBattalion,
  FaFlask,
  FaRocket,
  FaRegSquare
} from "react-icons/fa";
import { HiOutlineSupport } from "react-icons/hi";

export function ClinicSidebar({ collapsed, mobileOpen, active, setActive, toggleMobile }) {
  const router = useRouter();
  const pathname = usePathname(); // ✅ current URL

  const menu = [
    { name: "Clinic", icon: FaHospital, url: "/partner/clinic" },
    { name: "Requests", icon: FaRegSquare, url: "/partner/requests" },
    { name: "Dashboard", icon: FaUserCircle, url: "/partner/dashboard" },
    { name: "Boost Package", icon: FaRocket, url: "/partner/boost-package" },
    { name: "Clinic Boost Package", icon: FaRocket, url: "/partner/clinic-boost-package" },
    { name: "Profile", icon: FaUserCircle, url: "/partner/profile" },
  ];

  return (
    <aside
      className={`
        bg-white border-r border-gray-200 flex flex-col
        transition-all duration-300
        ${collapsed ? "w-30" : "w-60"}
        ${mobileOpen ? "fixed left-0 top-0 z-50 h-full w-60" : "hidden"}
        sm:flex sm:relative sm:h-full
      `}
    >
      {/* Logo */}
      <div
        className={`
          background-theme text-white px-3 flex flex-col justify-center flex-shrink-0
          ${collapsed ? "h-16 items-center text-center" : "h-20"}
        `}
      >
        <span className="font-bold text-[18px] leading-none">HealthTech</span>
        <span className="text-[12px] mt-[4px]">Partner's Cabinet</span>
      </div>

      {/* Menu */}
      <ul className="mt-2 text-[15px] text-[#2C2C2C] overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300 p-0">
        {menu.map((m) => {
          const Icon = m.icon;

          // ✅ Active based on URL
          const isActive = pathname.startsWith(m.url);

          return (
            <li
              key={m.name}
              onClick={() => {
                toggleMobile(false);
                router.push(m.url);
              }}
              className={`
                cursor-pointer transition-all hover:bg-gray-100
                px-0 py-4 flex flex-col items-center
                ${isActive ? "bg-[#F8FFE6] border-t-4 border-[#1ABC9C] text-[#689B0D]" : ""}
              `}
            >
              <Icon size={20} className="opacity-90" />
              <span className="text-[11px] mt-1">{m.name}</span>
            </li>
          );
        })}
      </ul>

      {/* Help */}
      <div className="bg-[#08A88A] text-white m-3 rounded-md cursor-pointer flex flex-col items-center justify-center flex-shrink-0 py-3">
        <HiOutlineSupport size={19} />
        <span className="text-[11px] mt-1">Help</span>
      </div>
    </aside>
  );
}
