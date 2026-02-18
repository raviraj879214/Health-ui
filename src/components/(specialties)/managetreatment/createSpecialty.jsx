import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { usePermissions } from "@/context/PermissionContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { adminHeaders } from "../../utils/adminHeader";
import { toast } from "react-toastify";
import { ListSpecialty } from "./listSpecialty";




export function CreateSpecialty(){


    const { register, setValue, getValues, formState: { errors }, handleSubmit, reset } = useForm();
    const { canRead, canCreate, canUpdate, canDelete, status } = usePermissions("Manage Specialty");
    const [specialtiesid, setspecialtiesid] = useState(null);
    const [restriction, setRestriction] = useState(false);
    const [triggertable, settriggertable] = useState(null);
    const [adddata,setAddData] = useState({});






    useEffect(() => {
        setRestriction(status);
    }, [status]);




    const onCreate = async (data) => {
        debugger;
        let payload = {
            name: data.name
        }


        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-treatment/create-treatment`, {
            method: "Post",
            headers: await adminHeaders(),
            body : JSON.stringify(payload)
        });

        if (res.ok) {
            const result= await res.json();

            if(result.status === 401){
                toast.error("Treatment already exist",{
                    position : "bottom-right",
                    autoClose : 3000
                });
                return false;
            }

            setAddData(result.data);
            

            toast.success("Treatment created successfully",{
                    position : "bottom-right",
                    autoClose : 3000
            });
            reset();


        }

    }



    const onUpdate = async (data) => {
        debugger;
        let payload= {
            name : data.name,
            id: specialtiesid
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-treatment/update-treatment`, {
            method: "Put",
            headers: await adminHeaders(),
            body : JSON.stringify(payload)
        });
        if(res.ok){
            const result =await res.json();

             if(result.status === 401){
                toast.error("Treatment already exist",{
                    position : "bottom-right",
                    autoClose : 3000
                });
                return false;
            }

            setAddData(result.data);
            

            toast.success("Treatment updated successfully",{
                    position : "bottom-right",
                    autoClose : 3000
            });
            reset();
            setspecialtiesid(null);
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



     const handleChildEditData =(id,name)=>{
            setspecialtiesid(id);
            setValue("name",name);
       }


    return(<>
    
         <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard title="" desc="" showReload={true}>
                    <form onSubmit={handleSubmit(specialtiesid != null ? onUpdate : onCreate)}>
                        <div className="grid grid-cols-12 gap-6">


                             <div className="col-span-12 sm:col-span-6">
                                <Label>Treatment Name</Label>
                                <input
                                type="text"
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                                  

                                {...register("name",
                                    {
                                        required: "Please enter treatment name",
                                    })}

                                placeholder="Enter treatment Name"
                                />
                                {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>



                                

                    </div>

                        <div className="grid grid-cols-10 gap-4 mt-5">
                            <div className="col-span-8"></div>
                            <div className="col-span-2">

                                {specialtiesid != null ? (
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
                <ComponentCard title="List of Treatments " desc="">
                    <p className="text-green-500 text-sm"> </p>
                    {
                        canRead
                            ? <ListSpecialty
                                trigger={triggertable}
                                 sendData={handleChildEditData}
                                 addData={adddata}
                            />
                            : <p className="text-red-500 text-center">Permission Required</p>
                    }

                </ ComponentCard>
            </div>
        </div>


    
    </>);
}