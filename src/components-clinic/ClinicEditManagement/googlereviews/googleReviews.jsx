"use client"
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import ComponentCard from "@/components/common/ComponentCard";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



export function GoogleReviews({uuid,placesidparam}) {

    const [placesid,setPlacesID] = useState({});
    const [name,setName]= useState("");
    const [button,setButton] = useState(false);

    useEffect(()=>{
        if(placesidparam){
            fetchGooglePlaces(placesidparam);
        }
    },[placesidparam]);

    

    const onFetchPlaceids = async (input) => {
        debugger;
        if(!input){
            setPlacesID("");
            return ;
        }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/get-clinic-places-id/${input}`,{
            method : "Get",
            headers :  clinicHeaders(),
        }); 
        if (!res.ok) {
        console.log("Failed to fetch places:", res.statusText);
        return;
        }
        const result = await res.json();
        setPlacesID(result); 
        
        console.log("Places fetched:", result);
    } catch (err) {
        console.log("Error fetching places:", err);
    }
    };


    const onUpdate = async()=>{

        if(!name){
            alert("Please enter company name");

            return false;
        }

        setButton(true);
        // {placesid.place_id}
        //{uuid}

        const  res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/update-google-company`,{
            method : "Post",
            headers :  clinicHeaders(),
            body: JSON.stringify({
                placesid: placesid.place_id,
                uuid :uuid
            })
        });
        if(res.ok){
            const result= await res.json();
            fetchGooglePlaces(result.data.placesid);

            toast.success("Update company for google review  successfully",{
                position : "bottom-right",
                autoClose : 3000
            });

        }
        setButton(false);
    }


    const fetchGooglePlaces = async(id)=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-request/get-google-places-details/${id}`,{
            method : "Get",
            headers :  clinicHeaders()
        });
        if(res.ok){
            const result= await res.json();
            setPlacesID(result);
            setName(result.name);
        }
    }









    return (<>

       <ComponentCard className="mt-2" title={`Google Reviews (update company name to fetch reviews from Google and display them on the ${process.env.NEXT_PUBLIC_PROJECT_NAME} platform)`}>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

               
                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] ">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Company Name  
                       
                    </label>

                    <div className="flex gap-2">

                        <input
                            value={name}
                            onChange={(e) => {
                                onFetchPlaceids(e.target.value);
                                setName(e.target.value);
                            }}
                            type="text"
                            placeholder="Enter Company name"
                            className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                        />


                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={()=> onUpdate()}
                            disabled={button}
                        >
                            
                            {button ? (<>
                                <ButtonSpinner></ButtonSpinner>
                            </>):(<>
                            Save Changes
                            </>)}
                        </button>
                    </div>
                </div>


               
                {placesid && (
                    <div className="rounded-2xl border border-gray-200 bg-white p-0 dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
                        <a
                            href="#"
                            className="flex flex-col md:flex-row hover:shadow-md transition-shadow duration-300"
                        >

                            <img
                                src={
                                    placesid.photos && placesid.photos.length > 0
                                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placesid.photos[0].photo_reference}&key=AIzaSyDLW9gvhac3BtawjOx8In-hTS2kTDmnhXw`
                                        : "https://via.placeholder.com/400x300?text=No+Image"
                                }
                                alt={placesid.name}
                                className="w-full md:w-48 h-48 md:h-auto object-cover"
                            />


                            <div className="flex flex-col justify-between p-4 md:p-3">
                                <h5 className="text-xl font-semibold text-heading mb-1">
                                    {placesid.name}
                                </h5>

                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                    {placesid.address}
                                </p>

                                {placesid.rating && (
                                    <p className="text-sm text-gray-500 mb-2">
                                        ⭐ {placesid.rating} ({placesid.total_ratings} reviews)
                                    </p>
                                )}

                                {placesid.opening_hours && (
                                    <p
                                        className={`text-sm font-medium ${placesid.opening_hours.open_now ? "text-green-600" : "text-red-600"
                                            }`}
                                    >
                                        {placesid.opening_hours.open_now ? "Open now" : "Closed"}
                                    </p>
                                )}
                            </div>
                        </a>
                    </div>
                )}
                
            </div>
        </ComponentCard>

    </>);
}