
"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useState } from "react";
import {StripeMainAccountDetails} from "./stripeMainAccountDetails";
import {ClinicpackageDetails} from "./clinicpackageDetails";
import {PayoutModal} from "./newmodalpayout/payoutModal";


export function MainPayout(){

    const [reload,setReload] = useState("");




    const onStripetransfer=()=>{
       
        const rand = Math.random();
        setReload(rand);

    }



    return(<>
    

        <StripeMainAccountDetails rel={reload} />



        <PayoutModal OnTriggerStripeBalance={onStripetransfer}/>


    </>);
}