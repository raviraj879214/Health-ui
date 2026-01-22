import { FaPen } from "react-icons/fa";



export function ClinicCommssion(){





    return(<>
        <div className="flex items-center gap-2 text-sm font-medium mt-3">
            <span className="text-gray-600">Clinic Commission:</span>

            <span className="text-green-500 font-semibold">0%</span>

            <button
                type="button"
                className="text-indigo-500 hover:text-indigo-700 transition"
                aria-label="Edit commission"
            >
                <FaPen className="w-4 h-3" />
            </button>
        </div>



    </>);
}