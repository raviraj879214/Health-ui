import { Treatment } from "../../../components-front-end/contentmanagement/Treatment/treatment";
import {WhyBrazil} from "../../../components-front-end/contentmanagement/Whybrazil/whyBrazil";
import {Insurance} from "../../../components-front-end/contentmanagement/Insurance/insurance";
import {Gurantees} from "../../../components-front-end/contentmanagement/YourGuarantees/gurantees";
import {Visa} from "../../../components-front-end/contentmanagement/Visa/visa";
import {CitizenShip} from "../../../components-front-end/contentmanagement/CitizenShip/citizendship";
import {Flights} from "../../../components-front-end/contentmanagement/Flights/flights";
import {PersonalAssistance} from "../../../components-front-end/contentmanagement/PersonalAssistance/personalassistance";
import { AboutUs } from "../../../components-front-end/contentmanagement/Aboutus/aboutUs";
import { PlasticSurgery } from "../../../components-front-end/contentmanagement/PlasticSurgery/plasticSurgery";


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

export async function generateMetadata({ params }) {
  const page = await getPageData(params.slug);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}/${params.slug}`;


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

export default async function Page({ params }) {
  const page = await getPageData(params.slug);

  const title = page?.seoPages?.title;

  switch (title) {
    case "Treatments":
      return <Treatment />;

    case "Why Brazil":
      return <WhyBrazil />;

    case "Insurance":
      return <Insurance />;


    case "Your Guarantees":
      return <Gurantees />;


    case "Visa":
      return  <Visa />;


    case "Citizenship":
      return  <CitizenShip />;

    case "Flights":
      return  <Flights />;

    case "Personal Assistance":
      return  <PersonalAssistance />;

    case "About Us":
      return  <AboutUs />;


    case "Plastic Surgery":
      return  <PlasticSurgery />;






    default:
      return <div>Page Not Found</div>;
  }
}