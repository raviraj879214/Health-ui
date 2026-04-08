"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, "success", "fail"
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    if (session_id) checkPaymentStatus();
  }, [session_id]);

  const checkPaymentStatus = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/update-service-payment-status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: session_id }),
        }
      );

      if (res.ok) {
        const result = await res.json();
        if (result.success) {
          setPaymentStatus("success");
          setMetadata(result.metadata);
        } else {
          setPaymentStatus("fail");
        }
      } else {
        setPaymentStatus("fail");
      }
    } catch (error) {
      console.error("Error fetching payment status:", error);
      setPaymentStatus("fail");
    } finally {
      setLoading(false);
    }
  };

  if (!session_id)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-medium">No session ID found.</p>
      </div>
    );

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Loading payment status...</p>
      </div>
    );

  const IconAnimation = ({ type }) => {
    const variants = {
      hidden: { pathLength: 0, opacity: 0 },
      visible: { pathLength: 1, opacity: 1, transition: { duration: 0.8 } },
    };

    return type === "success" ? (
      <svg className="w-24 h-24 text-green-600 mx-auto mb-4" viewBox="0 0 52 52">
        <motion.path
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14 27l7 7 17-17"
          initial="hidden"
          animate="visible"
          variants={variants}
        />
      </svg>
    ) : (
      <svg className="w-24 h-24 text-red-600 mx-auto mb-4" viewBox="0 0 52 52">
        <motion.line
          x1="16"
          y1="16"
          x2="36"
          y2="36"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, transition: { duration: 0.6 } }}
        />
        <motion.line
          x1="36"
          y1="16"
          x2="16"
          y2="36"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1, transition: { duration: 0.6, delay: 0.2 } }}
        />
      </svg>
    );
  };

  const StatusCard = ({ type, title, message, bgGradient, btnColor }) => (
    <div className={`flex justify-center items-center h-screen ${bgGradient} p-4`}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center hover:shadow-3xl transition-shadow"
      >
        <IconAnimation type={type} />

        <h1 className={`text-2xl font-bold mb-3 ${type === "success" ? "text-green-700" : "text-red-700"}`}>
          {title}
        </h1>
        <p className="text-gray-600 mb-6">{message}</p>

        
        <button
          onClick={() => router.push("/")}
          className={`${btnColor} text-white font-semibold py-2 px-6 rounded-lg transition-transform hover:scale-105 shadow-md hover:shadow-lg`}
        >
          {type === "success" ? "Go to Home" : "Try Again / Go to Home"}
        </button>
      </motion.div>
    </div>
  );

  return paymentStatus === "success" ? (
    <StatusCard
      type="success"
      title={`Payment Successful! for ${metadata?.name || "Additional Cost"}`}
      message="Thank you for your payment."
      bgGradient="bg-gradient-to-br from-green-50 to-green-100"
      btnColor="bg-green-600 hover:bg-green-700"
    />
  ) : (
    <StatusCard
      type="fail"
      title="Payment Failed!"
      message="Something went wrong with your payment."
      bgGradient="bg-gradient-to-br from-red-50 to-red-100"
      btnColor="bg-red-600 hover:bg-red-700"
    />
  );
}