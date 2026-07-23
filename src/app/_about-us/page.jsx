import { AboutUs } from "../../components-front-end/contentmanagement/Aboutus/aboutUs";




async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/seo-page-content/about-us`,
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





export default function Page(){


    return(<>
    
    
      <AboutUs />
    </>);
}