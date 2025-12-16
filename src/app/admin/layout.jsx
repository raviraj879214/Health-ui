"use client";
import { Outfit } from "next/font/google";
import { SidebarProvider } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/context/ThemeContext";

import { PermissionProvider } from "../../context/PermissionContext";
import SignInForm from "@/components/auth/SignInForm";
import  Providers  from "../admin/provider/providers";
import { ToastContainer } from "react-toastify";
import "../admin/admin-global.css";

const outfit = Outfit({ subsets: ["latin"] });

export default function AdminLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [returl, setReturl] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`/api/auth/get-token`, { cache: "no-store" });
        const data = await res.json();

        const currentUrl = window.location.pathname + window.location.search;

        setReturl(currentUrl);

        if (data?.token) {
          setIsAuth(true);
        }
      } catch { }
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p className="p-6 text-center">Checking authentication...</p>;
  }

  return (
    <ThemeProvider>
      <SidebarProvider>
        {/* ✅ PermissionProvider wraps both SignIn and children */}
        <PermissionProvider>

          {!isAuth ? (
            // ✅ Now SignInForm gets access to setPermissions
            <div className="min-h-screen flex items-center justify-center dark:bg-gray-900">
              <SignInForm returl={returl} />
            </div>
          ) : (
            <InnerLayout>{children}</InnerLayout>
          )}

        </PermissionProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
}

function InnerLayout({ children }) {
  const { isExpanded, isHovered, isMobileOpen } = require("@/context/SidebarContext").useSidebar();

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <div className={`${outfit.className} dark:bg-gray-900 min-h-screen xl:flex`}>
      <AppSidebar />
      <Backdrop />

      <div className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}>
        <AppHeader />
         <ToastContainer></ToastContainer>
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">

          <Providers>
            {children}
          </Providers>

        </div>
      </div>
    </div>
  );
}
