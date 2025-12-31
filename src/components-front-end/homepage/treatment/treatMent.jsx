"use client"
import TreatmentCard from "../../global/treatmentCard";
import SwiperInit from "../../shared/SwiperInit";
import TreatmentCardLoader from "../../global/skeleton/treatmentCardLoader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";


export default function Treatments(){

    // Dummy Content
    const[treatments,setTreatments] = useState([]);
    


    const treatment = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Anesthesiology`,
        image: `/images/treatments/treatment-${i + 1}.svg`,
    }));


    useEffect(()=>{
         fetchFeaturedTreament();
    },[]);

    const fetchFeaturedTreament = async()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-treatment?isFeatured=true`,{
            method : "Get"
        });
        if(res.ok){
            const result = await res.json();

            const treaments = result.data.map((item)=>{
                return {
                    id : item.id,
                    title : item.name,
                    image : `/images/treatments/treatment-1.svg`
                }
            });
            setTreatments(treaments);
        }
    }

















    return (
        <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center mb-7">Search By Treatments</h2>
                <div className="swiper swiper-treatments a-hover-secondary">
                    <div className="swiper-wrapper">
                        {treatments.map((treatment) => (
                            <div className="swiper-slide h-auto!" key={treatment.id}>
                                <TreatmentCard  data={treatment}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
               
            </div>
            <SwiperInit />
        </div>
    )
}