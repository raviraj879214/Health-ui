"use client";


import Breadcrumb from "../../global/breadcrumb";
import { Helmet } from "react-helmet";
import SwiperInit from "../../SwiperInit";
import DoctorAccordion from "../../detail/DoctorAccordion";
import ProductCard from "../../global/productCard";
import DoctorAccordionLoader from "../../detail/DoctorAccordionLoader";
import ImagePlaceholder from "../../global/skeleton/ImagePlaceholder";
import ProductCardLoader from "../../global/skeleton/productCardLoader";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import {formatBrazilDate} from "../../../lib/formatDate";
import {GetFreeQuote} from "./getFreeQuote";
import { usePathname, useRouter } from "next/navigation";
import {createSlug} from "../../global/slug/urlconversion";
import LocationMap from "@/googlemapscomponents/locationMap";
import { useDispatch, useSelector } from "react-redux";
import { addmedicalCordinatorID } from "@/components-front-end/redux/patinetquery/patientQueryRedux";




export function ClinicDetail({id}){



  const dispatch = useDispatch();
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Clinics", href: '/clinics' },
    { label: "Albert Einstein Israelite Hospital", href: null }, 
  ];
  const pathname = usePathname();
  const canonicalUrl = typeof window !== "undefined"? `${window.location.origin}${pathname}`: "";
  

  const item = [
    {
      id: 1,
      title: "Orthopedist",
      children: [
        {
          name: "Dr John Smith",
          speciality: "Orthopedist",
          image: "/images/doctors/doctor-1.png",
          description: "Lorem Ipsum is simply dummy text.",
        }
      ],
    },

   
  ];

  const [items,setItem] = useState([]);



  const[clinicdetails,setClinicDetails] = useState({});
  const[bannerimages,setBannerImages] = useState([]);
  const[description,steDescription] = useState({});
  const[packages,setPackages] = useState([]);
  const[doctors,setDoctors] = useState([]);
  const[surgeryimages,setSurgeryImages] = useState([]);

  const [reviews,setReviews] = useState([]);
  const[accreditation,setAccreditation] = useState([]);
  const [licenses,setLicenses] = useState([]);

  const[freequoteisopen,setFreeQuoteIsOpen] = useState(false);

  const router = useRouter();


  useEffect(()=>{
      fetchClinicDetails();
  },[]);


  const fetchClinicDetails = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-listing/get-clinic-details/${id}`,{
      method : "Get"
    });
    if(res.ok){
      const result = await res.json();
      setClinicDetails(result.data);
      setBannerImages(result.bannerimages);
      steDescription(result.description);
      setPackages(result.data.packages);
      setLicenses(result.data.HospitalLicense);

       const doctorItems = buildDoctorItems(result.data.clinicDoctors);
       setItem(doctorItems);

       const surgeryimagegroup = groupSurgeryImages(result.surgeryimages);
      setSurgeryImages(surgeryimagegroup);

      setReviews(result.data.googleReviews);
      setAccreditation(result.accreditaions);

      dispatch(addmedicalCordinatorID(String(result.data.cordinatorid)));
      

        
    }
  }

  const buildDoctorItems = (clinicDoctors = []) => {
  const map = {};
  const addedDoctors = new Set(); // prevent duplicates

  clinicDoctors.forEach((cd) => {
    const doctor = cd.doctor;
    if (!doctor || addedDoctors.has(doctor.uuid)) return;

    addedDoctors.add(doctor.uuid);

    const specs =
      doctor.specializations?.length > 0
        ? doctor.specializations.map((s) => s.specialization?.name)
        : [doctor.degree || "General"];

    const title = specs[0]; // primary specialization

    if (!map[title]) {
      map[title] = {
        id: title,
        title,
        children: [],
      };
    }

    map[title].children.push({
      name: `Dr ${doctor.firstname} ${doctor.lastname}`,
      speciality: specs.join(", "), // show all
      image: doctor.image ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${doctor.image}` : "/images/doctors/default.png",
      description: doctor.briefDescription ? doctor.briefDescription.replace(/<[^>]+>/g, "") : "No description available", uuid:doctor.uuid,
      slug : doctor.slug
    });
  });

  return Object.values(map);
};


const groupSurgeryImages = (images = []) => {
  const map = {};

  images.forEach((img) => {
    const id = img.surgeryId;

    if (!map[id]) {
      map[id] = {
        surgeryId: id,
        before: null,
        after: null,
      };
    }

    if (img.imageType === "before") {
      map[id].before = img;
    }

    if (img.imageType === "after") {
      map[id].after = img;
    }
  });

  return Object.values(map);
};




    return(<>
     <>

       <Helmet>
          <title>{clinicdetails.metatitle}</title>
          <meta name="description" content={`${clinicdetails.metadescription}`}/>
          <meta property="og:title" content={`${clinicdetails.ogtitle}`} />
          <meta property="og:description" content={`${clinicdetails.ogdescription}`} />
          <meta property="og:url" content={`${clinicdetails.ogurl}`} />
          <meta property="og:image" content={`${clinicdetails.ogimage}`} />
          <meta property="og:type" content={`${clinicdetails.ogtype}`} />
          <meta property="og:site_name" content={`${clinicdetails.ogsitename}`} />
          <meta name="publisher" content={`${clinicdetails.ogpublisher}`} />
          <link rel="canonical" href={`${canonicalUrl}`} />
          <script type="application/ld+json">
            {JSON.stringify(clinicdetails.sestructure)}
          </script>
      </Helmet>






        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Clinics", href: "/clinics" },
            { label: clinicdetails.name, href: null },
          ]}
        />

          <div className="product-detail-section mb-18">
            <div className="container">
              <div className="flex -mx-3.5 flex-wrap">
                <div className="flex-none md:w-8/12 w-full px-3.5">
                  {/* Top Details Heading */}
                    <div className="detail-top-content">
                      <h1 className="h1 mb-2.5">{clinicdetails.name} </h1>
                      <div className="flex justify-between items-center gap-5 mb-5 leading-none">
                          <div className="flex items-center">
                              <span className="inline-block me-2.5 text-primary">
                                  <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M12.2713 3.37353C11.7875 2.45362 11.0718 1.66577 10.1898 1.0824C9.30793 0.499029 8.28815 0.138849 7.22423 0.0349686C6.7427 -0.0116562 6.25754 -0.0116562 5.77601 0.0349686C4.71214 0.139014 3.69242 0.499259 2.81054 1.08261C1.92865 1.66597 1.21286 2.45373 0.728929 3.37353C0.120013 4.54722 -0.115248 5.86846 0.0527738 7.17087C0.220795 8.47327 0.784586 9.6986 1.67314 10.6925L6.00759 15.7758C6.06745 15.8459 6.14265 15.9024 6.2278 15.9411C6.31296 15.9799 6.40595 16 6.50012 16C6.59428 16 6.68728 15.9799 6.77243 15.9411C6.85759 15.9024 6.93279 15.8459 6.99264 15.7758L11.3265 10.6925C12.2151 9.69866 12.779 8.47337 12.9472 7.17096C13.1153 5.86855 12.8801 4.54727 12.2713 3.37353ZM6.50012 8.61493C5.99539 8.61493 5.502 8.47055 5.08234 8.20007C4.66268 7.92958 4.33559 7.54513 4.14244 7.09533C3.94929 6.64553 3.89876 6.15058 3.99722 5.67307C4.09569 5.19557 4.33874 4.75695 4.69563 4.41269C5.05252 4.06842 5.50723 3.83398 6.00226 3.739C6.49729 3.64401 7.01039 3.69276 7.4767 3.87908C7.943 4.06539 8.34156 4.3809 8.62197 4.78571C8.90238 5.19052 9.05205 5.66645 9.05205 6.15331C9.0512 6.80592 8.78207 7.43157 8.30367 7.89304C7.82527 8.3545 7.17667 8.61411 6.50012 8.61493Z" fill="currentcolor"/>
                                  </svg>
                              </span>
                              <span className="inline-block">
                                  {clinicdetails.cep && <>{clinicdetails.cep} - </>}
                                  {clinicdetails.street}
                                  {clinicdetails.complement && <> , {clinicdetails.complement}</>}
                                  {clinicdetails.neighborhood && <> - {clinicdetails.neighborhood}</>}
                                  {clinicdetails.citycep && <> - {clinicdetails.citycep}</>}
                                </span>

                          </div>
                          <span className="rating inline-flex items-center">
                              <svg width="15" height="14" className="me-1" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9583 5.66827C15.9071 5.51316 15.8104 5.37621 15.6802 5.2745C15.5501 5.17278 15.3922 5.1108 15.2262 5.09627L10.6082 4.68603L8.78208 0.504711C8.64739 0.198289 8.34076 0 8.00006 0C7.65937 0 7.35271 0.19832 7.21808 0.505475L5.39197 4.68606L0.773199 5.09627C0.60745 5.11112 0.449802 5.17324 0.3198 5.27492C0.189798 5.3766 0.0931609 5.51337 0.0418688 5.66827C-0.0634775 5.98524 0.0338061 6.33287 0.290531 6.55201L3.78124 9.54683L2.7519 13.9825C2.67659 14.3086 2.80597 14.6458 3.0826 14.8414C3.23126 14.9465 3.40523 15 3.58064 15C3.7319 15 3.8819 14.9601 4.01659 14.8813L8.00006 12.5522L11.9821 14.8813C12.2735 15.0528 12.6408 15.0371 12.9168 14.8414C13.0519 14.7457 13.1553 14.6133 13.2141 14.4606C13.2729 14.3079 13.2845 14.1416 13.2475 13.9825L12.2182 9.54683L15.7089 6.55262C15.8344 6.44533 15.925 6.30432 15.9694 6.14709C16.0137 5.98987 16.0098 5.82337 15.9583 5.66827Z" fill="#FFC107"/></svg><span>{clinicdetails.ratingSummary?.averageRating}</span>
                          </span>
                      </div>
                    </div>
                    
                 
    
                  {/* Product Gallery */}
                    <div className="product-gallery rounded-thm overflow-hidden">
                      <div className="swiper">
                        <div className="swiper-wrapper">

                            

                          {bannerimages.length === 0 ? (
                            <div className="swiper-slide">
                              <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                                <img
                                  src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=clinic/banner/noimage.jpg`}
                                  alt={clinicdetails.name}
                                  width={770}
                                  height={470}
                                  className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          ) : (
                            bannerimages.map((item) => (
                              <div className="swiper-slide" key={item.id}>
                                <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                                  <img
                                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=clinic/banner/${item.Images}`}
                                    alt={clinicdetails.name}
                                    width={770}
                                    height={470}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                            ))
                          )}


                        </div>
                        <div className="swiper-button-prev text-white!">
                            <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.9166 24C12.0589 24.0001 12.1998 23.972 12.3312 23.9171C12.4616 23.8623 12.582 23.7818 12.6825 23.6804C12.7831 23.5791 12.863 23.4589 12.9175 23.3266C12.972 23.1942 13 23.0524 13 22.9091C13 22.7658 12.972 22.624 12.9175 22.4916C12.863 22.3593 12.7831 22.2391 12.6825 22.1378L2.61523 12L12.6825 1.86215C13.1058 1.43588 13.1058 0.745603 12.6825 0.319603C12.2592 -0.106398 11.5737 -0.106671 11.1507 0.319603L0.317516 11.2287C0.216859 11.3299 0.137007 11.4502 0.0825253 11.5825C0.0280428 11.7149 9.53674e-07 11.8567 9.53674e-07 12C9.53674e-07 12.1432 0.0280428 12.2851 0.0825253 12.4174C0.137007 12.5498 0.216859 12.67 0.317516 12.7713L11.1507 23.6804C11.2511 23.7818 11.3705 23.8623 11.502 23.9171C11.6334 23.972 11.7743 24.0001 11.9166 24Z" fill="currentcolor"/>
                            </svg>
                        </div>
                        <div className="swiper-button-next text-white!">
                            <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.08342 24C0.941143 24.0001 0.800238 23.972 0.6688 23.9171C0.537362 23.8623 0.417982 23.7818 0.317517 23.6804C0.21686 23.5791 0.137006 23.4589 0.0825244 23.3266C0.0280423 23.1942 0 23.0524 0 22.9091C0 22.7658 0.0280423 22.624 0.0825244 22.4916C0.137006 22.3593 0.21686 22.2391 0.317517 22.1378L10.3848 12L0.317517 1.86215C-0.105788 1.43588 -0.105788 0.745603 0.317517 0.319603C0.740823 -0.106398 1.42629 -0.106671 1.84933 0.319603L12.6825 11.2287C12.7831 11.3299 12.863 11.4502 12.9175 11.5825C12.972 11.7149 13 11.8567 13 12C13 12.1432 12.972 12.2851 12.9175 12.4174C12.863 12.5498 12.7831 12.67 12.6825 12.7713L1.84933 23.6804C1.74886 23.7818 1.62948 23.8623 1.49804 23.9171C1.3666 23.972 1.2257 24.0001 1.08342 24Z" fill="currentcolor"/>
                            </svg>
                        </div>
                      </div>
                    </div>
                    
                 
    
                 
                <div className="about-info border-b border-border py-7.5">
                  <h3 className="text-2xl mb-2.5 font-bold">About The Clinic</h3>

                  <div
                    className="description [&_>_*:last-child]:mb-0 [&_p]:mb-0"
                    dangerouslySetInnerHTML={{
                      __html: `
      ${description?.briefDescription
                          ? `<h3 class="text-lg font-semibold mb-2">Brief Description</h3>
             ${description.briefDescription}`
                          : ""
                        }

      ${description?.fullDescription
                          ? `<h3 class="text-lg font-semibold mt-4 mb-2">Full Description</h3>
             ${description.fullDescription}`
                          : ""
                        }
    `,
                    }}
                  />



                </div>
                 
    
                  {/* Treatment Packages */}
                  <div className="treatment-packages border-b border-border py-7.5">
                    <h3 className="text-2xl mb-2.5 font-bold">Treatment Packages </h3>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-x-7.5 gap-y-3">
                    {packages && packages.length > 0 ? (
                      packages.map((item) => (
                        <div
                          key={item.id}
                          className="w-full flex justify-between items-center gap-5"
                          
                        >
                          {/* Package Title */}
                          <div
                            className="mb-0 cursor-pointer hover:underline"
                            onClick={() => router.push(`/package-info/${clinicdetails.slug}?packid=${item.id}`)}
                          >
                            {item.title}
                          </div>

                          {/* Price */}
                          <div className="mb-0 font-bold">

                            {brazilianCurrency(item.discountedprice)}
                            {item.actualprice !== item.discountedprice && (
                              <span className="text-gray-400 line-through ml-2 text-sm">
                                {brazilianCurrency(item.actualprice)}
                              </span>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="w-full flex justify-between items-center gap-5">
                        <div className="mb-0">No Packages Found</div>

                      </div>
                    )}


                     
                      
                    
               
                    </div>
    
                    
                  </div>
                 
    
                  {/* Doctors Listing */}
                  <div className="doctors border-b border-border py-7.5">
                    <h3 className="text-2xl mb-2.5 font-bold">Clinic Doctors</h3>

                 


                    <DoctorAccordion items={items} />
    
                  
                  </div>
                    {licenses.length > 0 &&(<>
                    
                         <div className="border-b border-border py-7.5">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        Clinic Licenses
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        Official licenses and certifications for this clinic.
                      </p>
                    </div>

                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                      {licenses?.length || 0} License{licenses?.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {licenses?.length > 0 ? (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {licenses.map((license) => (
                        <div
                          key={license.id}
                          className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400 hover:shadow-lg"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                            <img
                              src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}`}
                              alt="Clinic License"
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-emerald-700 shadow">
                              Verified
                            </div>
                          </div>

                          <div className="space-y-3 p-5">

                            <a
                              href={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15 12H9m3-3v6m9-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>

                              View Full License
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                    </>)}
             
    
                 
                    


                  <div className="before-surgery border-b border-border py-7.5">
                    <h3 className="text-2xl mb-2.5 font-bold">Before and After Surgery</h3>

                    <div className="swiper before-surgery-slider pagination-secondary">
                      <div className="swiper-wrapper">
                        {surgeryimages.map((item) => (
  <div key={item.surgeryId} className="swiper-slide">
    <div className="grid grid-cols-2 md:gap-7.5 gap-5">
      
      {/* BEFORE IMAGE */}
      <div>
        <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
          {item.before ? (
            <img
              src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=surgery/beforeandafter/${item.before.imageUrl}`}
              alt="Before"
              width={370}
              height={270}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
          <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">
            Before
          </span>
        </div>
      </div>

      {/* AFTER IMAGE */}
      <div>
        <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
          {item.after ? (
            <img
              src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=surgery/beforeandafter/${item.after.imageUrl}`}
              alt="After"
              width={370}
              height={270}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
              No Image
            </div>
          )}
          <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">
            After
          </span>
        </div>
      </div>

    </div>
  </div>
))}

                        


                 
                      </div>
                      <div className="swiper-pagination"></div>
                    </div>
    
                   
                  </div>
                  {/* Before Surgery */}
                  
                  
                  <div className="certifications border-b border-border py-7.5 hidden">
                    <h3 className="text-2xl mb-2.5 font-bold">Hospital Accreditation / Quality Certificates</h3>
                    <div className="m-0">
                     

                      {accreditation.map((item)=>(
                           <div key={item.id} className="flex mb-5 last:mb-0">
                        <div className="w-[24%] min-w-[70px] flex-none md:me-7.5 me-5">
                          <div className="border border-border rounded-thm relative overflow-hidden pb-[62%]">
                            <img
                              src={item.accreditation.image}
                              alt={item.accreditation.name}
                              width={100}
                              height={100}
                              className="absolute top-1/2 left-1/2 -translate-1/2 w-8/10 h-8/10 object-contain"
                            />
                          </div>
                        </div>
                        <div className="grow flex flex-col justify-center">
                          <h4 className="h6 font-bold">{item.accreditation.name}</h4>
                          <div className="[&_>_*:last-child]:mb-0">
                            <p>{item.accreditation.description} </p>
                          </div>
                        </div>
                      </div>

                      ))}
                      
                    </div>
                    
                  
                  </div>
                
    
                  {/* Reviews Section */}
                  <div className="reviews border-b border-border py-7.5">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl mb-2.5 font-bold">Reviews </h3>


                    <div className="flex items-center gap-2">
                      <a
                        href={`${clinicdetails.websiteurl}`} // change to your reviews page URL
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rating inline-flex items-center underline hover:text-blue-600"
                      >
                        <svg
                          width="15"
                          height="14"
                          className="me-1"
                          viewBox="0 0 16 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.9583 5.66827C15.9071 5.51316 15.8104 5.37621 15.6802 5.2745C15.5501 5.17278 15.3922 5.1108 15.2262 5.09627L10.6082 4.68603L8.78208 0.504711C8.64739 0.198289 8.34076 0 8.00006 0C7.65937 0 7.35271 0.19832 7.21808 0.505475L5.39197 4.68606L0.773199 5.09627C0.60745 5.11112 0.449802 5.17324 0.3198 5.27492C0.189798 5.3766 0.0931609 5.51337 0.0418688 5.66827C-0.0634775 5.98524 0.0338061 6.33287 0.290531 6.55201L3.78124 9.54683L2.7519 13.9825C2.67659 14.3086 2.80597 14.6458 3.0826 14.8414C3.23126 14.9465 3.40523 15 3.58064 15C3.7319 15 3.8819 14.9601 4.01659 14.8813L8.00006 12.5522L11.9821 14.8813C12.2735 15.0528 12.6408 15.0371 12.9168 14.8414C13.0519 14.7457 13.1553 14.6133 13.2141 14.4606C13.2729 14.3079 13.2845 14.1416 13.2475 13.9825L12.2182 9.54683L15.7089 6.55262C15.8344 6.44533 15.925 6.30432 15.9694 6.14709C16.0137 5.98987 16.0098 5.82337 15.9583 5.66827Z"
                            fill="#FFC107"
                          />
                        </svg>

                        <span>
                          {clinicdetails.ratingSummary?.averageRating} ({clinicdetails.ratingSummary?.totalReviews})
                        </span>
                      </a>
                    </div>

                      


                      
                    </div>
                  <div className="rating-list">
                    
                    {reviews.map((item) => (
  <div
    key={item.id}
    className="pb-5 mb-5 border-b border-border last:pb-0 last:mb-0 last:border-b-0"
  >
    <p className="font-bold mb-2.5">{item.authorName}</p>

    <div className="flex items-center gap-2 mb-2.5">
      {/* Star Ratings */}
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${
              star <= item.rating ? "text-yellow-400" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.95a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.95c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.95a1 1 0 00-.364-1.118L2.075 9.377c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.95z" />
          </svg>
        ))}
      </div>

      {/* Rating number & date */}
      <span className="opacity-50 ms-3">
        {item.rating} · {formatBrazilDate(item.reviewTime,true)}
      </span>
    </div>

    <div className="[&_>_*:last-child]:mb-0">
      <p>{item.comment}</p>
    </div>
  </div>
))}


                  </div>

                    
                   
                  </div>

                   <div className="location py-7.5">
                      <h3 className="text-2xl mb-3 font-bold">Clinic Location</h3>
                      <div className="location-wrap rounded-thm overflow-hidden"> 
                           <LocationMap
                           lat={clinicdetails.latitude} lng={clinicdetails.longitude} 
                           
                           />
                      </div>
                    </div>
    
                 
                  
                 
                 
                </div>
                <div className="flex-none md:w-4/12 w-full px-3.5">
                  {/* Sidebar Quote Box */}
                    <div className="sticky top-2.5">
                      <div className="bg-primary rounded-thm lg:p-7.5 p-5 pb-6 text-center text-white md:mt-0 mt-5">
                        <h4 className="h2 mb-4">Get A Free<br/>Quote</h4>
                        <button onClick={()=>{
                            // setFreeQuoteIsOpen(true);
                             router.push(`/order-create/${clinicdetails.uuid}/${createSlug(clinicdetails.name)}`)
                            
                            }}

                             className="btn btn-secondary w-full mb-3 py-4">Get A Free Quote</button>
                        <p className="mb-0">Or Contact Via <Link href="#" className="underline">WhatsApp</Link> or <Link href="#" className="underline">Telegram</Link></p>
                      </div>
    
                      
                    </div>
                 
                </div>
              </div>
            </div>
          </div>
    
          
         
          <SwiperInit />

         
        </>


        {freequoteisopen && (<GetFreeQuote onClose={(e)=> setFreeQuoteIsOpen(e)} packages={packages} id={clinicdetails.uuid} />) }

    

    </>);
}