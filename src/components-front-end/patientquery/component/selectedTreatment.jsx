import { addStep, clearTreatmentID } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useDispatch, useSelector } from "react-redux";






export function SelectedTreatment(){

    const dispatch = useDispatch();
    const treatmentid = useSelector((state) => state.patientquery.treatmentid);
    const treatmentname = useSelector((state) => state.patientquery.treatmentName);



    return(<>
   <div className="bg-gray-50 flex flex-col items-center py-10 px-4">
 
  <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6 max-w-3xl mx-auto leading-relaxed">
    Would you like to proceed with {treatmentname} treatment?
  </h2>

  <div className="flex justify-center mt-4">
    <ul className="w-full max-w-sm space-y-4 list-none">
      <li
       onClick={()=> dispatch(addStep())}
        className="px-6 py-4 rounded-xl cursor-pointer
                   bg-green-50 border border-green-300 text-green-800
                   hover:bg-green-100 transition-all"
      >
        Yes, I’m interested
      </li>


      <li
        onClick={() => dispatch(clearTreatmentID())}
        className="px-6 py-4 rounded-xl cursor-pointer
                   bg-blue-50 border border-blue-300 text-blue-800
                   hover:bg-blue-100 transition-all"
      >
        No, I’d like to explore other options
      </li>


    </ul>
  </div>
</div>

           



    
    </>);
}