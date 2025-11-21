"use client";

import { FaBars } from "react-icons/fa";
import { clinicLogout } from "../utils/clinicLogout";
import NotificationDropdown from "@/components/header/NotificationDropdown";

export function ClinicHeader({ onToggleSidebar }) {


  
  return (
    <header className="h-14 bg-[#1ABC9C] text-white flex items-center justify-between px-6 shadow w-full">

      {/* Mobile Sidebar Toggle - Trigger passed from parent */}
      <button className="sm:hidden" onClick={onToggleSidebar}>
        <FaBars size={20} />
      </button>

      {/* Title or Logo Slot */}
      <div className="font-bold text-lg">Clinic Panel</div>


      {/* Right Actions */}
      

      <div className="flex items-center gap-4">
        
        <button 
        onClick={clinicLogout}
        className="bg-white text-[#1ABC9C] px-3 py-1 rounded-full text-sm font-semibold">
          Log out
        </button>
      </div>
    </header>
  );
}
