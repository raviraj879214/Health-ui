
"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useState } from "react";
import {StripeMainAccountDetails} from "./stripeMainAccountDetails";
import {ClinicpackageDetails} from "./clinicpackageDetails";


export function MainPayout(){

    const [reload,setReload] = useState("");




    const onStripetransfer=(data)=>{
       
        setReload(data);
    }



    return(<>


        <StripeMainAccountDetails rel={reload} />
        <ClinicpackageDetails   onPayment={onStripetransfer} />



       






    
    </>);
}