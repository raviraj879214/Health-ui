"use client";

import { useState } from "react";
import { ClinicHeader } from "../../components-clinic/shared/HeaderClinic";
import { ClinicSidebar } from "../../components-clinic/shared/SidebarClinic";
import AuthClinic from "../../components-clinic/middleware/AuthClinic";
import "../partner/partner-global.css";
import { ToastContainer } from "react-toastify";
import  {ReduxPartnerProvider} from "../../components-clinic/redux/provider";
import Cookies from "js-cookie";





export default function ClinicLayout({ children }) {
  const [collapsed] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Requests");


   const admin_login_clinic = Cookies.get("admin_login_clinic");

  

  return (
    
    <AuthClinic>
      
      <div className="flex h-screen w-full bg-[#F5F6FA] ">
        
        <ReduxPartnerProvider>
        

          

            <ClinicSidebar 
              collapsed={collapsed}
              mobileOpen={mobileOpen}
              active={active}
              setActive={setActive}
              toggleMobile={setMobileOpen} />

  


          

          <div className="flex-1 flex flex-col">

            

           
              <ClinicHeader onToggleSidebar={() => setMobileOpen(!mobileOpen)} />
         

            <ToastContainer></ToastContainer>

            <main className="p-6 overflow-x-auto">
              {children}
            </main>

          </div>

         </ReduxPartnerProvider>

        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 sm:hidden"
            onClick={() => setMobileOpen(false)}
          ></div>
        )}
      </div>
    </AuthClinic>
  );
}
