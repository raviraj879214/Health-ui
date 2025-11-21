"use client";

import { useRouter } from "next/navigation";
import {
  FaRegClipboard,
  FaStar,
  FaBullhorn,
  FaHospital,
  FaChartLine,
  FaChartBar,
  FaCogs,
} from "react-icons/fa";
import { HiOutlineSupport } from "react-icons/hi";

export function ClinicSidebar({ collapsed, mobileOpen, active, setActive, toggleMobile }) {
  const router = useRouter();

  // Define menu items with route URLs
  const menu = [
    { name: "Requests", icon: FaRegClipboard, url: "/partner/dashboard" },
    { name: "Reviews", icon: FaStar, url: "/partner/profile" },
    { name: "Advertising", icon: FaBullhorn, url: "/partner/advertising" },
    { name: "Clinic", icon: FaHospital, url: "/partner/clinic" },
    { name: "Sales analytics", icon: FaChartLine, url: "/partner/sales-analytics" },
    { name: "User analytics", icon: FaChartBar, url: "/partner/user-analytics" },
    { name: "Agency settings", icon: FaCogs, url: "/partner/agency-settings" },
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
          bg-[#1ABC9C] text-white px-3 flex flex-col justify-center flex-shrink-0
          ${collapsed ? "h-16 items-center text-center" : "h-20"}
        `}
      >
        <span className="font-bold text-[18px] leading-none">Bookimed</span>
        <span className="text-[12px] mt-[4px]">Partner's Cabinet</span>
      </div>

      {/* Menu */}
      <ul className="mt-2 text-[15px] text-[#2C2C2C] overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-300">
        {menu.map((m) => {
          const Icon = m.icon;
          const isActive = active === m.name;
          return (
            <li
              key={m.name}
              onClick={() => {
                setActive(m.name);
                toggleMobile(false); // Close on mobile
                router.push(m.url); // Navigate to URL
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
