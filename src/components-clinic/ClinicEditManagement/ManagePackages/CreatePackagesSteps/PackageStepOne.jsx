import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";






export function PackageStepOne({clinicuuid,packageid}){
    const [open, setOpen] = useState(true);
    const {register,handleSubmit,formState:{errors} , setValue,getValues ,reset} = useForm();
    const searchParams = useSearchParams();
    const router = useRouter();


    useEffect(()=>{
        getPackageDetails();
    },[packageid]);








    const getPackageDetails = async()=>{

        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-one/get-package-details/${packageid}`,
            {
                method : "Get",
                headers : clinicHeaders()
            }
        );

        if(res.ok){
            const result = await res.json();

            setValue("title",result.data.title);
            setValue("briefdescription",result.data.briefdescription);
            setValue("actualprice",result.data.actualprice);
            setValue("discountedprice",result.data.discountedprice);

        }
    }





   const  onCreateUpdate = async (data)=>{
        debugger;

        let payload ={
            title : data.title,
            briefDescription : data.briefdescription,
            actualPrice : data.actualprice,
            discountedPrice : data.discountedprice,
            clinicId : clinicuuid,
            id : packageid
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-one/insert-package-details`,{
            method : "Post",
            headers : clinicHeaders(),
            body : JSON.stringify(payload)
        });
       if (res.ok) {
            const result = await res.json();

            const params = new URLSearchParams(Array.from(searchParams.entries()));

            params.set("pckid", result.data.id);
            params.set("steppackage", "2");

            router.push(`?${params.toString()}`);
        }

   }





    const onCancel=()=>{
        window.location.href = window.location.pathname;
    }

   


    return(<>
        <Dialog open={true} onClose={() => setOpen(false)} className="relative z-10">
             <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
             <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">

             
               <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                <form onSubmit={handleSubmit(onCreateUpdate)}>
                <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
                   <span>Basic Package Details</span>
                   <span className="text-green-400 ">1/7</span>
                 </DialogTitle>

                <div className="border theme-border rounded h-[500px] overflow-auto p-4">
                   
                              <div className="grid grid-cols-1 gap-4">


                        <div>
                        <label className="text-gray-700 font-medium mb-1 block">Package Title</label>
                        <input 
                            type="text" 
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter package title"
                            {...register("title",{required: "Please enter title"})}
                        />
                        {errors.title &&(
                            <p className="text-sm text-red-500 m-1">{errors.title.message}</p>
                        )}
                        </div>


                        <div>
                        <label className="text-gray-700 font-medium mb-1 block">Brief Description</label>
                        <textarea 
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            placeholder="Enter package description"
                            rows="10"
                            {...register("briefdescription",{required: "Please enter brief description"})}
                        ></textarea>

                         {errors.briefdescription &&(
                            <p className="text-sm text-red-500 m-1">{errors.briefdescription.message}</p>
                        )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-gray-700 font-medium mb-1 block">Actual Price</label>
                            <input 
                            type="number" 
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                            placeholder="Enter actual price"
                            {...register("actualprice",{required: "Please enter actual price"})}
                            />
                             {errors.actualprice &&(
                            <p className="text-sm text-red-500 m-1">{errors.actualprice.message}</p>
                        )}
                        </div>

                        <div>
                            <label className="text-gray-700 font-medium mb-1 block">Discounted Price</label>
                            <input 
                            type="number" 
                            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                            placeholder="Enter discounted price"
                            {...register("discountedprice",{required: "Please enter discounted price"})}
                            />
                             {errors.discountedprice &&(
                            <p className="text-sm text-red-500 m-1">{errors.discountedprice.message}</p>
                        )}
                        </div>
                        </div>

                    </div>
                    
                  
            </div>

           <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                    
                                      <button
                                         
                                          type="submit" className="btn btn-primary">
                                          Next
                                      </button>


                                    <button
                                        type="button"
                                        onClick={() => onCancel()}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm border hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                    >
                                        Cancel
                                    </button>

                                   
                                </div>
</form>
              </DialogPanel>
            
        </div>
    </Dialog>



    </>);
}