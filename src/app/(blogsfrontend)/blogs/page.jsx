
import {BlogsList} from "../../../components-front-end/(BlogsManagement)/blogsList";



async function getPageData(slug) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/seo-page-content/${slug}`,
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

  const page = await getPageData("blogs");

  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}/${page}`;


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




export default async function Page(){




    return(<>

        <BlogsList />
    </>);
}