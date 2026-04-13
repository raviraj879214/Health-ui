"use client";
import { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { adminHeaders } from "../utils/adminHeader";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@/icons";
import Label from "../form/Label";
import PatientQueryStatusBadge from "@/reusable/StatusBadge";
import { formatBrazilDate } from "@/lib/formatDate";
import Button from "../ui/button/Button";
import {AddOnServices} from "./addOnServices";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";




export function AdditionalServices(){

    const [isOpen, setIsOpen] = useState(false);
    const [selectedQuery, setSelectedQuery] = useState(null);

    const [patientquerycode,setPatinetQueryCode] = useState([]);
    const [patientquery,setPatientQuery] = useState({});

    const [finalizemodule,setFinalizeModule] = useState(false);


    const [additionalservicespaymetndetails,setAdditionalServicesPaymetnDetails] = useState([]);

    const [additionalserviceslist,setAdditionalServicesList] = useState([]);


    useEffect(()=>{
        fetchPatientQuery();
    },[]);

    const fetchPatientQuery = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/additonal-services/get-patient-queries`,{
            method : "Get",
            headers : await adminHeaders(),
        });
        if(res.ok){
            debugger;
            const result= await res.json();

            setPatientQuery(result.data);

            const patientCode = result.data.map(item => ({
                querycode: item.querycode,
                id: item.id,
                status : item.status,
                AdditionalServicesPaymetnDetails: item.AdditionalServicesPaymetnDetails
            }));
            setPatinetQueryCode(patientCode);

            setAdditionalServicesList(result.additionalServicesList);




            
        }
    }



    const [querydetails,setQueryDetails] = useState({});

    const  selectPatientQueryCode =async(data)=>{
        debugger;
        console.log(data);
        setQueryDetails(patientquery.find(x=>x.id === data.id));
        setAdditionalServicesPaymetnDetails(data.AdditionalServicesPaymetnDetails);
        
    }



    const totalAdditionalCost = querydetails?.AdditionalServices?.reduce(
        (sum, item) => sum + Number(item.price || 0),
        0
    );

    const descriptiond = querydetails?.AdditionalServices?.filter(x=>x.status === 0).map(item => item.label).join(', ');


     const generatePaymentLink = async(name,amount,description,patientQueryId,additionids = [])=>{
        debugger;
         const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/create-additional-cost-payemtn-link`, {
             method: "Post",
             headers: {
                 "content-type": "application/json"
             },
             body: JSON.stringify({
                 "patientQueryId": patientQueryId,
                 "name": name,
                 "amount": amount,
                 "description": `${name} Description : ${descriptiond}`,
                 "additionids" : additionids
             })
         });
        if(res.ok){
            const  result= await res.json();
            setAdditionalServicesPaymetnDetails(prev=>[
                ...prev,
                result.AdditionalServicesPaymetnDetails
            ]);
            setQueryDetails((prev) => ({
                ...prev,
                AdditionalServices: prev.AdditionalServices.map((item) =>
                    additionids.includes(item.id)
                        ? { ...item, status: 1 } 
                        : item
                ),
            }));
        }
    }

const queryDetailsSet = (data) => {
    console.log("queryDetailsSet", data);

    // Only update if the patientQueryId matches the current querydetails.id
    if (querydetails.id === data.patientQueryId) {
        setQueryDetails(prev => ({
            ...prev,
            AdditionalServices: [
                ...(prev.AdditionalServices || []),
                data
            ]
        }));
    }
};

    

const [copiedId, setCopiedId] = useState(null);

const handleCopy = async (paymentLink, id) => {
  try {
    await navigator.clipboard.writeText(paymentLink);
    setCopiedId(id);

    setTimeout(() => setCopiedId(null), 2000);
  } catch (err) {
    console.error("Copy failed", err);
  }
};



    const onUpdateAdditionalServices = async (data) => {
    

        console.log("onUpdateAdditionalServices",data);

        setQueryDetails(prev => ({
  ...prev,
  AdditionalServices: prev.AdditionalServices.map(x =>
    x.id === data.id
      ? {
          ...x,
          label: data.label,
          value: data.value,
          price: data.price
        }
      : x
  )
}));
 

    }

    

    const deleteServices = async(id)=>{

        setQueryDetails(prev => ({
    ...prev,
    AdditionalServices: prev.AdditionalServices.filter(x => x.id !== id)
  }));

    }



    const deletePaymentLink = async (id) => {
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/additonal-services/delete-paymentlink/${id}`, {
            method: "Delete",
            headers: await adminHeaders()
        });
        if (res.ok) {
            const result = await res.json();

            setAdditionalServicesPaymetnDetails(prev =>
                prev.filter(x => x.id !== id)
            );

            console.log("additionids",result.additionids);
    


             toast.success("Payment link deleted successfully",{
                            position : "bottom-right",
                            autoClose : 3000
                    });


            result.additionids.map((item)=>{
                setQueryDetails(prev => ({
                    ...prev,
                    AdditionalServices: prev.AdditionalServices.filter(x => x.id !== item)
                }));
            })
               

        }


    }   




    return(<>
        <ToastContainer />
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">
                <ComponentCard title="Patient Queries" desc="" showReload={true}>
                   <div className="space-y-6">
                        <div>
                            <Label>Patinet Query Code</Label>
                            <div className="relative">
                                <div className="relative">
                                    <div
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer flex justify-between items-center">
                                        {selectedQuery ? (
                                            <div className="flex items-center gap-2">
                                                <span>{selectedQuery.querycode}</span>
                                                <PatientQueryStatusBadge status={selectedQuery.status} />
                                            </div>
                                        ) : (
                                            <span className="text-gray-400">Select Code</span>
                                        )}

                                        <span className="text-gray-500">▼</span>
                                    </div>
                                    {isOpen && (
                                        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                                            {patientquerycode.map((item) => (
                                                <div
                                                    key={item.id}
                                                    onClick={() => {
                                                        setSelectedQuery(item);
                                                        selectPatientQueryCode(item);
                                                        setIsOpen(false);
                                                    }}
                                                    className="flex items-center justify-between gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    <span>{item.querycode}</span>
                                                    <PatientQueryStatusBadge status={item.status} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                            </div>
                        </div>
                        
                       

                        {Object.keys(querydetails).length > 0 && (<>
                                <hr></hr>
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
                                    <Label>Email</Label>
                                    <div className="text-gray-700">{querydetails?.email || "Not verified"}</div>
                                </div>

                                <div>
                                    <Label>Phone Number</Label>
                                    <div className="text-gray-700">{querydetails?.phoneNumber === "0" ? "Not verified" : querydetails?.phoneNumber}</div>
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

                            </div>
                        </>)}

                     

                        {Object.keys(querydetails).length > 0 && (<>
                            <hr></hr>
                            <AddOnServices data={querydetails.AdditionalServices} patientquerid={querydetails.id} additioanpayment={additionalservicespaymetndetails.length || 0} onReturn={(data)=> queryDetailsSet(data)} additionalserviceslist={additionalserviceslist} onUpdateData={(data)=> onUpdateAdditionalServices(data)} onDeleteData={(id)=> deleteServices(id)} />
                        </>)}


                            
                        {querydetails?.AdditionalServices?.filter(x=>x.status === 0).length > 0 && (<>
                            <hr></hr>
                            <div className="bg-white p-6 rounded-2xl shadow-md">
                            <div
                                className={`transition-all duration-500 ease-in-out`}>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">
                                    Finalize  Additional Price
                                </h3>

                                <div className="border rounded-lg p-4 bg-white shadow-sm">
                                    <div className="grid grid-cols-3 font-semibold text-gray-600 border-b pb-2 mb-3">
                                        <div>Services</div>
                                        <div>Total Cost</div>
                                        <div className="text-right">Action</div>
                                    </div>
                                    <div className="grid grid-cols-3 items-center text-sm text-gray-700">

                                        <div className="space-y-1">
                                            {querydetails?.AdditionalServices?.filter(x=>x.status === 0).map((item) => (
                                                <p key={item.id}>{item.label}</p>
                                            ))}
                                        </div>

                                        <div>
                                            <p className="text-lg font-bold text-green-600">
                                                {brazilianCurrency(querydetails?.AdditionalServices?.filter(x=>x.status === 0).reduce((sum, item) => sum + Number(item.price || 0),0))}
                                            </p>
                                        </div>

                                        <div className="text-right">
                                            

                                            {/* {additionalservicespaymetndetails.length === 0 ? (<>
                                                <button
                                            onClick={()=>{
                                                generatePaymentLink(
                                                `${querydetails.querycode} - Additional Cost`,
                                                querydetails?.AdditionalServices?.filter(x=>x.paymentstatus === 0).reduce((sum, item) => sum + Number(item.price || 0),0),
                                                `Additional services payment for ${querydetails.querycode}`,
                                                querydetails.id
                                                );
                                            }}
                                            
                                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                                Generate Link
                                                </button>
                                            </>):(<>
                                                <span>Link Generated</span>
                                            </>)} */}


                                            <button
                                                onClick={() => {
                                                     const pendingServices = querydetails?.AdditionalServices?.filter(x => x.status === 0);
                                                     const additionIds = pendingServices.map(item => item.id);

                                                    generatePaymentLink(
                                                        `${querydetails.querycode} - Additional Cost`,
                                                        querydetails?.AdditionalServices?.filter(x => x.status === 0).reduce((sum, item) => sum + Number(item.price || 0), 0),
                                                        `Additional services payment for ${querydetails.querycode}`,
                                                        querydetails.id,
                                                        additionIds
                                                    );
                                                }}

                                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                                Generate Link
                                                
                                            </button>


                                        </div>
                                    </div>
                                </div>


                            </div>

                        </div>


                        </>)}

                       
                       
                        {additionalservicespaymetndetails.length > 0 && (<>
                            <div className="bg-white p-6 rounded-2xl shadow-md">
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">
                                    Payment Details
                                </h3>

                                <div className="border rounded-lg p-4 bg-white shadow-sm">

                                    {/* Header */}
                                    <div className="grid grid-cols-6 font-semibold text-gray-600 border-b pb-2 mb-3">
                                        <div>Payment Link</div>
                                        <div>Amount</div>
                                        <div>Status</div>
                                        <div>Description</div>
                                        <div>Date</div>
                                        <div>Action</div>
                                    </div>

                                    {/* Data */}
                                    {additionalservicespaymetndetails?.map((item, index) => (
                                        <div
                                            key={index}
                                            className="grid grid-cols-6 items-center text-sm text-gray-700 mb-2"
                                        >
                                            {/* Link */}
                                            <div className="flex items-center gap-3 truncate text-blue-600">
                                                {/* Open link */}
                                                <a
                                                    href={item.paymentLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:underline"
                                                >
                                                    Open Link
                                                </a>

                                                {/* Copy button */}
                                                <button
                                                    onClick={() => handleCopy(item.paymentLink, item.id)}
                                                    className="text-sm text-gray-500 hover:text-black"
                                                >
                                                    {copiedId === item.id ? "Copied!" : "Copy"}
                                                </button>
                                            </div>


                                            <div className="truncate text-blue-600">
                                                {brazilianCurrency(item.amount)}
                                            </div>

                                            {/* Status */}
                                            <div>
                                                {item.status === 1 ? (
                                                    <span className="text-green-600 font-medium">Paid</span>
                                                ) : (
                                                    <span className="text-yellow-600 font-medium">Pending</span>
                                                )}
                                            </div>

                                            {/* Description */}
                                            <div className="">
                                                <b>{item.description || "-"}</b>
                                            </div>

                                            {/* Date */}
                                            <div>
                                                {formatBrazilDate(item.createdAt)}
                                            </div>
                                            
                                            <div className="cursor-pointer">
                                                

                                                {item.status === 1 ? (
                                                    <span className="text-green-600 font-medium">--</span>
                                                ) : (
                                                    <Trash2 size={18} onClick={() => deletePaymentLink(item.id)} />
                                                )}
                                            </div>
                                            

                                        </div>
                                    ))}

                                </div>
                            </div>
                        </>)}

                        
                        
                    </div>
                </ComponentCard>
            </div>
        </div>
    </>);
}