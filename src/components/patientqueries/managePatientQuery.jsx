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
      setQueries(data.data || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (err) {
      console.error("Failed to fetch patient queries", err);
    }
  };

  useEffect(() => {
    fetchQueries(currentPage);
  }, [currentPage]);

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
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1300px]">
          <Table>
            <TableHeader className="border-b">
              <TableRow>
                <TableCell isHeader className="px-5 py-3">Requested No.</TableCell>
                <TableCell isHeader className="px-5 py-3">Patient</TableCell>
                <TableCell isHeader className="px-5 py-3">Contact</TableCell>
                <TableCell isHeader className="px-5 py-3">Medical Reports Value</TableCell>
                <TableCell isHeader className="px-5 py-3">Treatment</TableCell>
                <TableCell isHeader className="px-5 py-3">Waht Matter Most</TableCell>
                <TableCell isHeader className="px-5 py-3">Procedure Time</TableCell>

              
                
                <TableCell isHeader className="px-5 py-3 text-center">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 text-right">Created</TableCell>
                <TableCell isHeader className="px-5 py-3 text-center w-20">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y">
              {queries.map((q) => (
                <TableRow key={q.id}>
                  {/* Patient */}

                  <TableCell className="px-5 py-4 font-medium">
                    {q.querycode}
                  </TableCell>
                  <TableCell className="px-5 py-4 font-medium">
                    {q.patientName}
                  </TableCell>

                  

                 
                <TableCell className="px-5 py-4 text-sm text-gray-600">
                    {q.phoneNumber || q.email ? (
                      <>
                        {q.phoneNumber && <div>{q.phoneNumber}</div>}
                        {q.email && <div className="text-xs">{q.email}</div>}
                      </>
                    ) : (
                      <div className="text-red-500 text-sm">Not Verified</div>
                    )}
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

             
                 

                
                  <TableCell className="px-5 py-4 text-center">
                    {statusLabel(q.status)}
                  </TableCell>

                 
                  <TableCell className="px-5 py-4 text-right text-sm">
                    {formatBrazilDate(q.createdAt)}
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-5 py-4 text-center cursor-pointer">
                    <a  onClick={()=> onView(q.id)}>
                      <EyeIcon />
                    </a>
                    
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
