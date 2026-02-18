




"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { PencilIcon, TrashBinIcon } from "../../../icons/index";
import { toast } from "react-toastify";
import { usePermissions } from "@/context/PermissionContext";

export function ListSpecialty({ trigger, sendData , addData }) {
  const [specialties, setSpecialties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [message, setMessage] = useState("");
   const { canRead, canCreate, canUpdate, canDelete ,status } = usePermissions("Manage Specialty");

  // Fetch specialties Type
  const fetchSpecialtyTypes = async (page) => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-sub-specialties/get-sub-specialties?page=${page}&limit=${itemsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      console.log("data",data);
      setSpecialties(data?.data || []);
      setTotalPages(Math.ceil((data?.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchSpecialtyTypes(currentPage);
  }, [currentPage, trigger]);


    useEffect(() => {
        if (addData) {
            setSpecialties(prev => {
                const exists = prev.some(item => item.id === addData.id);
                let updatedList;
                if (exists) {
                    updatedList = prev.map(item =>
                        item.id === addData.id ? addData : item
                    );
                } else {
                    updatedList = [...prev, addData];
                }
                return updatedList.sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
            });
        }
    }, [addData]);







  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = specialties.map((s) => s.id);
      setSelectedRows(allIds);
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

  // Delete
  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this record?");
    if (!confirmDelete) return;

    const resToken = await fetch("/api/auth/get-token");
    const { token } = await resToken.json();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-sub-specialties/delete-sub-specialties/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message ?? "Deleted!", {
          position: "bottom-right",
          autoClose: 3000,
        });

        setTimeout(() => setMessage(""), 3000);
        fetchSpecialtyTypes(currentPage);
        
        // sendData("", "", "");
      } else {
        toast.error(result.message ?? "Failed to delete",{
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const onEdit = (data) => {
    sendData(data.id, data.name);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <p className="text-green-600 text-sm p-5">{message} </p>
        <div className="min-w-[900px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  <input
                    type="checkbox"
                    checked={
                      specialties.length > 0 &&
                      specialties.every((s) => selectedRows.includes(s.id))
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>

                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Name
                </TableCell>

               

               

                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {specialties.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(s.id)}
                      onChange={() => handleSelectRow(s.id)}/>
                  </TableCell>

                  <TableCell className="px-5 py-4">{s.name ?? "—"}</TableCell>

                  

                  <TableCell className="px-5 py-4">
                    <div className="flex gap-3">

                      {/* Edit */}
                      {canUpdate ? (
                        <button onClick={() => onEdit(s)}>
                          <PencilIcon />
                        </button>
                      ) : (
                        <button disabled className="opacity-40 cursor-not-allowed">
                          <PencilIcon />
                        </button>
                      )}

                      {/* Delete */}
                      {canDelete ? (
                        <button onClick={() => onDelete(s.id)}>
                          <TrashBinIcon />
                        </button>
                      ) : (
                        <button disabled className="opacity-40 cursor-not-allowed">
                          <TrashBinIcon />
                        </button>
                      )}

                    </div>

                    

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
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
