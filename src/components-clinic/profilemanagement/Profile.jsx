"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {clinicHeaders} from "../utils/clinicHeaders";

import { useEffect, useState } from "react";

export function ClinicProfile() {

    const {register,setValue,getValues,handleSubmit,formState:{errors} } = useForm();
    const [button,setButton] = useState(false);


    const fetchClinicUser = async () => {
        debugger;
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/get-clinic-profile`,
                {
                method: "Get",
                headers: clinicHeaders(),
                }
        );
        const result = await res.json();
        console.log(result.data);
        if(result.status == 200){
            setValue("email", result.data.email);
            setValue("phonenumber", result.data.phone);
            setValue("firstname", result.data.firstname);
            setValue("lastname", result.data.lastname);
        }
    };


     useEffect(()=>{
         fetchClinicUser();
    },[]);




    const onUpdate= async(data)=>{
        setButton(true);
        try {

             let payload ={
            firstname : data.firstname ,
            lastname : data.lastname ,
            phone : data.phonenumber
         };
         const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/update-profile`,{
            method : "Post",
            headers: clinicHeaders(),
            body :  JSON.stringify(payload)
         });
        

         console.log("res.status",res.status);
         const result = await res.json();
         if(res.ok){
            fetchClinicUser();

            toast.success(result.message, {position: "bottom-right",autoClose: 3000,});
         }
         else if(res.status === 400){
                console.log("res.message",res.message);
            toast.error(result.message, {position: "bottom-right",autoClose: 3000,});
         }
        } catch (error) {
            toast.error(error.message, {position: "bottom-right",autoClose: 3000,});
        }
         
        setButton(false);

    }




  return (
    <>
   

        <ComponentCard className="w-full md:w-1/2 h-min" title="Update Profile" desc="" showReload={true}>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(onUpdate)}>


                <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">First Name</label>
                <input
                    type="text"
                    placeholder="Enter first name"
                    className=""
                    {...register("firstname",{ required: "Please enter name" })}
                />
                {errors.firstname && (<p className="text-red-500 text-sm mt-1">{errors.firstname.message}</p>)}
                </div>


                <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Last Name</label>
                <input
                    type="text"
                    placeholder="Enter last name"
                    className=""
                    {...register("lastname",{ required: "Please enter last name" })}
                />
                {errors.lastname && (<p className="text-red-500 text-sm mt-1">{errors.lastname.message}</p>)}
                </div>


                <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Email</label>
                <input
                    type="text"
                    disabled={true}
                    placeholder="Enter email"
                    className=""
                    {...register("email", {
                    required: "Please enter email",
                    pattern: {
                        value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                        message: "Enter a valid email address"
                    }
                    })}
                />
                {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
                </div>


                <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Phone</label>
                <input
                    type="text"
                    placeholder="Enter phone number"
                    className=""
                    disabled={true}
                    maxLength={10}
                    {...register("phonenumber", {
                    required: "Please enter phone number",
                    pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10-digit phone number"
                    }
                    })}
                />
                {errors.phonenumber && (<p className="text-red-500 text-sm mt-1">{errors.phonenumber.message}</p>)}
                </div>
                <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Whatsapp (optional)</label>
                <input
                    type="text"
                   
                    placeholder="Enter WhatsApp"
                    className=""
                    {...register("whatsappnumber")}
                />
               
                </div>


                <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Telegram (optional)</label>
                <input
                    type="text"
                    placeholder="Enter Telegram"
                    className=""
                    
                    maxLength={10}
                    {...register("telegramnumber")}
                />
              
                </div>

                <div className="flex flex-col">
                    
                </div>

                <div className="flex justify-end mt-2">
                <button 
                disabled={button}
                type="submit" className="btn btn-primary">
                   
                    {button ? "Updating" : "Update"}
                </button>
                </div>

            </form>
        </ComponentCard>

   
   

    

    </>
  );
}
