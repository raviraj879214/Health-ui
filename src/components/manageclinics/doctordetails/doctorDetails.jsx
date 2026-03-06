"use client";

import { useEffect, useState } from "react";
import Label from "@/components/form/Label";
import { adminHeaders } from "@/components/utils/adminHeader";
import HoverZoomImage from "@/reusable/hoverZoomImage";
import { formatBrazilDate } from "../../../lib/formatDate";
import { DoctorSurgeryImages } from "../doctordetails/doctorSurgeryImages";
import {DoctorClinics} from "../doctordetails/doctorClinics";
import {DoctorSpecialty} from "../doctordetails/doctorSpecialty";
import {DoctorSubSpecialty} from "../doctordetails/doctorSubSpecialty";
import {DoctorTreatment} from "../doctordetails/doctorTreatment";
import { Button } from "@headlessui/react";
import { DoctorVerifyStatus } from "@/lib/enums/doctorVerifyStatus";
import { DoctorMakeStatus } from "../doctordetails/doctorMakeStatus";

export function DoctorDetails({ id }) {
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registeredclinic,setRegisteredClinic] = useState({});




  useEffect(() => {
    if (id) {
      fetchDoctorDetails();
    }
  }, [id]);

  const fetchDoctorDetails = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-doctor/get-doctor-details/${id}`,
        {
          method: "GET",
          headers: await adminHeaders(),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch doctor details");
      }

      const result = await res.json();
      setDoctorDetails(result?.data ?? null);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        Loading doctor details...
      </div>
    );
  }

  if (!doctorDetails) {
    return (
      <div className="py-10 text-center text-gray-500 dark:text-gray-400">
        No doctor details available
      </div>
    );
  }

  const test =(data)=>{
    console.log("registerd clinic",data);
    setRegisteredClinic(data);
  }


  const updateDoctorStatus =(data)=>{
    console.log("updated status",data);

        setDoctorDetails((prev) => ({
        ...prev,
        ...data
      }));
  }
    

  const getYouTubeVideoId = (url) => {
  try {
    const parsedUrl = new URL(url);

    // Standard YouTube link
    const v = parsedUrl.searchParams.get("v");
    if (v) return v;

    // Shortened youtu.be link
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1);
    }

    return null;
  } catch (err) {
    return null;
  }
};

  

  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">

        {/* Top Section */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-5 xl:gap-5">

          {/* Image Section */}
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <HoverZoomImage
              src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${doctorDetails.image}`}
              alt="Doctor Profile Picture"
              size={300}
              className="w-full h-full"
            />
          </div>


          <div className="mt-6 sm:mt-8 lg:mt-0 space-y-4">


            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dr. {doctorDetails.firstname} {doctorDetails.lastname}
              </h1>
              <p className="mt-1 text-sm text-indigo-600 dark:text-indigo-400">
                {doctorDetails.degree}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex gap-2">
                <span className="font-medium text-gray-600 dark:text-gray-400">CRM:</span>
                <span className="text-gray-900 dark:text-gray-200">{doctorDetails.crm}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-medium text-gray-600 dark:text-gray-400">CPF:</span>
                <span className="text-gray-900 dark:text-gray-200">{doctorDetails.cpf}</span>
              </div>

              <div className="flex gap-2">
                <span className="font-medium text-gray-600 dark:text-gray-400">Email:</span>
                <span className="text-gray-900 dark:text-gray-200 break-all">
                  {doctorDetails.email}
                </span>
              </div>

              <div className="flex gap-2">
                <span className="font-medium text-gray-600 dark:text-gray-400">DOB:</span>
                <span className="text-gray-900 dark:text-gray-200">
                  {formatBrazilDate(doctorDetails.dob)}
                </span>
              </div>
              
            </div>


           
            <div>
              <p className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                Languages Spoken
              </p>
              <div className="flex flex-wrap gap-2">
                {doctorDetails?.languages
                  ? JSON.parse(doctorDetails.languages).map((lang, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                    >
                      {lang}
                    </span>
                  ))
                  : <span className="text-sm text-gray-500">N/A</span>}
              </div>
            </div>
             <div>
              <p className="font-medium text-gray-600 dark:text-gray-400 mb-1">
                Doctor Profile Status 
              </p>

              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">

                      {DoctorVerifyStatus.PENDING == doctorDetails.DoctorVerify &&(<>Review</>)}
                      {DoctorVerifyStatus.VERIFIED == doctorDetails.DoctorVerify &&(<>Verified</>)}
                      {DoctorVerifyStatus.INACTIVE == doctorDetails.DoctorVerify &&(<>InActive</>)}

                </span>
              </div>
            </div>
           
           
          </div>


          <div className="mt-5 relative rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="absolute -top-3 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-full tracking-wide">
              Clinic
            </div>

            <p className="mt-3 text-xs uppercase tracking-wider text-gray-500">
              Registered By Clinic
            </p>

            <div className="mt-3 flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold">
                {registeredclinic?.name?.charAt(0)}
              </div>


              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-900">
                  {registeredclinic?.name}
                </p>

                <p className="text-xs text-gray-500">
                  Registered on {formatBrazilDate(registeredclinic?.createdAt)}
                </p>
              </div>
            </div>

          </div>


           

           <DoctorMakeStatus DoctorStatus={doctorDetails.DoctorVerify} doctoruuid={doctorDetails.uuid} reason={doctorDetails.Reason} onUpdateStatus={updateDoctorStatus} />

          

            


        
        </div>



        <div className="mt-5">
          <DoctorSpecialty id={id} />
        </div>

        <div className="mt-5">
          <DoctorSubSpecialty id={id} />
        </div>

        <div className="mt-5">
          <DoctorTreatment id={id} />
        </div>

        <div className="mt-5">
           <DoctorClinics  id={id} clinicuuid={doctorDetails.clinicuuid} onData={test}></DoctorClinics>
        </div>
        

        <div className="mt-5">
          <DoctorSurgeryImages id={id}></DoctorSurgeryImages>
        </div>



        <div className="mt-5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Doctor Video 
            </h3>
            <div className="flex items-center gap-x-1"></div>
          </div>
          <div className="p-4 md:p-5">

            <div className="max-h-[400px] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(doctorDetails.videurl)}?autoplay=1&mute=1`}
                  className="w-full h-[50vh]"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>




        <div className="mt-5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Brief Description
            </h3>
            <div className="flex items-center gap-x-1"></div>
          </div>
          <div className="p-4 md:p-5">

            <div className="max-h-[400px] overflow-y-auto">
              <div className=" overflow-hidden">
                <div
                  className="mt-2 text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: doctorDetails.briefDescription || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="mt-5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">
              Full Description
            </h3>
            <div className="flex items-center gap-x-1"></div>
          </div>
          <div className="p-4 md:p-5">

            <div className="max-h-[400px] overflow-y-auto">
              <div className=" overflow-hidden">
                <div
                  className="mt-2 text-gray-500 dark:text-gray-400"
                  dangerouslySetInnerHTML={{
                    __html: doctorDetails.fullDescription || "",
                  }}
                />
              </div>
            </div>
          </div>
        </div>







      </div>
    </section>
  );
}
