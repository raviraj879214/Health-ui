import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import {ButtonSpinner} from "../../../reusable/buttonSpinner";
import { toast } from "react-toastify";





export function DoctorSeven({ onClose, doctoruuid , clinicuuid }){

  const [button,setButton] = useState(false);



  const onSubmit= async()=>{
    setButton(true);
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/submit-doctor`,{
      method :"Post",
      headers :await clinicHeaders(),
      body:JSON.stringify({
         "doctoruuid" : doctoruuid,
        "clinicuuid" : clinicuuid
      })
       
      
    });
    if(res.ok){
      const result = await res.json();
      toast.success("Doctor profile sent approval wait for while",{
        position :"bottom-right",
        autoClose : 3000
      });
        setTimeout(() => {
             window.location.href = window.location.pathname;
        }, 1000);
    }
    setButton(false);
  }



  const onCancel = () => {

    window.location.href = `?doid=${doctoruuid}&step=6`;
  }
  const onClear = () => {

   window.location.href = window.location.pathname;
  }



    return(<>

      <Dialog open={true} onClose={onClose} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6">
            <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
              <span> Submit for Admin Approval</span>
              <span className="text-green-400">7/7</span>
            </DialogTitle>

            <div className="">

             <p className="text-sm text-gray-700 mb-4">
                By clicking the <span className="font-semibold">Submit</span> button, the doctor’s profile will be sent for admin verification.
                Please ensure that all details have been reviewed and updated correctly.
                The profile is expected to be approved within <span className="font-semibold">24 hours</span>.
              </p>



              <div className="flex justify-end gap-3">

                <button
                  onClick={() => onClear()}
                  className="btn btn-third">
                  Back
                </button>

                <button
                  onClick={() => onCancel()}
                  className="btn btn-secondary">
                  Back
                </button>


                <button
                disabled={button}
                  onClick={()=> onSubmit()}
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
            </div>



          </DialogPanel>
        </div>
      </Dialog>

    </>);
}