"use client"
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";







export function PackageStepEight({clinicuuid, packageid }){

  const [button,setButton] = useState(false);
  const [open, setOpen] = useState(true);
   const searchParams = useSearchParams();
       const router = useRouter();









    const onCancel = () => {
      window.location.href = window.location.pathname;
    };


    const onBack = () => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));
        params.set("pckid", packageid);
        params.set("steppackage", "7");
        router.push(`?${params.toString()}`);
    };





     const submitPackage= async()=>{
        setButton(true);
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-doctor/submit-package`,{
            method : "Post",
            headers : await clinicHeaders(),
            body : JSON.stringify({
                "packageid" : packageid
            })
        });
        if(res.ok){
            const result = await res.json();
            toast.success("Package sent for approval wait for while",{
                position : "bottom-right",
                autoClose : 3000
            });
            setTimeout(() => {
                 window.location.href = window.location.pathname;
            }, 1000);
        }
        
        setButton(false);
    }



    return(<>

  <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
                <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                    <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
                         <span> Submit for Admin Approval</span>
                        <span className="text-green-400">8/8</span>
                    </DialogTitle>

                    <p className="text-sm text-gray-700 mb-4">
                            By clicking the <span className="font-semibold">Submit</span> button, the  package info will be sent for admin verification.
                            Please ensure that all details have been reviewed and updated correctly.
                            The package info is expected to be approved within <span className="font-semibold">24 hours</span>.
                    </p>


                    <div className="flex justify-end gap-2 mt-4">

                 <button
                    onClick={()=> onCancel()}
                    className="btn btn-third">
                    Back
                </button>

                <button
                    onClick={()=> onBack()}
                  className="btn btn-secondary">
                  Back
                </button>


                <button
                disabled={button}
                 onClick={()=> submitPackage()}
                  className="btn btn-primary">


                   
                   {button ?(<>
                   <ButtonSpinner />
                   </>):(
                    <>
                    Submit
                    </>
                   )}


                </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>





    </>);
}