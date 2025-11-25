
"use client"
import { useEffect, useState } from "react";
import {HeroSectionbanner} from "../ClinicEditManagement/HeroClinic";
import { clinicHeaders } from "../utils/clinicHeaders";
import {ListofDoctor} from "../ClinicEditManagement/ManageDoctors/ListofDoctors";


export function MainClinic({clinicuuid}){
        const[clinicdetail,setClinicDetail] = useState([]);

        const fetchclinicdetails = async()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinics-details/${clinicuuid}`,{
                method : "GET",
                headers : clinicHeaders(),
            });
            if(res.ok){
                const result = await res.json();
                setClinicDetail(result.data);
            }
        }

        useEffect(()=>{
            fetchclinicdetails();
        },[clinicuuid]);




    return(<>

       <div className="grid grid-cols-12 gap-4">
            <div className="col-span-2">
            </div>
            <div className="col-span-10">
              
                <HeroSectionbanner className="mt-1" name={clinicdetail.name} clinicuuid={clinicdetail.uuid} location={`${clinicdetail.country}, ${clinicdetail.state} ${clinicdetail.city}`} />
                

                <ListofDoctor className="mt-2"></ListofDoctor>



            </div>
        </div>
    </>);

}