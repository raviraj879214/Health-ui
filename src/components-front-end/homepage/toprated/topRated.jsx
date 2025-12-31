"use client"
import Image from "next/image";
import Link from "next/link";
import ProductCardLoader from "../../global/skeleton/productCardLoader";
import { useEffect, useState } from "react";
import {ProductCardRated} from "./ProductCardRated";


export default function TopRated(){

    // Dummy Content

    const [clinics,setClinic] = useState([]);
    const[clinicloading,setClinicLoading]= useState(false);
    const clinic = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Hospital Samaritano ${i + 1}`,
        image: `/images/product/img-${i + 1}.png`,
    }));

    useEffect(()=>{
        fetchTopRatedClinic();
    },[]);


   const fetchTopRatedClinic = async () => {
    setClinicLoading(true);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-clinic-list`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skip : 0,
        limit : 12,
        specialization: [],
        specialty: [],
        treatment: [],
      }),
    }
  );

  if (!res.ok) return;
  debugger;
  const result = await res.json();
  console.log("result",result.data);

  const clinicList = result.data.map((item) => {
    const bannerImageObj = result.clinicImages.find(
      (img) =>
        img.clinicuuid === item.uuid &&
        img.type === "banner"
    );

    return {
      uuid: item.uuid,
      name: item.name,
      clinicbanner:
        bannerImageObj?.Images ??
        item.imageUrl ??
        null,

      address: item.address,
      city: item.city?.name ?? "",
      state: item.state ?? "",
      country: item.country?.name ?? "",

      rating: item._rating ?? 0,

      packagestartprice: item.packages?.length
        ? Math.min(
            ...item.packages.map(p =>
              Number(p.actualprice)
            )
          )
        : 0,

      placement: item._placement, // 🔥 useful for UI badges
    };
  });


  // ✅ Merge for Load More
  setClinic((prev) => {
    

    const existing = new Set(prev.map(c => c.uuid));
    return [
      ...prev,
      ...clinicList.filter(c => !existing.has(c.uuid)),
    ];
  });
  

  setTimeout(() => {
    setClinicLoading(false);
    
  }, 200);
};













    return (
        
        <>
        <div className="md:my-18 my-16">
            <div className="container">
              
                <h2 className="h2 text-center mb-7">Top Rated Clinics</h2>

                
                <div className="grid md:grid-cols-3 grid-cols-1 gap-7.5">
                    {clinics.map((clinic) => (
                        <>
                          {clinicloading ?(
                             <ProductCardLoader></ProductCardLoader>
                          ):(
                             <ProductCardRated 
                            key={clinic.uuid}
                            data={clinic}/>
                          )}
                        </>
                    ))}
                </div>
                

                <div className="text-center mt-7">
                    <Link href="/clinics" className="btn btn-secondary-outline">View All Clinics</Link>
                </div>
            </div>
        </div>
        </>
    )
}