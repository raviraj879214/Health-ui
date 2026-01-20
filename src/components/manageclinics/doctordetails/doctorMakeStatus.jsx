"use client"

import Label from "@/components/form/Label";
import { adminHeaders } from "@/components/utils/adminHeader";
import { DoctorVerifyStatus } from "@/lib/enums/doctorVerifyStatus";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";



export function DoctorMakeStatus({DoctorStatus,doctoruuid,reason ,onUpdateStatus}) {

    const [active, setActive] = useState(0);
    const tabs = ["Make Active" , "Make In Active"];
    const {register,handleSubmit,setValue,getValues,formState:{errors},reset,setError} = useForm();
    const [button,setButton] = useState(false);
    


    const makeactive=async()=>{

        const reason = getValues("reason");

        if(!reason){
           setError("reason", {
                type: "manual",
                message: "Message is required"
            });
            return false;
        }

        setButton(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-doctor/update-doctor-status`,{
            method : "Post",
            headers : await adminHeaders(),
            body: JSON.stringify({
                "status": DoctorVerifyStatus.VERIFIED,
                "doctoruuid" : doctoruuid,
                "reason" : reason
            })
        });
        if(res.ok){
            const result = await res.json();
           setValue("reason","");
          
          onUpdateStatus({
                DoctorVerify : result.data.DoctorVerify,
                Reason : result.data.Reason
            });
             toast.success("Doctor profile status is  active now",{
                position : "bottom-right",
                autoClose :3000
            });


        }
        setButton(false);
    }




    const makeinactive=async()=>{

        const reason = getValues("reasoninactive");

        if(!reason){
           setError("reasoninactive", {
                type: "manual",
                message: "Message is required"
            });
            return false;
        }

        setButton(true);

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-doctor/update-doctor-status`,{
            method : "Post",
            headers : await adminHeaders(),
            body: JSON.stringify({
                "status": DoctorVerifyStatus.INACTIVE,
                "doctoruuid" :doctoruuid,
                "reason" : reason
            })
        });
        if(res.ok){
            const result = await res.json();
            setValue("reasoninactive","");
            onUpdateStatus({
                DoctorVerify : result.data.DoctorVerify,
                Reason : result.data.Reason
            });

            toast.success("Doctor profile status is in active now",{
                position : "bottom-right",
                autoClose :3000
            });

        }


        setButton(false);
    }


    return (<>
        <div className="mt-5 relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full tracking-wide">
                Set Status 
            </div>
            <div>
                <div className="flex border-b">
                    {tabs.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setActive(i)}
                            className={`px-4 py-2 text-sm font-medium border-b-2 transition
                        ${active === i
                                    ? "border-blue-600 text-blue-600"
                                    : "border-transparent text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="mt-4">
                    {active === 0 && <div>

                        {DoctorStatus === DoctorVerifyStatus.VERIFIED ?(<> 
                         <div>
                                <p className="break-words whitespace-pre-wrap">
                                    In Active Status
                                </p>
                            </div>
                        
                        
                        </>) : (
                            <>
                                 <Label className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                        </Label>


                        <div className="flex flex-col gap-3">
                            <textarea
                                className="w-full min-h-[120px] rounded-lg border border-gray-300 px-3 py-2 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                resize-none"
                                placeholder="Enter your message..."
                                 {...register("reason",{required: "Please enter message"})}
                                />
                                {errors.reason &&(<p className="text-sm text-red-400">{errors.reason.message}</p>)}

                            <div className="flex justify-end">
                                <button
                                onClick={()=> makeactive()}
                                className="btn btn-primary">
                                    
                                    {button ?(<>
                                        <ButtonSpinner></ButtonSpinner>
                                    </>):(<>
                                        Submit
                                    </>)}
                                </button>
                            </div>
                        </div>
                            </>

                        )}
                       





                    </div>}
                    {active === 1 && <div>
                       
                            
                        {DoctorStatus === DoctorVerifyStatus.INACTIVE ? (<>
                            <div>
                                <p className="break-words whitespace-pre-wrap">
                                    {reason}
                                </p>
                            </div>

                        
                            </>):(<>
                                 <Label className="block text-sm font-medium text-gray-700 mb-1">
                            Message 
                        </Label>

                       <div className="flex flex-col gap-3">
                            <textarea
                                className="w-full min-h-[120px] rounded-lg border border-gray-300 px-3 py-2 text-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                resize-none"
                                placeholder="Enter your message..."
                                 {...register("reasoninactive",{required: "Please enter message"})}
                                />
                                {errors.reasoninactive &&(<p className="text-sm text-red-400">{errors.reasoninactive.message}</p>)}

                            <div className="flex justify-end">
                                <button
                                onClick={()=> makeinactive()}
                                className="btn btn-primary">
                                    
                                    {button ?(<>
                                        <ButtonSpinner></ButtonSpinner>
                                    </>):(<>
                                        Submit
                                    </>)}
                                </button>
                            </div>
                        </div>

                        </>)}


                    </div>}
                </div>
            </div>
        </div>
    </>);
}