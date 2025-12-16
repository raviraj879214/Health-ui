"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";



export function PartnerReset({ resettoken }) {

    const [verifytoken, setVerifiytoken] = useState(false);
    const [email,setEmail] = useState("");
    const {register,handleSubmit,formState: { errors, isSubmitting },reset,watch} = useForm();
    const [button,setButton] = useState(false);
    const router = useRouter();

    useEffect(()=>{
        verifytokend();
    },[resettoken]);



    const verifytokend = async()=>{
       
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/partner-reset-verify`,{
            method : "Post",
            headers :{
                "content-type": "application/json"
            },
            body :JSON.stringify({
                "resettoken": resettoken
            })
        });
        if(res.ok){
            const result = await res.json();
            setVerifiytoken(!result.valid);
            setEmail(result.payload.email);
        }
      
    }


    const updatePassword = async(data)=>{
        debugger;
 setButton(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/partner-reset-password`,{
            method : "Post",
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                "email" : email,
                "password" : data.password
            })
        });
        if(res.ok){
            
            const result = await res.json();

                 toast.success(result.message);
                reset();

                setTimeout(() => {
                    router.push('/');
                }, 3000);

        }
         setButton(false);
    }








    return (<>

        {verifytoken ? (
            <div className="flex justify-center mt-10">
                <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-5 rounded-2xl shadow-md w-full max-w-lg animate-fade-in">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-200 p-3 rounded-full">
                            <svg
                                className="w-6 h-6 text-red-700"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v2m0 4h.01M12 5a7 7 0 100 14 7 7 0 000-14z"
                                />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold">Link Expired</h3>
                            <p className="text-sm">
                                Your reset link has expired. Please request a new password reset.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
  
              <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Partner Reset Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(updatePassword)}>
          
                <div className="space-y-4">

  {/* Password */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>

    <div className="relative">
      <input
        type="password"
        className={`w-full rounded-xl border px-3 py-2 pl-10 transition-all 
          focus:outline-none shadow-sm
          ${
            errors.password
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }
        `}
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password should be at least 6 characters",
          },
        })}
      />

      {/* Icon */}
      <span className="absolute left-3 top-2.5 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 11c1.105 0 2-.895 2-2V7a2 2 0 10-4 0v2c0 1.105.895 2 2 2zm6 0h-1V7a5 5 0 10-10 0v4H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z" />
        </svg>
      </span>
    </div>

    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
  </div>

  {/* Confirm Password */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Confirm Password
    </label>

    <div className="relative">
      <input
        type="password"
        className={`w-full rounded-xl border px-3 py-2 pl-10 transition-all 
          focus:outline-none shadow-sm
          ${
            errors.confirmpassword
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-indigo-500"
          }
        `}
        {...register("confirmpassword", {
          required: "Confirm password is required",
          minLength: {
            value: 6,
            message: "Password should be at least 6 characters",
          },
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        })}
      />

      {/* Icon */}
      <span className="absolute left-3 top-2.5 text-gray-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 11c1.105 0 2-.895 2-2V7a2 2 0 10-4 0v2c0 1.105.895 2 2 2zm6 0h-1V7a5 5 0 10-10 0v4H6a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z" />
        </svg>
      </span>
    </div>

    {errors.confirmpassword && (
      <p className="text-red-500 text-sm mt-1">
        {errors.confirmpassword.message}
      </p>
    )}
  </div>

</div>



            <p className="flex items-end justify-end">
                <a href="/partner-login" className="text-blue-600 hover:underline text-sm">
                    Back to login
                </a>
            </p>



          <button
          disabled={button}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-400 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-50">

            
            {button ? "Submitting" : "Reset Password"}
            
          </button>
        </form>
      </div>
    </div>
        
        
        
        
        
        
        
        
        
        
        )}


    </>);
}