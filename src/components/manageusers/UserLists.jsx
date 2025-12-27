"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TrashBinIcon } from "../../icons";

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
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-packages?page=${page}&limit=${itemsPerPage}`
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
                <TableCell isHeader className="px-5 py-3">
                  <input
                    type="checkbox"
                    checked={
                      packages.length > 0 &&
                      packages.every((p) => selectedRows.includes(p.id))
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell isHeader className="px-5 py-3">
                  Title
                </TableCell>
                <TableCell isHeader className="px-5 py-3">
                  Description
                </TableCell>
                <TableCell isHeader className="px-5 py-3">
                  Actual Price
                </TableCell>
                <TableCell isHeader className="px-5 py-3">
                  Discount Price
                </TableCell>
                <TableCell isHeader className="px-5 py-3">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(pkg.id)}
                      onChange={() => handleSelectRow(pkg.id)}
                    />
                  </TableCell>

                  <TableCell className="px-5 py-4 font-medium">
                    {pkg.title}
                  </TableCell>

                  <TableCell className="px-5 py-4 max-w-md">
                    <ul className="list-disc pl-5 text-sm text-gray-600">
                      {pkg.briefdescription
                        ?.split("\n")
                        .filter(Boolean)
                        .map((line, i) => (
                          <li key={i}>{line}</li>
                        ))}
                    </ul>
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    ₹{pkg.actualprice}
                  </TableCell>

                  <TableCell className="px-5 py-4 font-semibold text-green-600">
                    ₹{pkg.discountedprice}
                  </TableCell>

                  <TableCell className="px-5 py-4">
                    <button onClick={() => onDelete(pkg.id)}>
                      <TrashBinIcon />
                    </button>
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
