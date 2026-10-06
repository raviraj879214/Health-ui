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

export default async function Page() {
  const page = await getPageData();

  const seo = page?.seoPages;
  const seoStructure = seo?.og_structure?.seo;
  const openGraph = seoStructure?.openGraph;
  const twitter = seoStructure?.twitter;

  const canonicalUrl =
    seoStructure?.canonicalUrl ||
    `${process.env.NEXT_PUBLIC_URL}`;

  const seoImage = seo?.og_image
    ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=seocontent/${seo.og_image}`
    : null;

  const title =
    seo?.meta_title ||
    seoStructure?.title ||
    "Health Tech";

  const description =
    seo?.meta_desc ||
    seoStructure?.description ||
    "Online healthcare and telemedicine platform";

  const keywords =
    seo?.meta_keywords ||
    seoStructure?.keywords ||
    "Health Tech, Telemedicine, Healthcare";

  const openGraphTitle =
    openGraph?.title ||
    seo?.meta_title ||
    "Health Tech";

  const openGraphDescription =
    openGraph?.description ||
    seo?.meta_desc ||
    "Online healthcare and telemedicine platform";

  const openGraphUrl =
    openGraph?.url ||
    seo?.og_url ||
    canonicalUrl;

  const openGraphType =
    openGraph?.type ||
    seo?.og_type ||
    "website";

  const openGraphImage =
    openGraph?.image ||
    seoImage;

  const openGraphImageAlt =
    openGraph?.imageAlt ||
    seo?.title ||
    seo?.meta_title ||
    "Health Tech";

  const siteName =
    openGraph?.site_name ||
    "Health Tech";

  const twitterCard =
    twitter?.card ||
    "summary_large_image";

  const twitterTitle =
    twitter?.title ||
    seo?.meta_title ||
    "Health Tech";

  const twitterDescription =
    twitter?.description ||
    seo?.meta_desc ||
    "Online healthcare and telemedicine platform";

  const twitterImage =
    twitter?.image ||
    seoImage;

  const robots =
    seoStructure?.robots ||
    "index, follow";

  const publisher =
    seo?.publisher ||
    seo?.og_publisher ||
    "";

  const promoteCardone = {
    title: "Do You Run a Clinic?",
    description: " ",
    buttonText: "Become A Partner",
    buttonLink: "/register",
    image: "/images/promote-1.png",
    imageAlt: "Do You Running a Clinic?",
  };

  const promoteCardTwo = {
    title: "Join Our Affiliate Program",
    description: "",
    buttonText: "Register Now",
    buttonLink: "/register",
    image: "/images/promote-2.png",
    imageAlt: "Join Our Affiliate Program",
  };

  return (
    <>
      <head>
        {/* Basic SEO */}
        <title>{title}</title>

        <meta
          name="description"
          content={description}
        />

        <meta
          name="keywords"
          content={keywords}
        />

        {/* Canonical */}
        <link
          rel="canonical"
          href={canonicalUrl}
        />

        {/* Robots */}
        <meta
          name="robots"
          content={robots}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={openGraphTitle}
        />

        <meta
          property="og:description"
          content={openGraphDescription}
        />

        <meta
          property="og:url"
          content={openGraphUrl}
        />

        <meta
          property="og:type"
          content={openGraphType}
        />

        <meta
          property="og:site_name"
          content={siteName}
        />

        {openGraphImage && (
          <>
            <meta
              property="og:image"
              content={openGraphImage}
            />

            <meta
              property="og:image:alt"
              content={openGraphImageAlt}
            />
          </>
        )}

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content={twitterCard}
        />

        <meta
          name="twitter:title"
          content={twitterTitle}
        />

        <meta
          name="twitter:description"
          content={twitterDescription}
        />

        {twitterImage && (
          <meta
            name="twitter:image"
            content={twitterImage}
          />
        )}

        {/* Publisher */}
        {publisher && (
          <meta
            name="publisher"
            content={publisher}
          />
        )}
      </head>

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