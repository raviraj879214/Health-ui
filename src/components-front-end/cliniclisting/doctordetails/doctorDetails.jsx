"use client";
import { useEffect, useState } from "react";
import Carouseld, { Carousel } from "./Carousel";
import { Helmet } from "react-helmet";
import Link from "next/link";






export function DoctorDetails({id}){


    const [doctor,setDoctor] = useState({});

    const [surgeryimages,setSurgeryImages] = useState([]);


    useEffect(()=>{

        fetchDoctor();
    },[id]);


    

    const fetchDoctor = async()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-listing/get-doctor-details/${id}`,{method : "Get"});

        if(res.ok){
            const result= await res.json();
            setDoctor(result.data);
            setSurgeryImages(result.surgerImages);
        }
    }

    const languages = doctor.languages ? JSON.parse(doctor.languages) : [];


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


    return(<>

      <Helmet>
       <title>{`Dr. ${doctor.firstname} ${doctor.lastname}   | Treatments & Doctors | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`}</title>
       <meta name="description" content={`Explore treatments, specialties, doctors, facilities, and medical tourism services available with Dr. ${doctor.firstname} ${doctor.lastname} at ${process.env.NEXT_PUBLIC_PROJECT_NAME}. Get treatment details and request a consultation today.`}/>
       <meta property="og:title" content={`Dr. ${doctor.firstname} ${doctor.lastname} | Treatments & Doctors | ${process.env.NEXT_PUBLIC_PROJECT_NAME}`} />
       <meta property="og:description" content={`Explore treatments, specialties, doctors, facilities, and medical tourism services available with Dr. ${doctor.firstname} ${doctor.lastname} at ${process.env.NEXT_PUBLIC_PROJECT_NAME}. Get treatment details and request a consultation today.`} />
       <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/doctor-info/${id}`} />
       <meta property="og:image" content={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${doctor.image}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={`${process.env.NEXT_PUBLIC_PROJECT_NAME}`} />
      <meta name="publisher" content={`${process.env.NEXT_PUBLIC_PROJECT_NAME}`} />

       <Link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}/doctor-info/${id}`} />

       <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Physician",
      name: `Dr. ${doctor.firstname} ${doctor.lastname}`,
      url: `${process.env.NEXT_PUBLIC_URL}/doctor-info/${id}`,
      image: `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${doctor.image}`,
      description: `Explore treatments, specialties, doctors, facilities, and medical tourism services available with Dr. ${doctor.firstname} ${doctor.lastname} at ${process.env.NEXT_PUBLIC_PROJECT_NAME}. Get treatment details and request a consultation today.`,
      medicalSpecialty: doctor.specialization?.name,
      worksFor: {
        "@type": "Hospital",
        name: doctor.clinic?.name,
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: doctor.clinic?.city,
        addressCountry: doctor.clinic?.country,
      },
    })}
  </script>









      </Helmet>




      <div className="bg-gray-100">
       
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${doctor.image}`}
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"/>

                   
                  <h1 className="text-xl font-bold">Dr. {doctor.firstname} {doctor.lastname} </h1>
                  <p className="text-gray-700">{doctor.degree}</p>

                </div>
                <hr className="my-6 border-t border-gray-300" />

              </div>
            </div>

            <div className="col-span-4 sm:col-span-9 space-y-6">



              <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">

                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                 Overview 
                </h2>

              
                <div className="space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300">

                  {/* Name */}
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white min-w-[110px]">
                      Name
                    </span>
                    <span>:</span>
                    <span>
                      Dr. {doctor.firstname} {doctor.lastname}
                    </span>
                  </div>

                  {/* Specialization */}
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white min-w-[110px]">
                      Specialization
                       
                    </span>
                    <span>:</span>
                      <div className="flex flex-wrap gap-2">
                      <div className="flex flex-wrap gap-2">
                        
                        {doctor.specializations?.map((item, index) => (
                          <span
                            key={item?.specialty?.id || index}
                            className="px-2 py-1 text-xs sm:text-sm bg-green-100 text-black-700 rounded-full"
                          >
                            {item?.specialization?.name || "N/A"}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white min-w-[110px]">
                      Speaks
                    </span>
                    <span>:</span>
                    <div className="flex flex-wrap gap-2">
                      {languages.map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded-full"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

              </div>


              <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">

                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  About Doctor
                </h2>

                <div className="text-gray-600 leading-relaxed space-y-3 text-sm sm:text-base">
                  <p dangerouslySetInnerHTML={{ __html: doctor.briefDescription }} />
                  <p dangerouslySetInnerHTML={{ __html: doctor.fullDescription }} />
                </div>
              </div>


              <div className="border-t border-gray-200"></div>
            </div>
          </div>

          
          {surgeryimages.length > 0 && (<>
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100 mb-4">

              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                Surgeon's portfolio
              </h2>

              <div className="">
                <Carousel data={surgeryimages} />
              </div>
            </div>
          </>)}

          {doctor.videurl && (<>
            <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">

              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                Video
              </h2>

              <div className="">
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(doctor.videurl)}?autoplay=1&mute=1`}
                  className="w-full h-[50vh]"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>

          </>)}
         



        </div>
      </div>
    
    </>);
}