"use client"

import { clearAllPatientQuery } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";






export function PatientNonVerifiedSuccessPage({ clinicid, querycode }) {
  const [coordinatorDetails, setCoordinatorDetails] = useState(null);
  const dispatch = useDispatch();

    const message = `Hello,
            This is my request number: ${querycode}.
            I would like to confirm my request and get further details.`;


  const encodedMessage = encodeURIComponent(message);


  const fetchCoordinatorDetails = useCallback(async () => {
    if (!clinicid) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-query/get-cordinator-details/${clinicid}`,
        { method: "GET" }
      );

      if (res.ok) {
        const result = await res.json();
        setCoordinatorDetails(result.data.cordinator);
      }
    } catch (error) {
      console.error("Failed to fetch coordinator details", error);
    }
  }, [clinicid]);

  useEffect(() => {
    fetchCoordinatorDetails();


  }, [clinicid]);




if (!querycode) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 bg-red-50 border border-red-200 rounded-xl">
      <p className="text-sm font-medium text-red-700 mb-3">
        Something went wrong. Please try again.
      </p>

      <button
        type="button"
        onClick={() => dispatch(clearAllPatientQuery())}
        className="inline-flex items-center px-4 py-2 text-sm font-medium
                   text-white bg-red-600 rounded-lg
                   hover:bg-red-700 transition
                   focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Go Back
      </button>
    </div>
  );
}


  return (
    <div>

    <h2 className="flex items-center justify-between text-xl font-semibold text-gray-900 mb-2">
  <span>Confirm Your Request</span>

  <button
    type="button"
    className="text-gray-400 hover:text-gray-600 transition"
    aria-label="Close"
    onClick={()=> dispatch(clearAllPatientQuery())}>

    ✕
  </button>
</h2>

    




      <p className="text-sm text-gray-600 mb-3">
        Your request number:
        <span className="font-bold text-gray-900 ml-1 text-lg">
          {querycode}
        </span>
      </p>

      <p className="text-sm text-gray-600 mb-4">
        Open chat with our coordinator to confirm your request and get your
        quote faster.
      </p>

      <ul className="space-y-2 text-sm text-gray-700 mb-6">
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-700" />
          Confirm your medical details
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-700" />
          Receive a personalized treatment quote
        </li>
        <li className="flex items-start gap-2">
          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-700" />
          Get faster guidance on next steps
        </li>
      </ul>

      <div className="space-y-3">
      
          <a
            href={`https://wa.me/${coordinatorDetails?.whatsappNumber}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
          >
            <img src="/images/brand/whatsapp.svg" className="w-6 h-6 mr-3" />
            <span className="text-sm font-medium text-gray-800">
              WhatsApp
            </span>
          </a>
        

       
          <a
            href={`https://t.me/${coordinatorDetails?.telegramNumber}?text=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
          >
            <img src="/images/brand/telegram.svg" className="w-6 h-6 mr-3" />
            <span className="text-sm font-medium text-gray-800">
              Telegram
            </span>
          </a>
        

       
          <a
            href={`https://m.me/${coordinatorDetails?.messengerID}?ref=${encodedMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
          >
            <img
              src="/images/brand/facebookmessenger.svg"
              className="w-6 h-6 mr-3"
            />
            <span className="text-sm font-medium text-gray-800">
              Facebook Messenger 
            </span>
          </a>
      
      </div>
    </div>
  );
}
