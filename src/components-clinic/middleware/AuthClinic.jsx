"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AuthClinic({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
        debugger;
        console.log("test");


      const accessToken = Cookies.get("clinic_access");
      const refreshToken = Cookies.get("clinic_refresh");
       console.log("accessToken",accessToken);
       console.log("refreshToken",refreshToken);

     
      if (pathname === "/partner-login") {
        setLoading(false);
        return;
      }

      



      if (!accessToken || !refreshToken) {
        router.replace(`/partner-login?returnUrl=${pathname}`);
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/verify`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await res.json();
        if (data.status === 401) {



          const refreshRes = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/refresh`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: refreshToken }),
            }
          );

          if (!refreshRes.ok) {
            Cookies.remove("clinic_access");
            Cookies.remove("clinic_refresh");
            router.replace("/partner-login");
            return;
          }

          const data = await refreshRes.json();
          Cookies.set("clinic_access", data.access_token, { expires: 1, secure: true, sameSite: "strict" });
          if (data.refresh_token) {
            Cookies.set("clinic_refresh", data.refresh_token, { expires: 7, secure: true, sameSite: "strict" });
          }
        }

        if (isMounted) setLoading(false);


      } catch (err) {
        console.error(err);
        router.replace("/partner-login");
      }
    };

    checkAuth();
    return () => { isMounted = false; };
  }, [pathname, router]);

  if (loading) {
    return <div className="text-center text-white p-8">Checking authentication...</div>;
  }

  return <>{children}</>;
}
