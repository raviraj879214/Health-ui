"use client"
import { useState, useEffect } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TextArea from "@/components/form/input/TextArea";
import {BannerSlider} from "./components/bannerSlider";
import {DoctorList} from "../manageclinics/components/doctorList";
import { adminHeaders } from "../utils/adminHeader";
import {SurgeryImages} from "../manageclinics/components/surgeryImages";
import {ClinicDescription} from "../manageclinics/components/clinicDescription";
import {ClinicSpecialty} from "../manageclinics/components/clinicSpecialty";
import Label from "../form/Label";
import {ClinicSubSpecialty} from "../manageclinics/components/clinicSubSpecialty";
import {ClinicTreatment} from "../manageclinics/components/clinicTreatment";
import {PackageClinicList} from "../manageclinics/components/packageClinicList";
import {StripeDetails} from "./components/stripeDetails";
import {ClinicStatus} from "./components/clinicStatus";
import {ClinicStatusDisplay} from "./components/clinicStatusDisplay";
import { ToastContainer } from "react-toastify";
import {ClinicHeroSection} from "./components/clinicHeroSection";
import {Accreditation} from "./components/accreditation";
import {GoogleLocation} from "./components/googleLocation";
import {GoogleReviewDetails} from "./components/googleReviewDetails";


export function ClinicDetails({id}){


    const [change,setChange] = useState(0);

   

     const handleTrigger = (value) => {
        setChange(value);
    };



    return(<>
     <div className="p-3 flex justify-end">
        <button
          onClick={() => window.location.href = '/admin/manage-clinics'}
          className="btn btn-primary  cursor-pointer"
        >
          <span className="text-lg">← </span>
          <span className="font-medium">Back</span>
        </button>
      </div>
      <ComponentCard title="Clinic Details">

        {/* <div>
            <iframe  src={`${process.env.NEXT_PUBLIC_URL}/partner/clinic/${id}`} width="100%" height="1000"  ></iframe>
        </div> */}

        <ToastContainer></ToastContainer>

          <div className="grid grid-cols-1  gap-2">

            
             <ClinicStatusDisplay trigger={change} id={id} />
          </div>


            <div className="grid grid-cols-2 gap-2">
                
                <BannerSlider id={id}></BannerSlider>

                <ClinicHeroSection id={id} />

            </div>

            <div className="grid grid-col-1">
                <DoctorList id={id}/>
            </div>

            <div className="grid grid-col-1">
                    <PackageClinicList id={id} />
            </div>
           
            <div className="grid grid-col-1">
               <SurgeryImages id={id}></SurgeryImages>
            </div>

            <div className="grid grid-col-1">
                   <ClinicSpecialty id={id} />
            </div>



              <div className="grid grid-col-1">
                    <ClinicSubSpecialty id={id}></ClinicSubSpecialty>
              </div>


              <div className="grid grid-col-1">
                   <ClinicTreatment id={id}></ClinicTreatment>

            </div>



            <div className="grid grid-col-1">

                <Accreditation id={id} />
               


            </div>

            <div className="grid grid-col-1">

                <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Hospital License
                        </h3>
                        <div className="flex items-center gap-x-1">

                        </div>
                    </div>
                    <div className="p-4 md:p-5">
                        <p className="mt-2 text-gray-500 dark:text-neutral-400">
                            With supporting text below as a natural lead-in to additional content.
                            
                        </p>
                        
                    </div>
                </div>


            </div>

            <div className="grid grid-cols-1 gap-4 ">
               <ClinicDescription id={id}></ClinicDescription>
            </div>


            <div className="grid grid-cols-1 gap-4 ">
               <StripeDetails id={id}></StripeDetails>
            </div>

            <div className="grid grid-cols-1 gap-4 ">
                <GoogleReviewDetails id={id} />
            </div>

             <div className="grid grid-cols-1 gap-4 ">
                 <GoogleLocation id={id} />
            </div>



            <div className="grid grid-cols-1 gap-4 ">
                <ClinicStatus onTrigger={handleTrigger} id={id} />
            </div>











        </ComponentCard>

    
    </>);
}