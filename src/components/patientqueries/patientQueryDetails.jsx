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





export function PatientQueryDetails({ id }) {

    const [querydetails,setQueryDetails] = useState({});
    const {register,handleSubmit,formState:{errors},setValue,getValues , setError , clearErrors} = useForm();
    const [copied, setCopied] = useState(false);

    const [value,setValues] = useState("");
    const [generatebutton,setGenerateButton] = useState(false);
    const [generatedamount,setGeneratedAmount] = useState(0);
    const [notes,setNotes] = useState("");
    const [buttonsendclinic,setButtonSendClinic] = useState(false);

    const router = useRouter();


    useEffect(() => {
        fetchPackageQueryDetails();
    }, [id]);


    const fetchPackageQueryDetails = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/get-patient-queries-details/${id}`, {
            method: "Get",
            headers: await adminHeaders()
        });
        if (res.ok) {
            const result = await res.json();
            setQueryDetails(result.data);
        }
    }



    const finalPrice = async(data)=>{   
            debugger;
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
            }
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

          const { paymentLink } = await res.json();

          console.log(paymentLink);
          setValues(paymentLink);
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


      const totalPlatformFee = paymentDetails.reduce((sum, item) => {
        const fee = Number(item.platformfee);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);


      const totalVendorFee = paymentDetails.reduce((sum, item) => {
        const fee = Number(item.vendorfee);
        return sum + (isNaN(fee) ? 0 : fee);
      }, 0);

       const totalGeneratedAmount = paymentDetails.reduce((sum, item) => {
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
          }

          setButtonSendClinic(false);
      }


        const statusLabel = (status) => {
        const base =
          "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border";
      
        switch (status) {
          case PatientQueryStatus.PENDING:
            return (
              <span
                className={`${base} 
                bg-yellow-50 text-yellow-700 border-yellow-200
                dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Awaiting Dispatch
              </span>
            );
      
          case PatientQueryStatus.ASSIGNED:
            return (
              <span
                className={`${base} 
                bg-blue-50 text-blue-700 border-blue-200
                dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12h14M12 5l7 7-7 7"
                  />
                </svg>
                Forwarded to Clinic
              </span>
            );
      
          case PatientQueryStatus.CLOSEDBYCLINIC:
            return (
              <span
                className={`${base} 
                bg-green-50 text-green-700 border-green-200
                dark:bg-green-900/30 dark:text-green-300 dark:border-green-700`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Closed by Clinic
              </span>
            );
      
          case PatientQueryStatus.CLOSEDBYCORDINATOR:
            return (
              <span
                className={`${base} 
                bg-emerald-50 text-emerald-700 border-emerald-200
                dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Closed by Coordinator
              </span>
            );
      
          default:
            return (
              <span className={`${base} bg-gray-50 text-gray-600 border-gray-200`}>
                —
              </span>
            );
        }
      };
   

    return (<>

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


          {(PatientQueryStatus.PENDING === querydetails.status && querydetails.clinicId !== null) &&    (<>

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
                {statusLabel(querydetails.status)}
          </div>



        </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ClinicDetails querydetails={querydetails} onData={()=> fetchPackageQueryDetails()} />
              <DoctorDetails querydetails={querydetails}  id={querydetails.clinic?.uuid} onData={()=> fetchPackageQueryDetails()}/>
              <PackageDetails querydetails={querydetails}  id={querydetails.clinic?.uuid} onData={()=> fetchPackageQueryDetails()} />
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
      </ComponentCard>

            <ComponentCard className="mt-2">
                <OtherInformation id={id}/>
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

    {/* Actions */}
    <div className="mt-8 flex justify-end">
        {querydetails?.finalPrice?.trim() ?(
                <></>
        ) :(
            <>
                
             
                   {querydetails.clinic && Number(querydetails.clinic.commission) > 0 ? (

                       <button
                    type="submit"
                    className="h-12 px-10 bg-gradient-to-r from-indigo-500 to-purple-500
                   hover:from-indigo-600 hover:to-purple-600
                   text-white font-semibold rounded-lg shadow-lg
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Submit
                 </button>
        ):(
          <p className="p-5 border border-red-500 rounded-2xl text-red-400">Please select clinic or commission to submit final deal price</p>
        )}

            
            </>
        )}
     
       
      
    </div>

  </form>
</div>


<div className="relative w-full p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">

   

    {/* {querydetails?.packages && (
       <div className="absolute inset-0 z-20 bg-white/20 dark:bg-gray-900/20 rounded-2xl flex items-center justify-center" style={{ backdropFilter: "blur(2px)" }}>
          <div className="px-4 py-3 bg-yellow-50/90 border border-yellow-300 text-yellow-800 rounded-lg text-sm font-medium shadow">
           Accessible after package confirmation.
          </div>
        </div>
    )} */}


 
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
        ):(
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
                    <td className="px-1 py-1 max-w-[150px] overflow-hidden">
                      

                      {item.status === 1 ? (
                        <span className="px-2 py-1 text-sm font-semibold rounded-full bg-red-400 text-black-800">
                          Expired
                        </span>
                      ):(
                          <a
                        className="text-blue-600 underline truncate block text-sm"
                        target="_blank"
                        href={item.generatedlink}
                        title={item.generatedlink} // Shows full link on hover
                      >
                        {item.generatedlink}
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

                  </tr>
                ))}
                <tr>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                 <td className="px-6 py-4">Total {brazilianCurrency(totalGeneratedAmount)}</td>
                  
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4">Total {brazilianCurrency(totalPlatformFee)}</td>
                  <td className="px-6 py-4">Total {brazilianCurrency(totalVendorFee)}</td>
                  <td className="px-6 py-4"></td>
                  
                </tr>


              </tbody>
            </table>
          </div>


        </div>

</ComponentCard>













    </>);
}