"use client"
import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";



export function StripeMainAccountDetails({rel}){

const [data, setData] = useState({});

    useEffect(()=>{
        fetchAccountDetails();
    },[rel]);



    const fetchAccountDetails= async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-payout/get-stripe-account-details/acct_1SiT9nGqeY1qbIHj`,{
            method : "Get",
            headers : await adminHeaders(),
        });

        if(res.ok){
            const result = await res.json();
            setData(result);

        }
    }








    return(<>

    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
  {/* Header */}
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-semibold text-gray-900">
      Source Account Details
    </h2>

   
  </div>

  {/* Horizontal Layout */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    {/* LEFT: Profile */}
    <div className="flex flex-col justify-center">
      <p className="text-lg font-medium text-gray-900">Admin</p>
      {data.email && (
        <p className="text-sm text-gray-500">{data.email}</p>
      )}
      <p className="text-sm text-gray-500">
        {data.businessType ?? "N/A"} • {data.country ?? "N/A"}
      </p>
      <p className="text-xs text-gray-400 mt-1 truncate">{data.accountId}</p>
    </div>

    {/* MIDDLE: Balance */}
    <div className="grid grid-cols-2 gap-4">
      <div className="rounded-xl border border-green-200 bg-green-50 p-4">
        <p className="text-sm text-green-700">Available</p>
        <p className="text-2xl font-semibold text-green-900">
          ${(data.availableBalance?.[0]?.amount ?? 0) / 100}
        </p>
      </div>

      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm text-blue-700">Pending</p>
        <p className="text-2xl font-semibold text-blue-900">
          ${(data.pendingBalance?.[0]?.amount ?? 0) / 100}
        </p>
      </div>
    </div>

    
   

  </div>
</div>

    
    
    </>);
}