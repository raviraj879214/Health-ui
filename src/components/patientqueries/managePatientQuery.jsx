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
import { PatientQueryDetails } from "../patientqueries/patientQueryDetails";
import { PatientQueryStatus } from "../../lib/enums/patientQueryStatus";
import { toast } from "react-toastify";
import PatientQueryStatusBadge from "@/reusable/StatusBadge";
import { patientQueryPaymentStatus } from "@/lib/enums/patientQueryPaymentStatus";
import { PackageQueryFinalPriceStatus } from "@/lib/enums/patientQueryFinalPriceStatus";
import { getSocket } from "@/hooks/socket";
import { useRouter } from "next/navigation";

export function ManagePatientQueries() {
  const [queries, setQueries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [queryid, setQueryid] = useState("");

  const [rolename, setRoleName] = useState("");

  const [cordinators, setCordinators] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState({});

  const [open, setOpen] = useState(false);
  const [openId, setOpenId] = useState(null);

  const router= useRouter();





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
      console.log("aptient query", data.data);
      setQueries(data.data || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (err) {
      console.error("Failed to fetch patient queries", err);
    }
  };

  // useEffect(() => {
  //   fetchQueries(currentPage);
  //   fetchRoles();
  //    fetchCordinator();

  // }, [currentPage]);


  useEffect(() => {
    fetchQueries(currentPage);
    fetchRoles();
    fetchCordinator();


    const socket = getSocket();


    socket.on("patientRequestAdmin", (data) => {
      
      fetchQueries(currentPage);
      fetchRoles();
      fetchCordinator();

    });
    return () => {
      socket.off("patientRequestAdmin");
    };


  }, [currentPage]);










  const fetchRoles = async () => {
    const res = await fetch(`/api/auth/get-admin-role`, {
      method: "Get"
    });
    if (res.ok) {
      const result = await res.json();

      setRoleName(result.adminrole);
    }
  }




  const onView = async (data) => {
    setQueryid(data);

    router.push(`/admin/patient-queries/${data}`);
  }


  const onChangeofCordianator = async (cordinatorid, patientqueryid) => {



    debugger;
    let payload = {
      cordinatorid: cordinatorid,
      patientqueryid: patientqueryid
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/assign-cordinator`, {
      method: "Put",
      headers: await adminHeaders(),
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const result = await res.json();
      fetchQueries();


      toast.success("Cordinator changed and sent notification successfully", {
        position: "bottom-right",
        autoClose: 3000
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


      <div className={`grid grid-cols-12 gap-4 ${queryid !== "" ? "hidden" : ""}`}>

        <div className="col-span-12 rounded-xl border theme-border bg-white w-full overflow-x-auto">

          <Table className="min-w-full table-auto border-collapse">
            <TableHeader className="border-b">
              <TableRow>
                <TableCell isHeader className="px-5 py-3">Requested No.</TableCell>

                <TableCell isHeader className="px-5 py-3">Patient</TableCell>

                <TableCell isHeader className="px-5 py-3">Treatment</TableCell>
                <TableCell isHeader className="px-5 py-3">Assigned Status</TableCell>

                <TableCell isHeader className="px-5 py-3 text-center">Status</TableCell>
                <TableCell isHeader className="px-5 py-3 text-right">Created</TableCell>
                <TableCell isHeader className="px-5 py-3 text-center w-20">Final Price</TableCell>
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




                  <TableCell className="px-5 py-4">
                    
                    <div className="font-medium text-gray-800">
                      {q.patientName}
                    </div>

                    {/* Contact Info */}
                    <div className="mt-1 text-sm text-gray-600">
                      {q.phoneNumber || q.email ? (
                        <>
                          {q.phoneNumber !== "0" && (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-400">📞</span>
                              <span>{q.phoneNumber}</span>
                            </div>
                          )}
                          {q.email && (
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-gray-400">✉️</span>
                              <span>{q.email}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-red-500 text-xs font-medium">
                          Not Verified
                        </div>
                      )}
                    </div>

               
                    <div className="my-3 border-t"></div>

                
                    

                 {q.AdditionalServices?.length > 0 && (
  <details className="bg-gray-50 border rounded-lg p-3 group">
    
    {/* Header */}
    <summary className="flex justify-between items-center cursor-pointer list-none">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
        Additional Services ({q.AdditionalServices.length})
      </span>

      {/* Arrow */}
      <span className="text-gray-500 text-sm transition-transform duration-300 group-open:rotate-180">
        ▼
      </span>
    </summary>

    {/* Content */}
    <div className="mt-3 flex flex-wrap gap-2 transition-all duration-300">
      {q.AdditionalServices.map((service) => (
        <div
          key={service.id}
          className="flex items-center gap-2 bg-white border px-3 py-1.5 rounded-full shadow-sm"
        >
          <span className="w-5 h-5 flex items-center justify-center bg-green-100 text-green-600 rounded-full text-xs">
            ✔
          </span>

          <span className="text-sm text-gray-700 font-medium">
            {service.label}
          </span>
        </div>
      ))}
    </div>

  </details>
)}
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


                  <TableCell className="px-5 py-4">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">

                      <PatientQueryStatusBadge status={q.status} />

                     

                      {q.RequestFunds.filter(x => x.collected === 0).length > 0 && (<>
                        <div className="flex items-center gap-2 text-xs font-medium">
                          <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 flex items-center gap-2 font-semibold shadow-sm">
                            <span className="relative flex h-3 w-3">
                              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 animate-ping opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 animate-pulse"></span>
                            </span>
                            Fund Requested
                          </span>
                        </div>

                      </>)}
                     

                    </div>
                  </TableCell>

                  <TableCell className="px-5 py-4 text-right text-sm">{formatBrazilDate(q.createdAt)}</TableCell>


                  <TableCell className="px-5 py-4 text-center">
                    <span className="inline-flex items-center">

                      {q.PatientQueryFinalPrice?.length > 0 ? (
                        <>
                          {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.PENDING && (
                            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700 ring-1 ring-yellow-600/20">
                              🟡 Pending : {brazilianCurrency(q.PatientQueryFinalPrice?.[0]?.finalPrice)}
                            </span>
                          )}

                          {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.ACCEPT && (
                            <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
                              🟢 Accepted by Clinic
                            </span>
                          )}
                          {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.ACCEPTEDBYADMIN && (
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

                      {q.PatientQueryFinalPrice?.[0]?.status === PackageQueryFinalPriceStatus.REJECT && (<>
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
      </div>





      {/* {queryid !== "" && (
        <PatientQueryDetails id={queryid}></PatientQueryDetails>
      )} */}


    </>);
}
