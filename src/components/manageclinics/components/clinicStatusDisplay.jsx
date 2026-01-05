"use client";
import { adminHeaders } from "@/components/utils/adminHeader";
import { ClinicStatus } from "@/lib/enums/ClinicStatus";
import { useEffect, useState } from "react";

export function ClinicStatusDisplay({ trigger, id }) {
  const [clinicDetails, setClinicDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchClinicDetails();
    }
  }, [id , trigger]);

  const fetchClinicDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-details/${id}`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch clinic details");
      }

      const result = await res.json();
      setClinicDetails(result.data);
    } catch (error) {
      console.error("Error fetching clinic details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-2 text-center text-gray-500">
        Loading clinic status...
      </div>
    );
  }

  if (!clinicDetails) {
    return null;
  }

  return (
<div className="p-2 row-span-2 col-start-6 flex flex-col md:flex-row justify-between items-start gap-4">
  

   
{clinicDetails.reasonText &&
 clinicDetails.status !==  ClinicStatus.PENDING &&
 clinicDetails.status !== ClinicStatus.ACTIVE && (
  <p className="flex-1 max-w-md p-2 border border-yellow-500 rounded bg-yellow-100 text-yellow-800 font-medium">
    {clinicDetails.reasonText}
  </p>
)}





  <div>
    {clinicDetails.status === ClinicStatus.PENDING && (
      <p className="p-2 border border-green-500 rounded text-center bg-green-100 text-green-800 font-medium">
        Pending
      </p>
    )}
    {clinicDetails.status === ClinicStatus.ACTIVE && (
      <p className="p-2 border border-blue-500 rounded text-center bg-blue-100 text-blue-800 font-medium">
        Active
      </p>
    )}
    {clinicDetails.status === ClinicStatus.BLOCKED && (
      <p className="p-2 border border-red-500 rounded text-center bg-red-100 text-red-800 font-medium">
        Blocked
      </p>
    )}
    {clinicDetails.status === ClinicStatus.REJECTED && (
      <p className="p-2 border border-red-500 rounded text-center bg-red-100 text-red-800 font-medium">
        Rejected
      </p>
    )}
  </div>

</div>



  );
}
