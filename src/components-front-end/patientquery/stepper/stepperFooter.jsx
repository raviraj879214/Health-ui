import { addStep, prevStep } from "../../redux/patinetquery/patientQueryRedux";
import { useDispatch } from "react-redux";




export function StepperFooter(){

  const dispatch = useDispatch();


    return(<>
            <div className="w-full  mx-auto bg-indigo-100 border-2 border-gray-400 rounded-md">
  <div className="flex items-center justify-between gap-3 p-3 bg-white rounded">
    <button
     onClick={()=> dispatch(prevStep())}
     className="flex items-center gap-1.5 border-none text-base font-medium py-2.5 text-gray-700 transition-all duration-300 hover:text-indigo-600">

      <svg
        className="rotate-180"
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={23}
        viewBox="0 0 22 23"
        fill="none"
      >
        <path
          d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Back

    </button>
    <div className="w-full  bg-gray-100 rounded-3xl h-2 ">
      <div className="bg-indigo-600 h-2 rounded-3xl" style={{ width: "0%" }} />
    </div>
    <button 
    onClick={()=> dispatch(addStep())}
    className="flex items-center gap-1.5 border-none text-base font-medium py-2.5 text-gray-700 transition-all duration-300 hover:text-indigo-600">
      Next
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={22}
        height={23}
        viewBox="0 0 22 23"
        fill="none"
      >
        <path
          d="M8.25324 6.37646L13.7535 11.8767L8.25 17.3802"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  </div>
    </div>
    
    </>);
}