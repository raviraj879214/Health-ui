"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export function PartnerLogin() {
  const [email, setEmail] = useState("admin@clinics.com");
  const [password, setPassword] = useState("Test@123");
  const [returnUrl, setReturnUrl] = useState("/partner"); // default fallback
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = searchParams.get("returnUrl");
    if (url) setReturnUrl(url);
  }, [searchParams]);

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const payload = { email, password };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error?.message || "Login Failed");
        return;
      }

      const result = await res.json();

      Cookies.set("clinic_access", result.access_token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      Cookies.set("clinic_refresh", result.refresh_token, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });

      router.push(returnUrl); // use returnUrl dynamically
    } catch (error) {
      alert("Network Error!");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      {/* ... rest of your form */}
    </div>
  );
}
