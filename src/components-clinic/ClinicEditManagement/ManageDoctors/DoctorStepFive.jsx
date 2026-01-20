
"use client"
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import Label from "@/components/form/Label";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Editor } from "primereact/editor";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export function DoctorFive({ onClose, nextStep, prevStep ,clinicuuid , doctoruuid}) {


    const [textbrief, setTextbrief] = useState('');
    const [textfull, setTextfull] = useState('');
    const {register,setValue,getValues,formState:{errors},handleSubmit} = useForm();
    const [button,setButton] = useState(false);





     useEffect(()=>{
            debugger;
            if(doctoruuid){
                 fetchClinicDescription();
            }
        
         },[doctoruuid]);
    




     const fetchClinicDescription =async ()=>{
            debugger;
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-description/get-doctor-description/${doctoruuid}`,
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
            debugger;
            setButton(true);
            console.log("descsriptin",data);
            debugger;
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-description/update-doctor-description`,{
                method : "Put",
                headers:clinicHeaders(),
                body:JSON.stringify({
                    doctoruuid : doctoruuid,
                    biefdescription: data.briefdescription,
                    fulldescription: data.fulldescription,
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
                
            }
            setButton(false);
         }





const onCancel =()=>{

    window.location.href = `?doid=${doctoruuid}&step=3`;
  }



  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">

         <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Doctor Description </span>
            <span className="text-green-400 ">5/7</span>
          </DialogTitle>
          
         
                         <form onSubmit={handleSubmit(onCreate)} >
                                   <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[400px] overflow-y-auto">

                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left w-full">
                                               

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
                                               
                                                {!button ? "Save As Draft" : "Updating..."}
                                        </button>
                                        
                                    </div>
                                </form>
       


          

          <div className="flex justify-between gap-2 mt-4">


            <button onClick={onCancel} className="btn btn-secondary">Back</button>

            <button 
              onClick={()=>{
                window.location.href = `?doid=${doctoruuid}&step=6`;
              }}
            className="btn btn-primary">Next</button>

          </div>

         
        </DialogPanel>
      </div>
    </Dialog>


  );
}
