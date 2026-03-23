import { PatientQueryStatus } from "@/lib/enums/patientQueryStatus";


interface StatusBadgeProps {
  status: PatientQueryStatus;
  className?: string; // optional override
}

export default function PatientQueryStatusBadge({
  status,
  className = "",
}: StatusBadgeProps) {
  const base =
    "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border";

  const statusConfig = {
    [PatientQueryStatus.PENDING]: {
      label: "Awaiting Dispatch",
      style:
        "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
      icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    },

    [PatientQueryStatus.ASSIGNED]: {
      label: "Forwarded to Clinic",
      style:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
      icon: "M5 12h14",
    },

    [PatientQueryStatus.ACCEPT]: {
      label: "Accepted",
      style:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
      icon: "M9 12l2 2 4-4",
    },

    [PatientQueryStatus.REJECT]: {
      label: "Rejected",
      style:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700",
      icon: "M6 18L18 6M6 6l12 12",
    },

    [PatientQueryStatus.UNDER_REVIEW]: {
      label: "Under Review",
      style:
        "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-700",
      icon: "M9 12h6m-6 4h6m-7-8h8",
    },

    [PatientQueryStatus.WAITING_FOR_INFO]: {
      label: "Waiting for Info",
      style:
        "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700",
      icon: "M8 10h.01M12 10h.01M16 10h.01",
    },

    [PatientQueryStatus.OFFER_SENT]: {
      label: "Offer Sent",
      style:
        "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
      icon: "M12 8c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z",
    },

    [PatientQueryStatus.APPOINTMENT_BOOKED]: {
      label: "Appointment Booked",
      style:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700",
      icon: "M8 7V3m8 4V3m-9 8h10",
    },

    [PatientQueryStatus.PATIENT_ARRIVED]: {
      label: "Patient Arrived",
      style:
        "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-700",
      icon: "M5 12h14",
    },

    [PatientQueryStatus.TREATMENT_ONGOING]: {
      label: "Treatment Ongoing",
      style:
        "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
      icon: "M12 6v6l4 2",
    },

    [PatientQueryStatus.TREATMENT_COMPLETED]: {
      label: "Treatment Completed",
      style:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
      icon: "M9 12l2 2 4-4",
    },

    [PatientQueryStatus.TREATMENT_UNSUCCESSFUL]: {
      label: "Treatment Unsuccessful",
      style:
        "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300 dark:border-rose-700",
      icon: "M6 18L18 6M6 6l12 12",
    },

    [PatientQueryStatus.CANCELLED]: {
      label: "Cancelled",
      style:
        "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
      icon: "M6 18L18 6M6 6l12 12",
    },
  [PatientQueryStatus.REOPENREQUEST]: {
    label: "Reopen Request Submitted",
    style:
      "bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600",
    icon: "M4 4v5h5M20 20v-5h-5M5 9a7 7 0 0112-3l3 3M19 15a7 7 0 01-12 3l-3-3",
  },

  [PatientQueryStatus.REOPENED]: {
    label: "Reopened",
    style:
      "bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700",
    icon: "M9 14L4 9l5-5M4 9h10a6 6 0 010 12h-3",
  },

  [PatientQueryStatus.FUNDS_RELEASED]: {
    label: "Funds Released",
    style:
      "bg-green-100 text-green-700 border-green-300 dark:bg-green-900 dark:text-green-300 dark:border-green-700",
    icon: "M12 8c-3 0-5 1.5-5 3s2 3 5 3 5 1.5 5 3-2 3-5 3m0-12V4m0 16v-2",
  },

  [PatientQueryStatus.COMPLETED]: {
    label: "Completed",
    style:
      "bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700",
    icon: "M5 13l4 4L19 7",
  },

  [PatientQueryStatus.CLOSED]: {
    label: "Closed",
    style:
      "bg-gray-200 text-gray-800 border-gray-400 dark:bg-gray-900 dark:text-gray-400 dark:border-gray-700",
    icon: "M6 18L18 6M6 6l12 12",
  },

  [PatientQueryStatus.PAYMENT_PENDING]: {
    label: "Payment Pending",
    style:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700",
    icon: "M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z",
  },
  [PatientQueryStatus.INITIAL_FUND_RELEASED]: {
    label: "Initial Fund Released",
    style:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700",
    icon: "M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z",
  },
  [PatientQueryStatus.PARTIALL_FUND_RELEASED]: {
    label: "Partial Fund Released",
    style:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700",
    icon: "M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z",
  },
  [PatientQueryStatus.FULL_FUND_RELEASED]: {
    label: "Full Fund Released",
    style:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-700",
    icon: "M12 8v4l3 3M12 2a10 10 0 100 20 10 10 0 000-20z",
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
    <span className={`${base} ${current.style} ${className}`}>
      <svg
        className="w-3.5 h-3.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={current.icon}
        />
      </svg>
      {current.label}
    </span>
  );
}