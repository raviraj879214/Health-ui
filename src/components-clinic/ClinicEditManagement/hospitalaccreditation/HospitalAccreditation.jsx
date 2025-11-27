
"use client";
import ComponentCard from "@/components/common/ComponentCard";
import { useConfirm } from "@/hooks/useConfirm";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";



export function Accreditation(){

    const [accreditaion,setAccreditation] = useState([]);
    const { confirm, ConfirmDialog } = useConfirm();








    return(<>
            <ComponentCard title={"Hospital Accreditation & Certification"}>
                <div className="flex justify-end mb-4">
                <button  className="btn btn-primary font-semibold">
                <FaEdit></FaEdit> Edit Accreditation
                </button>
         </div>
                <ConfirmDialog></ConfirmDialog>
                    {accreditaion.length == 0 ? (<p className="text-center text-gray-500 text-lg font-medium mt-12">
                No Accreditation
            </p>) : (<>
            






            
            </>)} 
            </ComponentCard>
    </>);
}