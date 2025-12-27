"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { SurgeriesCarouselImages } from "../manage-surgery-images/SurgerCarousel";
import {AddSurgeryImage} from "../manage-surgery-images/AddSurgeryImages";
import { useState } from "react";

export function SurgeryImages({clinicuuid}) {


    const [trigger,setTrigger] = useState("");


    const handldata = (data)=>{
       
        setTrigger(data);
    }


    return (
        <>
            <ComponentCard title="Before & After Photos">
              
        
                <AddSurgeryImage  sendData={handldata} clinicuuid={clinicuuid}></AddSurgeryImage>

                <SurgeriesCarouselImages dataReset={trigger} clinicuuid={clinicuuid}/>


            </ComponentCard>

        </>
    );
}
