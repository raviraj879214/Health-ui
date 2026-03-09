"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { PatientQueryStatus } from "@/lib/enums/patientQueryStatus";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { clinicHeaders } from "../utils/clinicHeaders";
import { toast } from "react-toastify";



export function QueryStatus({querydetails , onData}) {

    const { register, handleSubmit, setValue, getValues, reset, formState: { errors } } = useForm();
    const [activeTab, setActiveTab] = useState("overview");
    const [button,setButton] = useState(false);
    const tabs = [
        { id: "overview", label: "Update Request Status" },
        // { id: "paymentstatus", label: "Payment Status" },
    ];


    const submit =async (data) => {
        debugger;
        setButton(true);

        const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/update-patient-query-status`,{
            method : "Put",
            headers : await clinicHeaders(),
            body : JSON.stringify({
                queryid: querydetails.id,
                status: data.status,
                reason : data.message,
            })
        });
        if(res.ok){
            const result= await res.json();

             toast.success("The patient status updated successfully",{
                position : "bottom-right",
                autoClose : 3000
             });
            onData(result.data);

            reset();

        }
         setButton(false);
    }


    const updatePaymnetStatus = async(data)=>{

         debugger;
        setButton(true);

        const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/update-patient-query-payment-status`,{
            method : "Put",
            headers : await clinicHeaders(),
            body : JSON.stringify({
                queryid: querydetails.id,
                status: data.paymentStatus,
                reason : data.message,
            })
        });
        if(res.ok){
            const result= await res.json();

             toast.success("The patient query closed successfully",{
                position : "bottom-right",
                autoClose : 3000
             });
            onData(result.data);

            reset();

        }
         setButton(false);
    }


    return (<>
        <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="hidden text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Query Status
                </h3>
                <span className="text-sm text-gray-500 italic"></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="w-full">


                    <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex space-x-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-3 text-sm font-medium transition-all duration-200 border-b-2 ${activeTab === tab.id
                                        ? "border-blue-600 text-blue-600"
                                        : "border-transparent text-gray-500 hover:text-blue-500"
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>
                    </div>


                    <div className="mt-6 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">

                        {activeTab === "overview" && (
                            <div>
                            
                                <form onSubmit={handleSubmit(submit)}>
                                    <div className="space-y-4">
                                        <div className="w-full max-w-sm">
                                            <label
                                                htmlFor="queryStatus"
                                                className="block mb-2 text-sm font-bold text-gray-700"
                                            >
                                                Query Status
                                            </label>
                                            <select
                                             {...register("status", { valueAsNumber: true })}
                                                id="queryStatus"
                                               
                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl 
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                                                    focus:border-blue-500 bg-white transition duration-200">
                                                        
                                                <option value="4">Under Review</option>
                                                <option value="5">Waiting for Info</option>
                                                <option value="6">Offer Sent</option>
                                                <option value="7">Appointment Booked</option>
                                                <option value="8">Patient Arrived</option>
                                                <option value="9">Treatment Ongoing</option>
                                                <option value="10">Treatment Completed</option>
                                                <option value="11">Treatment Unsuccessful</option>
                                                <option value="3">Reject Query</option>
                                                <option value="12">Cancelled</option>
                                            </select>

                                          
                                        </div>



                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Remarks
                                            </label>
                                            <textarea
                                                rows={4}
                                                placeholder="Enter closing remarks..."
                                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                {...register("message", { required: "Please enter remark" })}
                                            />
                                            {errors.message && (<>
                                                <p>{errors.message.message}</p>
                                            </>)}
                                        </div>

                                        <div>
                                            <button
                                                disabled={button}

                                                type="submit" className="btn btn-primary">


                                                {
                                                    button ? (<ButtonSpinner></ButtonSpinner>) : (<>Update</>)
                                                }
                                            </button>
                                        </div>


                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === "paymentstatus" &&(

                            <div>
                            
                                <form onSubmit={handleSubmit(updatePaymnetStatus)}>
                                    <div className="space-y-4">
                                        <div className="w-full max-w-sm mt-5">
                                            <label
                                                htmlFor="paymentStatus"
                                                className="block mb-2 text-sm font-semibold text-gray-800">
                                                Payment Status
                                            </label>

                                            <select

                                                id="paymentStatus"
                                                
                                                {...register("paymentStatus")}
                                                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-xl 
                                                focus:outline-none focus:ring-2 focus:ring-green-500 
                                                focus:border-green-500 bg-white transition duration-200"
                                                >
                                                <option value="0">Unpaid</option>
                                                <option value="1">Partially Paid</option>
                                                <option value="2">Fully Paid</option>
                                            </select>
                                        </div>



                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Remarks
                                            </label>
                                            <textarea
                                                rows={4}
                                                placeholder="Enter closing remarks..."
                                                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                {...register("message", { required: "Please enter remark" })}
                                            />
                                            {errors.message && (<>
                                                <p>{errors.message.message}</p>
                                            </>)}
                                        </div>

                                        <div>
                                            <button
                                                disabled={button}

                                                type="submit" className="btn btn-primary">


                                                {
                                                    button ? (<ButtonSpinner></ButtonSpinner>) : (<>Update</>)
                                                }
                                            </button>
                                        </div>


                                    </div>
                                </form>
                            </div>

                        )}


                    </div>
                </div>

            </div>


        </ComponentCard>
    </>);
}