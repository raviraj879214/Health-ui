"use client"
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";






export function PartnerForgot(){


    const {register,handleSubmit,formState: { errors, isSubmitting },reset} = useForm();
    const [button,setButton] = useState(false);



      const onSubmit=async (data)=>{
        debugger;
        setButton(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/partner-forgot-password`,{
            method :"Post",
            headers:{
                "content-type" : "application/json"
            },
            body:JSON.stringify({
                "email" : data.email
            })
        });

        if(res.ok){
            const result = await res.json();
            reset();
           toast.success(result.message);
        }

        setButton(false);



      }








    return(<>


     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <ToastContainer position="top-center" />

      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Partner Forgot Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="mb-1">
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


            <p className="flex items-end justify-end">
                <a href="/partner-login" className="text-blue-600 hover:underline text-sm">
                    Back to login
                </a>
            </p>



          <button
          disabled={button}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-400 text-white py-2 rounded-lg text-sm font-semibold disabled:opacity-50">

            
            {button ? "Submitting" : "Submit"}
            
          </button>
        </form>
      </div>
    </div>
    
    
    </>);
}