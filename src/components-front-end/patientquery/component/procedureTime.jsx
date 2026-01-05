import { addMedicalreports, addProcedureTime, addStep, addWhatMatterMost } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useDispatch, useSelector } from "react-redux";





export function ProcedureTime(){

      const dispatch = useDispatch();
    const procedureTimeID =useSelector((state) => state.patientquery.procedureTimeID);;
    const procedureTimevalue = useSelector((state) => state.patientquery.procedureTimevalue);



    const OnSelect = async(id,name)=>{
        dispatch(addStep());
        dispatch(addProcedureTime({name : name , id : id}));
    }



    return(<>
     <div className="bg-gray-50 flex flex-col items-center py-10 px-4">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6 max-w-3xl mx-auto leading-relaxed">
   When do you intend to have the procedure done? 
  </h2>

  <div className="flex justify-center mt-4 w-full">
   
                <ul className="w-full max-w-md space-y-4 list-none">

                    <li
                     onClick={()=> OnSelect("as-soon-as-possible","As soon as possible")}
                        className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">

                        <span>As soon as possible</span>

                       
                         {procedureTimeID === "as-soon-as-possible" &&(
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
                     onClick={()=> OnSelect("within-a-month","Within a month")}
                        className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">

                        <span>Within a month</span>

                       
                         {procedureTimeID === "within-a-month" &&(
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
                     onClick={()=> OnSelect("1-3-month","In 1-3 months")}
                        className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">

                        <span>In 1-3 months</span>

                       
                         {procedureTimeID === "1-3-month" &&(
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
                     onClick={()=> OnSelect("i-dont-know","I don’t know yet")}
                        className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">

                        <span>I don’t know yet</span>

                       
                         {procedureTimeID === "i-dont-know" &&(
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