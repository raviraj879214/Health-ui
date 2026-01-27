import { addMedicalreports, addStep, addWhatMatterMost } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useDispatch, useSelector } from "react-redux";





export function MedicalReport(){

      const dispatch = useDispatch();
    const medicalReportsID =useSelector((state) => state.patientquery.medicalReportsID);;
    const medicalReportstValue = useSelector((state) => state.patientquery.medicalReportstValue);


    const OnSelect = async(id,name)=>{

        // dispatch(addStep());
        dispatch(addMedicalreports({name : name , id : id}));
    }


    return(<>
     <div className="bg-gray-50 flex flex-col items-center py-10 px-4">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6 max-w-3xl mx-auto leading-relaxed">
   Can you provide images or medical medical reports that describe the reason you are looking for medical assistance?
  </h2>

  <div className="flex justify-center mt-4 w-full">
   
                <ul className="w-full max-w-md space-y-4 list-none">
                    <li
                     onClick={()=> OnSelect("yes","Yes")}
                        className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">

                        <span>Yes</span>

                       
                         {medicalReportsID === "yes" &&(
                             <svg
                            className="shrink-0 size-4 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                         )} 
                    </li>


                    <li
                     onClick={()=> OnSelect("no","No")}
                    className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">
                        No
                        {medicalReportsID === "no" &&(
                             <svg
                            className="shrink-0 size-4 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                         )} 
                    </li>

                </ul>
  </div>
</div>
    
    </>);
}