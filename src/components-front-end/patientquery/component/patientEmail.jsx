"use client";

import {
  addPatientEmail,
  addPatientEmailOtp,
  addStep,
} from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

export function PatientEmail() {
  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const patientEmail = useSelector(
    (state) => state.patientquery.patientEmail
  );
  const emailotp = useSelector((state) => state.patientquery.emailotp);

  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  const emailValue = watch("emailaddress");

  /* ---------------- Submit Email & Send OTP ---------------- */

  const onEnter = async (data) => {
    if (!data.emailaddress) return;

    setLoading(true);

    dispatch(addPatientEmail(data.emailaddress));

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-query/verify-patient-email`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: data.emailaddress }),
        }
      );

      if (!res.ok) throw new Error("Failed to send OTP");

      const result = await res.json();

      dispatch(addPatientEmailOtp(String(result.otp)));

      toast.success("OTP sent successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });

      // Clear OTP boxes on resend
      inputsRef.current.forEach((input) => {
        if (input) input.value = "";
      });
    } catch (err) {
      toast.error("Failed to send OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- Restore Email After Refresh ---------------- */

  useEffect(() => {
    if (patientEmail) {
      setValue("emailaddress", patientEmail);
    }
  }, [patientEmail, setValue]);

  /* ---------------- OTP Input Logic ---------------- */

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) {
      e.target.value = "";
      return;
    }

    e.target.value = value[0];

    if (index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    verifyOtp();
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    pasted.split("").forEach((num, i) => {
      if (inputsRef.current[i]) {
        inputsRef.current[i].value = num;
      }
    });

    verifyOtp();
  };

  /* ---------------- OTP Verification ---------------- */

  const verifyOtp = () => {
    const otp = inputsRef.current.map((i) => i?.value || "").join("");

    if (otp.length === 6 && otp === emailotp) {
      dispatch(addPatientEmailOtp("0"));
      dispatch(addStep());

      inputsRef.current.forEach((input) => {
        if (input) input.value = "";
      });
    }
  };

  /* ---------------- Reset OTP if Email Changes ---------------- */

  useEffect(() => {
    if (emailotp !== "0") {
      dispatch(addPatientEmailOtp("0"));
      inputsRef.current.forEach((input) => {
        if (input) input.value = "";
      });
    }
  }, [emailValue]);

  /* ---------------- UI ---------------- */

  return (
    <>
      <ToastContainer />

      <div className="bg-gray-50 flex flex-col items-center py-10 px-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-2 max-w-3xl">
          What is your e-mail address?
        </h2>

        <p className="text-sm text-blue-700 mb-6">
          We will use this email to send you details about your request
        </p>

        <div className="flex justify-center w-full">
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 flex items-center justify-center text-gray-400" />

            <form
              onSubmit={handleSubmit(onEnter)}
              className="p-6 flex flex-col gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className={`w-full px-4 py-2 border rounded-lg
                focus:outline-none focus:ring-2 transition
                ${
                  errors.emailaddress
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-500"
                }`}
                {...register("emailaddress", {
                  required: "Please enter your email",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />

              {errors.emailaddress && (
                <p className="text-sm text-red-600">
                  {errors.emailaddress.message}
                </p>
              )}

              {emailotp !== "0" && emailValue && (
                <div
                  className="flex flex-row items-center justify-between mx-auto w-full gap-2"
                  onPaste={handlePaste}
                >
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        ref={(el) => (inputsRef.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        className="w-full h-full text-center outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-3">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-primary"
                >
                  {loading ? "Sending..." : emailotp !== "0" ? "Resend" : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
