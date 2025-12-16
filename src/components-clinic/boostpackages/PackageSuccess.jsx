"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { clinicHeaders } from "../utils/clinicHeaders";

export function PackageSuccess({ session_id }) {
  const router = useRouter();
  const hasRun = useRef(false); // 🔥 Prevent double API calls

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    
    // router.replace("/partner/boost-package");


    window.history.replaceState({}, "", "/partner/boost-package");


    // Send session ID to backend
    sendSessionId();
  }, []);

  const sendSessionId = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-packages/insert-clinic-package`,
        {
          method: "POST",
          headers: clinicHeaders(),
          body: JSON.stringify({ sessionid: session_id }),
        }
      );

      if (res.ok) {
        console.log("Inserted boost package successfully");
      } else {
        console.log("Failed to insert");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="w-full max-w-2xl p-12 mx-4 text-center bg-white shadow-lg rounded-xl">
          <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold text-green-600">
            Payment Successful!
          </h1>

          <p className="mb-8 text-xl text-gray-700">
            Thank you for your purchase.
          </p>

          <div className="p-6 mb-8 rounded-lg bg-blue-50">
            <p className="text-lg font-medium text-blue-700">
              Your package will appear shortly.
            </p>
          </div>

          <div className="mt-12">
            <a
              href="/partner/boost-package"
              className="btn btn-primary inline-block px-8 py-4 text-lg font-semibold text-white rounded-lg"
            >
              Return to Packages
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
