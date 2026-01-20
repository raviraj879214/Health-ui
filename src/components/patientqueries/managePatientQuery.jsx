"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";


import { EyeIcon } from "lucide-react";
import { adminHeaders } from "../utils/adminHeader";
import { formatBrazilDate } from "@/lib/formatDate";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import {PatientQueryDetails} from "../patientqueries/patientQueryDetails";

export function ManagePatientQueries() {
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [queryid,setQueryid] = useState("");

  const [rolename,setRoleName] = useState("");


  const itemsPerPage = 10;

  const fetchQueries = async (page) => {
    debugger;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/get-patient-queries?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: await adminHeaders(),
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
      case 0:
        return <span className="text-yellow-600">Pending</span>;
      case 1:
        return <span className="text-blue-600">In Progress</span>;
      case 2:
        return <span className="text-green-600">Closed</span>;
      default:
        return "—";
    }
  };



  const onView= async(data)=>{
    setQueryid(data);
  }









  return (
<>
<div className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${queryid !== "" ? "hidden" : ""}`}>
  <div className="w-full overflow-x-auto">
    <Table className="min-w-[1300px] table-auto border-collapse">
      <TableHeader className="border-b">
        <TableRow>
          <TableCell isHeader className="px-5 py-3">Requested No.</TableCell>
          <TableCell isHeader className="px-5 py-3">Patient</TableCell>
          
          <TableCell isHeader className="px-5 py-3">Medical Reports Value</TableCell>
          <TableCell isHeader className="px-5 py-3">Treatment</TableCell>
          <TableCell isHeader className="px-5 py-3">What Matter Most</TableCell>
          <TableCell isHeader className="px-5 py-3">Procedure Time</TableCell>
          <TableCell isHeader className="px-5 py-3 text-center">Status</TableCell>
          <TableCell isHeader className="px-5 py-3 text-right">Created</TableCell>
          <TableCell isHeader className="px-5 py-3 text-center w-20">Action</TableCell>
        </TableRow>
      </TableHeader>

      <TableBody className="divide-y">
              {queries.map((q) => (
                <TableRow key={q.id}>
                  <TableCell className="px-5 py-4 font-medium">
                    {q.querycode}
                    {rolename === "SuperAdmin" && (
                      <div className="mt-1 text-xs text-gray-500">
                        <span className="font-semibold"><b>Coordinator:</b></span> {q?.User?.firstname} {q?.User?.lastname} <br />
                        <span>{q.User.email}</span>
                      </div>
                    )}
                  </TableCell>


            

            <TableCell className="px-5 py-4 font-medium">
              {q.patientName}

               
              <p className="text-sm">
                    {q.phoneNumber || q.email ? (
                <>
                  {q.phoneNumber !== "0" && <div>{q.phoneNumber}</div>}
                  {q.email && <div className="text-xs">{q.email}</div>}
                </>
              ) : (
                <div className="text-red-500 text-sm">Not Verified</div>
              )}

              </p>
            </TableCell>

           

            <TableCell className="px-5 py-4 text-sm text-gray-600">
              <div>{q.medicalReportsValue || "--"}</div>
            </TableCell>

            <TableCell className="px-5 py-4 text-sm text-gray-600">
              <div>{q.treatmentName || "--"}</div>
            </TableCell>

            <TableCell className="px-5 py-4 text-sm text-gray-600">
              <div>{q.whatMatterMostName || "--"}</div>
            </TableCell>

            <TableCell className="px-5 py-4 text-sm text-gray-600">
              <div>{q.procedureTimeValue || "--"}</div>
            </TableCell>

            <TableCell className="px-5 py-4 text-center">{statusLabel(q.status)}</TableCell>

            <TableCell className="px-5 py-4 text-right text-sm">{formatBrazilDate(q.createdAt)}</TableCell>

            <TableCell className="px-5 py-4 text-center cursor-pointer">
              <a onClick={() => onView(q.id)}>
                <EyeIcon />
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




              {queryid !== "" && (
                <PatientQueryDetails id={queryid}></PatientQueryDetails>
              )}
        

  </>);
}
