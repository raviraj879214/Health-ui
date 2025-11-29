
"use client";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

import { Editor } from 'primereact/editor';
import { useForm } from "react-hook-form";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { toast } from "react-toastify";
        

export function ClinicDescription({clinicuuid}) {

    const [open, setOpen] = useState(false);
     const [textbrief, setTextbrief] = useState('');
     const [textfull, setTextfull] = useState('');
     const {register,setValue,getValues,formState:{errors},handleSubmit} = useForm();
     const [button,setButton] = useState(false);


     useEffect(()=>{
        debugger;
        if(clinicuuid){
             fetchClinicDescription();
        }
    
     },[clinicuuid]);


     const fetchClinicDescription =async ()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-description/get-clinic-description/${clinicuuid}`,
            {
                method : "Get",
                headers : clinicHeaders(),
            }
        );
        if(res.ok){
            const result= await res.json();
            console.log("clinic description",result);
           
            setTextbrief(result.data.briefDescription);
            setTextfull(result.data.fullDescription);
            setValue("briefdescription",result.data.briefDescription);
            setValue("fulldescription",result.data.fullDescription);
            
        }
     }





     const onCreate =async(data)=>{
        setButton(true);
        console.log("descsriptin",data);
        debugger;

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-description/update-clinic-description`,{
            method : "Put",
            headers:clinicHeaders(),
            body:JSON.stringify({
                clinicuuid : clinicuuid,
                briefDescription: data.briefdescription,
                fullDescription: data.fulldescription,
            }), 
        });


        if(res.ok){
            const result = await res.json();

            if(result.status == 200){
                toast.success("Description updated successfully", {
                          position: "bottom-right",
                          autoClose: 3000,
                        });
            }
            else if(result.status == 201){
                toast.success("Description created successfully", {
                          position: "bottom-right",
                          autoClose: 3000,
                        });
            }
            


            fetchClinicDescription();
            setOpen(false);
        }
        setButton(false);
     }













    return (<>
        <ComponentCard title={"Hospital Description"}>
            
            <div className="flex justify-end mb-4">
                 
                <button onClick={() => setOpen(true)} className="btn btn-primary font-semibold">
                    <FaEdit></FaEdit>  Edit Description 
                </button>
               
            </div>

            <p className="p-5 border theme-border rounded-2xl" >Provide a clear and concise introduction about your clinic to build trust with patients.</p>



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
                                className="w-full max-w-3xl rounded bg-white p-6 ">
                                <form onSubmit={handleSubmit(onCreate)} >
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900 mb-2">Clinic Description</DialogTitle>



                                                <div className="mt-2 w-full space-y-4">
                                                    <div className="flex flex-col">
                                                        <Label>Brief Description </Label>
                                                         <div className="card">
                                                            <Editor value={textbrief} onTextChange={(e) =>
                                                            
                                                           {
                                                             setTextbrief(e.htmlValue),
                                                             setValue("briefdescription",e.htmlValue)
                                                           }


                                                            } style={{ height: '100%' }} 
                                                                 {...register("briefdescription", { required: "Please enter a brief description" })}
                                                                />
                                                                 {errors.briefdescription &&(
                                                                <p className="text-sm text-red-600">{errors.briefdescription.message}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col">
                                                        <Label>Full Description</Label>
                                                         <div className="card">
                                                            <Editor  value={textfull} onTextChange={(e) => 
                                                            {
                                                                setTextfull(e.htmlValue),
                                                                setValue("fulldescription",e.htmlValue)

                                                            }

                                                            } style={{ height: '100%' }}
                                                                {...register("fulldescription", { required: "Please enter a full description" })}
                                                            />
                                                            {errors.fulldescription &&(
                                                                <p className="text-sm text-red-600">{errors.fulldescription.message}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="submit"
                                            disabled={button}
                                            className="btn btn-primary inline-flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-xs sm:ml-3 sm:w-auto">
                                               
                                                {!button ? "Update Description" : "Updating..."}
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

        </ComponentCard>
    </>);
}