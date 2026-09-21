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
import {IVF}  from "../../../components-front-end/contentmanagement/IVF/ivf";
import {Orthopedic}  from "../../../components-front-end/contentmanagement/Orthopedic/orthopedic";
import {Maternity}  from "../../../components-front-end/contentmanagement/Maternity/maternity";
import {DentalTreatment}  from "../../../components-front-end/contentmanagement/DentalTreatment/dentalTreatment";
import {Liposuction}  from "../../../components-front-end/contentmanagement/Liposuction/liposuction";
import {TermsAndCondition}  from "../../../components-front-end/contentmanagement/termsprivacy/terms";
import {PriavcyAndPolicy}  from "../../../components-front-end/contentmanagement/termsprivacy/privacy";
import {GpsInsurance}  from "../../../components-front-end/contentmanagement/gpsInsuranceInformation/gpsInsurance";
import {Facelift}  from "../../../components-front-end/contentmanagement/Facelift/facelift";
import { Rhinoplasty } from "../../../components-front-end/contentmanagement/Rhinoplasty/rhinoplasty";



async function getPageData(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/seo-page-content/${slug}`,
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

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const page = await getPageData(resolvedParams?.slug);
  const canonicalUrl = `${process.env.NEXT_PUBLIC_URL}/${resolvedParams?.slug}`;


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
  const resolvedParams = await params;
  const page = await getPageData(resolvedParams?.slug);

  const title = page?.seoPages?.title;
  const slug = resolvedParams?.slug?.toLowerCase();
  

  switch (title || slug)  {
    case "treatments":
    case "Treatments":
      return <Treatment />;

    case "why-brazil":
    case "Why Brazil":
      return <WhyBrazil />;

    case "insurance":
    case "Insurance":
      return <Insurance />;

    case "your-guarantees":
    case "Your Guarantees":
      return <Gurantees />;

    case "visa":
    case "Visa":
      return  <Visa />;

    case "citizenship":
    case "Citizenship":
      return  <CitizenShip />;

    case "flights":
    case "Flights":
      return  <Flights />;

    case "personal-assistance":
    case "Personal Assistance":
      return  <PersonalAssistance />;

    case "about-us":
    case "About Us":
      return  <AboutUs />;

    case "plastic-surgery":
    case "Plastic Surgery":
      return  <PlasticSurgery />;

    case "ivf":
    case "IVF":
      return  <IVF />;

    case "orthopedic":
    case "Orthopedic":
      return  <Orthopedic />;

    case "maternity":
    case "Maternity":
      return  <Maternity />;

    case "dental-treatment":
    case "Dental Treatment":
      return  <DentalTreatment />;

    case "liposuction":
    case "Liposuction":
      return  <Liposuction />;

    case "privacy-and-policy":
    case "Privacy and Policy":
       return  <PriavcyAndPolicy />;

    case "terms-and-condition":
    case "Terms and Condition":
       return  <TermsAndCondition />;

    case "gps-information":
    case "Gps Information":
       return  <GpsInsurance />;

    case "facelift":
    case "Facelift":
       return  <Facelift />;
     
	case "rhinoplasty":
	case "Rhinoplasty":
	return <Rhinoplasty />;


    default:
      return <div>Page Not Found</div>;
  }
}