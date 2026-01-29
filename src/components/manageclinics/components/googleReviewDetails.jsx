"use client"
import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";




export function GoogleReviewDetails({id}){


       const  [clinicdetails,setClinicDetails] = useState({});
       const [googlecompany,setGoogleCompany] = useState({});
    
    
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
                fetchGooglePlaces(result.data.placesid);
            }
        }
    

        const fetchGooglePlaces = async(id)=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-google-places-details/${id}`,{
            method : "Get",
        });

        if(res.ok){
            const result= await res.json();
            setGoogleCompany(result);
        }
    }






    return(<>
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Google Review Profile <p className="text-sm text-gray-500 mt-1">
                        Reviews for this clinic will be fetched from the selected company profile.
                    </p>
                </h3>
            </div>
            <div className="p-4 md:p-5">
               

                {googlecompany && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-0 dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
                        <a
                            href="#"
                            className="flex flex-col md:flex-row hover:shadow-md transition-shadow duration-300"
                        >

                            <img
                                src={
                                    googlecompany.photos && googlecompany.photos.length > 0
                                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${googlecompany.photos[0].photo_reference}&key=AIzaSyDLW9gvhac3BtawjOx8In-hTS2kTDmnhXw`
                                        : "https://via.placeholder.com/400x300?text=No+Image"
                                }
                                alt={googlecompany.name}
                                className="w-full md:w-48 h-48 md:h-auto object-cover"
                            />


                            <div className="flex flex-col justify-between p-4 md:p-3">
                                <h5 className="text-xl font-semibold text-heading mb-1">
                                    {googlecompany.name}
                                </h5>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    {googlecompany.address}
                                </p>

                                {googlecompany.rating && (
                                    <p className="text-sm text-gray-500 mb-2">
                                        ⭐ {googlecompany.rating} ({googlecompany.total_ratings} reviews)
                                    </p>
                                )}

                                {googlecompany.opening_hours && (
                                    <p
                                        className={`text-sm font-medium ${googlecompany.opening_hours.open_now ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {googlecompany.opening_hours.open_now ? "Open now" : "Closed"}
                                    </p>
                                )}
                            </div>
                        </a>
                    </div>
                )}






            </div>
        </div>
    </>);
}