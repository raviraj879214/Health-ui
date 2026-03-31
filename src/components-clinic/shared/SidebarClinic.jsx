"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  FaHospital,
  FaChartLine,
  FaRocket,
  FaUserCircle,
  FaRegSquare
} from "react-icons/fa";
import { HiOutlineSupport } from "react-icons/hi";
import Cookies from "js-cookie";
import { clinicHeaders } from "../utils/clinicHeaders";
import { useSelector } from "react-redux";


let socket;
export function ClinicSidebar({ collapsed, mobileOpen, active, setActive, toggleMobile }) {

  const router = useRouter();
  const pathname = usePathname(); // current URL
  

  // const requestcount = useSelector((state) => state.counter.value);
  const [requestcount,setrequestcount] = useState(0);


  const clinic_id = Cookies.get("clinic_id");


  const menu = [
    { name: "Clinic", icon: FaHospital, url: "/partner/clinic" },
    { name: "Requests", icon: FaRegSquare, url: "/partner/requests" },
    { name: "Dashboard", icon: FaUserCircle, url: "/partner/dashboard" },
    { name: "Boost Package", icon: FaRocket, url: "/partner/boost-package" },
    { name: "Clinic Boost", icon: FaChartLine, url: "/partner/clinic-boost-package" },
    { name: "Profile", icon: FaUserCircle, url: "/partner/profile" },
  ];



  useEffect(() => {
      requestCount();
    socket = io(`${process.env.NEXT_PUBLIC_NODEJS_URL}`);

    socket.on("connect", () => {
      console.log("Connected to notification socket");
    });

    socket.on("patientrequest_clinic", (data) => {
    
      requestCount();

    });


    return () => {
      socket.disconnect();
    };

  }, []);




  const requestCount = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/get-clinic-request-count`,{
      method : "Get",
      headers : await clinicHeaders(),
    });
    if(res.ok){
      const result= await res.json();
      setrequestcount(result.count);
      
    }

  }





  return (
    <aside
     id="clinic_sidebar"
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

          // ✅ Strict active match (no prefix collision)
          const isActive =
            pathname === m.url || pathname.startsWith(m.url + "/");

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
              <div className="relative">

                <Icon size={20} className="opacity-90" />

                {/* Notification Badge ONLY for Requests */}
                {m.name === "Requests" && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                    {requestcount} 
                  </span>
                )}

              </div>


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
