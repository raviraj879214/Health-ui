"use client";

import { adminHeaders } from "@/components/utils/adminHeader";
import { formatBrazilDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";

export function ClinicHeroSection({ id }) {
  const [accountDetails, setAccountDetails] = useState(null);

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
