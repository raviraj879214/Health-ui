"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { PencilIcon, TrashBinIcon } from "../../icons";
import { toast } from "react-toastify";
import Badge from "../ui/badge/Badge";
import ComponentCard from "../common/ComponentCard";
import Switch from "../form/switch/Switch";

export function ListOfCategories({ trigger, sendData }) {
  const [categories, setCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const itemsPerPage = 10;

  // ✅ Fetch categories with pagination
  const fetchCategories = async (page) => {
    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/categories/get-category?page=${page}&limit=${itemsPerPage}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();

      if (res.ok) {
        setCategories(data.data || []);
        setTotalCount(data.totalCount || 0);
        setTotalPages(Math.ceil((data.totalCount || 1) / itemsPerPage));
      } else {
        toast.error(data.message || "Failed to load categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  // 🔁 Refetch when trigger or page changes
  useEffect(() => {
    fetchCategories(currentPage);
  }, [trigger, currentPage]);

  // ✅ Select all rows
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(categories.map((c) => c.id));
    } else {
      setSelectedRows([]);
    }
  };

  // ✅ Toggle single row
  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ✅ Pagination Controls
  const handlePrevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));

  // ✅ Delete Category
  const onDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this category?");
    if (!confirmDelete) return;

    try {
      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/categories/delete-category/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "Category deleted successfully", {
          position: "bottom-right",
          autoClose: 3000,
        });
        fetchCategories(currentPage);
        sendData(result.data.created_at, "" , "delete");
      } else {
        toast.error(result.message || "Failed to delete category");
      }
    } catch (err) {
      toast.error(err.message || "Error deleting category");
    }
  };

  // ✅ Edit Handler
  const onEdit = (cat) => {
    sendData(
      cat.id,
      cat.name,
      "",
      cat.parent_category_id
    );
  };

  const SwitchToggleButton = async(id,featured)=>{
    

      const resToken = await fetch("/api/auth/get-token");
      const { token } = await resToken.json();

      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/categories/update-featured/${id}/${featured}`,{
        method : "PUT",
         headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
          },
      });


      if (res.ok) {
  const data = await res.json();

    
        toast.success(
          `${data.data.name} feature listing updated`,
          {
            position: "bottom-right",
            autoClose: 3000,
          }
        );
      }


  }



  return (
    <div className="grid grid-cols-12 gap-4 mt-5">
      <div className="col-span-12 space-y-6">
        <ComponentCard title="Manage Categories" desc="">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
              <div className="min-w-[1200px]">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell isHeader className="px-5 py-3">
                        <input
                          type="checkbox"
                          checked={
                            categories.length > 0 &&
                            categories.every((c) =>
                              selectedRows.includes(c.id)
                            )
                          }
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell isHeader className="px-5 py-3">Name</TableCell>
                      <TableCell isHeader className="px-5 py-3">Level</TableCell>
                      <TableCell isHeader className="px-5 py-3">Full Path</TableCell>
                      <TableCell isHeader className="px-5 py-3">Featured</TableCell>
                      <TableCell isHeader className="px-5 py-3">Action</TableCell>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {categories.length > 0 ? (
                      categories.map((cat) => (
                        <TableRow key={cat.id}>
                          <TableCell className="px-5 py-3">
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(cat.id)}
                              onChange={() => handleSelectRow(cat.id)}
                            />
                          </TableCell>
                          <TableCell className="px-5 py-3 font-medium">
                            {cat.name || "—"} 
                          </TableCell>
                          <TableCell className="px-5 py-3">{cat.level}</TableCell>
                          <TableCell className="px-5 py-3">{cat.full_path} {cat.is_featured} </TableCell>
                          <TableCell className="px-5 py-3">
                            <Switch defaultChecked={cat.is_featured} onChange={()=> SwitchToggleButton(cat.id,!cat.is_featured)} ></Switch>
                            
                          </TableCell>
                          <TableCell className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <button onClick={() => onEdit(cat)}>
                                <PencilIcon />
                                
                              </button>
                              /
                              <button onClick={() => onDelete(cat.id)}>
                                <TrashBinIcon />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-5 text-gray-400"
                        >
                          No categories found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* ✅ Pagination */}
            <div className="flex justify-end items-center gap-3 px-5 py-3 border-t border-gray-100 dark:border-white/[0.05]">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-gray-300 text-gray-600 disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-gray-500 text-sm">
                Page {currentPage} of {totalPages} ({totalCount} total)
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
        </ComponentCard>
      </div>
    </div>
  );
}
