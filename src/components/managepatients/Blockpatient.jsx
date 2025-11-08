import { useForm } from "react-hook-form";
import Label from "../form/Label";
import { PatientRegister } from "@/lib/enums/PatientRegistration";
import { toast } from "react-toastify";
import { useState } from "react";
import { useConfirm } from "../../hooks/useConfirm";



export function BlockPatients({ data , sendData }) {

        const {register,handleSubmit,setValue,getValues,formState :{errors}} = useForm();
        const [button,setButton] = useState(false);
         const { confirm, ConfirmDialog } = useConfirm();












        const onUpdate = async (datas)=>{
            debugger;
           
             const result = await confirm("Are you sure you want to block this item?");
                if (!result) {
                console.log("User not confirmed!");
                return false;
                }



            setButton(true);
             const resdsd = await fetch("/api/auth/get-token");
            const token = await resdsd.json();
            let payload ={
                "id" : data.id,
                "blockreason" : datas.blockreason
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-patients/update-block`,{
                method : "PUT",
                headers :{
                 "content-type": "application/json",
                "Authorization": `Bearer ${token.token}`
                },
                body : JSON.stringify(payload)
            });

            if(res.status == 400){
                const result  =await res.json();
                toast.error(result.message ,{
                    position : "bottom-right",
                    autoClose : "3000"
                });
            }


            if(res.ok){
                const result  =await res.json();
                sendData(result.data.updated_at);
                 toast.success(result.message ,{
                    position : "bottom-right",
                    autoClose : "3000"
                });
            }
            
            setButton(false);
        }



        const unBlock =async (id)=>{
            const result = await confirm("Are you sure you want to un-block this item?");
                if (!result) {
                    console.log("User not confirmed!");
                    return false;
                }


            setButton(true);
             
        
             const resdsd = await fetch("/api/auth/get-token");
            const token = await resdsd.json();
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-patients/update-unblock/${id}`,{
                 method : "PUT",
                headers :{
                 "content-type": "application/json",
                "Authorization": `Bearer ${token.token}`
                },
            });

             if(res.status == 400){
                const result  =await res.json();
                toast.error(result.message ,{
                    position : "bottom-right",
                    autoClose : "3000"
                });
            }


             if(res.ok){
                const result  =await res.json();
                sendData(result.data.updated_at);
                 toast.success(result.message ,{
                    position : "bottom-right",
                    autoClose : "3000"
                });
            }
            setButton(false);


        }



    return (<>
        <div>
           

            <div className="flex flex-col gap-3">
                
                      <ConfirmDialog />

                {(data.status == PatientRegister.ACTIVE)  &&  (<>
                <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700">
                        <form onSubmit={handleSubmit(onUpdate)}>
                        <Label>Block Patient</Label> 
                        <textarea
                    aria-rowspan={5}
                    className="h-28 w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
                    placeholder="Write reason for block..."
                    {...register("blockreason",{required: "Please enter reason for block"})}/>
                    {errors.blockreason &&(
                        <p className="text-red-500 text-sm">{errors.blockreason.message}</p>
                    )}
                    <button 
                    disabled ={button}
                    className="mt-4 h-10 w-full rounded-lg bg-red-600 px-4 text-sm font-medium text-white shadow hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800">
                        
                        {button ? "Blocking..." : "Block"}
                    </button>
                 </form>
                    </div>

                </>)}


                     {(data.status == PatientRegister.PENDING)  &&  (<>
                     <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700">
      
                    <p className="text-sm font-medium text-gray-600 mb-2">
                        Send Reminder
                    </p>

                    
                    <div className="w-full rounded-lg border p-3 text-sm text-gray-800 dark:text-white dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        Send a reminder to the patient to email us in order to complete the registration process.
                    </div>

                    <button
                      disabled={button}
                        className="mt-4 h-10 w-full rounded-lg bg-green-600 px-4 text-sm font-medium text-white shadow hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    >
                        

                        {button ? "Sending..." : "Send Reminder"}
                    </button>
                    </div>
                </>)}

                   
                {(data.status == PatientRegister.BLOCKED)  &&  (<>
                     <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-900 dark:border-gray-700">
      
                    <p className="text-sm font-medium text-gray-600 mb-2">
                        Blocked Reason
                    </p>

                    
                    <div className="w-full rounded-lg border p-3 text-sm text-gray-800 dark:text-white dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        {data.blockreason || "No reason provided"}
                    </div>

                    <button
                     onClick={()=> unBlock(data.id)}
                     disabled={button}
                        className="mt-4 h-10 w-full rounded-lg bg-green-600 px-4 text-sm font-medium text-white shadow hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800"
                    >
                        

                        {button ? "Unblocking..." : "Unblock"}
                    </button>
                    </div>
                </>)}

            </div>
        </div>

    </>);
}