import ComponentCard from "@/components/common/ComponentCard";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { PackageQueryFinalPriceStatus } from "@/lib/enums/patientQueryFinalPriceStatus";
import { formatBrazilDate } from "@/lib/formatDate";
import { useState } from "react";
import { clinicHeaders } from "../utils/clinicHeaders";
import { toast } from "react-toastify";




export function FinalPriceModule({ patientqueryfinalprice ,onData }) {



    const [reason,setReason] = useState("");
    



    const makeAction = async(action,id)=>{
        debugger;
            
        const  res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/update-final-price-from-clinic`,{
            method : "Put",
            headers : await clinicHeaders(),
            body: JSON.stringify({
                "action" : action,
                "id" : id,
                "reason" : reason
            })
        });

        if(res.ok){
            const result = await res.json();
            setReason("");
            onData(result.data);
            await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request-admin`,{method : "Get"});
            toast.success(`The final deal price  ${action}ed has successfully sent to coordinator,coordinator will get back to you soon`,{
                position : "bottom-right",
                autoClose : 3000
            });

        }
    }



    return (<>

        <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Final Price Conclusion
                </h3>
                <span className="text-sm text-gray-500 italic"></span>
            </div>

            <div className="max-h-auto overflow-y-auto grid grid-cols-1 sm:grid-cols-1 gap-3">



                <table className="w-full text-sm text-left text-body border border-default rounded-lg overflow-hidden">
                    <thead className="bg-neutral-secondary-soft border-b border-default">
                        <tr>
                            <th className="px-6 py-3 font-medium">Final Price</th>
                            
                            <th className="px-6 py-3 font-medium">Message </th>
                            <th className="px-6 py-3 font-medium">Requested Date</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                        </tr>
                    </thead>

                    <tbody>



                        {patientqueryfinalprice?.map((item) => (

                            <tr key={item.id} className="border-b border-default">
                                <td className="px-6 py-4"><b>{brazilianCurrency(item.finalPrice)}</b></td>
                                
                                <td className="px-6 py-4">
                                    

                                    {item.status === PackageQueryFinalPriceStatus.PENDING &&(<>
                                        <textarea
                                        rows={5}
                                        maxLength={100}
                                        placeholder="Enter reason here upto 100 words..."
                                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg 
                                                focus:outline-none focus:ring-2 focus:ring-blue-500 
                                                focus:border-blue-500 transition resize-none
                                                placeholder:text-gray-400"
                                                onChange={(e)=>{
                                                    setReason(e.target.value);
                                                }}
                                    />
                                    </>)}
                                    {item.status !== PackageQueryFinalPriceStatus.PENDING &&(<>
                                            {item.reason || "--"}
                                    </>)}



                                </td>

                                <td className="px-6 py-4">{formatBrazilDate(item.createdAt)}</td>
                                <td className="px-6 py-4">

                                    {item.status === PackageQueryFinalPriceStatus.PENDING && (<>
                                        <div className="flex items-center gap-3">

                                            <button
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                                                    text-white bg-green-600 rounded-lg 
                                                    hover:bg-green-700 transition"
                                                    onClick={()=>{
                                                        makeAction("accept",item.id)
                                                    }}
                                            >
                                                ✓ Accept
                                            </button>

                                            <button
                                                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                                                text-white bg-red-600 rounded-lg 
                                                hover:bg-red-700 transition"
                                                 onClick={()=>{
                                                        makeAction("reject",item.id)
                                                    }}
                                            >
                                                ✕ Reject
                                            </button>

                                        </div>
                                    </>)}

                                    {item.status === PackageQueryFinalPriceStatus.REJECT && (<>
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-green-700">
                                            Rejected
                                        </span>
                                    </>)}

                                    {item.status === PackageQueryFinalPriceStatus.ACCEPT && (<>
                                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                                            Accepted
                                        </span>
                                    </>)}


                                </td>
                            </tr>

                        ))}



                    </tbody>
                </table>

            </div>


        </ComponentCard>




    </>);
}