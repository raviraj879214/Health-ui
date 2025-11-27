
"use client"
import { useEffect, useState } from "react";
import {HeroSectionbanner} from "../ClinicEditManagement/HeroClinic";
import { clinicHeaders } from "../utils/clinicHeaders";
import {ListofDoctor} from "../ClinicEditManagement/ManageDoctors/ListofDoctors";
import {SurgeryImages} from "../ClinicEditManagement/manage-surgery-images/ManageSurgery";
import {Accreditation} from "../ClinicEditManagement/hospitalaccreditation/HospitalAccreditation";
import {License} from "../ClinicEditManagement//hospitallicense/HospitalLicense";

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


  <div className="col-span-12 md:col-span-2">

   <div
  className="flex flex-col bg-white border theme-border shadow-2xs rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                md:sticky md:top-20">

  <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-neutral-200">
    Currently Added Content
  </h4>

  <ul className="space-y-2">


    <li
      className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base">

      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-green-700" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      </div>

      <span>Clinic Images</span>
    </li>


    <li
      className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base">

      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.715 4.714a.75.75 0 11-1.06 1.06L12 11.646l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd"/>
        </svg>
      </div>

      <span>Doctors</span>
    </li>

  </ul>
</div>


        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6
                md:sticky md:top-80 mx-auto md:mx-0">
  <div className="mb-4">
    <h2 className="text-lg font-semibold text-gray-800">Clinic Agreement</h2>
    <p className="text-gray-600 text-sm mt-1">
      Please review the agreement before proceeding.
    </p>
  </div>
  <button
    className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
    onClick={() => alert("Agreement Checked!")}
  >
    Check Agreement
  </button>
</div>



  </div>


  <div className="col-span-12 md:col-span-10">
    <HeroSectionbanner className="mt-1"
      name={clinicdetail.name}
      clinicuuid={clinicdetail.uuid}
      location={`${clinicdetail.country}, ${clinicdetail.state} ${clinicdetail.city}`} />


    <ListofDoctor className="mt-2"></ListofDoctor>

     <SurgeryImages className="mt-2"></SurgeryImages> 

      <Accreditation  className="mt-2"></Accreditation>
      <License  className="mt-2"></License>


  </div>

</div>

    </>);

}