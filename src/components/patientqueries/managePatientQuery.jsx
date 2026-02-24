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
import { PatientQueryStatus } from "../../lib/enums/patientQueryStatus";
import { toast } from "react-toastify";

export function ManagePatientQueries() {
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [queryid,setQueryid] = useState("");

  const [rolename,setRoleName] = useState("");

  const [cordinators,setCordinators] = useState([]);
 const [selectedCoordinator, setSelectedCoordinator] = useState({});





  const fetchCordinator = async () => {
    debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/get-all-cordinator`, {
      method: "Get",
      headers: await adminHeaders(),
    });
    if (res.ok) {
      const result = await res.json();
      setCordinators(result.data);

    }
  }


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
 fetchCordinator();


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
        return <span className="text-blue-600">Clinic Assigned</span>;
      case PatientQueryStatus.COMPLETED:
        return <span className="text-green-600">Closed</span>;
      default:
        return "—";
    }
  };

  const onView= async(data)=>{
    setQueryid(data);
  }


  const onChangeofCordianator = async(cordinatorid,patientqueryid)=>{

    

    debugger;
    let payload ={
        cordinatorid : cordinatorid,
        patientqueryid:patientqueryid
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/assign-cordinator`,{
      method :"Put",
      headers : await adminHeaders(),
      body : JSON.stringify(payload)
    });
    if(res.ok){
       const result = await res.json();
        fetchQueries();


       toast.success("Cordinator changed and sent notification successfully",{
        position : "bottom-right",
        autoClose : 3000
       });


    }
  }


  useEffect(() => {
  const initialState = {};
  queries.forEach((q) => {
    debugger;
    initialState[q.id] = q.id || "";
  });
  setSelectedCoordinator(initialState);
}, [queries]);







  return (
<>
<div className={`overflow-hidden rounded-xl border border-gray-200 bg-white ${queryid !== "" ? "hidden" : ""}`}>
  <div className="w-full overflow-x-auto">
    <Table className="min-w-[1300px] table-auto border-collapse">
      <TableHeader className="border-b">
        <TableRow>
          <TableCell isHeader className="px-5 py-3">Requested No.</TableCell>

          <TableCell isHeader className="px-5 py-3">Patient</TableCell>
          
          {/* <TableCell isHeader className="px-5 py-3">Medical Reports Value</TableCell> */}
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

                    {rolename === "SuperAdmin" && (<>

                      
                    
                    <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm w-fit flex items-start gap-3">
  
  <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
    👤
  </div>

  <div>
    <div className="text-sm font-semibold text-gray-700">
      Coordinator
    </div>
    <div className="text-sm text-gray-900">
      {q?.User?.firstname} {q?.User?.lastname}
    </div>
    <div className="text-xs text-gray-500">
      {q?.User?.email}
    </div>
  </div>

</div>


                      {(q.clinicId === null || q.cordinatorid === 1) ? (
                        <div className="w-72 mt-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm">

                          <label className="block mb-2 text-sm font-semibold text-gray-700">
                            Change Coordinator
                          </label>

                          <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               focus:border-blue-500 bg-white"
                            value={selectedCoordinator[q.id] || ""}
                            onChange={(e) => {
                              const newValue = e.target.value;

                              if (!window.confirm("Are you sure you want to change the coordinator?")) {
                                return;
                              }

                              setSelectedCoordinator((prev) => ({
                                ...prev,
                                [q.id]: newValue,
                              }));

                              onChangeofCordianator(newValue, q.id);
                            }}
                          >
                            <option value="">Change Coordinator</option>

                            {cordinators.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item.firstname} {item.lastname} ({item.email})
                              </option>
                            ))}
                          </select>

                          {/* CSS Only Expand / Collapse */}
                          <div className="mt-4 text-xs text-gray-500">

                            <input type="checkbox" id={`toggle-${q.id}`} className="peer hidden" />

                            <p className="line-clamp-3 peer-checked:line-clamp-none transition-all duration-300">
                              This query was submitted through the home page without selecting a specific clinic.
                              Until a clinic is assigned, the admin can change the assigned coordinator.
                              However, if the coordinator is changed in the middle of an ongoing conversation,
                              the previous communication between the patient and the coordinator cannot be recovered,
                              as these interactions happen offline.
                              Therefore, please confirm whether coordinator reassignment should be allowed
                              once the conversation has started.
                            </p>

                            <label
                              htmlFor={`toggle-${q.id}`}
                              className="mt-2 inline-block text-blue-600 cursor-pointer font-medium peer-checked:hidden"
                            >
                              See more
                            </label>

                            <label
                              htmlFor={`toggle-${q.id}`}
                              className="mt-2 hidden text-blue-600 cursor-pointer font-medium peer-checked:inline-block"
                            >
                              See less
                            </label>

                          </div>
                        </div>

                      ) : (<></>)}



                    </>)}


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

           

            {/* <TableCell className="px-5 py-4 text-sm text-gray-600">
              <div>{q.medicalReportsValue || "--"}</div>
            </TableCell> */}

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
