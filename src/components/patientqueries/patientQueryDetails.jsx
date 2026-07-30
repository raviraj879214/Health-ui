"use client"
import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";
import ComponentCard from "../common/ComponentCard";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import Label from "../form/Label";
import { formatBrazilDate } from "@/lib/formatDate";
import { useForm } from "react-hook-form";
import { Clipboard, Check } from "lucide-react"; // npm i lucide-react
import {ClinicDetails} from "./clinicDetails";
import {DoctorDetails} from "./doctorDetails";
import {PackageDetails} from "./packageDetails";
import { PatientQueryStatus } from "../../lib/enums/patientQueryStatus";
import { toast } from "react-toastify";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import {OtherInformation} from "./otherInformation";
import { useRouter } from "next/navigation";
import { Table, TableHeader } from "../ui/table";
import { PackageQueryFinalPriceStatus } from "@/lib/enums/patientQueryFinalPriceStatus";
import {QueryStatus} from "./queryStatus";
import { getSocket } from "@/hooks/socket";
import {PatientQueryStatusCompo} from "./patientQueryStatusCompo";
import { useConfirm } from "@/hooks/useConfirm";





export function PatientQueryDetails({ id }) {

    const [querydetails,setQueryDetails] = useState({});
    const [queryfinalPriceDetails,setqueryfinalDetails] = useState([]);
    const {register,handleSubmit,formState:{errors},setValue,getValues , setError , clearErrors} = useForm();
    const [copied, setCopied] = useState(false);

    const [value,setValues] = useState("");
    const [generatebutton,setGenerateButton] = useState(false);
    const [generatedamount,setGeneratedAmount] = useState(0);
    const [notes,setNotes] = useState("");
    const [buttonsendclinic,setButtonSendClinic] = useState(false);
    const [acceptpricebutton,steAcceptPriceButtton] = useState(false);
    const {ConfirmDialog ,confirm} = useConfirm();
    const router = useRouter();


    // useEffect(() => {
    //     fetchPackageQueryDetails();
    // }, [id]);



    
      useEffect(() => {
        fetchPackageQueryDetails();
          const socket = getSocket();
          socket.on("patientRequestAdmin", (data) => {
               fetchPackageQueryDetails();
          });
          return () => {
            socket.off("patientRequestAdmin");
          };
        }, [id]);


    const fetchPackageQueryDetails = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/get-patient-queries-details/${id}`, {
            method: "Get",
            headers: await adminHeaders()
        });
        if (res.ok) {
            const result = await res.json();
            setQueryDetails(result.data);
           setqueryfinalDetails(
              result.data.PatientQueryFinalPrice
                ?.slice() // prevent mutation
                ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            );
        }
    }


    const [finalpricebutton,steFinalPriceButton] = useState(false);

    const finalPrice = async(data)=>{   
            debugger;
            steFinalPriceButton(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/insert-final-deal-price`,{
                method : "Post",
                headers : await adminHeaders(),
                body: JSON.stringify({
                     "patientqueryid" : id,
                     "finalprice" : data.finalprice
                })
            });

            if(res.ok){
                const result = await res.json();
                fetchPackageQueryDetails();
                setValue("finalprice","");

                await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request`,{method : "Get"});
            }
            steFinalPriceButton(false);
    }




    const generatelink =async()=>{

       if(generatedamount < 1){
        alert("Please enter valid amount");

        return ;
       }
   

      setGenerateButton(true);



      debugger;
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/create-shareable-payment-link`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: generatedamount,
              stripeAccountId : querydetails.clinic.stripeaccountid,
              patientId : "1",
              packageprice:querydetails?.package?.discountedprice || "0",
              finalprice:querydetails.finalPrice || 0,
              generatedlink:"test",
              generatedamount:generatedamount,
              patientQueryId:id,
              displaytext:notes,
              commission : querydetails.clinic?.commission


            }),
          });

          const { paymentLink , shortLink } = await res.json();

          console.log(shortLink);
          setValues(`${process.env.NEXT_PUBLIC_URL}/verify-stripe?url=${shortLink}`);
          setGeneratedAmount(0);
          setGenerateButton(false);
          setNotes("");
           fetchPackageQueryDetails();


    }



    const handleCopy = async () => {
          if (!value) return;
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
    };



      const paymentDetails = querydetails?.paymentDetails || [];

      const totalPlatformFee = paymentDetails.filter(x=>x.status === 1).reduce((sum, item) => {
        const fee = Number(item.platformfee);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);


      const totalVendorFee = paymentDetails.filter(x=>x.status === 1).reduce((sum, item) => {
        const fee = Number(item.vendorfee);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);

       const totalGeneratedAmount = paymentDetails.filter(x=>x.status === 1).reduce((sum, item) => {
        const fee = Number(item.generatedamount);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);



      const sendClinic = async()=>{
        setButtonSendClinic(true);
          const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/assign-to-clinic-query`,{
            method : "Put",
            headers : await adminHeaders(),
            body: JSON.stringify({
              "patientqueryid" : id,
              "status" :  PatientQueryStatus.ASSIGNED
            })
          });
          if(res.ok){

            const result = await res.json();

            setQueryDetails((prev) => ({
                ...prev,
               status :  result.data.status, 
            }));


            toast.success("The query has been sent to the clinic. Please wait; the clinic will contact you shortly.",{
              position : "bottom-right",
              autoClose : 3000
            });
            await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request`,{method : "Get"});
          }

          setButtonSendClinic(false);
      }

     const deleteGeneratedAmount = async (id) =>{
        
          const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/delete-payment-details`,{
            method : "Post",
            headers : await adminHeaders(),
            body: JSON.stringify({
              id : id
            })
          });

          if(res.ok){
            const result = await res.json();

             toast.success("Deleted Successfully",{
              position : "bottom-right",
              autoClose : 3000
             })
            setQueryDetails(prev => ({
                ...prev,
                paymentDetails: prev.paymentDetails.filter(
                  item => item.id !== id
                )
            }));


          }
      }



      const acceptPatietnFinalPrice = async(id)=>{
          debugger;
          const result = await confirm("This offer has been accepted by the clinic but is still pending admin confirmation. Once you confirm, no other offers can be submitted. Please ensure the clinic confirms before proceeding. Until you make the final confirmation, you can still submit a new offer by entering a price and clicking the submit button.");
            if (!result) {
            console.log("User not confirmed!");
            return false;
        }





        steAcceptPriceButtton(true);
        const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/update-patient-query-final-price-status`,{
          method : "Put",
          headers : await adminHeaders(),
          body: JSON.stringify({
            "id" : id,
            "status" : PackageQueryFinalPriceStatus.ACCEPTEDBYADMIN
          })
        });
        if(res.ok){
          const result= await res.json();

          console.log("setqueryfinalDetails",result.data);

          setqueryfinalDetails((prev) =>
            prev.map((item) =>item.id === result.data.id? { ...item, status: result.data.status }: item)
        );

          // patientQuery
        setQueryDetails((prev) =>
          prev?.id === result?.patientQuery?.id
            ? { ...prev, ...result.patientQuery }
            : prev
        );


         toast.success("The Final Price has been updated and notified to clinic also",{
          position : "bottom-right",
          autoClose : 3000
         });
          

         await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/webhook/patient-request`,{method : "Get"});

        }
        steAcceptPriceButtton(false);
      }

      




   

    return (<>
      <ConfirmDialog></ConfirmDialog>
      <div className="p-3 flex justify-end">
        <button
          onClick={() => window.location.href = '/admin/patient-queries'}
          className="btn btn-primary  cursor-pointer"
        >
          <span className="text-lg">← </span>
          <span className="font-medium">Back</span>
        </button>
      </div>


      <ComponentCard>



        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start">


          {((PatientQueryStatus.PENDING === querydetails.status || PatientQueryStatus.REJECT === querydetails.status) && querydetails.clinicId !== null) && (<>

            <p className="text-sm font-medium text-gray-700">
              On clicking “Send to Clinic”, the patient’s query details will be sent to the selected clinic.
              Please ensure that all required information has been collected from the patient before proceeding.
              Once the query is sent, you will not be able to reselect or change the clinic, doctor, or package.


            </p>
            <button
              onClick={() => sendClinic()}
              disabled={buttonsendclinic}
              className="btn btn-primary md:justify-self-end cursor-pointer">
              {buttonsendclinic ? (<>
                <ButtonSpinner></ButtonSpinner>
              </>) : (<> Send To Clinic</>)}

            </button>

          </>)}



          <div>

            <QueryStatus status={querydetails.status} remarks={querydetails.reason} paymentstatus={querydetails.PaymentStatus} paymentremark={querydetails.paymentreason} />
          </div>



        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ClinicDetails querydetails={querydetails} onData={() => fetchPackageQueryDetails()} />
          <DoctorDetails querydetails={querydetails} id={querydetails.clinic?.uuid} onData={() => fetchPackageQueryDetails()} />
          <PackageDetails querydetails={querydetails} id={querydetails.clinic?.uuid} onData={() => fetchPackageQueryDetails()} />
        </div>


      </ComponentCard>
       


      <ComponentCard className="p-6 space-y-6">


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
            <div className="text-gray-700">
              {querydetails?.email ? (
                <a
                  target="_blank"
                  href={`mailto:${querydetails.email}`}
                  className="text-blue-500 hover:underline"
                >
                  {querydetails.email}
                </a>
              ) : (
                "Not verified"
              )}
            </div>
          </div>

          <div>
            <Label>Contact the patient</Label>

            <div className="text-gray-700">
              {querydetails?.provider === "sms" && (
                <>
                  <span className="text-blue-500">SMS</span> :{" "}
                  {querydetails?.phoneNumber === "0"
                    ? "Not verified"
                    : querydetails?.phoneNumber}
                </>
              )}

              {querydetails?.provider === "whatsapp" && (
                <>
                  <span className="text-blue-500">WhatsApp</span> :{" "}
                  {querydetails?.phoneNumber === "0"
                    ? "Not verified"
                    : querydetails?.phoneNumber}
                </>
              )}

           {querydetails?.provider === "telegram" && (
  <>
    <span className="text-blue-500">Telegram</span> :{" "}
    <a
      href={`https://t.me/${querydetails?.telegramUsername?.replace("@", "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M21.7 3.3c-.3-.3-.8-.4-1.2-.2L2.6 10.2c-.8.3-.8 1.4.1 1.7l4.7 1.8 1.8 5.6c.2.7 1.1.9 1.6.4l2.6-2.6 4.9 3.6c.6.4 1.4.1 1.5-.7L22 4.3c.1-.4 0-.7-.3-1z" />
      </svg>

      {querydetails?.telegramUsername}
    </a>
  </>
)}

              {!querydetails?.provider && (
                <span className="text-gray-400">Not provided</span>
              )}
            </div>
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
      </ComponentCard>

      <ComponentCard className="mt-2">
        <OtherInformation id={id} />
      </ComponentCard>

<ComponentCard>
   

        <div className="w-full  bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800">
          <form onSubmit={handleSubmit(finalPrice)} className="p-6 md:p-8">

            {/* Header */}
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Final Deal Price

             
            </h2>

            {/* Price Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Package Price */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Package Price
                </label>

                <div className="h-12 flex items-center justify-end px-4 rounded-lg
                        border border-gray-200 bg-gray-100
                        text-gray-800 font-semibold
                        dark:bg-gray-800 dark:border-gray-700 dark:text-white/80">
                  {brazilianCurrency(querydetails.package?.discountedprice || 0)}
                </div>

              </div>



              <div>
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Final / Negotiated Price
                </label>


                {querydetails?.finalPrice?.trim() ? (
                  /* Read-only Final Price */
                  <div className="h-12 flex items-center justify-end px-4 rounded-lg
                  border border-green-400 bg-green-50
                  text-lg font-semibold text-green-700
                  dark:bg-green-900/20 dark:border-green-600 dark:text-green-300">
                    {brazilianCurrency(querydetails.finalPrice)}
                  </div>
                ) : (
                  /* Editable Input */
                  <>
                    <div
                      className={`flex items-center h-12 px-4 rounded-lg border
        ${errors.finalprice
                          ? "border-red-400 focus-within:ring-red-400"
                          : "border-gray-300 focus-within:ring-indigo-500"}
        shadow-sm dark:border-gray-700 dark:bg-gray-800
        focus-within:ring-2`}
                    >
                      <span className="mr-2 text-gray-500 dark:text-gray-400">R$</span>

                      <input
                        type="number"
                        step="0.01"
                        min="1"
                        placeholder="0.00"
                        className="w-full bg-transparent text-lg text-gray-800
                   placeholder-gray-400 focus:outline-none
                   dark:text-white/90 text-right"
                        {...register("finalprice", {
                          required: "Please enter final price",
                          min: {
                            value: 1,
                            message: "Price must be greater than 0"
                          }
                        })}
                      />
                    </div>

                    {errors.finalprice && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.finalprice.message}
                      </p>
                    )}
                  </>
                )}

              </div>


            </div>

            {/* Helper Text */}
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Enter the final agreed amount to generate a secure Stripe payment link.
            </p>

            <table className="w-full text-sm text-left text-body border border-default rounded-lg overflow-hidden">
              <thead className="bg-neutral-secondary-soft border-b border-default">
                <tr>
                  <th className="px-6 py-3 font-medium">Final Price</th>
                  <th className="px-6 py-3 font-medium"> Clinic</th>
                  <th className="px-6 py-3 font-medium">Reason from Clinic</th>
                  <th className="px-6 py-3 font-medium">Created Date</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>


                {queryfinalPriceDetails.length > 0 ? (<>
                  {queryfinalPriceDetails?.map((item) => (

                    <tr key={item.id} className="border-b border-default">
                      <td className="px-6 py-4"><b>{brazilianCurrency(item.finalPrice)}</b></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          {/* Avatar */}
                          <div className="w-9 h-9 flex items-center justify-center rounded-full 
                            bg-blue-100 text-blue-700 font-semibold text-sm">
                            {item.Clinic?.name?.charAt(0)?.toUpperCase() || "C"}
                          </div>

                          {/* Clinic Name */}
                          <span className="font-medium text-gray-800">
                            {item.Clinic?.name || "--"}
                          </span>

                        </div>
                      </td>
                      <td className="px-6 py-4">{item.reason || "--"}</td>
                      <td className="px-6 py-4">{formatBrazilDate(item.createdAt)}</td>
                      <td className="px-6 py-4">


                        {item.status === PackageQueryFinalPriceStatus.PENDING && (<>
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-green-700">
                            Suggested Price
                          </span>
                        </>)}

                        {item.status === PackageQueryFinalPriceStatus.REJECT && (<>
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-green-700">
                            Rejected
                          </span>
                        </>)}

                        {item.status === PackageQueryFinalPriceStatus.ACCEPT && (<>
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            Accepted By Clinic
                          </span>
                        </>)}


                        {item.status === PackageQueryFinalPriceStatus.ACCEPTEDBYADMIN && (<>
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                            Accepted By | {process.env.NEXT_PUBLIC_PROJECT_NAME}
                          </span>
                        </>)}


                        {item.status === PackageQueryFinalPriceStatus.ACCEPT && (<>
                          <div className="border p-2 mt-2 rounded-xl bg-yellow-50 text-yellow-800 text-sm break-words whitespace-normal max-w-full">
                            This offer has been accepted by the clinic but is still pending admin confirmation.
                            Once you confirm, no other offers can be submitted. Please ensure the clinic confirms before proceeding.
                            Until you make the final confirmation, you can still submit a new offer by entering a price and clicking the submit button.

                            <button
                             type="button"
                                onClick={()=>{
                                  acceptPatietnFinalPrice(item.id);
                                }}
                                disabled={acceptpricebutton}
                              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                                                    text-white bg-green-600 rounded-lg 
                                                    hover:bg-green-700 transition mt-2">
                              

                              {acceptpricebutton ? (<><ButtonSpinner></ButtonSpinner></>): (<>
                                  ✓ Accept Price
                              </>)}
                            </button>
                          </div>
                        </>)}




                      </td>
                    </tr>

                  ))}
                </>) : (<>
                  <p className="text-red-600 m-3">No suggested price found</p>
                </>)}
              </tbody>
            </table>



            {/* Actions */}
            <div className="mt-8 flex justify-end">
              {querydetails?.finalPrice?.trim() ? (
                <></>
              ) : (
                <>
                  {querydetails.clinic && Number(querydetails.clinic.commission) > 0 ? (

                    <button
                      type="submit"
                      className="h-12 px-10 bg-gradient-to-r from-indigo-500 to-purple-500
                   hover:from-indigo-600 hover:to-purple-600
                   text-white font-semibold rounded-lg shadow-lg
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      disabled={finalpricebutton}
                    >

                      {finalpricebutton ? (<><ButtonSpinner></ButtonSpinner></>) : (<>Submit</>)}
                    </button>
                  ) : (
                    <p className="p-5 border border-red-500 rounded-2xl text-red-400">Please select clinic or commission to submit final deal price</p>
                  )}


                </>
              )}



            </div>

          </form>

        </div>


        <div className="relative w-full p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">

          <div>


            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
              Generate Payment Link
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                The amount will not be credited to the destination account immediately.
                You need to initiate the transfer manually.
              </p>
            </h2>


            <div className="flex flex-col md:flex-row gap-4 md:gap-3 items-start">


              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Amount
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg h-12 px-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <img
                    src="../images/stripe.png"
                    alt="Stripe"
                    className="h-6 w-auto mr-2"
                  />
                  <input
                    value={generatedamount}
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-transparent text-lg text-gray-800 placeholder-gray-400 focus:outline-none dark:text-white/90 dark:placeholder-gray-500 text-right"
                    onChange={(e) => setGeneratedAmount(e.target.value)}
                  />
                </div>
              </div>

              {/* Source Account */}
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Source Account
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg h-16 px-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <span className="text-gray-800 dark:text-white/90">
                    Admin Account (hidden)
                  </span>
                </div>
              </div>

              {/* Destination Account */}
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Destination Account
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg h-16 px-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                  <span className="text-gray-800 dark:text-white/90">
                    {querydetails?.clinic?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Generated Link */}
            <div className="flex items-center gap-2 mt-4 border border-gray-300 rounded-lg h-12 px-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <input
                type="text"
                value={value}
                readOnly
                placeholder="Generated Link"
                className="flex-1 bg-transparent text-lg text-gray-800 placeholder-gray-400 focus:outline-none dark:text-white/90 dark:placeholder-gray-500 text-right"
              />
              <button
                onClick={handleCopy}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Clipboard className="h-5 w-5 text-gray-500 dark:text-gray-300" />
                )}
              </button>
              {copied && (
                <span className="ml-2 text-sm text-green-600 font-medium">
                  Copied!
                </span>
              )}
            </div>

            {/* Message */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
                <b>Message for Payment Page</b> (optional)
              </label>
              <textarea
                value={notes}
                maxLength={200}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add a note or message for the patient (200 characters)..."
                className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder-gray-500"
              />
            </div>

            {/* Generate Button */}


            {(querydetails.clinic && Number(querydetails.clinic.commission) > 0 && parseInt(querydetails.finalPrice) > 0) ? (
              <button
                onClick={generatelink}
                disabled={generatebutton}
                className="mt-4 h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
              >
                {generatebutton ? (
                  <svg
                    className="w-6 h-6 text-white animate-spin mr-2"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Generate Link"
                )}
              </button>
            ) : (
              <p className="p-5 border border-red-500 rounded-2xl text-red-400">Please fill clinic and final deal price to generate payment link</p>
            )}




          </div>
        </div>

        <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Payment Details
          </h2>



          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">

            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Package Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Final Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Message
                  </th>


                  <th scope="col" className="px-6 py-3 font-medium">
                    Generated Link
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Generated Amount
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Commission
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Health Tech Commision fee
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Clinic Fee
                  </th>



                  <th scope="col" className="px-6 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Action
                  </th>


                </tr>
              </thead>
              <tbody>
                {querydetails.paymentDetails?.map((item) => (
                  <tr key={item.id} className="bg-neutral-primary border-b border-default">
                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                      {formatBrazilDate(item.createdAt)}
                    </th>
                    <td className="px-6 py-4">
                      {brazilianCurrency(item.packageprice || 0)}
                    </td>
                    <td className="px-6 py-4">
                      {brazilianCurrency(item.finalprice || 0)}
                    </td>
                    <td className="px-6 py-4 break-words whitespace-normal relative">
                      <input
                        type="checkbox"
                        id={`toggle-note-${item.id}`}  // unique per row
                        className="hidden peer"
                        disabled={!item.note}           // optional: disable if no text
                      />
                      <span className="line-clamp-3 peer-checked:line-clamp-none">
                        {item.note || "--"}
                      </span>
                      {item.note && (
                        <label
                          htmlFor={`toggle-note-${item.id}`} // matches the input id
                          className="text-blue-500 text-sm cursor-pointer ml-1"
                        >
                          show more
                        </label>
                      )}
                    </td>
                    <td className="px-1 py-1 max-w-[150px] overflow-hidden">


                      {item.status === 1 ? (
                        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-green-400 text-black-800">
                          Paid
                        </span>
                      ) : (
                        <a
                          className="text-blue-600 underline truncate block text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                          href={`${process.env.NEXT_PUBLIC_URL}/verify-stripe?url=${item.generatedlink}`}
                          title={`${process.env.NEXT_PUBLIC_URL}/verify-stripe?url=${item.generatedlink}`}
                        >
                          {`${process.env.NEXT_PUBLIC_URL}/verify-stripe?url=${item.generatedlink}`}
                        </a>
                      )}


                    </td>


                    <td className="px-6 py-4">
                      {brazilianCurrency(item.generatedamount)}
                    </td>

                    <td className="px-2 py-2 flex align-content-center">
                      <span className="text-xs px-2 py-1 rounded border border-orange-400 text-orange-600">
                        {item.commission}%
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {brazilianCurrency(item.platformfee)}
                    </td>
                    <td className="px-6 py-4">
                      {brazilianCurrency(item.vendorfee)}
                    </td>

                    <td className="px-6 py-4">
                      {item.status === 0 && (
                        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-gray-200 text-gray-800">
                          Pending
                        </span>
                      )}

                      {item.status === 1 && (
                        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-green-200 text-green-800">
                          Received
                        </span>
                      )}


                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() =>
                          deleteGeneratedAmount(item.id)
                        }
                        disabled={item.status === 1}
                        className={`p-1 rounded-md transition 
                          ${item.status === 1
                            ? "text-gray-400 cursor-not-allowed opacity-50"
                            : "text-red-600 hover:text-red-800 hover:bg-red-50"}
                        `}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </button>
                    </td>

                  </tr>
                ))}

                <tr>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">Total {brazilianCurrency(totalGeneratedAmount)}</td>

                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">Total {brazilianCurrency(totalPlatformFee)}</td>
                  <td className="px-6 py-4">Total {brazilianCurrency(totalVendorFee)}</td>
                  <td className="px-6 py-4"></td>
                  <td></td>

                </tr>


              </tbody>
            </table>
          </div>


        </div>

      <PatientQueryStatusCompo querydetails={querydetails} onData={(updatedData) => setQueryDetails(prev => ({...prev,...updatedData}))}  />

        


</ComponentCard>













    </>);
}