
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

    switch (status) {
      case PatientQueryStatus.PENDING:
        return <span className="text-yellow-600">Pending</span>;
      case PatientQueryStatus.ASSIGNED:
        return <span className="text-blue-600">Assigned</span>;
      case PatientQueryStatus.COMPLETED:
        return <span className="text-green-600">Closed</span>;
      default:
        return "—";
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
          {statusLabel(q.status)}
        </TableCell>

        
        <TableCell className="px-5 py-4 text-right text-sm text-gray-600">
          {formatBrazilDate(q.createdAt)}
        </TableCell>

        
        <TableCell className="px-5 py-4 text-center">
          <button
            onClick={() => onView(q.id)}
            className="inline-flex items-center justify-center text-gray-600 hover:text-primary"
          >
            <EyeIcon />
          </button>
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
