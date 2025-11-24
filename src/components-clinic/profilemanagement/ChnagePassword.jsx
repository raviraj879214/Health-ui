"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";




export function ChangeCredentials(){


     const {register,setValue,getValues,handleSubmit,formState:{errors} } = useForm();


    const onUpdate= async(data)=>{

         toast.success("Failed to update SEO page", {position: "bottom-right",autoClose: 3000,});
    }

    return(<>


     <ComponentCard className="w-full md:w-1/2 h-min" title="Change Password" desc="" showReload={true}>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit(onUpdate)}>

                <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">First Name</label>
                <input
                    type="text"
                    placeholder="Enter first name"
                    className=""
                    {...register("name",{ required: "Please enter name" })}
                />
                {errors.name && (<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>)}
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


        

                <div className="flex justify-end mt-2">
                <button type="submit" className="btn btn-primary">
                    Update
                </button>
                </div>

            </form>
        </ComponentCard>
    

    
    
    </>);
}