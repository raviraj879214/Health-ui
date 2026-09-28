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
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/seo-page-content/Homepage`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    return null;
  }
}

export async function generateMetadata() {
  
  const page = await getPageData();

  const seo = page?.seoPages;
  const seoStructure = seo?.og_structure?.seo;
  const openGraph = seoStructure?.openGraph;
  const twitter = seoStructure?.twitter;

  const canonicalUrl =
    seoStructure?.canonicalUrl ||
    `${process.env.NEXT_PUBLIC_URL}`;

  // SEO image URL
  const seoImage = seo?.og_image
    ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=seocontent/${seo.og_image}`
    : null;

  console.log("page seo", page);
  console.log("seo image", seoImage);

  return {
    // Basic SEO
    title:
      seo?.meta_title ||
      seoStructure?.title ||
      "Health Tech",

    description:
      seo?.meta_desc ||
      seoStructure?.description ||
      "Online healthcare and telemedicine platform",

    keywords:
      seo?.meta_keywords ||
      seoStructure?.keywords ||
      "Health Tech, Telemedicine, Healthcare",

    // Canonical
    alternates: {
      canonical: canonicalUrl,
    },

    // Robots
    robots:
      seoStructure?.robots ||
      "index, follow",

    // Open Graph
    openGraph: {
      title:
        openGraph?.title ||
        seo?.meta_title ||
        "Health Tech",

      description:
        openGraph?.description ||
        seo?.meta_desc ||
        "Online healthcare and telemedicine platform",

      url:
        openGraph?.url ||
        seo?.og_url ||
        canonicalUrl,

      type:
        openGraph?.type ||
        seo?.og_type ||
        "website",

      images:
        openGraph?.image
          ? [
              {
                url: openGraph.image,
                alt:
                  openGraph?.imageAlt ||
                  seo?.title ||
                  seo?.meta_title ||
                  "Health Tech",
              },
            ]
          : seoImage
            ? [
                {
                  url: seoImage,
                  alt:
                    openGraph?.imageAlt ||
                    seo?.title ||
                    seo?.meta_title ||
                    "Health Tech",
                },
              ]
            : [],

      siteName:
        openGraph?.site_name ||
        "Health Tech",
    },

    // Twitter / X
    twitter: {
      card:
        twitter?.card ||
        "summary_large_image",

      title:
        twitter?.title ||
        seo?.meta_title ||
        "Health Tech",

      description:
        twitter?.description ||
        seo?.meta_desc ||
        "Online healthcare and telemedicine platform",

      images:
        twitter?.image
          ? [twitter.image]
          : seoImage
            ? [seoImage]
            : [],
    },

    // Other metadata
    other: {
      publisher:
        seo?.publisher ||
        seo?.og_publisher ||
        "",
    },
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