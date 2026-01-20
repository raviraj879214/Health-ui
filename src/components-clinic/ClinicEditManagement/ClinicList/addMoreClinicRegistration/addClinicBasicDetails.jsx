import { TermsConditionStatus } from "@/lib/enums/TermsCondition";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";


export function AddClinicBasicDetails({ uuid, modalpopup ,onFade , onSuccess }) {
      const {
           register,
           handleSubmit,
           formState: { errors },
           setValue,
           watch,
           setError,
           getValues,
           reset
         } = useForm();


  const [open, setOpen] = useState(true);
  const [steps, setSteps] = useState(0);
  const [checkbox,setCheckBox] = useState(false);
  const checkboxRef = useRef(null);


    const [terms,setTerms] = useState("");
    const [termsid,setTermsID] = useState("");
    const [termscustom,setTermsCustom] = useState("");


  useEffect(()=>{
    setOpen(modalpopup);

    fetchClinicDetails();
   
  },[uuid]);



    const fetchTerms = async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-terms/${TermsConditionStatus.clinicregisration}`,{
        method :"Get"
      });
      if(res.ok){
        const result = await res.json();
        setTerms(result.data.content);
        setTermsID(result.data.id);
      }
    }
  



   const fetchClinicDetails = async () =>{
          debugger;
          const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-clinic-details/${uuid}`,{
              method : "Get"
          });

          if(res.ok){
              debugger;
              const result = await res.json();
              if(result.data == null){
                  return;
              }
              setValue("clinicemail",result.data.email);
          }
       }



  const Close = ()=>{

    setOpen(false);
    onFade();
  }




  const onCreate =async (data)=>{
          debugger;
          debugger;
          const  res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/insert-more-clinic-details`,{
              method : "Post",
              headers:{
                  "content-type" : "application/json"
              },
              body: JSON.stringify({
                  "name" :data.clinicname,
                  "websiteurl": data.websiteurl,
                  "uuid" : uuid,
                  "clinicemail" : data.clinicemail,
                  "cnpj" : data.cnpj,
                  "phone" : data.phonenumber,
                  "TermsID" : termscustom

              })
          });
        
         
  
           if (res.ok) {
             debugger;
               const result = await res.json();
               if (result.statusCode === 401) {
                   setError("cnpj", { type: "manual", message: `cnpj already exist try another` });
                   return false;
               }
               if (result.statusCode === 402) {
                   setError("clinicname", { type: "manual", message: `clinic name already exist try another` });
                   return false;
               }

               if(checkbox === false){
                    setSteps(1);
                    fetchTerms();
                    checkboxRef.current?.focus();

                    return false;
               }

               reset();
               setOpen(false);
               onFade();

               onSuccess();


              
  
           }
  
       }












  return (<>
    
    <Dialog
      open={open}
      onClose={setOpen} 
      className="relative z-10">
      
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />

       
      <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
          
          <form onSubmit={handleSubmit(onCreate)}>
           
            <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
              <span>Add More Clinic</span>

              <div className="flex items-center gap-4">
                <span className="text-green-500 text-sm">1/2</span>

               
                <button
                  type="button"
                  onClick={() => Close()}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </DialogTitle>

            
            <div className="border rounded  overflow-auto p-4">
              <div className="grid grid-cols-1 gap-4">
                 
                   {steps === 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Clinic Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Clinic name"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("clinicname", {
                                                required: "Please enter your clinic name",
                                            })} />

                                        {errors.clinicname && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.clinicname.message}
                                            </p>
                                        )}


                                    </div>

                                    <div className="hidden">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Clinic Email 
                                        </label>
                                        <input
                                           
                                            type="text"
                                            placeholder="Clinic email"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("clinicemail", {
                                                required: "Please enter your clinic email",
                                            })} />

                                        {errors.clinicemail && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.clinicemail.message}
                                            </p>
                                        )}


                                    </div>

                                    <div className="mt-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            CNPJ (Cadastro Nacional de Pessoa Jurídica)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="XX.XXX.XXX/YYYY-ZZ"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("cnpj", {
                                                required: "Please enter your CNPJ",
                                                pattern: {
                                                    value: /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
                                                    message: "CNPJ must be in the format XX.XXX.XXX/YYYY-ZZ",
                                                },
                                            })} />


                                        {errors.cnpj && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.cnpj.message}
                                            </p>
                                        )}

                                    </div>

                                    <div className="mt-1">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Website
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Website URL"
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900
                                                            placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("websiteurl", {
                                                required: "Please enter your clinic URL",
                                                pattern: {
                                                    value: /^https:\/\/.+/,
                                                    message: "URL must start with https://",
                                                },
                                            })}
                                        />

                                        {errors.websiteurl && (
                                            <p className="mt-2 text-sm text-red-500">
                                                {errors.websiteurl.message}
                                            </p>
                                        )}

                                    </div>
                   </div>

                   )}

                   {steps === 1 &&(<>
                                  <div className="">
                                      <div className="rounded-xl  max-h-[500px] overflow-y-auto">
                                          <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
                                          <div
                                              className="terms-content mb-4"
                                              dangerouslySetInnerHTML={{ __html: terms }}
                                          />


                                          <p className="mb-4 flex items-center gap-2">
                                              <input
                                                  type="checkbox"
                                                  id="terms"
                                                  className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                                                    ref={checkboxRef}
                                                  onChange={(e) => {
                                                      const isChecked = e.target.checked; 
                                                      setCheckBox(isChecked);
                                                      {isChecked === true ? setTermsCustom(termsid):setTermsCustom("") }
                                                      
                                                  }}
                                              />
                                              <label htmlFor="terms" className="text-gray-700">
                                                  I accept the Terms and Conditions
                                              </label>
                                              

                                          </p>
                                          {!checkbox && (
                                                <p className="text-xs text-red-500 ">
                                                    You must accept the terms
                                                </p>
                                          )}

                                      </div>
                                  </div>

                   </>)}
              </div>
            </div>

           
            <div className="bg-gray-50 px-4 py-3 flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => {
                    setOpen(false);
                    onFade();
                }}
                className="btn btn-outline">

                    
                Cancel
              </button>

              <button type="submit" className="btn btn-primary">
                Next
              </button>
            </div>
          </form>

        </DialogPanel>
      </div>
    </Dialog>
  </>);
}
