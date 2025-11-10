"use client";

import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Switch from "../form/switch/Switch";
import  {formatBrazilDate} from "../../lib/formatDate";

export  function ListOfPurchasedPackages() {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchPackages = async (page) => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-purchased-packages/get-purchased-packages?page=${page}&limit=${itemsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      setPackages(data.data || []);
      setTotalPages(Math.ceil((data.totalCount || 0) / itemsPerPage));
    } catch (error) {
      console.error("Failed to fetch purchased packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages(currentPage);
  }, [currentPage]);

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
               
                <TableCell isHeader className="px-5 py-3 text-start">Clinic Code</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">Clinic Name</TableCell>
                 <TableCell isHeader className="px-5 py-3 text-start">Time Line</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">Package Name</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">Price</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">Duration (Days)</TableCell>
                <TableCell isHeader className="px-5 py-3 text-start">Status</TableCell>
               
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {packages.length > 0 ? (
                packages.map((pkg, idx) => (
                  <TableRow key={pkg.id}>
                    
                    <TableCell className="px-5 py-4 text-start">{pkg.clinic.clinic_code}</TableCell>
                    <TableCell className="px-5 py-4 text-start">{pkg.clinic.name}</TableCell>
                    <TableCell className="px-5 py-4 text-start">
                    {pkg.startDate && pkg.endDate
                        ? `${formatBrazilDate(pkg.startDate)} -> ${formatBrazilDate(pkg.endDate)}`
                        : "N/A"}
                    </TableCell>

                    <TableCell className="px-5 py-4 text-start">{pkg.package.name}</TableCell>
                    <TableCell className="px-5 py-4 text-start">{pkg.package.price}</TableCell>
                    <TableCell className="px-5 py-4 text-start">{pkg.package.durationDays}</TableCell>
                    <TableCell className="px-5 py-4 text-start">
                            <span
                                className={`px-2 py-1 rounded-full text-white text-sm ${
                                pkg.status === "active" ? "bg-green-500" : "bg-red-500"
                                }`}>
                                {pkg.status}
                            </span>
                            </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="px-5 py-4 text-center text-gray-500">
                    No records found
                  </TableCell>
                </TableRow>
              )}
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
