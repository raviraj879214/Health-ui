"use client"
import { useDispatch, useSelector } from "react-redux";
import { nextStep, prevStep } from "../redux/partnerregister/registerSlice";
import {StepOne} from "../partnerregisters/steps/stepOne";
import {StepTwo} from "../partnerregisters/steps/stepTwo";
import {StepThree} from "../partnerregisters/steps/stepThree";
import {StepFour} from "../partnerregisters/steps/stepFour";


export function MainPage() {

    const step = useSelector((state) => state.register.step);
    const dispatch = useDispatch();



    return (<>
        {step === 1 && <StepOne></StepOne>}
        {step === 2 && <StepTwo></StepTwo>}
        {step === 3 && <StepThree></StepThree>}
        {step === 4 && <StepFour></StepFour>}
        
    </>);
}