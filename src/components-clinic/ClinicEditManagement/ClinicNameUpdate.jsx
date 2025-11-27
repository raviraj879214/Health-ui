"use client"
import { useEffect, useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useForm } from "react-hook-form";
import { clinicHeaders } from "../utils/clinicHeaders";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";




export function ClinicNameUpdates({clinicnames,clinicuuid,location}){
    const [open, setOpen] = useState(false);
    const {register,setValue,getValues,handleSubmit,formState :{errors}} = useForm();
    const [button,setButton] = useState(false);
    const [clinicname,setClinicName] = useState("");


    const onUpdateName = async(data)=>{
        setButton(true);
        let payload ={
            name : data.name,
            clinicuuid : clinicuuid
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/update-clinics-name`,{
            method : "Put",
            headers : clinicHeaders(),
            body : JSON.stringify(payload)
        });
        if(res.ok){
            const result = await res.json();
            setClinicName(result.data.name);
            setOpen(false);
            toast.success(result.message, {position: "bottom-right",autoClose: 3000,});
        }
        setButton(false);
    }


    return(<>
    

    <div className="bg-neutral-primary-soft block max-w-sm p-6 shadow-xs hover:bg-neutral-secondary-medium flex justify-between">
      <div>
        <h5 className="text-sm tracking-tight">{location}</h5>
        <h5 className="mb-3 text-2xl tracking-tight text-heading leading-8">
                {clinicname == "" ? clinicnames : clinicname}
            </h5>
      </div>
      <button 
        onClick={()=>setOpen(true)}
        className="btn btn-primary h-fit  rounded-3xl">
          <FaEdit></FaEdit>  Edit 
        </button>
    </div>


     <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95">

                
                <form  onSubmit={handleSubmit(onUpdateName)}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  
                       
                        
                             <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <DialogTitle
                            as="h3"
                            className="text-base font-semibold text-gray-900 mb-2"
                        >Clinic Name</DialogTitle>

                        <div className="mt-2 w-full">
                            <input
                            defaultValue={clinicname == "" ? clinicnames : clinicname}
                            type="text"
                            className="w-full block border border-gray-300 p-2 rounded"
                            {...register("name",{required : "Please enter clinic name"})}
                            />
                            {errors.name &&(
                                <p className="text-sm text-red-400">{errors.name.message}</p>
                            )}
                        </div>
                        </div>
                        

                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="submit"
                   disabled={button}         
                  className="btn btn-primary inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">
                  
                  {button ? "Updating" : "Update"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
</form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
    
    </>);
}