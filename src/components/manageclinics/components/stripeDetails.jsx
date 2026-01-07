"use client";
import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";

export function StripeDetails({ id }) {
  const [stripeAccountId, setStripeAccountId] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchStripeAccountID();
  }, [id]);

  useEffect(() => {
    if (stripeAccountId) fetchAccountStatus();
  }, [stripeAccountId]);

  const fetchStripeAccountID = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-details/${id}`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );
      if (res.ok) {
        const result = await res.json();
        setStripeAccountId(result?.data?.stripeaccountid);
      }
    } catch (error) {
      console.error("Error fetching Stripe Account ID", error);
    }
  };

  const fetchAccountStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ stripeAccountId }),
        }
      );
      if (res.ok) {
        const result = await res.json();
        setAccountDetails(result);
      }
    } catch (error) {
      console.error("Error fetching Stripe Account Status", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <p className="text-gray-500">No stripe details found</p>
      </div>
    );
  }

  if (!accountDetails) {
    return (
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <p className="text-gray-500">No Stripe account details found.</p>
      </div>
    );
  }

  const account = accountDetails.account;
  const business = account?.business_profile;
  const requirements = account?.requirements;
  const capabilities = account?.capabilities;
  const bank = accountDetails?.bankDetails;

  return (
    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 shadow-sm rounded-xl p-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          Stripe Account Details
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            account?.charges_enabled
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {account?.charges_enabled ? "Active" : "Action Required"}
        </span>
      </div>

      {/* Grid Layout for all details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Account Info */}
        <Card title="Account Info">
          <Info label="ID" value={account?.id} />
          <Info label="Type" value={account?.type} />
          <Info label="Country" value={account?.country} />
          <Info label="Currency" value={account?.default_currency?.toUpperCase()} />
          <Info label="Details Submitted" value={account?.details_submitted ? "Yes" : "No"} />
        </Card>

        {/* Business Profile */}
        <Card title="Business Profile">
          <Info label="Name" value={business?.name} />
          <Info label="Business Type" value={account?.business_type} />
          <Info label="MCC" value={business?.mcc} />
        </Card>

        {/* Capabilities */}
        <Card title="Capabilities">
          <Info label="Card Payments" value={capabilities?.card_payments} />
          <Info label="Transfers" value={capabilities?.transfers} />
          <Info label="Payouts Enabled" value={account?.payouts_enabled ? "Yes" : "No"} />
        </Card>

        {/* Compliance */}
        <Card title="Compliance">
          <Info label="Disabled Reason" value={requirements?.disabled_reason || "None"} highlight />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-400">Currently Due:</p>
            <ul className="list-disc pl-5 text-sm text-gray-700 dark:text-gray-300">
              {requirements?.currently_due?.length
                ? requirements.currently_due.map((item, i) => <li key={i}>{item}</li>)
                : <li>None</li>}
            </ul>
          </div>
        </Card>

        {/* Bank Details */}
        <Card title="Bank Details">
          <Info label="Bank Name" value={bank?.bankName} />
          <Info label="Last 4" value={`**** ${bank?.last4}`} />
          <Info label="Country" value={bank?.country} />
          <Info label="Currency" value={bank?.currency?.toUpperCase()} />
          <Info label="Status" value={bank?.status} />
        </Card>

      </div>
    </div>
  );
}

/* 🔹 Reusable Card Component */
const Card = ({ title, children }) => (
  <div className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg p-4 shadow-sm">
    <h4 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">{title}</h4>
    <div className="space-y-1">{children}</div>
  </div>
);

/* 🔹 Info Row */
const Info = ({ label, value, highlight }) => (
  <p className={highlight ? "text-red-600 text-sm" : "text-gray-700 dark:text-gray-300 text-sm"}>
    <span className="font-medium">{label}:</span> {value || "—"}
  </p>
);
