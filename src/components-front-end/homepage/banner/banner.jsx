"use client"
import { addSpecialization } from "@/components-front-end/redux/cliniclisting/store/clinicListing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";




export  function Banner(){

    const [specialization,setSpecialization] = useState([]);
      const dispatch = useDispatch();
      const router = useRouter();

    



    useEffect(()=>{
        fetchSpecilaizations();

    },[]);


    const fetchSpecilaizations = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-specialization`,{
            method : "Get",
            headers :{
                "content-type":"application/json"
            }
        });
        if(res.ok){
            const result = await res.json();
            setSpecialization(result.data);
        }
    }



    const onClickSpecialization=(name,id)=>{
            debugger;
        dispatch(
          addSpecialization({
            id: id,
            name: name,
          })
        );

            router.push('/clinics');

    }

    debugger;








    return (
        <div className="bg-section-gray md:py-18 py-14">
            <div className="container">
                <h1 className="h1 text-center mb-5">We Take Care of You While Travelling</h1>
                <div className="hero-search max-w-[650px] mx-auto">
                    <form>
                        <div className="relative">
                            <input type="search" name="s" placeholder="Search Treatment, Hospital or Clinic" id="banner-search" className="bg-white border border-primary rounded-full md:py-5.5 md:ps-7.5 md:pe-18 py-4 ps-6 pe-15 w-full"/>
                            <button type="submit" className="btn btn-primary p-3 md:w-[50px] md:h-[50px] w-[40px] h-[40px] rounded-full absolute top-1/2 right-2.5 -translate-y-1/2 flex justify-center items-center">
                                <svg width="20" height="20" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.6504 21.8602L16.9805 15.9194C18.4388 14.1763 19.2381 11.9697 19.2371 9.68999C19.2371 4.34701 14.9221 0 9.61853 0C4.31496 0 0 4.34701 0 9.68999C0 15.033 4.31496 19.38 9.61853 19.38C11.6096 19.38 13.5069 18.775 15.1291 17.6265L20.8421 23.6124C21.0809 23.8622 21.4021 24 21.7462 24C22.072 24 22.3811 23.8749 22.6157 23.6474C22.8551 23.4148 22.9933 23.096 22.9998 22.761C23.0063 22.426 22.8806 22.102 22.6504 21.8602ZM9.61853 2.52782C13.5387 2.52782 16.7279 5.74069 16.7279 9.68999C16.7279 13.6393 13.5387 16.8522 9.61853 16.8522C5.69835 16.8522 2.50918 13.6393 2.50918 9.68999C2.50918 5.74069 5.69835 2.52782 9.61853 2.52782Z" fill="white"/>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-5 max-w-[600px] mx-auto">
                    <ul className="m-0 p-0 list-none flex flex-wrap justify-center leading-6 [&_li:not(:last-child)]:after:content-[','] [&_li:not(:last-child)]:after:me-1 [&_a]:underline [&_a]:underline-offset-2 [&_a]:transition-colors [&_a]:hover:text-secondary md:text-[1rem] text-sm">
                        {specialization.map((item, index) => (
                            <li key={item.id || index}>
                                <button
                                    type="button"
                                    onClick={() => onClickSpecialization(item.name,item.id)}
                                    className="cursor-pointer text-black-600 hover:underline underline"
                                >
                                    {item.name}
                                </button>
                            </li>

                        ))}
                    </ul>
                  
                   
                </div>
            </div>
        </div>
    )
}