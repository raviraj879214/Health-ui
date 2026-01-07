"use client";
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep, setEmail, setOtp, setuuid  } from "../../redux/partnerregister/registerSlice";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import next from "next";




export  function StepOne() {
  const step = useSelector((state) => state.register.step);
  const otp = useSelector((state) => state.register.otp);
  const email = useSelector((state) => state.register.email);
  const uuid = useSelector((state) => state.register.uuid);


  const dispatch = useDispatch();
  const [otpmodal,setOtpModal] = useState(false);
  const [button ,setButton] = useState(false);
  const [count, setCount] = useState(0);


  useEffect(() => {
    if (count === 0) return;

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError
  } = useForm();



  const sendOtp =async (data) => {
        debugger;
        setButton(true);
         const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/validate-email`,{
            method : "Post",
            headers:{
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                "email" : data.email
            })
        });
        if(res.ok){
          debugger;
            const result = await res.json();
            if(result.status == 404){
                setError("email", {type: "manual",message: "Email already exists"});
            }
            
            if(result.status == 404){
                    toast.success(result.message, {
                    className: "bg-blue-600 text-white font-bold",
                    bodyClassName: "text-white",
            });

             return ;
            }

             dispatch(setEmail(result.data.email));
                dispatch(setuuid(result.data.uuid));
            if(result.data.isOtpVerify){
                dispatch(nextStep());
                return;
            }
           



            setOtpModal(!result.data.isOtpVerify);
            dispatch(setOtp(result.otp));
            setCount(30);
            toast.success("OTP sent!", {
                    className: "bg-blue-600 text-white font-bold",
                    bodyClassName: "text-white",
            });

        }
        setButton(false);
  };




const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const otpRefs = useRef([]);

 const onDigitChange =async (value, position)=> {
  if (!/^\d?$/.test(value)) return;

  const updatedOtp = [...otpDigits];
  updatedOtp[position] = value;
  setOtpDigits(updatedOtp);

  const fullOtp = updatedOtp.join("");
  console.log("OTP:", fullOtp);


  if(otp == fullOtp){
   await updateOtpService();
  }

  if (value && position < otpDigits.length - 1) {
    otpRefs.current[position + 1]?.focus();
  }
};


  const onOtpPaste = (e) => {
    debugger;
    e.preventDefault();
    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, otpDigits.length);

    if (!pastedValue) return;

    const updatedOtp = pastedValue.split("");
    setOtpDigits(updatedOtp);

    otpRefs.current[updatedOtp.length - 1]?.focus();
  };

  const onKeyPress = (e, position) => {
    if (e.key === "Backspace" && !otpDigits[position] && position > 0) {
      otpRefs.current[position - 1]?.focus();
    }
  };


  const updateOtpService = async()=>{
        debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/update-otp-service`,{
        method : "Post",
        headers:{
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            "isOtpVerify" : true,
            "uuid" : uuid

        })
    });
    if(res.ok){
        dispatch(nextStep());
    }
  }




  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
            Partner Onboarding
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
            Become a Trusted Partner
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Join our premium healthcare network and unlock new growth opportunities
            with seamless onboarding.
          </p>
        </div>

     
        <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
        
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="px-6 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r bg-[var(--primary)] shadow-md">
              Step {step} of 4
            </span>
          </div>

          <form onSubmit={handleSubmit(sendOtp)} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Verify Your  Email
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Please provide your official  email address
                  
                </p>

                <ul className="mt-6 space-y-3 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    Secure & confidential verification
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    One-time OTP based confirmation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-blue-600" />
                    Takes less than a minute
                  </li>
                </ul>
              </div>

              <div className="space-y-8">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="clinic@company.com"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...register("email", {
                      required: "Please enter your email address",
                    })}/>




                  {errors.email && (
                    <p className="mt-2 text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-gray-500">
                    We never share your email with third parties.
                  </p>
                </div>

               {otpmodal &&(
                    <div className="rounded-2xl border border-gray-200 bg-slate-50 p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-1">
                    Email Verification
                  </h4>
                  <p className="text-sm text-gray-600 mb-5">
                    Enter the 4-digit verification code sent to your phone.
                  </p>


                 {process.env.NEXT_PUBLIC_ENV === "development" && (
                    <div className="mb-5 p-5 mt-3 rounded-md border border-yellow-300 bg-yellow-50 px-4 py-2 text-sm text-yellow-800">
                      <strong>Test Mode:</strong> Use OTP <span className="font-semibold">0000</span>
                    </div>
                  )}

                  <div
      className="flex justify-between gap-3 max-w-xs"
      onPaste={onOtpPaste}
    >
      {otpDigits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => (otpRefs.current[index] = el)}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => onDigitChange(e.target.value, index)}
          onKeyDown={(e) => onKeyPress(e, index)}
          inputMode="numeric"
          className="h-14 w-14 rounded-xl text-center text-2xl font-bold
            bg-white border border-gray-300 focus:outline-none
            focus:ring-2 focus:ring-indigo-500"
        />
      ))}
    </div>




                  {count > 0 &&(
                        <div className="m-1">You can resend the OTP in {count}s</div>
                  )}
                  

                   
                 
                </div>
               )}
                
                
              </div>
            </div>

            {/* Footer */}
            <div className="mt-12 flex items-center justify-between border-t pt-8">
              <button
                type="button"
                onClick={() => dispatch(prevStep())}
                disabled={step === 1}
                className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700
                  hover:bg-gray-100 disabled:opacity-50"
              >
                ← Back
              </button>

             

             <button
  id="submitOtpButton"
  type="submit"
  disabled={count !== 0 || button}
  className="btn btn-primary flex items-center justify-center gap-2"
>
  {button && (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )}

  <span>
    {button ? "Processing..." : otpmodal ? "Resend OTP" : "Continue →"}
  </span>
</button>




            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
