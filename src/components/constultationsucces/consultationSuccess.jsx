"use client";
import { useEffect, useState } from "react";


export function ConsultationSuccess({ id }) {
  const [success, setSuccess] = useState(false); // null = loading

  useEffect(() => {
    if (id) {
      fetchSuccess();
    }
  }, [id]);

  const fetchSuccess = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/payments/update-ptient-query-payment-details`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      if (res.ok) {
        const result =await res.json();

        if(result.success == false){
            setSuccess(false);
        }
        else{
                setSuccess(true);
        }

      } 
    } catch (error) {
      console.error("Payment status check failed", error);
      setSuccess(false);
    }
  };

  /* -------------------- LOADING -------------------- */
  if (success === null) {
    return (
      <div className="bg-gray-100 h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Checking payment status...</p>
      </div>
    );
  }

  return (
    <>
      {/* -------------------- SUCCESS -------------------- */}
      {success && (
        <div className="bg-gray-100 h-screen flex items-center justify-center">
          <div className="bg-white p-6 md:mx-auto rounded-xl shadow-md">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12A12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              />
            </svg>

            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
                Payment Successful 🎉
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p>Our team will contact you shortly.</p>

              <div className="py-10">
                <a
                  href="/"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg"
                >
                  GO BACK
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

     
      {!success && (
            

              <div className="bg-gray-100 h-screen flex items-center justify-center">
          <div className="bg-white p-6 md:mx-auto rounded-xl shadow-md">
             <svg
              viewBox="0 0 24 24"
              className="text-red-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5 15.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
              />
            </svg>

            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold">
                Payment Expired
              </h3>
              <p className="text-gray-600 my-2">
                Unfortunately, we couldn’t process your payment.
              </p>
              <p> Please try again or contact our support team for assistance.</p>

              <div className="py-10">
                <a
                  href="/"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg"
                >
                  GO BACK
                </a>
              </div>
            </div>
          </div>
        </div>


      )}
    </>
  );
}
