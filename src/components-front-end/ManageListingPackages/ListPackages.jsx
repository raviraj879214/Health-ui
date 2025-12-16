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
<>
 <PayButton amount={10} metadata={metadata} />

</>

        

  );
}