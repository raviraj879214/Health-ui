"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PayButton from './PayButton';


export  function PackageListings() {
  const router = useRouter();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const tokenResponse = await fetch("/api/auth/get-token");
        const { token } = await tokenResponse.json();

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/listing-package/get-all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const json = await res.json();
        setPackages(json.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const handleBuy = (pkg) => {
    router.push(`/checkout/${pkg.id}`);
  };

  if (loading) return <p>Loading...</p>;

  const metadata = { orderId: 'order_123', userId: 'user_99' };

  
  return (
    <div className="min-h-screen p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {packages?.map((pkg) => (
        <div
          key={pkg.id}
          className="border rounded-2xl shadow-md p-6 flex flex-col gap-3 hover:shadow-lg transition cursor-pointer"
          
        >
          <h2 className="text-xl font-semibold">{pkg.name}</h2>
          <p className="text-gray-500 text-sm">{pkg.description}</p>

          <div className="flex items-center justify-between mt-2">
            <p className="text-2xl font-bold">${pkg.price}</p>
            <p className="text-sm text-gray-600">{pkg.durationDays} days</p>
          </div>

          <button
            className="w-full mt-4 py-2 rounded-xl bg-blue-600 text-white text-center hover:bg-blue-700"
          >
           
            <PayButton amount={pkg.price} metadata={metadata} />
          </button>
        </div>
      ))}
    </div>
  );
}