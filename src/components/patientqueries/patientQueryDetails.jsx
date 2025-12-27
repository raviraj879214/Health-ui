"use client"
import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";
import ComponentCard from "../common/ComponentCard";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import Label from "../form/Label";
import { formatBrazilDate } from "@/lib/formatDate";
import { useForm } from "react-hook-form";
import { Clipboard, Check } from "lucide-react"; // npm i lucide-react







export function PatientQueryDetails({ id }) {

    const [querydetails,setQueryDetails] = useState({});
    const {register,handleSubmit,formState:{errors},setValue,getValues , setError , clearErrors} = useForm();
    const [copied, setCopied] = useState(false);

    const [value,setValues] = useState("");
    const [generatebutton,setGenerateButton] = useState(false);
    const [generatedamount,setGeneratedAmount] = useState(0);
    const [notes,setNotes] = useState("");


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
              stripeAccountId : "acct_1ShSjtGSgNQAmZzB",
              patientId : "1",
              packageprice:querydetails.package.discountedprice,
              finalprice:querydetails.finalPrice,
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





    return (<>

        <ComponentCard>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Clinic Details */}
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-md">
    <h2 className="text-2xl font-bold mb-4">Clinic Details</h2>

    <p className="text-lg font-semibold text-gray-800 mb-2">{querydetails.clinic?.name}</p>
    
    <p className="text-gray-600 mb-1">
      <span className="font-semibold">Address:</span> {querydetails.clinic?.address}, {querydetails.clinic?.state}
    </p>

    <p className="text-gray-600 mb-1">
      <span className="font-semibold">Phone:</span> {querydetails.clinic?.phone}
    </p>

    <p className="text-gray-600 mb-1">
      <span className="font-semibold">Email:</span> {querydetails.clinic?.email}
    </p>
    <p className="text-gray-600 mb-1">
      <span className="font-semibold">Commission : </span> 
      <span className="text-xs px-2 py-1 rounded border border-orange-400 text-orange-600 ml-1">
                        {querydetails.clinic?.commission} %
      </span>
    </p>

    <p className="text-gray-600 mb-1">
      <span className="font-semibold">Website:</span> 
      <a href={querydetails.clinic?.websiteurl} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
        {querydetails.clinic?.websiteurl}
      </a>
    </p>
  </div>

  {/* Package Details */}
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 max-w-md">
    <h2 className="text-2xl font-bold mb-4">Package Details</h2>

    <p className="text-lg font-semibold text-gray-800 mb-2">{querydetails.package?.title}</p>
    
    <p className="text-gray-600 mb-1">
      <span className="font-semibold">Actual Price:</span> {brazilianCurrency(querydetails.package?.actualprice)}
    </p>
    
    <p className="text-gray-600 mb-1">
      <span className="font-semibold">Discounted Price:</span> {brazilianCurrency(querydetails.package?.discountedprice)}
    </p>
  </div>
            </div>
        </ComponentCard>


        <ComponentCard className="p-6 space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                <div>
                    <Label>Name</Label>
                    <div className="text-gray-700">{querydetails?.patientName}</div>
                </div>

                <div>
                    <Label>Email</Label>
                    <div className="text-gray-700">{querydetails?.email}</div>
                </div>

                <div>
                    <Label>Phone Number</Label>
                    <div className="text-gray-700">{querydetails?.phoneNumber}</div>
                </div>

                <div>
                    <Label>WhatsApp Number</Label>
                    <div className="text-gray-700 flex align-items-baseline gap-1">{querydetails?.whatsappNumber}

                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div>
                    <Label>Telegram Username</Label>
                    <div className="text-gray-700 flex align-items-baseline gap-1">{querydetails?.telegramUsername}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </div>
                </div>

                <div>
                    <Label>Subject</Label>
                    <div className="text-gray-700">{querydetails?.subject}</div>
                </div>

                <div>
                    <Label>Created At</Label>
                    <div className="text-gray-700">{formatBrazilDate(querydetails?.createdAt)}</div>
                </div>
            </div>


            <div>
                <Label>Message</Label>
                <div className="mt-2 border border-gray-300 rounded-md p-4 max-h-64 overflow-y-auto text-gray-700 whitespace-pre-line">
                    {querydetails?.message}
                </div>
            </div>
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
          {brazilianCurrency(querydetails.package?.discountedprice)}
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
    ₹ {querydetails.finalPrice}
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
      <span className="mr-2 text-gray-500 dark:text-gray-400">₹</span>

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
            
            </>
        )}
     
       
      
    </div>

  </form>
</div>





        <div className="w-full p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
    Generate Payment Link 
<p className="text-sm text-gray-600">
  The amount will not be credited to the destination account immediately. You need to initiate the transfer manually.
</p>


  </h2>

  <div className="flex flex-col md:flex-row gap-4 md:gap-3 items-start">
    {/* Amount Input */}
    <div className="flex flex-col gap-1 flex-1">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Amount</label>
      <div className="flex items-center border border-gray-300 rounded-lg h-12 px-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <img src="../images/stripe.png" alt="Stripe" className="h-6 w-auto mr-2" />
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
      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Source Account</label>
      <div className="flex items-center border border-gray-300 rounded-lg h-16 px-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <span className="text-gray-800 dark:text-white/90">Admin Account (hidden)</span>
      </div>
    </div>

    {/* Destination Account */}
    <div className="flex flex-col gap-1 flex-1">
      <label className="text-sm font-medium text-gray-600 dark:text-gray-300">Destination Account</label>
      <div className="flex items-center border border-gray-300 rounded-lg h-16 px-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <span className="text-gray-800 dark:text-white/90">{querydetails.clinic?.name}</span>
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
      <span className="ml-2 text-sm text-green-600 font-medium">Copied!</span>
    )}
  </div>

  {/* Text Area */}
  <div className="mt-4">
    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">
       <b>Message for Payment Page </b> (optional)
    </label>
    <textarea
      value={notes}
      maxLength={200}
      onChange={(e) => setNotes(e.target.value)}
      placeholder="Add a note or message for the patient (200 character)..."
      className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90 dark:placeholder-gray-500"
    />
  </div>

  {/* Generate Button */}
  <button
    onClick={() => generatelink()}
    disabled={generatebutton}
    className="mt-4 h-12 px-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
  >
    {generatebutton ? (
      <svg
        aria-hidden="true"
        className="w-6 h-6 text-white animate-spin mr-2"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
      </svg>
    ) : (
      "Generate Link"
    )}
  </button>

  
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
                  <tr className="bg-neutral-primary border-b border-default">
                    <th scope="row" className="px-6 py-4 font-medium text-heading whitespace-nowrap">
                      {formatBrazilDate(item.createdAt)}
                    </th>
                    <td className="px-6 py-4">
                      {brazilianCurrency(item.packageprice)}
                    </td>
                    <td className="px-6 py-4">
                      {brazilianCurrency(item.finalprice)}
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
                        40%
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