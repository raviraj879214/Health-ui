"use client";

import { adminHeaders } from "@/components/utils/adminHeader";
import { formatBrazilDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";
import {ClinicCommssion} from "./clinicCommission";
import { FaPen } from "react-icons/fa";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";

export function ClinicHeroSection({ id }) {
  const [accountDetails, setAccountDetails] = useState(null);

  const [commissionmodal,steCommissionModal] = useState(false);
  const [commission,setCommission] = useState(0);

  useEffect(() => {
    if (id) fetchClinicDetails();
  }, [id]);

  const fetchClinicDetails = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-details/${id}`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );

      if (res.ok) {
        const result = await res.json();
        setAccountDetails(result?.data);
      }
    } catch (error) {
      console.error("Error fetching clinic details", error);
    }
  };


const onSubmitcommssion =async ()=>{

  debugger;

    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/set-commission`,{
      method : "Put",
      headers  : await adminHeaders(),
      body: JSON.stringify({
          "id" : id,
          "commission" : commission
      })
    });
    if(res.ok){
      const result = await res.json();

      setCommission(0);
      steCommissionModal(false);
      setAccountDetails(prev => ({
        ...prev,
        commission: result.data.commission,
      }));


    }
  }




  if (!accountDetails) return null;

  return (
    <div className="p-1 flex justify-center">
      
      <div className=" w-full border border-gray-200 rounded-xl shadow-sm bg-white p-6">
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {accountDetails.name}
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex">
            <span className="font-medium">Address: </span>
            <span>
              <b>#
              {accountDetails.cep},{" "}
              {accountDetails.street},{" "}
              {accountDetails.complement},{" "}
              {accountDetails.neighborhood}
              {accountDetails.city}
              {accountDetails.state}
              </b>
            </span>
          </p>


        </div>
        
         Clinic Managed By : <br></br>
         {/* {JSON.stringify({accountDetails})} */}

          Name : {accountDetails.clinicUser?.firstname} {accountDetails.clinicUser?.lastname}<br></br>
          Email : {accountDetails.clinicUser.email}

        

         <div className="flex items-center gap-2 text-sm font-medium mt-3">
                    <span className="text-gray-600">Clinic Commission:</span>
        
                   

                    {commissionmodal === true ? (<>
                          
                        <div className="flex items-center gap-3">
                            <input
                             onChange={(e)=> setCommission(e.target.value)}
                              type="text"
                              placeholder="Enter commission %"
                              className="w-32 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"/>

                            <button
                             disabled={commission > 0 ?  false : true}
                             onClick={()=> onSubmitcommssion()}
                              type="button"
                              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
                              aria-label="Save commission"
                            >
                              Save
                            </button>
                        </div>

                    </>):(<>
                    
                    <span className="text-green-500 font-semibold">{accountDetails.commission || 0} %</span>


                    <button
                       onClick={()=> steCommissionModal(true) }
                        type="button"
                        className="text-indigo-500 hover:text-indigo-700 transition"
                        aria-label="Edit commission"
                    >
                        <FaPen className="w-4 h-3" />
                    </button>
                    </>)}
                </div>




        <div className="flex items-center gap-4 mt-4 pt-3 border-t">
        <a href={`tel:${accountDetails?.clinicUser?.phone}`} title="Call" className="hover:opacity-80">
          <img width="26" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/phone.svg`} alt="Call" />
        </a>

          {accountDetails?.clinicUser?.whatsappNumber && (
          <a
            href={`https://wa.me/${accountDetails?.clinicUser?.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            className="hover:opacity-80"
          >
            <img width="26" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/whatsapp.svg`} alt="WhatsApp" />
          </a>
        )}

         {accountDetails?.clinicUser?.telegramNumber && (
          <a
            href={`https://t.me/${accountDetails?.clinicUser?.telegramNumber}`}
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
  );
}
