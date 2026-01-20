"use client"
import { useDispatch, useSelector } from "react-redux";
import { addStep, addTreatmentID, clearAll, clearAllPatientQuery, clearPrevious, clearStep, clearTreatmentID, customStep, prevStep, setStep } from "../redux/patinetquery/patientQueryRedux";
import { SelectTreatment } from "./component/selectTreatment";
import { SelectedTreatment } from "./component/selectedTreatment";
import { PatientQueryQuestion } from "@/lib/enums/PatientQueryFrontEnd";
import { StepperFooter } from "./stepper/stepperFooter";
import { Progressbar } from "./stepper/progressBar";
import {WhatMatterMost} from "./component/whatMatterMost";
import {MedicalReport} from "./component/medicalReport";
import {ProcedureTime} from "./component/procedureTime";
import {NamePatient} from "./component/namePatient";
import {PatientEmail} from "./component/patientEmail";
import {PatientPhoneNumber} from "./component/patientPhoneNumber";
import {PatientNonVerifiedSuccessPage} from "./component/patientNonVerifiedSuccessPage";
import {PatientVerifiedSuccessPage} from "./component/patientVerifiedSuccessPage";
import {PatientTermsCondition} from "./component/patientTermsCondition";
import { useEffect, useState } from "react";




export function MainPatinetQuery({ id, name }) {


            const step = useSelector((state) => state.patientquery.step);
            const treatmentid = useSelector((state) => state.patientquery.treatmentid);
            const refresh = useSelector((state) => state.patientquery.refresh);
            const [loading,setLoading] = useState(false);
            const [querycode,setQuerycode] = useState("");



            const patientName = useSelector((state) => state.patientquery.patientName);
            const patientEmail = useSelector((state) => state.patientquery.patientEmail);

            const treatmentName = useSelector((state) => state.patientquery.treatmentName);
            const whattmattermostname = useSelector((state) => state.patientquery.whattmattermostname);
            const medicalReportstValue = useSelector((state) => state.patientquery.medicalReportstValue);
            const procedureTimevalue = useSelector((state) => state.patientquery.procedureTimevalue);
            const medicalcordinatorIDdd = useSelector((state) => state.patientquery.medicalCordinatorID);
            const phoneNumber = useSelector((state) => state.patientquery.phoneNumber);
            const termsCondition = useSelector((state) => state.patientquery.termsCondition);
            const phoneNumberVerified = useSelector((state) => state.patientquery.phoneNumberVerified);
           


            const stepsfinalize = phoneNumberVerified === "0" ? 8 : 9;



          //  const emailotp = useSelector((state) => state.patientquery.emailotp);
          //  const patientStep = useSelector((state) => state.patientquery.patientStep);
          //  const procedureTimeID = useSelector((state) => state.patientquery.procedureTimeID);
          //  const medicalReportsID = useSelector((state) => state.patientquery.medicalReportsID);
          //  const whattmattermostid = useSelector((state) => state.patientquery.whattmattermostid);
          //  const treatmentidhook = useSelector((state) => state.patientquery.treatmentid);

      





    const dispatch = useDispatch();


    const [continues,setContinues] = useState(false);

    useEffect(()=>{
        setContinues(refresh);
    },[]);

    

    const clearall=()=>{
       
       dispatch(clearAllPatientQuery());
        window.location.href = '';
    }

    const continuestep =()=>{
       setContinues(false);
        
    }


      const skippphonenumber = async()=>{
        debugger;
       
          setLoading(true);


       let payload = {
          patientName: patientName,
          email:  patientEmail,
          phoneNumber: phoneNumber ,
          message: "",
          treatmentName: treatmentName,
          whatMatterMostName:whattmattermostname,
          medicalReportsValue:medicalReportstValue,
          procedureTimeValue: procedureTimevalue,
          clinicId:id,
          cordinatorid: String(medicalcordinatorIDdd)


      };
      


      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-listing/raise-post-query`,{
        method : "Post",
        headers:{
            "content-type" : "application/json"
        },
        body:JSON.stringify(payload)
    });

    if(res.ok){
        const result =await res.json();
        setQuerycode(result.data.querycode);



        // dispatch(addStep());
        dispatch(customStep(stepsfinalize));
    }
          
        setLoading(false);
    }




    return (<>


       

        
      
        <div className="w-4/5 mx-auto p-4 border border-gray-300 rounded-2xl mb-20 mt-20">
          <div className="bg-white rounded-xl shadow-lg p-6 mt-4 mb-4">
               
          {(PatientQueryQuestion.PATIENTNONVERIFIEDSUCCESSPAGE !== step && PatientQueryQuestion.PATIENTVERIFIEDSUCCESSPAGE !== step) && (<Progressbar step={step} />)}

          {continues === "true" ? (<>


            <div className="bg-gray-50 flex flex-col items-center py-16 px-6 ">
              <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10 max-w-2xl leading-snug">
                Would you like to continue?
              </h2>

              <div className="flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md">
                <button
                  onClick={() => continuestep()}
                  className="flex-1 px-6 py-4 rounded-2xl bg-green-600 text-white font-semibold 
                 shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-200"
                >
                  Continue
                </button>

                <button
                  onClick={() => clearall()}
                  className="flex-1 px-6 py-4 rounded-2xl bg-gray-200 text-gray-800 font-semibold 
                 shadow-md hover:bg-gray-300 hover:shadow-lg transition-all duration-200"
                >
                  Start Over
                </button>
              </div>

              <p className="text-center text-gray-500 mt-8 max-w-sm">
                Choosing "No" will discard the current request so you can start a new one.
              </p>
            </div>


          </>) : (

            <>

              {PatientQueryQuestion.SELECTTREATMENT == step && (<>{treatmentid === "" && (<SelectTreatment></SelectTreatment>)}{treatmentid !== "" && (<SelectedTreatment></SelectedTreatment>)}</>)}

              {PatientQueryQuestion.WAHTMATTERMOST == step && (<><WhatMatterMost /></>)}

              {PatientQueryQuestion.MEDICALREPORT == step && (<><MedicalReport /></>)}

              {PatientQueryQuestion.PROCEDURETIME == step && (<><ProcedureTime /></>)}

              {PatientQueryQuestion.NAMEPATIENT == step && (<><NamePatient /></>)}

              {PatientQueryQuestion.PATIENTEMAIL == step && (<><PatientEmail /></>)}

              {PatientQueryQuestion.PATIENTPHONENUMBER == step && (<><PatientPhoneNumber /> </>)}

              {PatientQueryQuestion.PATIENTTERMSCONDITION == step && (<><PatientTermsCondition clinicid={id}  /> </>)}

              {PatientQueryQuestion.PATIENTNONVERIFIEDSUCCESSPAGE == step && (<><PatientNonVerifiedSuccessPage clinicid={id} querycode={querycode} /></>)}

              {PatientQueryQuestion.PATIENTVERIFIEDSUCCESSPAGE == step && (<><PatientVerifiedSuccessPage clinicid={id} querycode={querycode} /></>)}


            </>
          )}
            

               



                   

 <div className="flex items-end justify-between w-full mt-4">


          

                {(PatientQueryQuestion.PATIENTNONVERIFIEDSUCCESSPAGE !== step && PatientQueryQuestion.PATIENTVERIFIEDSUCCESSPAGE !== step) &&(
                    <button
                        className="btn btn-secondary rounded-4xl bg-gray-300 text-gray-800 px-6 py-2"
                        onClick={() => dispatch(prevStep())} // replace with your back action
                      >
                        Back
                    </button>
                )}



                
                {(PatientQueryQuestion.PATIENTEMAIL === step ) && (<>
                  <button
                    className="btn btn-primary rounded-4xl bg-red-400 px-6 py-2"
                    onClick={() => dispatch(addStep()) }
                  >

                    {loading ? (


                      <div role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                      </div>


                    ) : (

                      "Skip"

                    )}
                  </button>
                </>)}
                {(PatientQueryQuestion.PATIENTPHONENUMBER === step) && (<>
                  <button
                    className="btn btn-primary rounded-4xl bg-red-400 px-6 py-2"
                    onClick={() => skippphonenumber() }
                  >

                    {loading ? (


                      <div role="status">
                        <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>


                    ) : (

                      "Skip"

                    )}
                  </button>
                </>)}

                    {(termsCondition === "1" && PatientQueryQuestion.PATIENTNONVERIFIEDSUCCESSPAGE !== step && PatientQueryQuestion.PATIENTVERIFIEDSUCCESSPAGE != step ) &&(<>

                       <button
                       className="btn btn-primary"
                       disabled={loading}
                       onClick={()=> {
                         skippphonenumber();
                        
                       }}>

                          
                          {loading ? (<>
                            
                             <div role="status">
                              <svg aria-hidden="true" className="w-8 h-8 text-neutral-tertiary animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                              </svg>
                              <span className="sr-only">Loading...</span>
                            </div>


                          </>):(<>
                            Finish
                          </>)}
                       </button>
                    
                    </>)}




            </div>
        </div>


             {/* {
                (PatientQueryQuestion.SELECTTREATMENT !== step && PatientQueryQuestion.SelectedTreatment !== step) && (<>
                    <StepperFooter />
                </>)
            } */}

        </div>

        
     
    </>);
}