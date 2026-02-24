"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useState } from "react";
import { clinicHeaders } from "../utils/clinicHeaders";
import Label from "@/components/form/Label";
import { formatBrazilDate } from "@/lib/formatDate";
import{RaiseFunds} from "./raiseFunds";
import { brazilianCurrency } from "@/lib/brazilianCurrency";



export function RequestDetails({id}){

    const [querydetails,setQueryDetails] = useState({});
    const [totalfundrequested,setTotalFundRequested] = useState(0);
    const [totalfundreceived,setTotalFundReceived] = useState(0);



    useEffect(() => {
        if(id){
            fetchPatinetQuery();
        }
    }, [id]);


    const fetchPatinetQuery = async ()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/patient-query-details/${id}`,{
            method : "Get",
            headers : await clinicHeaders(),
        });
        if(res.ok){
            const result= await res.json();

            setQueryDetails(result.data);
        }
    }


    const RequestedFunds=(data)=>{
        setTotalFundRequested(data);
    }


    const TotalReceivedFunds=(data)=>{
        
        setTotalFundReceived(data);
    }

    const remainingAmount = parseInt((((querydetails.finalPrice) - ((querydetails.clinic?.commission * querydetails.finalPrice)/100)) - totalfundreceived));

    return(<>

        <ComponentCard className="border theme-border">


            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

                <div>
                    <Label>Patient Requested No</Label>
                    <div className="text-gray-700"><b>{querydetails?.querycode}</b></div>
                </div>

                <div>
                    <Label>Name</Label>
                    <div className="text-gray-700">{querydetails?.patientName}</div>
                </div>

                <div>
                    <Label>Created At</Label>
                    <div className="text-gray-700">{formatBrazilDate(querydetails?.createdAt)}</div>
                </div>

                <div>
                    <p className="text-xs text-gray-500 mb-1">Medical Reports</p>
                    <p className="text-sm text-gray-800 font-medium">
                        {querydetails.medicalReportsValue || "--"}
                    </p>
                </div>


                <div>
                    <p className="text-xs text-gray-500 mb-1">Treatment</p>
                    <p className="text-sm text-gray-800 font-medium">
                        {querydetails.treatmentName || "--"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500 mb-1">What Matters Most</p>
                    <p className="text-sm text-gray-800 font-medium">
                        {querydetails.whatMatterMostName || "--"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500 mb-1">Procedure Time</p>
                    <p className="text-sm text-gray-800 font-medium">
                        {querydetails.procedureTimeValue || "--"}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 mb-1">Clinic</p>
                    <p className="text-sm text-gray-800 font-medium">
                        {querydetails.clinic?.name || "--"}
                    </p>
                </div>

                
                {querydetails.doctor && (<>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Doctor</p>
                        <div class="flex items-center gap-2.5">
                            <img className="w-10 h-10 rounded-full" src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${querydetails.doctor?.image}`} alt="" />
                            <div className="font-medium text-heading">
                                <div> Dr. {querydetails.doctor?.firstname} {querydetails.doctor?.lastname}</div>
                                <div className="text-sm font-normal text-body">{querydetails.doctor?.degree}</div>
                            </div>
                        </div>
                    </div>
                </>)}

                {querydetails.package && (<>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Package Title</p>
                        <p className="text-sm text-gray-800 font-medium">
                            {querydetails.package?.title || "--"}
                        </p>
                    </div>
                </>)}
                




            </div>


        </ComponentCard>



        <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Other Information
                </h3>
                <span className="text-sm text-gray-500 italic">Patient additional details</span>
            </div>

            {querydetails.PatientQueryOtherInformation &&
                querydetails.PatientQueryOtherInformation.length > 0 ? (
                <div className="max-h-64 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {querydetails.PatientQueryOtherInformation.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-all"
                        >
                            <span className="text-gray-700 font-medium">{item.label}</span>
                            <span className="px-2 py-1 bg-gradient-to-r from-green-200 to-green-400 text-green-800 font-semibold text-sm rounded-full">
                                {item.value}
                            </span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-3 text-gray-400 italic border-t border-gray-100">
                    No additional information added
                </div>
            )}
        </ComponentCard>

        <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Query Payment Details
                </h3>
                <span className="text-sm text-gray-500 italic"></span>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">

                <div>
                    <Label>Total Package Price</Label>
                   
                        <div className="h-12 flex items-center justify-end px-4 rounded-lg
                                        border border-green-400 bg-green-50
                                        text-lg font-semibold text-green-700
                                        dark:bg-green-900/20 dark:border-green-600 dark:text-green-300">
                            {brazilianCurrency(querydetails.finalPrice || 0)}
                        </div>
                       
                </div>
                
               
                <div>
                    <Label>Platform Fee</Label>

                    
                        <div className="h-12 flex items-center justify-between px-4 rounded-lg
                                    border border-green-400 bg-green-50
                                    text-lg font-semibold text-green-700
                                    dark:bg-green-900/20 dark:border-green-600 dark:text-green-300">
                            <span>{querydetails.clinic?.commission}% <span className="text-sm text-gray-500 relative -top-1">of {brazilianCurrency(querydetails?.finalPrice)}</span></span>
                            <span>{brazilianCurrency((querydetails?.clinic?.commission * querydetails?.finalPrice)/100 || 0)}</span>
                        </div>
                   
                </div>


                <div>
                    <Label>Maximum Clinic Amount</Label>
                   
                        <div className="h-12 flex items-center justify-end px-4 rounded-lg
                                        border border-green-400 bg-green-50
                                        text-lg font-semibold text-green-700
                                        dark:bg-green-900/20 dark:border-green-600 dark:text-green-300">
                            {brazilianCurrency((querydetails?.finalPrice) - ((querydetails?.clinic?.commission * querydetails?.finalPrice)/100) || 0)}
                        </div>
                        
                </div>

                <div>
                    <Label>Total Fund Requested</Label>
                   
                        <div className="h-12 flex items-center justify-end px-4 rounded-lg
                                        border border-green-400 bg-green-50
                                        text-lg font-semibold text-green-700
                                        dark:bg-green-900/20 dark:border-green-600 dark:text-green-300">
                            {brazilianCurrency(totalfundrequested || 0)}
                        </div>
                        
                </div>

                <div>
                    <Label>Remaining Amount</Label>
                    
                        <div className="h-12 flex items-center justify-end px-4 rounded-lg
                                        border border-green-400 bg-green-50
                                        text-lg font-semibold text-green-700
                                        dark:bg-green-900/20 dark:border-green-600 dark:text-green-300">


                             {brazilianCurrency(remainingAmount || 0)}
                        </div>
                    
                </div>

                <div>
                    <Label>Total Funds Received</Label>
                   
                        <div className="h-12 flex items-center justify-end px-4 rounded-lg
                                        border border-green-400 bg-green-50
                                        text-lg font-semibold text-green-700
                                        dark:bg-green-900/20 dark:border-green-600 dark:text-green-300">
                            {brazilianCurrency(totalfundreceived || 0)}
                        </div>
                        
                </div>
            </div>



        </ComponentCard>



           

            {remainingAmount > 0 ? (
                <RaiseFunds
                    patientqueryid={id}
                    requestedFund={RequestedFunds}
                    totalFundsReceived={TotalReceivedFunds}
                    totalF={totalfundreceived}
                    remainF={remainingAmount}
                    clinicmaxAmount={(querydetails.finalPrice) - ((querydetails.clinic.commission * querydetails.finalPrice)/100)}
                />
            ) : null}






       


        
    </>);
}