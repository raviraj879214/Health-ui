"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";




export function VerifyStripe({url}){
    const [loading,setLoading] = useState(false);
    const [linkstatus,setLinkStatus] = useState(0);
    const router= useRouter();





    useEffect(()=>{
        verifyStripeUrl(url);
    },[url]);

    const verifyStripeUrl = async(url)=>{
        debugger;
        setLoading(true);
        
        const  res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/stripe-url-verification`,{
            method : "Post",
            headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            "url" : url
           }),
        });

        if(res.ok){
            const result= await res.json();

            if(result.status === -1){
                setLinkStatus(-1);
            }
            else if(result.status === 0){
                  
                   router.push(`https://buy.stripe.com/${url}`);
            }
            else if(result.status === 1){
                setLinkStatus(1);
            }
        }
    }



    return(<>
           
     {linkstatus === -1 && (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl shadow-md max-w-md text-center">
      <div className="text-3xl mb-2">❌</div>
      <h2 className="text-xl font-semibold mb-2">Invalid Payment Link</h2>
      <p className="text-sm text-red-600">
        The payment link you are trying to access is not valid or may have expired.
      </p>
    </div>
  </div>
)}

{linkstatus === 1 && (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-xl shadow-md max-w-md text-center">
      <div className="text-3xl mb-2">✅</div>
      <h2 className="text-xl font-semibold mb-2">Payment Already Completed</h2>
      <p className="text-sm text-green-600">
        This payment link has already been used successfully.
      </p>
    </div>
  </div>
)}

{linkstatus === 0 && (<></>)}


    </>);


}