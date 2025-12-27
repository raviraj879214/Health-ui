"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { EyeIcon, TrashBinIcon } from "../../../icons";
import { adminHeaders } from "@/components/utils/adminHeader";
import Link from "next/link";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { formatBrazilDate } from "@/lib/formatDate";

export function ManagePackages({ trigger, sendDelete }) {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState("");

  const itemsPerPage = 10;

  // Fetch Packages
  const fetchPackages = async (page) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-packages?page=${page}&limit=${itemsPerPage}`,{
            method : "Get",
            headers : await adminHeaders()
        }
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

  // Select all
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(packages.map((p) => p.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Select row
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id]
    );
  };

  // Pagination
  const handlePrevPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Delete package
  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this package?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/delete-package/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        const result = await res.json();
        setMessage(result.message || "Package deleted");
        sendDelete?.(true);
        fetchPackages(currentPage);
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (error) {
      console.error("Failed to delete package:", error);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <p className="text-green-600 text-sm p-5">{message}</p>

        <div className="min-w-[1200px]">
         <Table>
  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
    <TableRow>
      {/* Checkbox */}
      <TableCell isHeader className="px-5 py-3 text-center w-12">
        <input
          type="checkbox"
          checked={
            packages.length > 0 &&
            packages.every((p) => selectedRows.includes(p.id))
          }

          onChange={handleSelectAll}/>
      </TableCell>

      {/* Title */}
      <TableCell isHeader className="px-5 py-3 text-left">
        Title
      </TableCell>
        <TableCell isHeader className="px-5 py-3 text-left">
         Brief Description
      </TableCell>

      {/* Actual Price */}
      <TableCell isHeader className="px-5 py-3 text-right">
        Actual Price
      </TableCell>

      {/* Discount Price */}
      <TableCell isHeader className="px-5 py-3 text-right">
        Discount Price
      </TableCell>
      <TableCell isHeader className="px-5 py-3 text-right">
        Package Created
      </TableCell>

      {/* Action */}
      <TableCell isHeader className="px-5 py-3 text-center w-24">
        Action
      </TableCell>
    </TableRow>
  </TableHeader>

  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
    {packages.map((pkg) => (
      <TableRow key={pkg.id}>
        {/* Checkbox */}
        <TableCell className="px-5 py-4 text-center">
          <input
            type="checkbox"
            checked={selectedRows.includes(pkg.id)}
            onChange={() => handleSelectRow(pkg.id)}
          />
        </TableCell>

        {/* Title */}
        <TableCell className="px-5 py-4 text-left font-medium">
          {pkg.title}
        </TableCell>

        <TableCell className="px-5 py-4 text-sm text-gray-500 align-middle max-w-xs">
            <p className="line-clamp-2 leading-relaxed">
            {pkg.briefdescription || "—"}
            </p>
        </TableCell>

       

        {/* Actual Price */}
        <TableCell className="px-5 py-4 text-right text-gray-500">
          {brazilianCurrency(pkg.actualprice)}
        </TableCell>

        {/* Discount Price */}
        <TableCell className="px-5 py-4 text-right font-semibold text-green-600">
          {brazilianCurrency(pkg.discountedprice)}
        </TableCell>

        <TableCell className="px-5 py-4 text-right font-semibold ">
          {formatBrazilDate(pkg.createdAt)}
        </TableCell>

       
        <TableCell className="px-5 py-4 text-center cursor-pointer">
           
           <Link href={`/admin/manage-packages/${pkg.id}`}>
            <EyeIcon></EyeIcon>
           </Link>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-white/[0.05]">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
