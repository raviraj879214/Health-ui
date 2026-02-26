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

 const [open, setOpen] = useState(false);
 const [openId, setOpenId] = useState(null);





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
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border";

  switch (status) {
    case PatientQueryStatus.PENDING:
      return (
        <span
          className={`${base} 
          bg-yellow-50 text-yellow-700 border-yellow-200
          dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700`}
        >
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
          Awaiting Dispatch
        </span>
      );

    case PatientQueryStatus.ASSIGNED:
      return (
        <span
          className={`${base} 
          bg-blue-50 text-blue-700 border-blue-200
          dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700`}
        >
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
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
          Forwarded to Clinic
        </span>
      );

    case PatientQueryStatus.CLOSEDBYCLINIC:
      return (
        <span
          className={`${base} 
          bg-green-50 text-green-700 border-green-200
          dark:bg-green-900/30 dark:text-green-300 dark:border-green-700`}
        >
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Closed by Clinic
        </span>
      );

    case PatientQueryStatus.CLOSEDBYCORDINATOR:
      return (
        <span
          className={`${base} 
          bg-emerald-50 text-emerald-700 border-emerald-200
          dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700`}
        >
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Closed by Coordinator
        </span>
      );

    default:
      return (
        <span className={`${base} bg-gray-50 text-gray-600 border-gray-200`}>
          —
        </span>
      );
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
          <TableCell isHeader className="px-5 py-3">Assigned Status</TableCell>
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
                    
                <p className="m-3 cursor-pointer" onClick={() => onView(q.id)}><b>{q.querycode}</b></p>
                    {rolename === "SuperAdmin" && (<>



                      <div key={q.id} className="mt-3 p-4 bg-gray-50 border rounded-xl">
                          
                        <div className="flex items-start gap-3">

                          <div className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl shadow-sm w-fit">

                            {/* Avatar */}
                            <div className="w-12 h-12 flex items-center justify-center 
                                bg-blue-100 text-blue-600 
                                rounded-full text-lg font-semibold">
                              {q?.User?.firstname?.charAt(0)}
                            </div>

                            {/* Details */}
                            <div>
                              <div className="text-sm text-gray-500">Coordinator</div>

                              <div className="text-base font-semibold text-gray-800">
                                {q?.User?.firstname} {q?.User?.lastname}
                              </div>

                              <div className="text-sm text-gray-500">
                                {q?.User?.email}
                              </div>
                            </div>

                          </div>


                          {(q.clinicId === null || q.cordinatorid === 1) && (<>
                            <button
                              onClick={() =>
                                setOpenId(openId === q.id ? null : q.id)
                              }
                              className="ml-auto text-sm text-blue-600"
                            >
                              {openId === q.id ? "Cancel" : "Change Coordinator"}
                            </button>
                          </>)}
                        </div>


                        {openId === q.id && (
                          <div className="mt-3 border-t pt-3 text-sm">
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
                          </div>
                        )}

                      </div>





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

                  <TableCell className="px-5 py-4 text-sm">
                    {q.clinic?.name ? (
                      <div className="font-semibold text-green-600">
                        {q.clinic.name}
                      </div>
                    ) : (
                      <div className="font-semibold text-blue-600">
                       Open Inquiry
                      </div>
                    )}
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
