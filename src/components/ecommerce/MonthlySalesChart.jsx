"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { adminHeaders } from "../utils/adminHeader";
import { usePermissions } from "@/context/PermissionContext";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MonthlySalesChart() {

const { canRead, canCreate, canUpdate, canDelete, status } = usePermissions("Admin Dashboard");

  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [dashboardData, setDashboardData] = useState({
    patientquery: [],
    clinic: [],
     stripeaccount: [],
     stripebalance: [],
  });

  const [loading,setLoading] = useState(false);

  const years = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => currentYear + i);
  }, [currentYear]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-dashboard/admin-dashboard-data`,
      {
        method: "GET",
        headers: await adminHeaders()
      }
    );

    if (res.ok) {
      const result = await res.json();
      setDashboardData(result);
    }
    setLoading(false);
  };

  // ✅ Helper to group by month
  const getMonthlyCounts = (dataArray) => {
    const months = Array(12).fill(0);

    dataArray.forEach((item) => {
      const date = new Date(item.createdAt);
      if (date.getFullYear() === year) {
        const monthIndex = date.getMonth();
        months[monthIndex] += 1;
      }
    });

    return months;
  };

  const patientMonthlyData = getMonthlyCounts(dashboardData.patientquery || []);
  const clinicMonthlyData = getMonthlyCounts(dashboardData.clinic || []);

  const chartSeries = [
    {
      name: "Patient Query",
      data: patientMonthlyData
    },
    {
      name: "Clinics",
      data: clinicMonthlyData
    }
  ];

  const chartOptions = {
    chart: {
      height: 350,
      type: "line",
      toolbar: { show: false }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "#f1f1f1"
    },
    xaxis: {
      categories: [
        "Jan","Feb","Mar","Apr","May","Jun",
        "Jul","Aug","Sep","Oct","Nov","Dec"
      ]
    },
    yaxis: [
      {
        title: { text: "Patient Queries" }
      },
      {
        opposite: true,
        title: { text: "Clinics" }
      }
    ],
    legend: {
      position: "top"
    },
    markers: {
      size: 4
    }
  };


  if(!canRead){
    return(<>
      Permission restricted
    </>);
  }

  return (
    <div className="w-full bg-white border rounded-lg shadow-sm p-6">
      <div className="flex justify-between mb-6 items-center">
        <div>
          <h5 className="text-gray-500 text-sm"></h5>
          <p className="text-2xl font-semibold">{year} Analytics</p>
        </div>

        <select
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="text-sm border rounded-md px-3 py-2"
        >
          {years.map((yr) => (
            <option key={yr} value={yr}>
              {yr}
            </option>
          ))}
        </select>
      </div>

     
      {loading ? (<>
         <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-500">Loading data...</span>
          </div>
      </>):(<>
         <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
      </>)}
    </div>
  );
}