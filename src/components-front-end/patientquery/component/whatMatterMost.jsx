import { addStep, addWhatMatterMost } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useDispatch, useSelector } from "react-redux";




export function WhatMatterMost(){

    const dispatch = useDispatch();
    const whattmattermostid =useSelector((state) => state.patientquery.whattmattermostid);;
    const whattmattermostname = useSelector((state) => state.patientquery.whattmattermostname);


    const OnSelect = async(id,name)=>{
        dispatch(addStep());
        dispatch(addWhatMatterMost({name : name , id : id}));
    }





    return(<>
     <div className="bg-gray-50 flex flex-col items-center py-10 px-4">
  <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6 max-w-3xl mx-auto leading-relaxed">
    What matters most when choosing a clinic?
  </h2>

  <div className="flex justify-center mt-4 w-full">
   
                <ul className="w-full max-w-md space-y-4 list-none">
                    <li
                     onClick={()=> OnSelect("doc-exp-rep","Doctor’s experience and reputation")}
                        className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">

                        <span>Doctor’s experience and reputation</span>

                       
                         {whattmattermostid === "doc-exp-rep" &&(
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
                     onClick={()=> OnSelect("price","Price")}
                    className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">
                        Price
                        {whattmattermostid === "price" &&(
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
                    onClick={()=> OnSelect("clin-rat-rev","Clinic ratings and reviews")}
                     className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">
                        Clinic ratings and reviews
                         {whattmattermostid === "clin-rat-rev" &&(
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
                    onClick={()=> OnSelect("all-above","All of the above")}
                    className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">
                        All of the above
                            {whattmattermostid === "all-above" &&(
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
                     onClick={()=> OnSelect("not-sure"," Not sure — I need more information from different clinics")}
                      className="px-6 py-4 rounded-xl cursor-pointer
                                bg-white border border-indigo-600 text-gray-800
                                hover:bg-gray-50 transition-all
                                flex items-center justify-between">
                        Not sure — I need more information from different clinics
                          {whattmattermostid === "not-sure" &&(
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