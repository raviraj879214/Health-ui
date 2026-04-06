"use client"
import { useEffect, useState } from "react";
import PackageCard from "../../components-front-end/global/packageCard";
import PackageCardLoader from "../../components-front-end/global/skeleton/packageCardLoader";


export default function Packages(){

    const treatmentPackagesdf = [
        {
            id: 1,
            title: "Urology Package",
            price: "$199,00",
            features: [
                "CBC, PS, ESR",
                "Creatinine",
                "PSA Level",
                "Urine R&M",
                "USG Kub with PVR",
                "Uroflowmetry",
                "Consultation (Urology)",
            ],
            buttonText: "Book Your Appointment",
            popular: false, // to highlight second card
        },
    ];  


    const [treatmentPackages,settreatmentPackages] = useState([]);

    useEffect(() => {
            fetchPackages();
    }, []);

    const fetchPackages = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-home-page-packages`,{
            method : "Get",
            headers : {
                "content-type" : "application/json"
            }
        });
        if(res.ok){
            const result = await res.json();
            settreatmentPackages(result);
        }
    }

    

    return (<>

    
        {treatmentPackages.length > 0 &&(<>
             <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center md:mb-7 mb-5">Treatment Packages </h2>
                <div className="swiper swiper-packages md:py-7! py-4!">
                    <div className="swiper-wrapper">
                        {treatmentPackages.map((card) => (
                            <div className="swiper-slide h-auto!" key={card.id}>
                              
                                <PackageCard data={card}/>
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                
            </div>
        </div>
            </>)}
       
    </>)
}