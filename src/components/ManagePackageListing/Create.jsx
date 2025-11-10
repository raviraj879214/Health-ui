import { useForm } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import { usePermissions } from "@/context/PermissionContext";
import { useState } from "react";
import { toast } from "react-toastify";
import ListOfPackages from "./Listing";




export default function CreatePackage() {

     const { register, setValue, getValues, formState: { errors }, handleSubmit, reset } = useForm();
     const { canRead, canCreate, canUpdate, canDelete ,status } = usePermissions("Manage Package Listing");
     const [packageid,setPackageid] = useState(0);
     const [button,setButton] = useState(false);
     const [sideeffect,setSideEffect] = useState("");



    const onCreate =async (data)=>{
        debugger;

        setButton(true);
        const tokenResponse = await fetch("/api/auth/get-token");
        const { token } = await tokenResponse.json();

        let payload = {
            name : data.name,
            price : data.price,
            description: data.description,
            durationDays : data.durationforpackages,
            priorityLevel : 1,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/listing-package/create`,{
            method : "POST",
            headers :{
                  "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
            },
            body : JSON.stringify(payload)
        });

         if(res.status == 400){
            const data = await res.json();

            toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
               
                
        }

        if(res.ok){
             const data = await res.json();
              toast.success(data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                 });
                     setSideEffect(data.data.createdAt);
             reset();
             
        }
        setButton(false);
    }

    const onUpdate = async (data)=>{

          debugger;

        setButton(true);
        const tokenResponse = await fetch("/api/auth/get-token");
        const { token } = await tokenResponse.json();

        let payload = {
            id : packageid,
            name : data.name,
            price : data.price,
            description: data.description,
            durationDays : data.durationforpackages,
            priorityLevel : 1,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/listing-package/update`,{
            method : "PUT",
            headers :{
                  "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
            },
            body : JSON.stringify(payload)
        });

         if(res.status == 400){
            const data = await res.json();

            toast.error(data.message, {
                    position: "bottom-right",
                    autoClose: 3000,
                });
               
                
        }

        if(res.ok){
             const data = await res.json();
              toast.success(data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                 });
            setSideEffect(data.data.updatedAt);
             reset();
             setPackageid(0);
             
        }
        setButton(false);
        



    }

    

    const handleEditData=(data)=>{
        debugger;
        console.log(data);
        setValue("name",data.name);
        setValue("price",data.price);
        setValue("durationforpackages",data.durationDays);
        setValue("description",data.description);
        setPackageid(data.id);
    }

    



    return (<>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard title="" desc="" showReload={true}>
                    <form onSubmit={handleSubmit(packageid > 0 ? onUpdate : onCreate )} >
                        <div className="grid grid-cols-12 gap-6">


                         <div className="col-span-12 sm:col-span-6">
                                <Label>Package Name</Label>
                                <input
                                type="text"
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                               
                                {...register("name", {
                                    required: "Please enter package name",
                                })}

                                placeholder="Enter package Name"
                                />
                                {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>

                              <div className="col-span-12 sm:col-span-6">
                                <Label>Package Price</Label>
                                <input
                                type="number"
                                
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.price ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                               
                                {...register("price", {
                                    required: "Please enter package price",
                                     min: {
                                        value: 1,
                                        message: "Price must be greater than zero"
                                    }
                                })}

                                placeholder="Enter package price"
                                />
                                {errors.price && (
                                <p className="text-red-500 text-sm">{errors.price.message}</p>
                                )}
                            </div>


                            <div className="col-span-12 sm:col-span-6">
                                <Label>Duration for Package</Label>
                                <input
                                type="number"
                                
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.durationforpackages ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                               
                                {...register("durationforpackages", {
                                    required: "Please enter package duration",
                                     min: {
                                        value: 1,
                                        message: "duration must be greater than zero"
                                    }
                                })}

                                placeholder="Enter package duration in days"
                                />
                                {errors.durationforpackages && (
                                <p className="text-red-500 text-sm">{errors.durationforpackages.message}</p>
                                )}
                            </div>

                                   <div className="col-span-12 sm:col-span-6">
                                    <Label>Description</Label>

                                    <textarea
                                        rows={5}
                                        className={`
                                        w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 
                                        focus:outline-hidden focus:ring-3 
                                        dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                        ${errors.description ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}
                                        `}
                                        placeholder="Enter package description"
                                        {...register("description", {
                                        required: "Please enter description",
                                        })}
                                    />

                                    {errors.description && (
                                        <p className="text-red-500 text-sm">{errors.description.message}</p>
                                    )}
                                </div>
                        </div>

                        <div className="grid grid-cols-10 gap-4 mt-5">
                        <div className="col-span-8"></div>

                        <div className="col-span-2">

                            {packageid > 0 ? (
                            canUpdate && (
                                <button
                                type="submit"
                                className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
                                >
                                {button ? "Updating..." : "Update"}
                                </button>
                            )
                            ) : (
                            canCreate && (
                                <button
                                type="submit"
                                className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
                                >
                               
                                {button ? "Adding..." : "Add"}
                                </button>
                            )
                            )}

                        </div>
                        </div>
                          
                    </form>


                </ComponentCard>
            </div>
        </div>



        <div className="grid grid-cols-12 gap-4 mt-5">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard title="" desc="" showReload={false}>

                     <ListOfPackages trigger={sideeffect} sendData={handleEditData}></ListOfPackages>   

               </ComponentCard>
        </div>
        </div>

    </>);
}