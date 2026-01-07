"use client"
import { useEffect, useState, useRef } from "react";
import { HeroSectionbanner } from "../ClinicEditManagement/HeroClinic";
import { clinicHeaders } from "../utils/clinicHeaders";
import { ListofDoctor } from "../ClinicEditManagement/ManageDoctors/ListofDoctors";
import { SurgeryImages } from "../ClinicEditManagement/manage-surgery-images/ManageSurgery";
import { Accreditation } from "../ClinicEditManagement/hospitalaccreditation/HospitalAccreditation";
import { License } from "../ClinicEditManagement//hospitallicense/HospitalLicense";
import { ClinicDescription } from "../ClinicEditManagement/clinicdescription/clinicdesc";
import {MaincategoryBoard} from "../ClinicEditManagement/cliniccategory/MainCategory";
import {MainPackages} from "../ClinicEditManagement/ManagePackages/MainPackages";
import {StripeClinic} from "../ClinicEditManagement/stripeforclinic/stripeClinic";

export function MainClinic({ clinicuuid }) {

  const [clinicdetail, setClinicDetail] = useState([]);

  const fetchclinicdetails = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinics-details/${clinicuuid}`, {
      method: "GET",
      headers: clinicHeaders(),
    });
    if (res.ok) {
      const result = await res.json();
      setClinicDetail(result.data);
    }
  }

  useEffect(() => {
    fetchclinicdetails();
  }, [clinicuuid]);


   const bannerRef = useRef(null);
  const doctorRef = useRef(null);
  const surgeryRef = useRef(null);
  const accreditationRef = useRef(null);
  const licenseRef = useRef(null);
  const descriptionRef = useRef(null);
  const stripeRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (<>

    <div className="grid grid-cols-12 gap-4">

      <div className="col-span-12 md:col-span-2">

        <div
          className="flex flex-col bg-white border theme-border shadow-2xs rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                md:sticky md:top-20">

          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-neutral-200">
            Profile
          </h4>

          <ul className="space-y-2">


            <li
              onClick={() => scrollToSection(bannerRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              {/* <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-100 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-green-700" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div> */}
              <span>Clinic Images</span>
            </li>

            <li
              onClick={() => scrollToSection(doctorRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              {/* <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.715 4.714a.75.75 0 11-1.06 1.06L12 11.646l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </div> */}
              <span>Doctors</span>
            </li>

            <li
              onClick={() => scrollToSection(surgeryRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              {/* <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.715 4.714a.75.75 0 11-1.06 1.06L12 11.646l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </div> */}
              <span>Before & After Photos</span>
            </li>

            <li
              onClick={() => scrollToSection(accreditationRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              {/* <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.715 4.714a.75.75 0 11-1.06 1.06L12 11.646l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </div> */}
              <span>Accreditation & Certification</span>
            </li>

            <li
              onClick={() => scrollToSection(licenseRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              {/* <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.715 4.714a.75.75 0 11-1.06 1.06L12 11.646l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </div> */}
              <span>License</span>
            </li>

            <li
              onClick={() => scrollToSection(descriptionRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              {/* <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-red-100 flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M6.225 4.811a.75.75 0 011.06 0L12 9.525l4.715-4.714a.75.75 0 111.06 1.06L13.06 10.586l4.715 4.714a.75.75 0 11-1.06 1.06L12 11.646l-4.715 4.714a.75.75 0 11-1.06-1.06l4.714-4.715-4.714-4.714a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </div> */}
              <span>Description</span>
            </li>

          </ul>
        </div>


        

      </div>

      <div className="col-span-12 md:col-span-10">
        <br></br>
        <div ref={bannerRef}>
          
             <HeroSectionbanner

        className="mt-1"
          clinicdetail={clinicdetail}
          name={clinicdetail.name}
          clinicuuid={clinicdetail.uuid}
          location={`${clinicdetail.country}, ${clinicdetail.state} ${clinicdetail.city}`} />
        </div>
       

        <br></br>

        {/* Doctor Section */}
        <div ref={doctorRef}>
          <ListofDoctor clinicuuid={clinicuuid} ></ListofDoctor>
        </div>

         <br></br>
      
            <MaincategoryBoard clinicuuid={clinicdetail.uuid}></MaincategoryBoard>

         <br></br>


            <MainPackages clinicuuid={clinicdetail.uuid}></MainPackages>

        <br></br>
        
        <div ref={surgeryRef}>
            <SurgeryImages  clinicuuid={clinicdetail.uuid}></SurgeryImages>
        </div>

        <br></br>

        {/* Accreditation */}
        <div ref={accreditationRef}>
          <Accreditation clinicuuid={clinicdetail.uuid} className="mt-2"></Accreditation>
        </div>

        <br></br>

        {/* License */}
        <div ref={licenseRef}>
          <License className="mt-2"></License>
        </div>

        <br></br>

        
        <div ref={descriptionRef}>
          <ClinicDescription clinicuuid={clinicdetail.uuid}></ClinicDescription>
        </div>

        <div ref={stripeRef}>
          
            <StripeClinic clinicuuid={clinicdetail.uuid} ></StripeClinic>
        </div>




      </div>
    </div>
  </>);
}
