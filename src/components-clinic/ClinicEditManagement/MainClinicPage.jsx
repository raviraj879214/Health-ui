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
import {GoogleMap} from "./ManageDoctors/googleMap";
import { ClinicStatus } from "@/lib/enums/ClinicStatus";
import { toast } from "react-toastify";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import {GoogleReviews} from "./googlereviews/googleReviews";

export function MainClinic({ clinicuuid }) {

  const [clinicdetail, setClinicDetail] = useState([]);
  const [pingbutton,setPingButton] = useState(false);

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





  const pingAdmin =async ()=>{
    setPingButton(true);
    const clinicmessage = `Hi Admin, ${clinicdetail.name} has requested activation. The clinic has completed all required details. Please review and activate the clinic.`;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/ping-admin`,{
      method : "Post",
      headers : await clinicHeaders(),
      body : JSON.stringify({
        "clinicmessage" : clinicmessage
      })
    });
    if(res.ok){
      const result= await res.json();

      toast.success("Request has been sent to admin",{
        position : "bottom-right",
        autoClose : 3000
      });

      setPingButton(false);

    }




  }


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

        {/* <div
          className="flex flex-col bg-white border theme-border shadow-2xs rounded-xl p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                md:sticky md:top-20">

          <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-neutral-200">
            Profile
          </h4>

          <ul className="space-y-2">


            <li
              onClick={() => scrollToSection(bannerRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
             
              <span>Clinic Images</span>
            </li>

            <li
              onClick={() => scrollToSection(doctorRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
            
              <span>Doctors</span>
            </li>

            <li
              onClick={() => scrollToSection(surgeryRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              
              <span>Before & After Photos</span>
            </li>

            <li
              onClick={() => scrollToSection(accreditationRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
              
              <span>Accreditation & Certification</span>
            </li>

            <li
              onClick={() => scrollToSection(licenseRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
           
              <span>License</span>
            </li>

            <li
              onClick={() => scrollToSection(descriptionRef)}
              className="border theme-border rounded-2xl p-2 w-full flex items-center gap-2 sm:gap-3 text-sm sm:text-base cursor-pointer">
             
              <span>Description</span>
            </li>

          </ul>
        </div> */}


        

      </div>

      <div className="col-span-12 md:col-span-12">

       
        

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

       
        
        
        <div ref={doctorRef}>
          <ListofDoctor clinicuuid={clinicuuid}  ></ListofDoctor>
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

          <div>
              <GoogleReviews uuid={clinicdetail.uuid} placesidparam={clinicdetail.placesid}/>
          </div>

        <div>
            <GoogleMap uuid={clinicdetail.uuid} lat={clinicdetail.latitude} long={clinicdetail.longitude}/>
        </div>

        





      </div>
    </div>
      {clinicdetail.status !== ClinicStatus.PENDING &&(<>
             <div className=" rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] flex items-center justify-between">

          <p className="text-sm text-gray-700 dark:text-gray-300">
            After completing the clinic details, please click Finish Registration to activate the clinic. Once approved, it will be listed on the frontend.
          </p>

          <button
           disabled={pingbutton}
           onClick={()=> pingAdmin()}
            className="btn btn-primary">
              {pingbutton ? (<><ButtonSpinner></ButtonSpinner></>):(<>Finish Registration</>)}
            
          </button>

        </div>
        </>)}
  </>);
}
