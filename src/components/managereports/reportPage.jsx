"use client";

import { useEffect, useMemo, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { MultiSelectDropdown } from "./MultiSelectDropdown";
import { adminHeaders } from "../utils/adminHeader";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { formatBrazilDate } from "@/lib/formatDate";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import RevenueChart from "../ecommerce/revenueChart";

export function Report() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastId, setLastId] = useState(null);
  const [patientQueryCodes, setPatientQueryCodes] = useState([]);

  useEffect(() => {
    fetchTrans();
  }, []);

  // ✅ Fetch + Normalize
  const fetchTrans = async (loadMore = false) => {
    setLoading(true);

    let url = `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/report/get-transaction`;

    if (loadMore && lastId) {
      url += `?startingAfter=${lastId}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: await adminHeaders(),
    });

    if (res.ok) {
      const result = await res.json();

      // ✅ Normalize patientQueryId
      const normalized = result.transactions.map((item) => ({
        ...item,
        patientQueryId:
          item.source?.metadata?.patientqueryid ||
          item.source?.metadata?.patientQueryId ||
          item.source?.payment_intent?.metadata?.patientQueryId ||
          null,
      }));

      setTransactions((prev) =>
        loadMore ? [...prev, ...normalized] : normalized
      );

      setAllTransactions((prev) =>
        loadMore ? [...prev, ...normalized] : normalized
      );

      setHasMore(result.hasMore);
      setLastId(result.lastId);
      setPatientQueryCodes(result.patientQueryCode || []);
    }

    setLoading(false);
  };

  // ✅ Fast lookup map (O(1))
  const queryMap = useMemo(() => {
    return Object.fromEntries(
      patientQueryCodes.map((x) => [x.id, x.querycode])
    );
  }, [patientQueryCodes]);

  // ✅ Filter
  const filterTransaction = (ids) => {
    if (!ids?.length) {
      setTransactions(allTransactions);
      return;
    }

    const filtered = allTransactions.filter((item) =>
      ids.includes(item.patientQueryId)
    );

    setTransactions(filtered);
  };

  return (
    <>
     
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <ComponentCard title="Filters">
            <MultiSelectDropdown onSelected={filterTransaction} />
          </ComponentCard>
        </div>
      </div>

     

      <RevenueChart   transfersprops={transactions} />


      <div className="grid grid-cols-12 gap-4 mt-2">
        <div className="col-span-12">

                  <ComponentCard title="Transactions Report" desc="It currently only shows the last 100 transactions. To view older transactions, click “Load More”, and the chart will update accordingly.">
  {loading && transactions.length === 0 ? (
    <ButtonSpinner />
  ) : (
    <>
      {/* Table Container */}
      <div className="overflow-x-auto max-h-[80vh] border border-gray-200 rounded-xl shadow-sm p-4">
        <table className="min-w-full border-collapse">
          {/* HEADER */}
          <thead className="bg-gray-100 text-left text-sm text-gray-700 sticky top-0">
            <tr>
              <th className="px-4 py-3 border-b">Txn ID</th>
              <th className="px-4 py-3 border-b">Type</th>
              <th className="px-4 py-3 border-b">Amount</th>
              <th className="px-4 py-3 border-b">Net</th>
              <th className="px-4 py-3 border-b">Status</th>
              <th className="px-4 py-3 border-b">Description</th>
              <th className="px-4 py-3 border-b">Date</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody className="text-sm text-gray-600">
            {transactions.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No transactions found
                </td>
              </tr>
            )}

            {transactions.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                {/* Txn ID + Query */}
                <td className="px-4 py-2 border-b text-xs">
                  {item.id.slice(0, 15)}...
                  <br />
                  <b>{queryMap[item.patientQueryId] ? `#${queryMap[item.patientQueryId]}` : "-"}</b>
                </td>

                {/* Type */}
                <td className="px-4 py-2 border-b">
                  <div className="flex items-center gap-2">
                    {item.type === "charge" && (
                      <div className="flex items-start gap-2">
                        <ArrowDownCircle className="w-4 h-4 text-green-600 mt-1" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-green-600 font-medium">Payment Received</span>
                          <span className="text-sm font-semibold text-gray-800">
                            {item.customerName || "Unknown User"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {item.customerEmail || "No email"}
                          </span>
                          <span className="text-xs text-gray-400">
                            Ref: {item.paymentIntentId || item.id}
                          </span>
                        </div>
                      </div>
                    )}

                    {item.type === "transfer" && (
                      <div className="flex items-start gap-2">
                        <ArrowUpCircle className="w-4 h-4 text-blue-600 mt-1" />
                        <div className="flex flex-col leading-tight">
                          <span className="text-blue-600 font-medium">Transferred to Account</span>
                          <span className="text-sm font-semibold text-gray-800">
                            {item.destinationAccount?.business_profile?.name ||
                              item.destinationAccount?.company?.name ||
                              `${item.destinationAccount?.individual?.first_name || ""} ${item.destinationAccount?.individual?.last_name || ""}`.trim() ||
                              "Unknown Clinic"}
                          </span>
                          <span className="text-xs text-gray-500">{item.destinationAccount?.email}</span>
                          <span className="text-xs text-gray-400">
                            {item.destinationAccount?.company?.address?.city},{" "}
                            {item.destinationAccount?.country}
                          </span>
                          <span className="text-xs text-gray-400">
                            {item.destinationAccount?.external_accounts?.data?.[0]?.bank_name} ••••
                            {item.destinationAccount?.external_accounts?.data?.[0]?.last4}
                          </span>
                        </div>
                      </div>
                    )}

                    {!["charge", "transfer"].includes(item.type) && (
                      <span className="capitalize">{item.type}</span>
                    )}
                  </div>
                </td>

              
                <td className="px-4 py-2 border-b font-medium">
                  <div className="flex items-center gap-1">
                    {/* Icon: green down for received, red up for deduction */}
                    {item.amount - (item.fee || 0) >= 0 ? (
                      <ArrowDownCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <ArrowUpCircle className="w-4 h-4 text-red-600" />
                    )}

                    {/* Main Amount */}
                    <span className={item.amount - (item.fee || 0) < 0 ? "text-red-500" : "text-green-600"}>
                      {brazilianCurrency((item.amount) / 100)}
                    </span>

                    {/* Fee info */}
                    {item.fee > 0 && (
                      <span className="text-xs text-gray-400 ml-1">
                        (Stripe Fee: {brazilianCurrency(item.fee / 100)})
                      </span>
                    )}
                  </div>
                </td>


                {/* Net */}
                <td className="px-4 py-2 border-b">{brazilianCurrency(item.net / 100)}</td>

                {/* Status */}
                <td className="px-4 py-2 border-b">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "available"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Date */}


                <td className="px-4 py-2 border-b">{item.description || "--"}</td>

                <td className="px-4 py-2 border-b">{formatBrazilDate(item.created * 1000)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      {hasMore && (
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => fetchTrans(true)}
                    className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            </div>
        )}

    
        <div className="flex justify-end mt-6">
            <div className="w-80 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>

                <div className="space-y-4">

                    <div className="p-3 rounded-lg bg-green-50 border border-green-100 space-y-2">

                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Total Received</span>
                            <span className="text-green-600 font-semibold">
                                {brazilianCurrency(
                                    transactions
                                        .filter(t => t.type === "charge")
                                        .reduce((sum, t) => sum + t.amount, 0) / 100
                                )}
                            </span>
                        </div>


                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Processing Fees</span>
                            <span>
                                {brazilianCurrency(
                                    transactions.reduce((sum, t) => sum + t.fee, 0) / 100
                                )}
                            </span>
                        </div>


                        <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>Net Received</span>
                            <span>
                                {brazilianCurrency(
                                    transactions
                                        .filter(t => t.type === "charge")
                                        .reduce((sum, t) => sum + t.net, 0) / 100
                                )}
                            </span>
                        </div>


                    </div>

                    {/* Total Transferred */}
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-gray-700 font-medium">Total Transferred</span>
                            <span className="text-blue-600 font-semibold">
                                {brazilianCurrency(
                                    -1 * transactions
                                        .filter(t => t.type === "transfer")
                                        .reduce((sum, t) => sum + t.amount, 0) / 100
                                )}
                            </span>
                        </div>

                    </div>

                    {/* Processing Fee */}

                </div>
            </div>
        </div>


        
    </>
  )}
</ComponentCard>
        </div>
      </div>
    </>
  );
}