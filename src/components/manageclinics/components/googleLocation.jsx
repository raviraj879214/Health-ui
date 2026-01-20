
import { useEffect, useState } from "react";
import LocationMap from "../../../googlemapscomponents/locationMap";
import { adminHeaders } from "@/components/utils/adminHeader";



export function GoogleLocation({id}){

    const  [clinicdetails,setClinicDetails] = useState({});


    useEffect(()=>{
        fetchClinicDetails();

    },[id]);

    const fetchClinicDetails = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-details/${id}`,{
            method : "Get",
            headers : await adminHeaders(),
        });
        if(res.ok){
            const result = await res.json();

            setClinicDetails(result.data);
        }

    }

    

    return(<>
    


    
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Google Location Address
                </h3>
            </div>
            <div className="p-4 md:p-5">
                
                <LocationMap lat={clinicdetails.latitude} lng={clinicdetails.longitude} />

            </div>
        </div>
                     

    </>);
}