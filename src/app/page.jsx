"use client";
export const dynamic = "force-static";
import React, { Suspense, useEffect, useState } from "react";
import {Banner} from "../components-front-end/homepage/banner/banner";
import TopRated from "../components-front-end/homepage/toprated/topRated";
import Treatments from "../components-front-end/homepage/treatment/treatMent";

import PopularClinics from "../components-front-end/homepage/PopularClinic/popularClinics";
import HowItWorks from "../components-front-end/homepage/howItWorks";
import PromoteCard from "../components-front-end/homepage/promoteCard";
import PromoteCardLoader from "../components-front-end/global/skeleton/promoteCardLoader";
import HomeStats from "../components-front-end/homepage/homeStats";
import Packages from "../components-front-end/homepage/packages";
import Testimonials from "../components-front-end/homepage/testimonials";
import FAQ from "../components-front-end/homepage/faq";
import FreeQuote from "../components-front-end/homepage/freeQuote";
import FreeQuoteLoader from "../components-front-end/global/skeleton/freeQuoteLoader";
import {BannerLoader} from "../components-front-end/homepage/loader/bannerLoader";





export default function Pages() {

  // --- Dummy Usage Example ---

  const[faqItems,setfaqItems] = useState([]);


  const faqItemsf = [
    {
      id: 1,
      title: "What is Next.js?",
      content: (
        <p>
          Next.js is a React framework that enables features like server-side rendering,
          static site generation, and built‑in routing.
        </p>
      ),
    },
    {
      id: 2,
      title: "What is Tailwind CSS?",
      content: (
        <p>
          Tailwind CSS is a utility‑first CSS framework used to build modern, responsive UIs quickly.
        </p>
      ),
    },
    {
      id: 3,
      title: "Is this accordion animated?",
      content: (
        <p>
          Yes! It uses JavaScript‑driven height transitions to create a smooth slide‑up/
          slide‑down effect similar to Bootstrap.
        </p>
      ),
    },
  ];


  const promoteCardone = {
    title: "Do You Running a Clinic?",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using it look like readable English.",
    buttonText: "Become A Partner",
    buttonLink: "#",
    image: "/images/promote-1.png",
    imageAlt: "Do You Running a Clinic?",
  };
  const promoteCardTwo = {
    title: "Join Our Affiliate Program",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
    buttonText: "Register Now",
    buttonLink: "#",
    image: "/images/promote-2.png",
    imageAlt: "Join Our Affiliate Program",
  };


  useEffect(()=>{
    fetchfaqs();
  },[]);


  const fetchfaqs= async()=>{
    const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-faqs`,{
      method : "Get",
      content : "application/json"
    });

    if(res.ok){
      const result= await res.json();

      const formattedFaqs = result.data.map((item) => ({
        id: item.id,
        title: item.question,
        content: <p>{item.answer}</p>,
      }));

      setfaqItems(formattedFaqs);

    }


  }



  return (
    <>

      <Suspense fallback={<><BannerLoader /></>}>
        
        <Banner></Banner>
        <TopRated></TopRated>
        <Treatments></Treatments>
       
        <PopularClinics />
        <HowItWorks />

        <PromoteCard data={promoteCardone} />

        <HomeStats />
        <Packages />
        
        
        {/* <Testimonials /> */}

        <FAQ items={faqItems} defaultOpen={1} />

        <PromoteCard reverse={true} data={promoteCardTwo} />


        <FreeQuote />
      </Suspense>



     







    </>
  );
}
