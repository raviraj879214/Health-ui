import { addTermsCondition } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { TermsConditionStatus } from "@/lib/enums/TermsCondition";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";




export function PatientTermsCondition({clinicid}){



  const [checkbox,setCheckBox] = useState(false);

  const [terms,setTerms] = useState("");
  const [termsid,setTermsID] = useState("");
  const dispatch = useDispatch();



  useEffect(()=>{
    fetchTerms();
  },[clinicid]);


  const fetchTerms = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-terms/${TermsConditionStatus.patientQuery}`,{
      method :"Get"
    });
    if(res.ok){
      const result = await res.json();
      setTerms(result.data.content);
      setTermsID(result.data.id);
    }
  }





    return(<>
       <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
              <div className="card p-6 border border-gray-200 rounded-xl shadow-md max-h-[500px] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Terms and Conditions</h2>
               <div
                      className="terms-content mb-4"
                      dangerouslySetInnerHTML={{ __html: terms }}
                />


               
              </div>
               <p className="mb-4 flex items-center gap-2 ml-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"

                    onChange={(e) => {
                      const isChecked = e.target.checked; 

                      setCheckBox(isChecked); 
                      dispatch(addTermsCondition(isChecked === true ? "1" : "0"));
                    }}
                  />
                  <label htmlFor="terms" className="text-gray-700">
                    I accept the Terms and Conditions
                  </label>
                </p>

            </div>
          
    
    </>);
}