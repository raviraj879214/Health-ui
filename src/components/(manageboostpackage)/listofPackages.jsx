"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { usePermissions } from "@/context/PermissionContext";
import { PencilIcon } from "lucide-react";
import { TrashBinIcon } from "@/icons";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import Switch from "../form/switch/Switch";
import { adminHeaders } from "../utils/adminHeader";


export function ListOfPackage({ sendData ,addData , updateData }) {



  const [specialties, setSpecialties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [message, setMessage] = useState("");
   const { canRead, canCreate, canUpdate, canDelete ,status } = usePermissions("Manage Boost Package");

  // Fetch specialties Type
  const fetchSpecialtyTypes = async (page) => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-package/get-packages?page=${page}&limit=${itemsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      console.log("data",data);
      setSpecialties(
          (data?.data || []).sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );


      setTotalPages(Math.ceil((data?.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  useEffect(() => {
    fetchSpecialtyTypes(currentPage);
   
  }, [currentPage]);


  useEffect(()=>{
      setSpecialties((prev) =>
          [...prev, addData].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
      );
  },[addData]);


    useEffect(() => {

        console.log("updateData",updateData);
        setSpecialties((prev) =>
  prev.map((item) => {
    if (item.id === updateData.id) {
      console.log("Matched Item:", item);
      console.log("Updated Data:", updateData);
      return { ...item, ...updateData };
    }
    return item;
  })
);
        
    }, [updateData]);


  







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
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-package/delete-packages/${id}`,
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
        

        setSpecialties(prev =>
          prev
            .filter(x => x.id !== id)
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        );


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
    sendData(data);
  };


  const onChangeSwitch=async (id,value)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/boost-package/update-packages-type`,{
      method : "Put",
      headers : await adminHeaders(),
      body : JSON.stringify({
         "id" : id,
         "type" : value === true ? 1 : 0
      })
    });
    if(res.ok){
      const result= await res.json();


    }
  } 



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
                  Package Name
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Package Price
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Package Duration (Days)
                </TableCell>
                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Clinic Listing Package
                </TableCell>


                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Package Description
                </TableCell>

               

               

                <TableCell className="px-5 py-3 font-medium text-gray-500">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {specialties.map((s) => {
                const isInUse =
                  s.cliniclistingboost?.length > 0 || s.clinics?.length > 0;

                return (
                  <TableRow
                    key={s.id}
                    className={`${isInUse ? "bg-gray-100 opacity-70" : ""}`}
                  >
                    {/* Checkbox */}
                    <TableCell className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(s.id)}
                        onChange={() => handleSelectRow(s.id)}
                        disabled={isInUse}
                      />
                    </TableCell>

                    {/* Name + Badge */}
                    <TableCell className="px-5 py-4 relative">
                      {s.name ?? "—"}

                      {isInUse && (
                        <span className="absolute top-1 right-2 bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded">
                          In Use
                        </span>
                      )}
                    </TableCell>

                    {/* Price */}
                    <TableCell className="px-5 py-4">
                      {brazilianCurrency(s.price ?? 0)}
                    </TableCell>

                    {/* Duration */}
                    <TableCell className="px-5 py-4">
                      {s.durationDays ?? "—"}
                    </TableCell>

                    <TableCell className="px-5 py-4">
                      <Switch
                       defaultChecked = {s.type == 0 ? false : true}
                       onChange={(e) => {
                        onChangeSwitch(s.id,e);
                        
                       }}

                      />
                    </TableCell>

                    {/* Description */}
                    <TableCell className="px-5 py-4 max-w-[220px]">
                      <div className="relative">
                        <input
                          type="checkbox"
                          id={`toggle-${s.id}`}
                          className="peer hidden"
                        />

                        <p className="break-words line-clamp-2 peer-checked:line-clamp-none">
                          {s.description ?? "—"}
                        </p>

                        {s.description && (
                          <label
                            htmlFor={`toggle-${s.id}`}
                            className="text-blue-500 text-xs mt-1 cursor-pointer inline-block"
                          >
                            <span className="peer-checked:hidden">Show More</span>
                            <span className="hidden peer-checked:inline">Show Less</span>
                          </label>
                        )}
                      </div>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="px-5 py-4">
                      <div className="flex gap-3">
                        {/* Edit */}
                        <button
                          onClick={() => onEdit(s)}
                          disabled={isInUse || !canUpdate}
                          className={`${isInUse || !canUpdate
                              ? "opacity-40 cursor-not-allowed"
                              : ""
                            }`}
                        >
                          <PencilIcon />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => onDelete(s.id)}
                          disabled={isInUse || !canDelete}
                          className={`${isInUse || !canDelete
                              ? "opacity-40 cursor-not-allowed"
                              : ""
                            }`}
                        >
                          <TrashBinIcon />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
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
