import { nextStep, prevStep } from "@/components-front-end/redux/partnerregister/registerSlice";
import { TermsConditionStatus } from "@/lib/enums/TermsCondition";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";



export function StepSix(){
  const step = useSelector((state) => state.register.step);
  const clinicid = useSelector((state) => state.register.clinicid);
  const [checkbox,setCheckBox] = useState(false);
  const dispatch = useDispatch();
  const [button,setButton] = useState(false);

  const [terms,setTerms] = useState("");
  const [termsid,setTermsID] = useState("");



  useEffect(()=>{
    fetchTerms();
  },[clinicid]);


  const fetchTerms = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/get-terms/${TermsConditionStatus.clinicregisration}`,{
      method :"Get"
    });
    if(res.ok){
      const result = await res.json();
      setTerms(result.data.content);
      setTermsID(result.data.id);
    }
  }








        const acceptTerms = async()=>{
          
          if (checkbox === false) {
            alert("You must accept the terms to proceed.");
            return;
          } 
          setButton(true);
          const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/partner-register/accept-clinic-terms`,{
            method : "Post",
            headers :{
              "content-type" : "application/json"
            },
            body: JSON.stringify({
                "TermsID" : termsid,
                "clinicid" : clinicid,
            })
          });
          if(res.ok){
              dispatch(nextStep());
          }
          setButton(false);
        }






    return(<>
    
      <div className="my-20">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-3">
                Become a Partner 
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Join our partner network and grow your business with us.
              </p>
            </div>
    
            <div className="relative bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-8 md:p-10">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[var(--primary)] text-white px-5 py-1 rounded-full text-sm font-medium shadow">
                Step {step} of 6
              </div>
    
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 mt-8">
              <div className="card p-6 border border-gray-200 rounded-xl shadow-md max-h-[500px] overflow-y-auto">
                
               <div
                       className="cms-content mx-auto my-8 max-w-7xl px-6"
                      dangerouslySetInnerHTML={{ __html: terms }}
                />


               

              </div>
               <p className="mb-4 flex items-center gap-2 ml-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"

                    onChange={(e) => {
                      const isChecked = e.target.checked; // true or false

                      setCheckBox(isChecked); // store true/false in state
                    }}
                  />
                  <label htmlFor="terms" className="text-gray-700">
                    I accept the Terms and Conditions
                  </label>
                </p>
            </div>

              <div className="mt-12 flex items-center justify-between border-t pt-8">
                <button
                 onClick={()=> dispatch(prevStep())}
                  type="button"
                  className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50">
                  ← Back
                </button>
    
                <button
                  onClick={()=> acceptTerms()}
                  id="submitOtpButton"
                  type="submit"
                  className="btn btn-primary flex items-center justify-center gap-2"
                >
                  {button ? (<>
                    <ButtonSpinner></ButtonSpinner>
                  </>):(<>
                   Continue →
                  </>)}

                 


                </button>
              </div>
            </div>
          </div>
        </div>


    
    
    </>);
}