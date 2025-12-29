import { useEffect, useState } from "react";
import { DropDownSearchesClinic } from "./dropDownClinic";
import { adminHeaders } from "../utils/adminHeader";
import {DropDownPackages} from "./dropDownPackages";
import { formatBrazilDate } from "@/lib/formatDate";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";




export function ClinicpackageDetails({onPayment}){


    const [tagValue, setTagValue] = useState("");
    const [clinicdetails,setClinicDetails] = useState([]);
    const [packagesArray,setPackagesArray] = useState([]);
    const [packageid,setPackageid] = useState("");
    const [patientqueryArray,setPatientqueryArray] = useState([]);
    const [stripeAccount,setStripeAccount] = useState({});
    const [vendorStripeAccountId,setvendorStripeAccountId] = useState("");
    const [transferbutton,settransferbutton] = useState(false);
    const [transfer,setTransfer] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);

    const{register,setValue,getValues,handleSubmit,formState:{errors},reset} = useForm();


    useEffect(()=>{
      fetchTranferTransaction();
    },[openIndex]);



    const fetchClinicDeatails = async(id)=>{
   
      
        const res = await  fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/get-clinic-details/${id}`,{
            method : "Get",
            headers : await adminHeaders(),
        });
        if(res.ok){
            debugger;
            const result = await res.json();
            setClinicDetails(result.data);

            if (result.data?.packages) {
                    const filteredPackages = result.data.packages.filter(
                        (pkg) => pkg.clinicId === id
                    );
                    setPackagesArray(filteredPackages);
                    fetchStripeAccount(result.data.stripeaccountid);
                    setvendorStripeAccountId(result.data.stripeaccountid);
            }
        }
    }

    const fetchPackageDetails = (packageid) => {
        console.log("packagesArray", packagesArray);

        if (!Array.isArray(packagesArray)) return;

        const selectedPackage = packagesArray.find(
            pkg => pkg.id === packageid
        );

            setPatientqueryArray(selectedPackage?.queries || []);
            
    };

    const fetchStripeAccount = async(stripeaccountid)=>{
    debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/status`,{
        method : "Post",
        headers :{
            "content-type" : "application/json"
        },
        body:JSON.stringify({
            stripeAccountId : stripeaccountid
        })
    });

    if(res.ok){
        debugger;
        const result = await res.json();

        console.log("stripe account details",result);
        setStripeAccount(result);


    }

    }
    

    const payClinic = async (data) => {
        debugger;


        settransferbutton(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/pay-clinic-payout`,
                {
                    method: "POST",
                    headers: {
                        ...(await adminHeaders()),
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: data.vendoramount, // number, not string
                        vendorStripeAccountId: vendorStripeAccountId,
                        description: data.description,
                        clinicid: clinicdetails.uuid,
                        packageid: packageid,
                        patientqueryid: data.patientqueryid
                    }),
                }
            );

            const result = await res.json();
            onPayment(result.transferId);
            reset();

            toast.success("Payment Tranfered Successfull", {position: "bottom-right",autoClose: 3000,});
            fetchTranferTransaction();


            if (!res.ok) {
                console.error("API Error:", result);
                return;
            }




            console.log("Success:", result);
        } catch (error) {
            console.error("Fetch Error:", error);
        }
        settransferbutton(false);
    };



    const fetchTranferTransaction = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/get-transfer-transaction`,{
            method : "Post",
            headers : await adminHeaders(),
            body :JSON.stringify({
                 clinicid: clinicdetails.uuid,
                 packageid: packageid,
                 patientqueryid: openIndex
            })
        });
        if(res.ok){
            debugger;
            const  result = await res.json();
            setTransfer(result.data);
            

        }
    }
    
    





    return(<>
    
     <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <ToastContainer></ToastContainer>
            <div className="flex items-center justify-between mb-6 grid grid-cols-1">
                
                 <h2 className="text-xl font-semibold text-gray-900">
                    Clinic List
                 </h2>

                <div className="grid grid-cols-1">
                    <DropDownSearchesClinic value={tagValue} onChange={(val) => 
                      {
                        setTagValue(val);

                        if (val && val.code) {

                          setClinicDetails([]);
                          setPackagesArray([]);
                          setPatientqueryArray([]);
                          
                          fetchClinicDeatails(val.code);
                        
                        }
                        else {
                          setClinicDetails([]);
                          setPackagesArray([]);
                          setPatientqueryArray([]);
                        }



                      }}/>
                  </div>

                
                {clinicdetails.length !== 0 &&(
                    <div className="flex flex-row  border theme-border m-1 p-4 space-x-6 items-center mt-5">
                      <div className="font-semibold">Clinic Details:</div>

                      <div>
                          <span className="font-medium">Name: </span>
                          <span>{clinicdetails.name}</span>
                      </div>

                      <div>
                          <span className="font-medium">Address: </span>
                          <span>{clinicdetails.address}</span>
                      </div>

                      <div>
                          <span className="font-medium">Email: </span>
                          <span>{clinicdetails.email}</span>
                      </div>

                      <div>
                          <span className="font-medium">Website: </span>
                          <span>{clinicdetails.websiteurl}</span>
                      </div>

                      <div>
                          <span className="font-medium">Phone: </span>
                          <span>{clinicdetails.phone}</span>
                      </div>


                  </div>

                )}
                
          {clinicdetails.length !== 0 && (

            <div className="border theme-border m-1 p-4 space-x-6 items-center mt-5">
              <div className="font-semibold">Package List: </div>
                {packagesArray.length !== 0 ? (
                  <DropDownPackages onChange={(val) => { if (val && val.code) { setPackageid(val.code); fetchPackageDetails(val.code) }else{setPatientqueryArray([])} }} props={packagesArray} />
                ) :(<p>No packages found</p>)}
              


             
              {patientqueryArray.length !==0 ? (
                   <div className="mt-5 space-y-6">
                <div className="">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Patient Queries
                  </h3>
                      {patientqueryArray.length !==0 ? (
                        <>
                           {patientqueryArray.map((item) => (

                      <div className="space-y-2">
                        <div className="border rounded-lg">
                          <button
                            onClick={() => {
                              setOpenIndex(openIndex === item.id ? null : item.id)

                            }
                            }
                            className="w-full flex justify-between items-center p-4 font-medium"
                          >
                            <span><b>{item.querycode}</b></span>
                            <Arrow open={openIndex === item.id} />
                          </button>

                          {openIndex === item.id && (
                            <div className="border-t">
                              <div
                                key={item.id}
                                className="border rounded-lg p-4 mb-6 bg-gray-50"
                              >
                                {/* ================= Patient Details ================= */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-b pb-4 mb-4">
                                  <div>
                                    <p className="text-xs text-gray-500">Name</p>
                                    <p className="font-medium">{item.patientName}</p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">Email</p>
                                    <p className="font-medium break-all">{item.email}</p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">Phone</p>
                                    <p className="font-medium">{item.phoneNumber}</p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">WhatsApp</p>
                                    <p className="font-medium">{item.whatsappNumber}</p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">Telegram</p>
                                    <p className="font-medium">{item.telegramUsername || "—"}</p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">Subject</p>
                                    <p className="font-medium">{item.subject}</p>
                                  </div>

                                  <div>
                                    <p className="text-xs text-gray-500">Created At</p>
                                    <p className="font-medium">
                                      {formatBrazilDate(item.createdAt)}
                                    </p>
                                  </div>
                                </div>


                                <div className="bg-white rounded-lg p-4 shadow-inner">


                                  {item.paymentDetails?.length > 0 ? (
                                    <div className="overflow-x-auto">




                                      <div className="border theme-border rounded-2xl bg-white p-6 mt-5 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                          Payment Summary
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                          <div className="bg-green-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500">Total Amount Received</p>

                                            <p className="text-2xl font-bold text-green-700">
                                              {brazilianCurrency(
                                                item.paymentDetails?.reduce(
                                                  (total, x) => total + Number(x.generatedamount || 0),
                                                  0
                                                )

                                              )}

                                            </p>

                                          </div>



                                          <div className="bg-yellow-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500">Commission</p>
                                            <p className="text-2xl font-bold text-yellow-700">{item.paymentDetails?.reduce((total, x) => Number(x.commission || 0), 0)} % </p>
                                          </div>


                                          <div className="bg-blue-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500">Platform Fee Received</p>
                                            <p className="text-2xl font-bold text-blue-700">
                                              {brazilianCurrency(
                                                item.paymentDetails?.reduce(
                                                  (total, x) => total + Number(x.platformfee || 0),
                                                  0
                                                )

                                              )}
                                            </p>
                                          </div>


                                          <div className="bg-purple-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500">Fund to be paid</p>
                                            <p className="text-2xl font-bold text-purple-700">
                                              {brazilianCurrency(
                                                item.paymentDetails?.reduce(
                                                  (total, x) => total + Number(x.vendorfee || 0),
                                                  0
                                                )

                                              )}

                                            </p>
                                          </div>


                                        </div>




                                               <h4 className="text-md font-semibold text-gray-700 mb-3 mt-5">
                                        Payment Details
                                      </h4>
                                      <table className="w-full text-sm border">
                                        <thead className="bg-gray-100">
                                          <tr>
                                            <th className="border px-3 py-2 text-left">Package Price</th>
                                            <th className="border px-3 py-2 text-left">Final Price</th>
                                            <th className="border px-3 py-2 text-left">Requested Payment</th>
                                            <th className="border px-3 py-2 text-left">Commission</th>
                                            <th className="border px-3 py-2 text-left">Platform Fee</th>
                                            <th className="border px-3 py-2 text-left">Vendor Fee</th>
                                            <th className="border px-3 py-2 text-left">Status</th>
                                            <th className="border px-3 py-2 text-left">Created</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {item.paymentDetails.map((pay) => (
                                            <tr key={pay.id} className="hover:bg-gray-50">

                                              <td className="border px-3 py-2">{brazilianCurrency(pay.packageprice)}</td>
                                              <td className="border px-3 py-2">{brazilianCurrency(pay.finalprice)}</td>
                                              <td className="border px-3 py-2">{brazilianCurrency(pay.generatedamount)}</td>
                                              <td className="border px-3 py-2">{(pay.commission)} %</td>
                                              <td className="border px-3 py-2">{brazilianCurrency(pay.platformfee)}</td>
                                              <td className="border px-3 py-2">{brazilianCurrency(pay.vendorfee)}</td>
                                              <td className="border px-3 py-2">
                                                <span
                                                  className={`px-2 py-1 text-xs rounded-full ${pay.status === 1
                                                      ? "bg-green-100 text-green-700"
                                                      : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                  {pay.status === 1 ? "Paid" : "Pending"}
                                                </span>
                                              </td>
                                              <td className="border px-3 py-2">
                                                {formatBrazilDate(pay.createdAt)}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                      </div>

                                     

                                      <div className="border theme-border rounded-2xl bg-white p-6 mt-5 shadow-sm">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                          Payout Summary
                                        </h3>

                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                          <div className="bg-green-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500">Funds Yet to Be Released</p>


                                            <p className="text-2xl font-bold text-green-700">
                                              {brazilianCurrency(
                                                Math.max(
                                                  (item.paymentDetails?.reduce(
                                                    (total, x) => total + Number(x.vendorfee || 0),
                                                    0
                                                  ) || 0)
                                                  -
                                                  (transfer?.reduce(
                                                    (total, x) => total + Number(x.amount || 0),
                                                    0
                                                  ) || 0),
                                                  0
                                                )
                                              )}
                                            </p>
                                          </div>



                                          <div className="bg-purple-50 rounded-xl p-4">
                                            <p className="text-sm text-gray-500">Clinic Fee Paid</p>
                                            <p className="text-2xl font-bold text-purple-700">

                                              {brazilianCurrency(
                                                transfer?.reduce(
                                                  (total, x) => total + Number(x.amount || 0),
                                                  0
                                                ))}


                                            </p>
                                          </div>

                                        </div>




                                        {stripeAccount && (
                                          <div className="border theme-border rounded-2xl bg-white p-5 shadow-sm mt-5">
                                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                                              Account Details
                                            </h3>

                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">


                                              <div>
                                                <p className="text-xs text-gray-500">Account Holder</p>
                                                <p className="font-medium text-gray-900">
                                                  {stripeAccount.accountHolderName ||
                                                    stripeAccount.account?.individual?.first_name ||
                                                    "—"}
                                                </p>
                                              </div>


                                              <div>
                                                <p className="text-xs text-gray-500">Bank Name</p>
                                                <p className="font-medium text-gray-900">
                                                  {stripeAccount.bankDetails?.bankName || "—"}
                                                </p>
                                              </div>


                                              <div>
                                                <p className="text-xs text-gray-500">Account Number</p>
                                                <p className="font-medium text-gray-900 tracking-wider">
                                                  {stripeAccount.bankDetails?.last4
                                                    ? `•••• •••• ${stripeAccount.bankDetails.last4}`
                                                    : "—"}
                                                </p>
                                              </div>


                                              <div>
                                                <p className="text-xs text-gray-500">
                                                  {stripeAccount.bankDetails?.country === "IN"
                                                    ? "IFSC Code"
                                                    : "Routing Number"}
                                                </p>
                                                <p className="font-medium text-gray-900">
                                                  {stripeAccount.bankDetails?.routingNumber || "—"}
                                                </p>
                                              </div>


                                              <div>
                                                <p className="text-xs text-gray-500">Currency</p>
                                                <p className="font-medium text-gray-900 uppercase">
                                                  {stripeAccount.bankDetails?.currency || "—"}
                                                </p>
                                              </div>


                                              <div>
                                                <p className="text-xs text-gray-500">Country</p>
                                                <p className="font-medium text-gray-900">
                                                  {stripeAccount.bankDetails?.country || "—"}
                                                </p>
                                              </div>


                                              <div>
                                                <p className="text-xs text-gray-500">Bank Status</p>
                                                <span
                                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stripeAccount.bankDetails?.status === "verified"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                                >
                                                  {stripeAccount.bankDetails?.status || "Pending"}
                                                </span>
                                              </div>


                                              <div>
                                                <p className="text-xs text-gray-500">Payouts Enabled</p>
                                                <span
                                                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${stripeAccount.account?.payouts_enabled
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                  {stripeAccount.account?.payouts_enabled ? "Yes" : "No"}
                                                </span>
                                              </div>

                                            </div>


                                            <form
                                              onSubmit={handleSubmit(payClinic)}
                                              className="bg-white p-6 space-y-4"
                                            >
                                              <h3 className="text-lg font-semibold text-gray-900">
                                                Release Funds
                                              </h3>

                                            
                                              <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                  Amount
                                                </label>
                                                <input
                                                  type="text"
                                                  placeholder="Enter amount"
                                                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                                  {...register("vendoramount", {
                                                    required: "Amount is required",
                                                    pattern: {
                                                      value: /^[0-9]+$/,
                                                      message: "Enter a valid amount",
                                                    },
                                                  })}
                                                />
                                                {errors.vendoramount && (
                                                  <p className="text-sm text-red-500 mt-1">
                                                    {errors.vendoramount.message}
                                                  </p>
                                                )}
                                              </div>

                                              {/* Description */}
                                              <div>
                                                <label className="block text-sm font-medium text-gray-600 mb-1">
                                                  Description / Note
                                                </label>
                                                <textarea
                                                  rows="3"
                                                  placeholder="e.g. Clinic payout for Package #1021"
                                                  className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                                  {...register("description", { required: "Please add note on transaction" },
                                                    {
                                                      maxLength: {
                                                        value: 200,
                                                        message: "Description cannot exceed 200 characters",
                                                      },
                                                    })}
                                                />
                                                {errors.description && (
                                                  <p className="text-sm text-red-500 mt-1">
                                                    {errors.description.message}
                                                  </p>
                                                )}
                                              </div>

                                              <div>
                                                <input className="hidden"
                                                  value={item.id}
                                                  {...register("patientqueryid")}
                                                ></input>
                                              </div>

                                              {/* Pay Button */}
                                              <button
                                                disabled={transferbutton}
                                                type="submit"
                                                className="btn btn-primary w-full"
                                              >

                                                {transferbutton ? "Processing..." : "Pay"}
                                              </button>
                                            </form>





                                          </div>
                                        )}





                                         <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-5">
                                        Transfer History
                                      </h3>
                                      <table className="w-full text-sm border mt-5">
                                        <thead className="bg-gray-100">
                                          <tr>
                                            <th className="border px-3 py-2 text-left">Transfer ID</th>
                                            <th className="border px-3 py-2 text-left">Amount</th>


                                            <th className="border px-3 py-2 text-left">Status</th>
                                            <th className="border px-3 py-2 text-left">Created</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {transfer.map((t) => (
                                            <tr key={t.id} className="hover:bg-gray-50">
                                              <td className="border px-3 py-2">{t.id}</td>
                                              <td className="border px-3 py-2">{brazilianCurrency((t.amount / 100).toFixed(2))}</td>


                                              <td className="border px-3 py-2">
                                                <span
                                                  className={`px-2 py-1 text-xs rounded-full ${t.reversed
                                                      ? "bg-yellow-100 text-yellow-700"
                                                      : "bg-green-100 text-green-700"
                                                    }`}
                                                >
                                                  {t.reversed ? "Reversed" : "Paid"}
                                                </span>
                                              </td>
                                              <td className="border px-3 py-2">

                                                {formatBrazilDate(t.created * 1000)}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>

                                      </div>

                                     


                                    </div>
                                  ) : (
                                    <p className="text-sm text-gray-500">
                                      No payment records available
                                    </p>
                                  )}
                                </div>
                              </div>

                            </div>
                          )}
                        </div>
                      </div>



                    ))}
                        </>

                      ):(<p>No query found</p>)}
                </div>
              </div>
              ) :(<p className="m-10">No queries found</p>)}





            </div>
          )}

                



                   
                


                




                


            </div>
        </div>
    
    </>);
}

function Arrow({ open }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform ${
        open ? "rotate-180" : ""
      }`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m5 15 7-7 7 7"
      />
    </svg>
  );
}