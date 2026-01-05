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
      <div className="max-w-md w-full border border-gray-200 rounded-xl shadow-sm bg-white p-6">
        
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {accountDetails.name}
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          <p className="flex">
            <span className="font-medium w-24">Address:</span>
            <span>
              {accountDetails.address},{" "}
              {accountDetails.city?.name},{" "}
              {accountDetails.state},{" "}
              {accountDetails.country?.name}
            </span>
          </p>

          <p className="flex">
            <span className="font-medium w-24">Phone:</span>
            <span>{accountDetails.phone}</span>
          </p>

          <p className="flex">
            <span className="font-medium w-24">Email:</span>
            <span>{accountDetails.email}</span>
          </p>

          <p className="flex">
            <span className="font-medium w-24">Registered:</span>
            <span>
              {formatBrazilDate(accountDetails.createdAt)}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          {accountDetails.phone && (
            <a href={`tel:${accountDetails.phone}`}>
              <img width="30" src="/images/brand/phone.svg" alt="Phone" />
            </a>
          )}

          {accountDetails.phone && (
            <a
              href={`https://wa.me/${accountDetails.phone.replace(/\D/g, "")}`}
              target="_blank"
            >
              <img width="30" src="/images/brand/whatsapp.svg" alt="WhatsApp" />
            </a>
          )}

          {accountDetails.websiteurl && (
            <a href={accountDetails.websiteurl} target="_blank">
              <img width="30" src="/images/brand/telegram.svg" alt="Website" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
