"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PencilIcon, TrashBinIcon } from "../../icons/index";
import { toast } from "react-toastify";
import Badge from "../ui/badge/Badge";
import { useConfirm } from "../../hooks/useConfirm";
import Switch from "../form/switch/Switch";

export default function ListOfPackages({ trigger, sendData }) {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [message, setMessage] = useState("");
    const { confirm, ConfirmDialog } = useConfirm();

  const fetchPackages = async (page) => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/listing-package/get-all?page=${page}&limit=${itemsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      setPackages(data.data || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages(currentPage);
  }, [currentPage, trigger]);


  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = packages.map((p) => p.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const onDelete = async (id) => {
    debugger;

     const result = await confirm("Are you sure you want to un-block this item?");
                if (!result) {
                    console.log("User not confirmed!");
                    return false;
                }
    const resToken = await fetch("/api/auth/get-token");
    const { token } = await resToken.json();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/listing-package/delete/${id}`,
        { method: "DELETE", 
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        } 
        }
      );

      if (res.ok) {
        const result = await res.json();

        toast.success(result.message, {
          position: "bottom-right",
          autoClose: 3000,
        });

        setTimeout(() => setMessage(""), 3000);
        
        fetchPackages(currentPage);
      }
    } catch (error) {

      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const onEdit = (data) => {
    let payload ={
        name : data.name,
        price : data.price,
        durationDays :data.durationDays,
        description : data.description,
        id : data.id
    };

    sendData(payload);
  };


  const Statustoggle=async (id,data)=>{
        debugger;

        let payload ={
            id: id,
            isActive : data
        }

    const resToken = await fetch("/api/auth/get-token");
    const { token } = await resToken.json();
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/listing-package/update-status`,{
        method : "PUT",
        headers :{
                Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body : JSON.stringify(payload)
    });

    if(res.ok){
        const result = await res.json();

         toast.success(`${result.data.name + result.message}`, {
          position: "bottom-right",
          autoClose: 3000,
        });
         fetchPackages(currentPage);

    }



  }








  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <ConfirmDialog />
      <div className="max-w-full overflow-x-auto">
        <p className="text-green-600 text-sm p-5">{message}</p>
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 text-start">
                  <input
                    type="checkbox"
                    checked={
                      packages.length > 0 &&
                      packages.every((p) => selectedRows.includes(p.id))
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Description
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Price
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Duration (Days)
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Status
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
               {packages.length > 0 ? packages.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(p.id)}
                      onChange={() => handleSelectRow(p.id)}
                    />
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {p.name || "—"}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {p.description || "—"}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {p.price || "—"}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {p.durationDays || "—"}
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    
                    <Switch
                     defaultChecked={p.isActive}
                       onChange={(checked) => Statustoggle(p.id,checked)}
                    ></Switch>


                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <button onClick={() => onEdit(p)}>
                        <PencilIcon />
                      </button>
                      /
                      <button onClick={() => onDelete(p.id)}>
                        <TrashBinIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow className="text-center">
                        <TableCell colSpan={7} className="px-5 py-4 text-center text-gray-500">
                        No records found
                        </TableCell>
                </TableRow>
                ) }
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-white/[0.05]">
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