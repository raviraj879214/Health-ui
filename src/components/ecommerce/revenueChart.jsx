"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RevenueChart({ transfersprops }) {
  const [fullData, setFullData] = useState([]);
  const [year, setYear] = useState("2026");
  const [month, setMonth] = useState("");

  // Fixed months from Jan to Dec
  const allMonths = Array.from({ length: 12 }, (_, idx) =>
    (idx + 1).toString().padStart(2, "0")
  );

  useEffect(() => {

    const formattedData = transfersprops.map((t) => ({
      date: new Date(t.created * 1000).toISOString().split("T")[0],
      received: t.fee ? t.amount / 100 : 0,  
      payout: Math.abs(t.fee === 0 ? t.amount / 100 : 0),
    }));

    setFullData(formattedData);

  }, [transfersprops]);


  const yearFilteredData = useMemo(() => {
    return fullData
      .filter((item) => new Date(item.date).getFullYear().toString() === year)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [year, fullData]);

  // Prepare chart categories & series
  const { categories, series } = useMemo(() => {
    if (!month) {
      // group by month
      const monthMap = {};
      yearFilteredData.forEach((item) => {
        const m = (new Date(item.date).getMonth() + 1).toString().padStart(2, "0");
        if (!monthMap[m]) monthMap[m] = { received: 0, payout: 0 };
        monthMap[m].received += item.received;
        monthMap[m].payout += item.payout;
      });

      const sortedMonths = Object.keys(monthMap).sort((a, b) => parseInt(a) - parseInt(b));

      return {
        categories: allMonths.map((m) =>
          new Date(0, parseInt(m) - 1).toLocaleString("default", { month: "short" })
        ),
        series: [
          { name: "Received Amount", data: allMonths.map((m) => monthMap[m]?.received || 0) },
          { name: "Payout", data: allMonths.map((m) => monthMap[m]?.payout || 0) },
        ],
      };
    } else {
      // group by day in selected month (aggregated)
      const dayDataMap = {};
      yearFilteredData.forEach((item) => {
        const itemMonth = (new Date(item.date).getMonth() + 1).toString().padStart(2, "0");
        if (itemMonth === month) {
          const itemDate = item.date;
          if (!dayDataMap[itemDate]) dayDataMap[itemDate] = { received: 0, payout: 0 };
          dayDataMap[itemDate].received += item.received;
          dayDataMap[itemDate].payout += item.payout;
        }
      });

      const sortedDays = Object.keys(dayDataMap).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      return {
        categories: sortedDays.map((d) =>
          new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" })
        ),
        series: [
          { name: "Received Amount", data: sortedDays.map((d) => dayDataMap[d].received) },
          { name: "Payout", data: sortedDays.map((d) => dayDataMap[d].payout) },
        ],
      };
    }
  }, [yearFilteredData, month]);

  const chartOptions = useMemo(
    () => ({
      chart: { type: "area", height: 300, toolbar: { show: false }, zoom: { enabled: false } },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 2 },
      grid: { strokeDashArray: 3 },
      fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.3, opacityTo: 0.1 } },
      xaxis: { categories },
      yaxis: { title: { text: "Amount ($)" }, labels: { formatter: (v) => `$${v}` } },
      tooltip: { y: { formatter: (v) => `$${v}` } },
      colors: ["#6366F1", "#10B981"],
      legend: { position: "top" },
    }),
    [categories]
  );

  return (
    <div className="w-full bg-white p-4 rounded-xl shadow mb-2 mt-2">
      {/* Filters */}

      
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {/* Year */}
        <label className="flex flex-col">
          <span className="text-sm font-medium">Year</span>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border p-2 rounded"
          >
            {Array.from({ length: 5 }).map((_, idx) => {
              const y = 2026 + idx;
              return (
                <option key={y} value={y}>
                  {y}
                </option>
              );
            })}
          </select>
        </label>

        {/* Month */}
        <label className="flex flex-col">
          <span className="text-sm font-medium">Month</span>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">All Months</option>
            {allMonths.map((m) => (
              <option key={m} value={m}>
                {new Date(0, parseInt(m) - 1).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Chart */}
      <Chart options={chartOptions} series={series} type="area" height={300} />
    </div>
  );
}