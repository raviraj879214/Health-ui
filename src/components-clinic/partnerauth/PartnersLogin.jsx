"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";


export function PartnerLogin() {
  const [email, setEmail] = useState("admin@clinics.com");
  const [password, setPassword] = useState("Test@123");
  const router = useRouter();
  // const searchParams = useSearchParams();
  // const returnUrl = searchParams.get("returnUrl") || "/partner"; // default fallback


  const onLogin = async (e) => {
    debugger;
    e.preventDefault(); 

    try {
      const payload = { email, password };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        console.error("Login failed:", error);
        alert(error?.message || "Login Failed");
        return;
      }

      const result = await res.json();
      console.log("Login Success:", result);

  
     Cookies.set("clinic_access", result.access_token, {
        expires: 1,        
        secure: true,      
        sameSite: "strict" 
      });
      Cookies.set("clinic_refresh", result.refresh_token, {
        expires: 7,       
        secure: true,
        sameSite: "strict"
      });

      

      

      router.push("/partner")
    } catch (error) {
      console.log("Network Error:", error);
      alert("Network Error!");
    }
  };

  return (
    <div className="flex min-h-dvh flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={onLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-200">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md bg-white/10 px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline-indigo-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <a className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
                Forgot password?
              </a>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md bg-white/10 px-3 py-1.5 text-white placeholder:text-gray-500 focus:outline-indigo-500"
              />
            </div>
          </div>

         
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
