"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { EyeCloseIcon, EyeIcon, PencilIcon, TrashBinIcon } from "../../icons/index";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ListOfPatients({ trigger ,active  }) {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;



  
  // Fetch patients
  const fetchPatients = async (page) => {
    try {
      const resdsd = await fetch("/api/auth/get-token");
    const token = await resdsd.json();
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-patients/get-all?page=${page}&limit=${itemsPerPage}&status=${active}`,{
         method : "GET",
            headers : {
                "content-type" : "application/json",
                "Authorization": `Bearer ${token.token}`
            }
      });
      const data = await res.json();
      setPatients(data?.data || []);
      setTotalPages(Math.ceil((data?.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients(currentPage);
  }, [currentPage, trigger,active]);

  // Select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(patients.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Select row
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Pagination
  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
            
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  <input
                    type="checkbox"
                    checked={patients.length > 0 && patients.every((p) => selectedRows.includes(p.id))}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Patient Code</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Name</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Gender</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Phone</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Email</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">City</TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {patients.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(p.id)}
                      onChange={() => handleSelectRow(p.id)}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4">{p.patient_code}</TableCell>
                  <TableCell className="px-5 py-4">{`${p.first_name} ${p.last_name}`}</TableCell>
                  <TableCell className="px-5 py-4">{p.gender}</TableCell>
                  <TableCell className="px-5 py-4">{p.phone}</TableCell>
                  <TableCell className="px-5 py-4">{p.email}</TableCell>
                  <TableCell className="px-5 py-4">{p.city}</TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex gap-3 ">
                      <Link href={"/admin/manage-patients/" + p.uuid} className="">
                          <EyeIcon />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-gray-100">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-500 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
