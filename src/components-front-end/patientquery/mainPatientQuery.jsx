"use client"
import { useDispatch, useSelector } from "react-redux";
import { addStep, addTreatmentID, clearAll, clearAllPatientQuery, clearPrevious, clearStep, clearTreatmentID, prevStep, setStep } from "../redux/patinetquery/patientQueryRedux";
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
import { useEffect, useState } from "react";




export function MainPatinetQuery({ id, name }) {


    const step = useSelector((state) => state.patientquery.step);
    const treatmentid = useSelector((state) => state.patientquery.treatmentid);
    const refresh = useSelector((state) => state.patientquery.refresh);

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



    return (<>


       

        
      
            <div className="w-4/5 mx-auto p-4 border border-gray-300 rounded-2xl mb-20 mt-20">
            <div className="bg-white rounded-xl shadow-lg p-6 mt-4 mb-4">
                


                <Progressbar step={step} />

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


              {PatientQueryQuestion.PATIENTPHONENUMBER == step &&(<><PatientPhoneNumber /> </>)}



            </>
          )}
            

               



                   

 <div className="flex items-end justify-between w-full mt-4">
  <button
    className="btn btn-secondary rounded-4xl bg-gray-300 text-gray-800 px-6 py-2"
    onClick={() => dispatch(prevStep())} // replace with your back action
  >
    Back
  </button>


  
                
                {(PatientQueryQuestion.PATIENTEMAIL === step || PatientQueryQuestion.PATIENTPHONENUMBER === step) && (<>
                   <button
                        className="btn btn-primary rounded-4xl bg-red-400 px-6 py-2"
                        onClick={() => dispatch(addStep())}
                    >
                        Skip
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