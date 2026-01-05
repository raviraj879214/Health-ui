"use client";

import { FaBars } from "react-icons/fa";
import { clinicLogout } from "../utils/clinicLogout";
import NotificationUI from "@/components/NotificationListener/notificationListener";


export function ClinicHeader({ onToggleSidebar = () => {} }) {
  return (
    <header className="h-14 background-theme text-white flex items-center justify-between px-6 shadow w-full p-8">
      <button className="sm:hidden" onClick={onToggleSidebar}>
        <FaBars size={20} />
      </button>
      <div className="font-bold text-lg">Clinic Panel</div>
     
      <div className="flex items-center gap-4">
         <NotificationUI></NotificationUI>
        <button 
          onClick={clinicLogout}
          className="bg-white text-[#1ABC9C] px-3 py-1 rounded-full text-sm font-semibold"
        >
          Log out
        </button>
      </div>
    </header>
  );
}
