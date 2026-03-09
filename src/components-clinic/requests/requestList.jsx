
"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { EyeIcon } from "lucide-react";
import { formatBrazilDate } from "@/lib/formatDate";
import { brazilianCurrency } from "../../lib/brazilianCurrency";
import { PatientQueryStatus } from "../../lib/enums/patientQueryStatus";
import { clinicHeaders } from "../utils/clinicHeaders";
import { useRouter } from "next/navigation";
import  PatientQueryStatusBadge  from "../../reusable/StatusBadge";
import { PackageQueryFinalPriceStatus } from "@/lib/enums/patientQueryFinalPriceStatus";



export function RequestList() {
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [queryid,setQueryid] = useState("");

  const [rolename,setRoleName] = useState("");

  const router = useRouter();


  const itemsPerPage = 10;

  const fetchQueries = async (page) => {
    debugger;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/clinic-request/00?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: await clinicHeaders(),
        }
      );

      const data = await res.json();
      console.log("aptient query",data.data);
      setQueries(data.data || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (err) {
      console.error("Failed to fetch patient queries", err);
    }
  };

  useEffect(() => {
    fetchQueries(currentPage);
    fetchRoles();
  }, [currentPage]);


  const fetchRoles = async()=>{
    const res = await fetch(`/api/auth/get-admin-role`,{
      method : "Get"
    });
    if(res.ok){
      const result = await res.json();
       
      setRoleName(result.adminrole);
    }
  }

const statusLabel = (status) => {

  const baseStyle =
    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold";

  switch (status) {

    // 🟡 Pending
    case PatientQueryStatus.PENDING:
      return (
        <span className={`${baseStyle} bg-yellow-100 text-yellow-700`}>
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
          Pending
        </span>
      );

    // 🔵 Forwarded
    case PatientQueryStatus.ASSIGNED:
      return (
        <span className={`${baseStyle} bg-blue-100 text-blue-700`}>
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
          Forwarded
        </span>
      );

    // 🟢 Accepted
    case PatientQueryStatus.ACCEPT:
      return (
        <span className={`${baseStyle} bg-green-100 text-green-700`}>
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
              d="M5 13l4 4L19 7"
            />
          </svg>
          Accepted
        </span>
      );

    // 🔴 Rejected
    case PatientQueryStatus.REJECT:
      return (
        <span className={`${baseStyle} bg-red-100 text-red-700`}>
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Rejected
        </span>
      );

    default:
      return <span className="text-gray-400 text-sm">—</span>;
  }
};



  



  const onView= async(data)=>{
    router.push(`/partner/requests/${data}`);
  }









  return (
<>
<div className={`overflow-hidden rounded-xl border theme-border bg-white ${queryid !== "" ? "hidden" : ""}`}>
  <div className="w-full overflow-x-auto">
   
   <Table className="min-w-[1300px] table-auto border-collapse">

  <TableHeader className="border-b bg-gray-50">
    <TableRow className="text-left">
      <TableCell isHeader className="px-5 py-3 font-semibold">Requested No.</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold">Patient</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold">Medical Reports</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold">Treatment</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold">What Matters Most</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold">Procedure Time</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold text-center">Status</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold text-right">Created</TableCell>
      <TableCell isHeader className="px-5 py-3 text-center w-20">Final Price</TableCell>
      <TableCell isHeader className="px-5 py-3 font-semibold text-center w-20">Action</TableCell>

    </TableRow>
  </TableHeader>


  <TableBody className="divide-y">
    {queries.map((q) => (
      <TableRow key={q.id} className="align-middle">
      
        <TableCell className="px-5 py-4 font-medium">
            
                {q.querycode}
             <div className="mt-1 text-xs text-gray-500">
                        <span className="font-semibold"><b>Coordinator:</b></span> {q?.clinic.clinicUser.firstname} {q?.clinic.clinicUser.lastname} <br />
                        <span>{q.clinic.clinicUser.email}</span>
            </div>
        </TableCell>

      
        <TableCell className="px-5 py-4">
          <div className="font-medium">{q.patientName}</div>
        </TableCell>

       
        <TableCell className="px-5 py-4 text-sm text-gray-600">
          {q.medicalReportsValue || "--"}
        </TableCell>

      
        <TableCell className="px-5 py-4 text-sm text-gray-600">
          {q.treatmentName || "--"}
        </TableCell>

       
        <TableCell className="px-5 py-4 text-sm text-gray-600">
          {q.whatMatterMostName || "--"}
        </TableCell>

      
        <TableCell className="px-5 py-4 text-sm text-gray-600">
          {q.procedureTimeValue || "--"}
        </TableCell>

      
        <TableCell className="px-5 py-4 text-center">
          <PatientQueryStatusBadge status={q.status} />
        </TableCell>

        
        <TableCell className="px-5 py-4 text-right text-sm text-gray-600">
          {formatBrazilDate(q.createdAt)}
        </TableCell>


        <TableCell className="px-5 py-4 text-center">
          <span className="inline-flex items-center">

            {q.PatientQueryFinalPrice?.length > 0 ? (
              <>
                {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.PENDING && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20">
                    🟡 New Price Suggested : {brazilianCurrency(q.PatientQueryFinalPrice?.[0]?.finalPrice)}
                  </span>
                )}

                {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.ACCEPT && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
                    🟢 Accepted : {brazilianCurrency(q.PatientQueryFinalPrice?.[0]?.finalPrice)}
                  </span>
                )}

                {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.REJECT && (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20">
                    🔴 Rejected : {brazilianCurrency(q.PatientQueryFinalPrice?.[0]?.finalPrice)}
                  </span>
                )}
              </>
            ) : (
              <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-400/20">
                ⚪ No Suggestion
              </span>
            )}

          </span>
        </TableCell>
        
        <TableCell className="px-5 py-4 text-center cursor-pointer">
          <a onClick={() => onView(q.id)} className="inline-flex items-center gap-2">
            <EyeIcon />

            {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.PENDING && (<>
              /
              <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-600/20">
                ⚠ Action Required
              </span>
            </>)}
          </a>
        </TableCell>


      </TableRow>
    ))}
  </TableBody>
</Table>

  </div>

  {/* Pagination */}
  <div className="flex justify-end items-center gap-3 px-5 py-3 border-t">
    <button
      onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
      disabled={currentPage === 1}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Prev
    </button>

    <span className="text-sm text-gray-500">
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="px-3 py-1 border rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</div>




            
        

  </>);
}
