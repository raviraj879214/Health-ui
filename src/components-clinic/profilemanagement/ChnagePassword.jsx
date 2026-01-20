"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { clinicHeaders } from "../utils/clinicHeaders";





export function ChangeCredentials(){


     const {register,setValue,getValues,handleSubmit,formState:{errors},reset } = useForm();


    const onUpdate= async(data)=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/clinic-auth/update-password`,{
            method :"Post",
            headers :  clinicHeaders(),
            body: JSON.stringify({
                "oldpassword": data.oldpassword,
                "newpassword" : data.newpassword,
            })
        });

        if(res.ok){
            const result  = await res.json();
             reset();
             if(result.status == 401){
                
                toast.error(result.message,{
                    position : "bottom-right",
                    autoClose : 3000
                });

             }
             else{
                toast.success(result.message,{
                    position : "bottom-right",
                    autoClose : 3000
                });
             }
            
        }

    }










    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    return(<>


        <ComponentCard className="w-full md:w-1/2 h-min" title="Change Password" desc="" showReload={true}>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onUpdate)}>
                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Old Password</label>
                    <input
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800
                            focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                            placeholder:text-gray-400"

                        type="password"
                        placeholder="Enter old password"
                        {...register("oldpassword", {
                            required: "Please enter old password",
                            pattern: {
                                value: passwordRegex,
                                message:
                                    "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
                            }
                        })}
                    />
                    {errors.oldpassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.oldpassword.message}
                        </p>
                    )}
                </div>

                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">New Password</label>
                    <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800
                                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                                placeholder:text-gray-400"

                       
                        type="password"
                        placeholder="Enter new password"
                        {...register("newpassword", {
                            required: "Please enter new password",
                            pattern: {
                                value: passwordRegex,
                                message:
                                    "Password must be at least 8 characters, include uppercase, lowercase, number and special character"
                            }
                        })}
                    />
                    {errors.newpassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.newpassword.message}
                        </p>
                    )}
                </div>


                <div className="flex flex-col">
                    <label className="mb-1 font-medium text-gray-700">Confirm Password</label>
                    <input
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800
                                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                                placeholder:text-gray-400"

                        type="password"
                        placeholder="Confirm password"
                        {...register("confirmpassword", {
                            required: "Please confirm your password",
                            validate: (value, formValues) =>
                                value === formValues.newpassword || "Passwords do not match"
                        })}
                    />
                    {errors.confirmpassword && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.confirmpassword.message}
                        </p>
                    )}
                </div>





                <div className="flex justify-end mt-2">
                    <button type="submit" className="btn btn-primary">
                        Update
                    </button>
                </div>

            </form>
        </ComponentCard>
    

    
    
    </>);
}