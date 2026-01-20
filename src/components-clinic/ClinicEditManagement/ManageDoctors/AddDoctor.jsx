"use client"
import { useState } from "react";
import { DoctorOne } from "../ManageDoctors/DoctorStepOne";
import {DoctorTwo} from "../ManageDoctors/DoctorStepTwo";
import {DoctorThree} from "../ManageDoctors/DoctorStepThree";
import {DoctorFour} from "../ManageDoctors/DoctorStepFour";
import {DoctorFive} from "../ManageDoctors/DoctorStepFive";
import {DoctorSix} from "../ManageDoctors/doctorSix";
import {DoctorSeven} from "../ManageDoctors/doctorSeven";


export function DoctorSteps({ onClose , clinicuuid , doctoruuid , stepcount}) {
  

  const [step, setStep] = useState(stepcount);

  

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);


  return (
    <>
   
      {step === 1 && <DoctorOne onClose={onClose} nextStep={nextStep}  clinicuuid={clinicuuid} doctoruuid={doctoruuid}/>}
      {step === 2 && <DoctorTwo onClose={onClose} nextStep={nextStep} prevStep={prevStep} clinicuuid={clinicuuid} doctoruuid={doctoruuid}/>}
      {step === 3 && <DoctorThree onClose={onClose} nextStep={nextStep} prevStep={prevStep}  clinicuuid={clinicuuid} doctoruuid={doctoruuid}/>}
      {step === 4 && <DoctorFour onClose={onClose} prevStep={prevStep}  clinicuuid={clinicuuid} doctoruuid={doctoruuid}/> }
      {step === 5 && <DoctorFive onClose={onClose} prevStep={prevStep}  clinicuuid={clinicuuid} doctoruuid={doctoruuid}/> }
      {step === 6 && <DoctorSix onClose={onClose} prevStep={prevStep}  clinicuuid={clinicuuid} doctoruuid={doctoruuid}/> }
      {step === 7 && <DoctorSeven onClose={onClose} prevStep={prevStep}  clinicuuid={clinicuuid} doctoruuid={doctoruuid}/> }
      
    </>
  );
}
