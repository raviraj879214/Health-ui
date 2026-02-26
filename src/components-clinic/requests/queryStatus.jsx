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
        { id: "overview", label: "Close Patient Query" },
    ];


    const submit =async (data) => {
        setButton(true);

        const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/update-patient-query-status`,{
            method : "Put",
            headers : await clinicHeaders(),
            body : JSON.stringify({
                queryid: querydetails.id ,
                status: PatientQueryStatus.CLOSEDBYCLINIC,
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

        }

         setButton(false);
    }



    return (<>
        <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Query Status
                </h3>
                <span className="text-sm text-gray-500 italic"></span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

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
                                <h2 className="text-lg font-semibold mb-4">Close Query</h2>


                                <form onSubmit={handleSubmit(submit)}>
                                    <div className="space-y-4">

                                            {(PatientQueryStatus.CLOSEDBYCLINIC === querydetails.status || PatientQueryStatus.CLOSEDBYCORDINATOR === querydetails.status)&&(<>
                                                 <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                    Remarks
                                                </label>
                                               <div className="p-3 rounded-xl border bg-gray-50 border-gray-200 
                                                            text-sm text-gray-700 leading-relaxed 
                                                            shadow-sm">
                                                {querydetails.reason}
                                            </div>
                                            </div>
                                            </>)}
                                           

                                           
                                       




                                       
                                        {PatientQueryStatus.ASSIGNED === querydetails.status && (<>

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
                                        </>)}

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