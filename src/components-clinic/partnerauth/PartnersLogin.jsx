"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";


export function PartnerLogin() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onLogin = async (data) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        toast.error(error?.message || "Login Failed");
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

      toast.success("Login successful!");

      setTimeout(() => {
        router.push("/partner");
      }, 800);
    } catch (error) {
      toast.error("Network Error!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Partner Login
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onLogin)}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none 
                ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className={`mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none 
                ${
                  errors.password
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters",
                },
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

        
          <p className="flex items-end justify-end">
              <a href="/partner-forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-400 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
          >
            {isSubmitting ? "Please wait..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
