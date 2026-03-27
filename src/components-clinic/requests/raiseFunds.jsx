import ComponentCard from "@/components/common/ComponentCard";
import { useForm } from "react-hook-form";
import { clinicHeaders } from "../utils/clinicHeaders";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {ButtonSpinner} from "../../reusable/buttonSpinner";
import { formatBrazilDate } from "@/lib/formatDate";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { CheckIcon, CrossIcon } from "lucide-react";
import { getSocket } from "@/hooks/socket";




export function RaiseFunds({patientqueryid, requestedFund ,totalFundsReceived ,totalF,remainF,clinicmaxAmount ,totalfundrequested}){




    const {register,setValue,getValues,handleSubmit,formState:{errors},reset} = useForm();
    const [raisebutton,setRaiseButton] = useState(false);
    const [requestedfunds,setRequestedFunds] = useState([]);
    const [requesttranfer,setRequestTransfer] = useState([]);



    // useEffect(()=>{
    //     if(patientqueryid){
    //         fetchRequestFunds();
    //     }
    // },[patientqueryid]);


    useEffect(() => {

         if(patientqueryid){
                    fetchRequestFunds();
             }

             
        const socket = getSocket();
    
    
        socket.on("patientrequest_clinic", (data) => {
             if(patientqueryid){
                    fetchRequestFunds();
             }
         
        });
        return () => {
          socket.off("patientrequest_clinic");
        };
    
    
      }, [patientqueryid]);
    





    const fetchRequestFunds = async ()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/get-clinic-request-fund/${patientqueryid}`,{
            method : "Get",
            headers : await clinicHeaders()
        });
        if(res.ok){
            const result = await res.json();
            setRequestedFunds(Array.isArray(result.requestedfunds) ? result.requestedfunds : []);
            setRequestTransfer(Array.isArray(result.transfer) ? result.transfer : []);
            const totalRequested = result.requestedfunds.reduce((sum, item) => sum + Number(item.amount || 0),0);
           
            requestedFund(totalRequested);


             const totalFundRequested = result.transfer.reduce((sum, item) => sum + Number((item.amount/100) || 0),0);
            totalFundsReceived(totalFundRequested);

        }
    }


    const raiseFunds = async(data)=>{
            debugger;
        setRaiseButton(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/clinic-request-fund`,{
            method : "Post",
            headers : await clinicHeaders(),
            body: JSON.stringify({
                patientqueryid :patientqueryid,
                amount : data.amount,
                message : data.message
            })
        });
        if(res.ok){
            const result = await res.json();
           

            setRequestedFunds(prev => [result.data, ...prev]);
            fetchRequestFunds();
           


            await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request-admin`,{method : "Get"});
            reset();
            toast.success("Requested Fund to admin/cordinator",{
                position : "bottom-right",
                autoClose : 3000
            });



        }
        setRaiseButton(false);
    }




    return(<>
    
            <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-[480px]">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                        Raise Fund Request 
                    </h2>
                    <form onSubmit={handleSubmit(raiseFunds)}>
                        <div className="flex flex-col gap-4 flex-1">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Enter Amount
                                </label>
                                <input
                                    type="number"
                                    min={1} // ensures HTML5 browser-level positive number validation
                                    placeholder="Enter amount"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                                    {...register("amount", {
                                        required: "Please enter amount",
                                        valueAsNumber: true,
                                        min: {
                                            value: 1,
                                            message: "Amount must be a positive number"
                                        },
                                        validate: (value) => value > 0 || "Amount must be greater than zero",
                                        validate: (value) => {

                                            const availableAmount = remainF - totalF;

                                            if (availableAmount <= 0) {
                                                return "Already requested almost all amount, go throught in the (Requested Funds Timeline)";
                                            }

                                            return (
                                                value <= availableAmount ||
                                                `You can request upto amount ${brazilianCurrency(availableAmount)}`
                                            );
                                            }
                                    })}
                                />
                                {errors.amount && (
                                    <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                    Message To <b>Admin/Coordinator (optional)</b>
                                </label>
                                <textarea
                                   
                                    rows="4"
                                    placeholder="Please raise fund for PQ-XXXXXXXX-XXXX"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    {...register("message")}
                                />
                            </div>
                        </div>

                        <button
                            disabled={raisebutton}
                            type="submit" className="btn btn-primary">

                            {raisebutton ? (<>
                                <ButtonSpinner></ButtonSpinner>
                            </>) : (<>
                                Request Funds
                            </>)}
                        </button>




                    </form>
                </div>


                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-[480px] flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                        Requested Funds Timeline
                    </h2>
                              
                    <>
                       
                        {requestedfunds.length > 0 ? (
                             <div className="h-fit overflow-auto">


                            {requestedfunds.map((item, index) => {
                                const isLast = index === requestedfunds.length - 1;

                                return (
                                    <div key={item.id} className="flex gap-x-3">
                                        {/* Timeline line + dot */}
                                        <div
                                            className={`relative ${!isLast
                                                    ? "after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700"
                                                    : ""
                                                }`}
                                        >
                                            <div className="relative z-10 size-7 flex justify-center items-center">
                                                <div className="size-2 rounded-full bg-blue-500" />
                                            </div>
                                        </div>


                                        <div className="grow pt-0.5 pb-8">
                                            <p className="text-xs text-gray-500 dark:text-neutral-400 mb-1">
                                                {formatBrazilDate(item.createdAt)}
                                            </p>

                                            <h3 className="flex items-center justify-between font-semibold text-gray-800 dark:text-white">

                                                {/* Left Side */}
                                                <span className="flex items-center gap-2">
                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Fund Request:
                                                    </span>
                                                    <span className="text-base font-bold">
                                                        {brazilianCurrency(item.amount)}
                                                    </span>
                                                </span>

                                                {/* Right Side Status */}
                                                <span
                                                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                                                    ${item.collected === 0
                                                            ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                                                            : "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                                                        }`}
                                                >
                                                    {item.collected === 0 ? (
                                                        <>
                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                            </svg>

                                                            Not Collected
                                                        </>
                                                    ) : (
                                                        <>
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                                </svg>

                                                            Collected
                                                        </>
                                                    )}
                                                </span>

                                            </h3>

                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                {item.message?.trim() ? item.message : "No message provided"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                        
                        </div>

                        ):((
                            <p className="text-red-700">No requested funds</p>

                        ))}
                    </>


                </div>


                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-[480px] flex flex-col">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">
                        Received Funds Timeline
                    </h2>
                           

                           

                    {requesttranfer.length > 0 ? (
                         <>
                        <div className="h-fit overflow-auto">

                            {requesttranfer.map((item, index) => {
                                const isLast = index === requesttranfer.length - 1;

                                return (
                                    <div key={item.id} className="flex gap-x-3">
                                        {/* Timeline line + dot */}
                                        <div
                                            className={`relative ${!isLast
                                                    ? "after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700"
                                                    : ""
                                                }`}
                                        >
                                            <div className="relative z-10 size-7 flex justify-center items-center">
                                                <div className="size-2 rounded-full bg-blue-500" />
                                            </div>
                                        </div>


                                        <div className="grow pt-0.5 pb-8">
                                            <p className="text-xs text-gray-500 dark:text-neutral-400 mb-1">
                                               
                                                {formatBrazilDate(new Date(item.created * 1000).toLocaleDateString())}
                                            </p>

                                            <h3 className="font-semibold text-gray-800 dark:text-white">
                                                Fund received  {item.currency} {brazilianCurrency((item.amount / 100).toFixed(2))}
                                            </h3>

                                            <p className="mt-1 text-sm text-gray-600 dark:text-neutral-400">
                                                {item.message?.trim() ? item.message : "No message provided"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}

                            


                        </div>

                    </>
                    ):(
                         <p className="text-red-700">No received funds</p>

                    )}

                </div>

            </div>






        </ComponentCard>
    
    </>);
}