"use client"
import { useForm } from "react-hook-form";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {ListOfSpecialtiesType} from "../managespecialty/ListOfSpecialt";
import { usePermissions } from "@/context/PermissionContext";







export function CreateSpecialty(){

      const { register, setValue, getValues, formState: { errors }, handleSubmit, reset } = useForm();

      const [specialtiesid, setspecialtiesid] = useState(0);
      const [triggertable, settriggertable] = useState(null);

       const { canRead, canCreate, canUpdate, canDelete ,status } = usePermissions("Manage Specialty");

       const [restriction, setRestriction] = useState(false);


        useEffect(()=>{
                   setRestriction(status);
               },[status]);



       const onCreate = async (data) => {
        debugger;
        try {

                const tokenResponse = await fetch("/api/auth/get-token");
                const { token } = await tokenResponse.json();
                const payload = {
                    name: data.name,
                };

                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/specialties-type/create-name`,
                    {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(payload),
                    }
                );

                if(response.status == 400){
                    const data = await response.json();

                    toast.error(data.message, {
                            position: "bottom-right",
                            autoClose: 3000,
                        });


                    setValue("name","");
                }

            if (response.ok) {
                const data = await response.json();

                toast.success(data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                    
                    reset();
                    settriggertable(data.data.createdAt);
            }
                } catch (error) {
                    toast.error(error.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                    
                }
         }



       const onUpdate = async (data) => {


         try {

                const tokenResponse = await fetch("/api/auth/get-token");
                const { token } = await tokenResponse.json();
                const payload = {
                    name: data.name,
                    id : Number(specialtiesid)
                };

                  const response = await fetch(
                    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/specialties-type/update-name`,
                    {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(payload),
                    }
                );

                if(response.status == 400){
                    const data = await response.json();

                    toast.error(data.message, {
                            position: "bottom-right",
                            autoClose: 3000,
                        });


                    reset();
                }

            if (response.ok) {
                const data = await response.json();

                toast.success(data.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                    
                    reset();
                    settriggertable(data.data.updatedAt);
                    setspecialtiesid(0);
            }
                } catch (error) {
                    toast.error(error.message, {
                        position: "bottom-right",
                        autoClose: 3000,
                    });
                    
                }

       }




       const handleChildEditData =(id,name)=>{
            setspecialtiesid(id);
            setValue("name",name);
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



    return (<>


        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard title="" desc="" showReload={true}>
                    <form onSubmit={handleSubmit(specialtiesid > 0 ? onUpdate : onCreate)}>
                        <div className="grid grid-cols-12 gap-6">


                             <div className="col-span-12 sm:col-span-6">
                                <Label>Specialty Name</Label>
                                <input
                                type="text"
                                className={`h-11 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800
                                ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-brand-200"}`}
                               
                                {...register("name", {
                                    required: "Please enter specialty name",
                                })}

                                placeholder="Enter specialty Name"
                                />
                                {errors.name && (
                                <p className="text-red-500 text-sm">{errors.name.message}</p>
                                )}
                            </div>



                                

                    </div>

                    <div className="grid grid-cols-10 gap-4 mt-5">
  <div className="col-span-8"></div>
  <div className="col-span-2">

    {specialtiesid > 0 ? (
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
        <ComponentCard title="Manage Specialty " desc="">
          <p className="text-green-500 text-sm"> </p>
            {
            canRead
                ? <ListOfSpecialtiesType
                    trigger={triggertable}
                    sendData={handleChildEditData}
                />
                : <p className="text-red-500 text-center">Area restricted</p>
            }

        </ ComponentCard>
      </div>
    </div>



    </>);
}