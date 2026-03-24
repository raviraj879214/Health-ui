"use client";
import { usePermissions } from "@/context/PermissionContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import {ListOfPackage} from "./listofPackages";
import { adminHeaders } from "../utils/adminHeader";
import { toast } from "react-toastify";


export function ManageBoostPackage(){

    const { register, setValue, getValues, formState: { errors }, handleSubmit, reset } = useForm();
    const { canRead, canCreate, canUpdate, canDelete, status } = usePermissions("Manage Boost Package");
    const [restriction, setRestriction] = useState(false);
    const [packageid, setpackageid] = useState(null);

    const [packageadd,setPackageAdd] = useState({});
    const [packageupdate,setPackageUpdate] = useState({});

   


    useEffect(() => {
        setRestriction(status);
    }, [status]);



    const onCreate = async(data)=>{
       debugger;

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-package/create-packages`,{
            method : "Post",
            headers: await adminHeaders(),
            body: JSON.stringify({
                "name" : data.name,
                "price" : data.packageprice,
                "duration" : data.packageduration,
                "description" : data.packagedescription
            })
        });

        if(res.ok){
            const result= await res.json();
            setPackageAdd(result.data);
            reset();

            toast.success("Package created successfully", {
                position: "bottom-right",
                autoClose: 3000
            });

        }
    }

    const onUpdate = async(data)=>{
       debugger;

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-package/update-packages`,{
            method : "Put",
            headers: await adminHeaders(),
            body: JSON.stringify({
                "name" : data.name,
                "price" : data.packageprice,
                "duration" : data.packageduration,
                "description" : data.packagedescription,
                "id" :  packageid
            })
        });

        if(res.ok){
            const result= await res.json();
            setpackageid(null);
            setPackageUpdate(result.data);
            reset();


            toast.success("Package Updated successfully", {
                position: "bottom-right",
                autoClose: 3000
            });

        }
    }
























    if (restriction) {
        return (
            <>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <div className="bg-white p-10 rounded-xl shadow-md text-center max-w-md">
                        <svg
                            className="w-16 h-16 mx-auto text-red-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                            />
                        </svg>
                        <h2 className="text-2xl font-semibold mt-4 text-gray-800">
                            Access Denied
                        </h2>
                        <p className="mt-2 text-gray-500">
                            You do not have permission to view this content.
                        </p>

                    </div>
                </div>
            </>
        );
    }


    const addData = (data)=>{
    
        setValue("name",data.name);
        setValue("packageduration",data.durationDays);
        setValue("packageprice",data.price);
        setValue("packagedescription",data.description);
        setpackageid(data.id);
    }

    

    return(<>


            <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard title="" desc="" showReload={true}>
                    <form onSubmit={handleSubmit(packageid != null ? onUpdate :  onCreate)}>
                        <div className="grid grid-cols-12 gap-6">


                            <div className="col-span-12 sm:col-span-6">
                                <Label>Package Name</Label>
                                <input
                                type="text"
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                  

                                {...register("name",
                                    {
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
                                type="text"
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                  

                                {...register("packageprice",
                                    {
                                        required: "Please enter package price",
                                    })}

                                placeholder="Enter package Price"
                                />
                                {errors.packageprice && (
                                <p className="text-red-500 text-sm">{errors.packageprice.message}</p>
                                )}
                            </div>

                            <div className="col-span-12 sm:col-span-6">
                                <Label>Package Duration (Days)</Label>
                                <input
                                type="text"
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                  

                                {...register("packageduration",
                                    {
                                        required: "Please enter package duration",
                                    })}

                                placeholder="Enter package duration"
                                />
                                {errors.packageduration && (
                                <p className="text-red-500 text-sm">{errors.packageduration.message}</p>
                                )}
                            </div>

                            <div className="col-span-12 sm:col-span-6">
                                <Label>Package Description</Label>
                                <textarea
                                    rows={3}
                                    className={`w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs resize-none
        ${errors.packagedescription ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                    {...register("packagedescription", {
                                        required: "Please enter package description",
                                    })}
                                    placeholder="Enter package description"
                                />
                                {errors.packagedescription && (
                                    <p className="text-red-500 text-sm mt-1">{errors.packagedescription.message}</p>
                                )}
                            </div>



                                

                    </div>

                        <div className="grid grid-cols-10 gap-4 mt-5">
                            <div className="col-span-8"></div>
                            <div className="col-span-2">

                                {packageid != null ? (
                                    canUpdate && (
                                        <button
                                            type="submit"
                                            className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
                                        >
                                            Update
                                        </button>
                                    )
                                ) : (
                                    canCreate && (
                                        <button
                                            type="submit"
                                            className="bg-brand-500 hover:bg-brand-600 w-full rounded-lg p-3 text-sm font-medium text-white transition-colors"
                                        >
                                            Add
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
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                <ComponentCard title="List of Packages " desc="If a package is already in use (i.e., purchased by clinics), it should not be modified or deleted, as it is actively associated with existing data.">
                    <p className="text-green-500 text-sm"> </p>
                    {
                        canRead
                            ? <>

                             <ListOfPackage
                              sendData={addData}

                              addData={packageadd}

                              updateData={packageupdate}
                              
                              />
                            
                            </>
                            : <p className="text-red-500 text-center">Permission Required</p>
                    }

                </ ComponentCard>
            </div>
        </div>


    </>);
}