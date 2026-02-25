"use client";
import React, { useEffect, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon } from "@/icons";
import { adminHeaders } from "../utils/adminHeader";
import { TableCell, TableRow } from "../ui/table";

export const EcommerceMetrics = () => {
  const [sampledata, setSampleData] = useState({
    clinic: [],
    patientquery: [],
    stripebalance: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-dashboard/admin-dashboard-data`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch dashboard data");

      const result = await res.json();
      setSampleData(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while loading dashboard.");
    } finally {
      setLoading(false);
    }
  };

  // ===== Derived Values =====
  const clinicsCount = sampledata?.clinic?.length ?? 0;
  const patientQueryCount = sampledata?.patientquery?.length ?? 0;

  const stripeBalance = sampledata?.stripebalance?.[0];
  const amountInCents = stripeBalance?.amount ?? 0;
  const currency = stripeBalance?.currency ?? "usd";

  const formattedBalance = (amountInCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  });

  if (loading) {
    return (<>
      <div className="flex justify-center items-center">
                  <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-500">Loading dashboard...</span>
                </div>
    </>);
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">

      {/* Clinics */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
          <GroupIcon className="text-gray-800 size-6" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500">
            Clinics
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-2xl">
            {clinicsCount}
          </h4>
        </div>
      </div>

      {/* Patient Queries */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl">
          <BoxIconLine className="text-gray-800 size-6" />
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500">
            Patient Queries
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-2xl">
            {patientQueryCount}
          </h4>
        </div>
      </div>

      {/* Stripe Balance */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-6 h-6 text-indigo-600"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.226 5.385c-.584 0-.937.164-.937.593 0 .468.607.674 1.36.93 1.228.415 2.844.963 2.851 2.993C11.5 11.868 9.924 13 7.63 13a7.7 7.7 0 0 1-3.009-.626V9.758c.926.506 2.095.88 3.01.88.617 0 1.058-.165 1.058-.671 0-.518-.658-.755-1.453-1.041C6.026 8.49 4.5 7.94 4.5 6.11 4.5 4.165 5.988 3 8.226 3a7.3 7.3 0 0 1 2.734.505v2.583c-.838-.45-1.896-.703-2.734-.703" />
          </svg>
        </div>

        <div className="mt-5">
          <span className="text-sm text-gray-500">
            Stripe Balance
          </span>
          <h4 className="mt-2 font-bold text-gray-800 text-2xl">
            {formattedBalance}
          </h4>
        </div>
      </div>

    </div>
  );
};