"use client"
import React, { useState } from "react";

export default function PayButton({ amount = 10, metadata = {} }) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    debugger;
    try {
      setLoading(true);
      
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/create-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount, metadata }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to create session");
      }

      const data = await res.json();
      window.location.href = data.url; // Redirect to Stripe Checkout
    } catch (err) {
      console.error(err);
      alert("Payment start failed: " + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
   <>
    <button onClick={handleClick} disabled={loading}>
      {loading ? "Redirecting..." : `Pay $${amount}`}
    </button>
   
   </>
  );
}
