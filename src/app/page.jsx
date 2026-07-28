import React, { Suspense } from "react";

import { Banner } from "../components-front-end/homepage/banner/banner";
import TopRated from "../components-front-end/homepage/toprated/topRated";
import Treatments from "../components-front-end/homepage/treatment/treatMent";
import PopularClinics from "../components-front-end/homepage/PopularClinic/popularClinics";
import HowItWorks from "../components-front-end/homepage/howItWorks";
import PromoteCard from "../components-front-end/homepage/promoteCard";
import HomeStats from "../components-front-end/homepage/homeStats";
import Packages from "../components-front-end/homepage/packages";
import FAQ from "../components-front-end/homepage/faq";
import FreeQuote from "../components-front-end/homepage/freeQuote";

import { BannerLoader } from "../components-front-end/homepage/loader/bannerLoader";

async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/seo-page-content/homepage`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
}

export async function generateMetadata() {
  const page = await getPageData();

  console.log(page);

  return {
    title: page?.seoPages.meta_title || "Health Tech",
    description:
      page?.seoPages.meta_desc ||
      "Online healthcare and telemedicine platform",
    keywords:
      page?.seoPages.meta_keywords ||
      "Health Tech, Telemedicine, Healthcare",
  };
}



export default async function Page() {

  const promoteCardone = {
    title: "Do You Run a Clinic?",
    description:
      " ",
    buttonText: "Become A Partner",
    buttonLink: "/register",
    image: "/images/promote-1.png",
    imageAlt: "Do You Running a Clinic?",
  };

  const promoteCardTwo = {
    title: "Join Our Affiliate Program",
    description:
      "",
    buttonText: "Register Now",
    buttonLink: "/register",
    image: "/images/promote-2.png",
    imageAlt: "Join Our Affiliate Program",
  };


  return (
    <>
      <Suspense fallback={<BannerLoader />}>
      
        <Banner />

        <TopRated />

        <Treatments />

        <PopularClinics />


        <HowItWorks />

        <PromoteCard data={promoteCardone} />

        <HomeStats />

        <Packages />

        <FAQ defaultOpen={1} />

        {/* <PromoteCard reverse={true} data={promoteCardTwo} /> */}

        <FreeQuote />
      </Suspense>
    </>
  );
}