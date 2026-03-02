import { patientQueryPaymentStatus } from "@/lib/enums/patientQueryPaymentStatus";
import { PatientQueryStatus } from "@/lib/enums/patientQueryStatus";
import PatientQueryStatusBadge from "@/reusable/StatusBadge";





export function QueryStatus({status,remarks="",paymentstatus,paymentremark}){

         const statusLabel = (status) => {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border";

  const statusConfig = {
    [PatientQueryStatus.PENDING]: {
      label: "Awaiting Dispatch",
      style:
        "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },

    [PatientQueryStatus.ASSIGNED]: {
      label: "Forwarded to Clinic",
      style:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14"
        />
      ),
    },

    [PatientQueryStatus.ACCEPT]: {
      label: "Accepted",
      style:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4"
        />
      ),
    },

    [PatientQueryStatus.REJECT]: {
      label: "Sent Back to Coordinator",
      style:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ),
    },

    [PatientQueryStatus.UNDER_REVIEW]: {
      label: "Under Review",
      style:
        "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m-7-8h8"
        />
      ),
    },

    [PatientQueryStatus.WAITING_FOR_INFO]: {
      label: "Waiting for Info",
      style:
        "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 10h.01M12 10h.01M16 10h.01"
        />
      ),
    },

    [PatientQueryStatus.OFFER_SENT]: {
      label: "Offer Sent",
      style:
        "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z"
        />
      ),
    },

    [PatientQueryStatus.APPOINTMENT_BOOKED]: {
      label: "Appointment Booked",
      style:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 7V3m8 4V3m-9 8h10"
        />
      ),
    },

    [PatientQueryStatus.PATIENT_ARRIVED]: {
      label: "Patient Arrived",
      style:
        "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 12h14"
        />
      ),
    },

    [PatientQueryStatus.TREATMENT_ONGOING]: {
      label: "Treatment Ongoing",
      style:
        "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6l4 2"
        />
      ),
    },

    [PatientQueryStatus.TREATMENT_COMPLETED]: {
      label: "Treatment Completed",
      style:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4"
        />
      ),
    },

    [PatientQueryStatus.TREATMENT_UNSUCCESSFUL]: {
      label: "Treatment Unsuccessful",
      style:
        "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ),
    },

    [PatientQueryStatus.CANCELLED]: {
      label: "Cancelled",
      style:
        "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      ),
    },
  };

  const current = statusConfig[status];

  if (!current) {
    return (
      <span className={`${base} bg-gray-50 text-gray-600 border-gray-200`}>
        —
      </span>
    );
  }

  return (
    <span className={`${base} ${current.style}`}>
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        {current.icon}
      </svg>
      {current.label}
    </span>
  );
        };


        const getPaymentStyle = (status) => {
          alert(status);
    switch (Number(status)) {
      case patientQueryPaymentStatus.UNPAID:
        return "bg-red-50 text-red-700 border-red-200";

      case patientQueryPaymentStatus.PARTIALLY_PAID:
        return "bg-yellow-50 text-yellow-700 border-yellow-200";

      case patientQueryPaymentStatus.FULLY_PAID:
        return "bg-green-50 text-green-700 border-green-200";

      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
        };

        const getPaymentLabel = (status) => {
          switch (Number(status)) {
            case patientQueryPaymentStatus.UNPAID:
              return "Unpaid";

            case patientQueryPaymentStatus.PARTIALLY_PAID:
              return "Partially Paid";

            case patientQueryPaymentStatus.FULLY_PAID:
              return "Fully Paid";

            default:
              return "Unknown";
          }
        };






   return (<>
     <div className="space-y-2">

       <div>
         <PatientQueryStatusBadge status={status} />
       </div>


       {remarks && (
         <div className="flex gap-2 p-3 rounded-lg border bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700">
           <svg
             className="w-4 h-4 mt-0.5 text-gray-500"
             fill="none"
             stroke="currentColor"
             viewBox="0 0 24 24"
             strokeWidth="2"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.1-3.3A7.96 7.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
             />
           </svg>

           <div>
             <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
               Remarks
             </p>
             <p className="text-sm text-gray-700 dark:text-gray-200">
               {remarks}
             </p>
           </div>
         </div>
       )}
     </div>


     <div className="flex items-start gap-4 p-5 border border-gray-200 rounded-2xl 
    bg-gradient-to-br from-white to-gray-50 
    shadow-sm hover:shadow-md transition duration-300 mt-4">


       <span
         className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-full border
    ${Number(paymentstatus) === patientQueryPaymentStatus.UNPAID
             ? "bg-red-50 text-red-700 border-red-200"
             : Number(paymentstatus) === patientQueryPaymentStatus.PARTIALLY_PAID
               ? "bg-yellow-50 text-yellow-700 border-yellow-200"
               : Number(paymentstatus) === patientQueryPaymentStatus.FULLY_PAID
                 ? "bg-green-50 text-green-700 border-green-200"
                 : "bg-gray-50 text-gray-700 border-gray-200"
           }`}
       >

         {Number(paymentstatus) === patientQueryPaymentStatus.FULLY_PAID && (
           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
           </svg>
         )}

         {Number(paymentstatus) === patientQueryPaymentStatus.UNPAID && (
           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
           </svg>
         )}

         {Number(paymentstatus) === patientQueryPaymentStatus.PARTIALLY_PAID && (
           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l2 2" />
           </svg>
         )}


         {{
           [patientQueryPaymentStatus.UNPAID]: "Unpaid",
           [patientQueryPaymentStatus.PARTIALLY_PAID]: "Partially Paid",
           [patientQueryPaymentStatus.FULLY_PAID]: "Fully Paid",
         }[Number(paymentstatus)]}
       </span>


      <div className="flex-1">
  {paymentremark && paymentremark.trim() !== "" ? (
    <>
      <p className="text-sm font-medium text-gray-700">Payment Remarks</p>
      <p className="text-sm text-gray-500 mt-1 leading-relaxed">
        {paymentremark}
      </p>
    </>
  ) : (
    <p className="text-sm text-gray-400 italic">
      No additional remarks
    </p>
  )}
</div>


     </div>




</>);



}