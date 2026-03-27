"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useState } from "react";
import { clinicHeaders } from "../utils/clinicHeaders";
import Label from "@/components/form/Label";
import { formatBrazilDate } from "@/lib/formatDate";
import{RaiseFunds} from "./raiseFunds";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import {QueryStatus} from "./queryStatus";
import { PatientQueryStatus } from "@/lib/enums/patientQueryStatus";
import {FinalPriceModule} from "./finalPriceModule";
import { toast } from "react-toastify";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import  PatientQueryStatusBadge  from "../../reusable/StatusBadge";
import { useRouter } from "next/navigation";
import { getSocket } from "../../hooks/socket";
import {PaymentDetails} from "./paymentDetails";


export function RequestDetails({id}){

    const [querydetails,setQueryDetails] = useState({});
    const [totalfundrequested,setTotalFundRequested] = useState(0);
    const [totalfundreceived,setTotalFundReceived] = useState(0);
    const [button,setButton] = useState(false);

    



    useEffect(() => {
        if(id){
            fetchPatinetQuery();
        }
    }, [id]);



useEffect(() => {
    const socket = getSocket();


    socket.on("patientrequest_clinic", (data) => {
          if(id){
            fetchPatinetQuery();
        }
     
    });
    return () => {
      socket.off("patientrequest_clinic");
    };


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




  

    const acceptRequest = async()=>{



          setButton(true);
        
                const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/update-patient-query-status`,{
                    method : "Put",
                    headers : await clinicHeaders(),
                    body : JSON.stringify({
                        queryid: querydetails.id,
                        status: PatientQueryStatus.ACCEPT,
                        reason : '',
                    })
                });
                if(res.ok){
                    const result= await res.json();
        
                     toast.success("The patient query accepted successfully",{
                        position : "bottom-right",
                        autoClose : 3000
                     });
                    setQueryDetails(prev => ({...prev,...result.data}));
                    await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request-admin`,{method : "Get"});
        
                }
                 setButton(false);
    }


    const rejectRequest = async()=>{



        setButton(true);
        
                const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/update-patient-query-status`,{
                    method : "Put",
                    headers : await clinicHeaders(),
                    body : JSON.stringify({
                        queryid: querydetails.id,
                        status: PatientQueryStatus.REJECT,
                        reason : '',
                    })
                });
                if(res.ok){
                    const result= await res.json();
        
                     toast.success("The patient query rejected successfully",{
                        position : "bottom-right",
                        autoClose : 3000
                     });

                     setQueryDetails(prev => ({...prev,...result.data}));
                     await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request-admin`,{method : "Get"});
                    
        
                }
                 setButton(false);

    }

    


    const paymentDetails = querydetails?.paymentDetails || [];
    const totalAmountReceivedFromPatient = paymentDetails.filter(x=>x.status === 1).reduce((sum, payment) => {return sum + Number(payment.generatedamount || 0);}, 0);
    
    

    
    return(<>
    


        <ComponentCard className="border theme-border">
           

            {PatientQueryStatus.ASSIGNED === querydetails.status &&(<>
                <div class="grid grid-cols-1 sm:grid-cols-1 gap-6">
                <div class=" bg-white shadow-lg rounded-2xl p-6 w-full ">
                    <div class="flex items-center justify-between gap-6">

                        <div>
                            <h2 class="text-lg font-semibold text-gray-800 mb-1">
                             Request Received
                            </h2>
                            <p class="text-gray-600 text-sm">
                                The <b>{process.env.NEXT_PUBLIC_PROJECT_NAME}</b> has sent a new request.
                                Please review the details below and choose to accept or reject it.
                                Before giving final acceptance, ensure that the final deal price has been agreed upon. Once the price is confirmed, you may proceed with the final acceptance.                                
                            </p>
                        </div>


                        <div class="flex gap-3 shrink-0">
                            <button 
                             onClick={()=> acceptRequest()}
                            disabled={button}
                            class="bg-green-500 hover:bg-green-600 text-white font-medium px-5 py-2 rounded-xl transition">
                               
                                {button ? (<><ButtonSpinner></ButtonSpinner></>):(<>
                                     Accept
                                </>)}

                            </button>
                            <button
                            onClick={()=> rejectRequest()}
                            disabled={button}
                            class="bg-red-500 hover:bg-red-600 text-white font-medium px-5 py-2 rounded-xl transition">
                                
                                 {button ? (<><ButtonSpinner></ButtonSpinner></>):(<>
                                     Reject
                                </>)}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            </>)}


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
                <div>
                    <p className="text-xs text-gray-500 mb-1">Query Status</p>
                    
                    <PatientQueryStatusBadge status={querydetails.status} />
                
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
                
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm w-full max-w-md">

                    {/* Title */}
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                        Coordinator
                    </p>

                    {/* Coordinator Info */}
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-gray-800">
                                {querydetails?.User?.firstname} {querydetails?.User?.lastname}
                            </p>
                            <p className="text-xs text-gray-500">
                                {querydetails?.User?.email}
                            </p>
                        </div>

                        {/* Avatar Circle */}
                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                            {querydetails?.User?.firstname?.charAt(0)}
                        </div>
                    </div>

                   
                    <div className="border-t border-gray-100 my-3"></div>

                  
                    <div className="flex items-center gap-4">

                        <a href={`tel:${querydetails?.User?.phone}`} title="Call" className="hover:opacity-80">
                            <img width="26" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/phone.svg`} alt="Call" />
                        </a>


                        {querydetails?.User?.whatsappNumber && (
                            <a
                                href={`https://wa.me/${querydetails?.User?.whatsappNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="WhatsApp"
                                className="hover:opacity-80"
                            >
                                <img width="26" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/whatsapp.svg`} alt="WhatsApp" />
                            </a>
                        )}

                        {querydetails?.User?.telegramNumber && (
                            <a
                                href={`https://t.me/${querydetails?.User?.telegramNumber}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Telegram"
                                className="hover:opacity-80"
                            >
                                <img width="26" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/telegram.svg`} alt="Telegram" />
                            </a>
                        )}


                    </div>
                </div>




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



         <FinalPriceModule patientqueryfinalprice={querydetails.PatientQueryFinalPrice}
         
                    onData={(updatedata) =>

                    setQueryDetails((prev) => ({
                        ...prev,
                         PatientQueryFinalPrice: updatedata 
                    }))
                
                }
            
            />
       
        <ComponentCard className="mt-4 p-5 bg-white rounded-xl shadow-md border theme-border">

            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    Query Payment Details
                </h3>
                <span className="text-sm text-gray-500 italic"></span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
                This represents the final agreed price between the admin and the clinic.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {/* Total Package Price */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border p-5 hover:shadow-md transition">
                    <Label className="text-gray-500 text-sm">Total Package Price</Label>

                    <div className="mt-3 text-2xl font-bold text-gray-800 dark:text-white text-right">
                        {brazilianCurrency(querydetails.finalPrice || 0)}
                    </div>
                </div>

                {/* Platform Fee */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border p-5 hover:shadow-md transition">
                    <Label className="text-gray-500 text-sm">Platform Fee</Label>

                    <div className="mt-3 flex items-end justify-between">
                        <div className="text-sm text-gray-500">
                            {querydetails.clinic?.commission}%
                            <div className="text-xs">
                                of {brazilianCurrency(querydetails?.finalPrice)}
                            </div>
                        </div>

                        <div className="text-xl font-semibold text-red-500">
                            {brazilianCurrency(
                                (querydetails?.clinic?.commission * querydetails?.finalPrice) / 100 || 0
                            )}
                        </div>
                    </div>
                </div>

                {/* Clinic Earnings */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border p-5 hover:shadow-md transition">
                    <Label className="text-gray-500 text-sm">Clinic Earnings</Label>

                    <div className="mt-3 text-2xl font-bold text-green-600 text-right">
                        {brazilianCurrency(
                            (querydetails?.finalPrice) -
                            ((querydetails?.clinic?.commission * querydetails?.finalPrice) / 100) || 0
                        )}
                    </div>
                </div>

            </div>

             <p className="text-sm text-gray-500 mb-4">
  This represents the amount received from the patient. The statistics show how much has been received, how much is available for payout, and how much the clinic can request.
</p>

<div className="grid grid-cols-1 sm:grid-cols-5 gap-6">

  {/* Total Received */}
  <div>
    <Label>Total Received</Label>
    <div className="h-12 flex items-center justify-end px-4 rounded-xl
                    border bg-gray-50
                    text-lg font-semibold text-gray-800
                    dark:bg-gray-900 dark:text-gray-200">
      {brazilianCurrency(totalAmountReceivedFromPatient || 0)}
    </div>
  </div>

  {/* Platform Commission */}
  <div>
    <Label>Platform Commission</Label>
    <div className="h-12 flex items-center justify-between px-4 rounded-xl
                    border bg-red-50
                    text-lg font-semibold text-red-600
                    dark:bg-red-900/20 dark:text-red-400">
      <span className="text-sm">
        {querydetails?.clinic?.commission}% 
        <span className="text-xs text-gray-500 ml-1">
          of {brazilianCurrency(totalAmountReceivedFromPatient || 0)}
        </span>
      </span>

      <span>
        {brazilianCurrency(
          (querydetails?.clinic?.commission * totalAmountReceivedFromPatient) / 100 || 0
        )}
      </span>
    </div>
  </div>

  {/* Available for Payout */}
  <div>
    <Label>Available for Payout</Label>
    <div className="h-12 flex items-center justify-end px-4 rounded-xl
                    border bg-green-50
                    text-lg font-semibold text-green-700
                    dark:bg-green-900/20 dark:text-green-300">
      {brazilianCurrency(
        (totalAmountReceivedFromPatient -
          (querydetails?.clinic?.commission * totalAmountReceivedFromPatient) / 100) || 0
      )}
    </div>
  </div>

  {/* Pending Payout */}
  <div>
    <Label>Pending Payout</Label>
    <div className="h-12 flex items-center justify-end px-4 rounded-xl
                    border bg-yellow-50
                    text-lg font-semibold text-yellow-600
                    dark:bg-yellow-900/20 dark:text-yellow-400">
      {brazilianCurrency(
        (
          (totalAmountReceivedFromPatient -
            (querydetails?.clinic?.commission * totalAmountReceivedFromPatient) / 100) -
          totalfundreceived
        ) || 0
      )}
    </div>
  </div>

  {/* Funds Released */}
  <div>
    <Label>Funds Released</Label>
    <div className="h-12 flex items-center justify-end px-4 rounded-xl
                    border bg-blue-50
                    text-lg font-semibold text-blue-600
                    dark:bg-blue-900/20 dark:text-blue-400">
      {brazilianCurrency(totalfundreceived || 0)}
    </div>
  </div>

</div>


        </ComponentCard>



           
                    
            {/* {remainingAmount > 0 ? (
               
                <RaiseFunds
                    patientqueryid={id}
                    requestedFund={RequestedFunds}
                    totalFundsReceived={TotalReceivedFunds}
                    totalF={totalfundreceived}
                    remainF={remainingAmount}
                    clinicmaxAmount={(querydetails.finalPrice) - ((querydetails.clinic.commission * querydetails.finalPrice)/100)}
                    totalfundrequested={totalfundrequested}

                />
            ) : null} */}

                
        <RaiseFunds
            patientqueryid={id}
            requestedFund={RequestedFunds || 0}
            totalFundsReceived={TotalReceivedFunds || 0}
            totalF={totalfundreceived}
            remainF={(totalAmountReceivedFromPatient - (querydetails?.clinic?.commission * totalAmountReceivedFromPatient)/100) || 0}
            clinicmaxAmount={(querydetails.finalPrice || 0) - ((querydetails?.clinic?.commission || 0 * querydetails.finalPrice || 0) / 100)}
            totalfundrequested={totalfundrequested || 0} />


        <QueryStatus querydetails={querydetails} onData={(updatedData) => setQueryDetails(prev => ({ ...prev, ...updatedData }))} />

        <PaymentDetails querydetails={querydetails} />
    


    </>);
}