
import {ClinicListing} from "../../../components-front-end/cliniclisting/clinicListing";



async function getPageData(slug) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/seo-page-content/clinics`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  return res.json();
  
}


export async function generateMetadata({ params }) {

  const page = await getPageData(params);

  console.log("page",page);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}/clinics`;


  return {
    title: page?.seoPages?.meta_title || "Health Tech",
    description:
      page?.seoPages?.meta_desc ||
      "Online healthcare and telemedicine platform",
    keywords:
      page?.seoPages?.meta_keywords ||
      "Health Tech, Telemedicine, Healthcare",
    alternates: {
      canonical: canonicalUrl,
    },
  };
}


export default async function Listing() {

    const page = await getPageData("clinics");

  return (
    <>

        <ClinicListing></ClinicListing>
     
    </>
  );
}
