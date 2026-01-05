"use client";

import { addPatientName, addStep } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

export function NamePatient() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
   const patientName = useSelector((state) => state.patientquery.patientName);
   const dispatch =useDispatch();

  const onEnter = async (data) => {

    dispatch(addPatientName(data.name));
    dispatch(addStep());
  };

  useEffect(()=>{
        setValue("name",patientName);
  },[patientName]);

  return (
    <div className="bg-gray-50 flex flex-col items-center py-10 px-4">

    
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-2 max-w-3xl leading-relaxed">
        What is your first name? 
      </h2>

      <p className="text-sm text-blue-700 mb-6">
        We’ll use this to personalize your experience
      </p>

   
      <div className="flex justify-center w-full">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

       
          <div className="p-6  flex items-center justify-center text-gray-400">

          </div>

        
          <form
            onSubmit={handleSubmit(onEnter)}
            className="p-6 flex flex-col gap-3"
          >
            <input
            
              type="text"
              placeholder="Enter your first name"
              className={`w-full px-4 py-2 border rounded-lg
                focus:outline-none focus:ring-2 transition
                ${errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-indigo-500"}`}
              {...register("name", {
                required: "Please enter your name",
              })}
            />

            {errors.name && (
              <p className="text-sm text-red-600">
                {errors.name.message}
              </p>
            )}

            <div className="pt-3">
              <button
                type="submit"
                className="btn btn-primary">
                    
                Next
                
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
