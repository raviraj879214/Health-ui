"use client";
import Image from "next/image";
import Link from "next/link";

import Breadcrumb from "../../../../components-front-end/global/breadcrumb";

import SwiperInit from "../../../../components-front-end/SwiperInit";
import DoctorAccordion from "../../../../components-front-end/detail/DoctorAccordion";
import ProductCard from "../../../../components-front-end/global/productCard";
import DoctorAccordionLoader from "../../../../components-front-end/detail/DoctorAccordionLoader";
import ImagePlaceholder from "../../../../components-front-end/global/skeleton/ImagePlaceholder";
import ProductCardLoader from "../../../../components-front-end/global/skeleton/productCardLoader";


export default function Listing() {

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Clinics", href: '/clinics' },
    { label: "Albert Einstein Israelite Hospital", href: null }, // last item = current page
  ];

  // Dummy Content
  const clinics = Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      title: `Hospital Samaritano ${i + 1}`,
      image: `/images/product/img-${i + 1}.png`,
  }));

  const items = [
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

    {
      id: 2,
      title: "Plastic Surgeon",
      children: [
        {
          name: "Jamie Rill",
          speciality: "Plastic Surgeon",
          image: "/images/doctors/doctor-2.png",
          description: "Lorem Ipsum is simply dummy text of the printing industry. ",
        },
        {
          name: "David Hook",
          speciality: "Plastic Surgeon",
          image: "/images/doctors/doctor-3.png",
          description: "Lorem Ipsum is simply dummy text of the printing industry. ",
        },
      ],
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="product-detail-section mb-18">
        <div className="container">
          <div className="flex -mx-3.5 flex-wrap">
            <div className="flex-none md:w-8/12 w-full px-3.5">
              {/* Top Details Heading */}
                <div className="detail-top-content">
                  <h1 className="h1 mb-2.5">Albert Einstein Israelite Hospital</h1>
                  <div className="flex justify-between items-center gap-5 mb-5 leading-none">
                      <div className="flex items-center">
                          <span className="inline-block me-2.5 text-primary">
                              <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M12.2713 3.37353C11.7875 2.45362 11.0718 1.66577 10.1898 1.0824C9.30793 0.499029 8.28815 0.138849 7.22423 0.0349686C6.7427 -0.0116562 6.25754 -0.0116562 5.77601 0.0349686C4.71214 0.139014 3.69242 0.499259 2.81054 1.08261C1.92865 1.66597 1.21286 2.45373 0.728929 3.37353C0.120013 4.54722 -0.115248 5.86846 0.0527738 7.17087C0.220795 8.47327 0.784586 9.6986 1.67314 10.6925L6.00759 15.7758C6.06745 15.8459 6.14265 15.9024 6.2278 15.9411C6.31296 15.9799 6.40595 16 6.50012 16C6.59428 16 6.68728 15.9799 6.77243 15.9411C6.85759 15.9024 6.93279 15.8459 6.99264 15.7758L11.3265 10.6925C12.2151 9.69866 12.779 8.47337 12.9472 7.17096C13.1153 5.86855 12.8801 4.54727 12.2713 3.37353ZM6.50012 8.61493C5.99539 8.61493 5.502 8.47055 5.08234 8.20007C4.66268 7.92958 4.33559 7.54513 4.14244 7.09533C3.94929 6.64553 3.89876 6.15058 3.99722 5.67307C4.09569 5.19557 4.33874 4.75695 4.69563 4.41269C5.05252 4.06842 5.50723 3.83398 6.00226 3.739C6.49729 3.64401 7.01039 3.69276 7.4767 3.87908C7.943 4.06539 8.34156 4.3809 8.62197 4.78571C8.90238 5.19052 9.05205 5.66645 9.05205 6.15331C9.0512 6.80592 8.78207 7.43157 8.30367 7.89304C7.82527 8.3545 7.17667 8.61411 6.50012 8.61493Z" fill="currentcolor"/>
                              </svg>
                          </span>
                          <span className="inline-block">
                              Rio de Janeiro, <strong>Brazil</strong>
                          </span>
                      </div>
                      <span className="rating inline-flex items-center">
                          <svg width="15" height="14" className="me-1" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.9583 5.66827C15.9071 5.51316 15.8104 5.37621 15.6802 5.2745C15.5501 5.17278 15.3922 5.1108 15.2262 5.09627L10.6082 4.68603L8.78208 0.504711C8.64739 0.198289 8.34076 0 8.00006 0C7.65937 0 7.35271 0.19832 7.21808 0.505475L5.39197 4.68606L0.773199 5.09627C0.60745 5.11112 0.449802 5.17324 0.3198 5.27492C0.189798 5.3766 0.0931609 5.51337 0.0418688 5.66827C-0.0634775 5.98524 0.0338061 6.33287 0.290531 6.55201L3.78124 9.54683L2.7519 13.9825C2.67659 14.3086 2.80597 14.6458 3.0826 14.8414C3.23126 14.9465 3.40523 15 3.58064 15C3.7319 15 3.8819 14.9601 4.01659 14.8813L8.00006 12.5522L11.9821 14.8813C12.2735 15.0528 12.6408 15.0371 12.9168 14.8414C13.0519 14.7457 13.1553 14.6133 13.2141 14.4606C13.2729 14.3079 13.2845 14.1416 13.2475 13.9825L12.2182 9.54683L15.7089 6.55262C15.8344 6.44533 15.925 6.30432 15.9694 6.14709C16.0137 5.98987 16.0098 5.82337 15.9583 5.66827Z" fill="#FFC107"/></svg><span>4.95</span>
                      </span>
                  </div>
                </div>
                {/* Skeleton Loading */}
                <div className="w-full animate-pulse">
                  <div className="h-12 bg-loader rounded-full w-full mb-2.5"></div>
                  <div className="flex justify-between gap-5 mb-5">
                      <span className="h-3 bg-loader rounded-full w-4/10"></span>
                      <span className="h-3 bg-loader rounded-full w-2/10"></span>
                  </div>
                </div>
              {/* Top Details Heading */}

              {/* Product Gallery */}
                <div className="product-gallery rounded-thm overflow-hidden">
                  <div className="swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-1.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-2.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-3.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-4.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-5.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-6.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-7.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-8.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-9.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="thumb-wrap w-full relative overflow-hidden pb-[61%]">
                          <Image
                            src="/images/product/img-10.png"
                            alt="Albert Einstein"
                            width={770}
                            height={470}
                            className="absolute top-0 left-0 w-full h-full object-cover"
                          />
                        </div>
                      </div>
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
                {/* Skeleton Loading */}
                <div className="w-full animate-pulse">
                  <div className="thumb-wrap w-full relative overflow-hidden pb-[61%] bg-loader rounded-thm"></div>
                </div>
              {/* Product Gallery */}

              {/* About Information */}
                <div className="about-info border-b border-border py-7.5">
                  <h3 className="text-2xl mb-2.5 font-bold">About The Clinic</h3>
                  <div className="description [&_>_*:last-child]:mb-0">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

                    <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </div>
                  
                  {/* Skeleton Loading */}
                  <div className="w-full animate-pulse">
                    <div className="h-8 bg-loader rounded-full w-full mb-4"></div>
                    <div className="[&_>_*:not(:last-child)]:mb-2 w-full">
                      <div className="h-3 bg-loader rounded-full w-full"></div>
                      <div className="h-3 bg-loader rounded-full w-full"></div>
                      <div className="h-3 bg-loader rounded-full w-full"></div>
                      <div className="h-3 bg-loader rounded-full w-full"></div>
                      <div className="h-3 bg-loader rounded-full w-full"></div>
                      <div className="h-3 bg-loader rounded-full w-full"></div>
                      <div className="h-3 bg-loader rounded-full w-full"></div>
                      <div className="h-3 bg-loader rounded-full w-8/10"></div>
                      <div className="h-3 bg-loader rounded-full w-4/10"></div>
                    </div>
                  </div>
                </div>
              {/* About Information */}

              {/* Treatment Packages */}
              <div className="treatment-packages border-b border-border py-7.5">
                <h3 className="text-2xl mb-2.5 font-bold">Treatment Packages</h3>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-7.5 gap-y-3">
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package1</div>
                    <div className="mb-0 font-bold">$299-$599</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package2</div>
                    <div className="mb-0 font-bold">$299-$599</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package3</div>
                    <div className="mb-0 font-bold">$399-$699</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package4</div>
                    <div className="mb-0 font-bold">$299-$599</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package5</div>
                    <div className="mb-0 font-bold">$500-$1200</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package6</div>
                    <div className="mb-0 font-bold">$299-$599</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package7</div>
                    <div className="mb-0 font-bold">$649-$1399</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package8</div>
                    <div className="mb-0 font-bold">$299-$599</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package9</div>
                    <div className="mb-0 font-bold">$299-$599</div>
                  </div>
                  <div className="w-full flex justify-between items-center gap-5">
                    <div className="mb-0">Package10</div>
                    <div className="mb-0 font-bold">$799-$1599</div>
                  </div>
                </div>

                {/* Skeleton Loading */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-x-7.5 gap-y-3 animate-pulse">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div className="h-4 bg-loader rounded-full w-full"></div>
                  ))}
                </div>
              </div>
              {/* Treatment Packages */}

              {/* Doctors Listing */}
              <div className="doctors border-b border-border py-7.5">
                <h3 className="text-2xl mb-2.5 font-bold">Clinic Doctors</h3>
                <DoctorAccordion items={items} />

                {/* Skeleton Loading */}
                <DoctorAccordionLoader />
              </div>
              {/* Doctors Listing */}

              {/* Before Surgery */}
              <div className="before-surgery border-b border-border py-7.5">
                <h3 className="text-2xl mb-2.5 font-bold">Before and After Surgery</h3>
                <div className="swiper before-surgery-slider pagination-secondary">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="grid grid-cols-2 md:gap-7.5 gap-5">
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/before-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                            <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">Before</span>
                          </div>
                        </div>
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/after-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                              <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">After</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="grid grid-cols-2 md:gap-7.5 gap-5">
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/before-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                            <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">Before</span>
                          </div>
                        </div>
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/after-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                              <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">After</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="grid grid-cols-2 md:gap-7.5 gap-5">
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/before-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                            <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">Before</span>
                          </div>
                        </div>
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/after-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                              <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">After</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="grid grid-cols-2 md:gap-7.5 gap-5">
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/before-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                            <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">Before</span>
                          </div>
                        </div>
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/after-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                              <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">After</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="grid grid-cols-2 md:gap-7.5 gap-5">
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/before-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                            <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">Before</span>
                          </div>
                        </div>
                        <div>
                          <div className="relative w-full pb-[80%] overflow-hidden rounded-thm">
                            <Image 
                              src="/images/after-1.png"
                              alt="Before"
                              width={370}
                              height={270}
                              className="absolute top-0 left-0 w-full h-full object-cover" />
                              <span className="inline-block absolute bottom-0 left-1/2 -translate-x-1/2 bg-text text-white py-2 px-3 leading-none rounded-t-[4px] font-bold">After</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-pagination"></div>
                </div>

                {/* Skeleton Loading */}
                <div className="grid grid-cols-2 gap-7.5 [&>*:nth-child(n+3)]:hidden animate-pulse">
                  <div className="w-full">
                    <div className="relative w-full pb-[80%] overflow-hidden rounded-thm bg-loader">
                      <ImagePlaceholder />
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="relative w-full pb-[80%] overflow-hidden rounded-thm bg-loader">
                      <ImagePlaceholder />
                    </div>
                  </div>
                </div>
              </div>
              {/* Before Surgery */}
              
              {/* Certifications Listing */}
              <div className="certifications border-b border-border py-7.5">
                <h3 className="text-2xl mb-2.5 font-bold">Hospital Accreditation / Quality Certificates</h3>
                <div className="m-0">
                  <div className="flex mb-5 last:mb-0">
                    <div className="w-[24%] min-w-[70px] flex-none md:me-7.5 me-5">
                      <div className="border border-border rounded-thm relative overflow-hidden pb-[62%]">
                        <Image
                          src="/images/certifications/certificate-1.png"
                          alt="International Organization for Standardization"
                          width={100}
                          height={100}
                          className="absolute top-1/2 left-1/2 -translate-1/2 w-8/10 h-8/10 object-contain"
                        />
                      </div>
                    </div>
                    <div className="grow flex flex-col justify-center">
                      <h4 className="h6 font-bold">International Organization for Standardization </h4>
                      <div className="[&_>_*:last-child]:mb-0">
                        <p>CH, International Organization for Standardization certificate for Memorial Hospital </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-5 last:mb-0">
                    <div className="w-[24%] min-w-[70px] flex-none md:me-7.5 me-5">
                      <div className="border border-border rounded-thm relative overflow-hidden pb-[62%]">
                        <Image
                          src="/images/certifications/certificate-2.png"
                          alt="International Organization for Standardization"
                          width={100}
                          height={100}
                          className="absolute top-1/2 left-1/2 -translate-1/2 w-8/10 h-8/10 object-contain"
                        />
                      </div>
                    </div>
                    <div className="grow flex flex-col justify-center">
                      <h4 className="h6 font-bold">Lorem Ipsum is simply dummy text of the printing </h4>
                      <div className="[&_>_*:last-child]:mb-0">
                        <p>It is a long established fact that a reader will be distracted by the readable content</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mb-5 last:mb-0">
                    <div className="w-[24%] min-w-[70px] flex-none md:me-7.5 me-5">
                      <div className="border border-border rounded-thm relative overflow-hidden pb-[62%]">
                        <Image
                          src="/images/certifications/certificate-3.png"
                          alt="International Organization for Standardization"
                          width={100}
                          height={100}
                          className="absolute top-1/2 left-1/2 -translate-1/2 w-8/10 h-8/10 object-contain"
                        />
                      </div>
                    </div>
                    <div className="grow flex flex-col justify-center">
                      <h4 className="h6 font-bold">Joint Commission International</h4>
                      <div className="[&_>_*:last-child]:mb-0">
                        <p>US, Joint Commission International certificate for Memorial SiO Hospital </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Skeleton Loading */}
                <div className="m-0 w-full animate-pulse">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div className="flex mb-5 last:mb-0 w-full">
                      <div className="w-[24%] min-w-[70px] flex-none md:me-7.5 me-5">
                        <div className="bg-loader rounded-thm relative overflow-hidden pb-[62%]">
                          <ImagePlaceholder />
                        </div>
                      </div>
                      <div className="grow flex flex-col justify-center">
                        <div className="h-6 bg-loader rounded-full w-full mb-2"></div>
                        <div className="[&_>_*:not(:last-child)]:mb-2 w-full">
                            <div className="h-2.5 bg-loader rounded-full w-full"></div>
                            <div className="h-2.5 bg-loader rounded-full w-4/10"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Certifications Listing */}

              {/* Reviews Section */}
              <div className="reviews border-b border-border py-7.5">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl mb-2.5 font-bold">Reviews</h3>
                  <div className="flex items-center gap-2">
                    <div className="rating-outer">
                      <div className="rating-inner" style={{width: '92%'}}></div>
                    </div> <span>4.94 <span className="text-[#808091] inline-block ms-1">(79)</span></span>
                  </div>
                  {/* Skeleton Loading */}
                  <div className="animate-pulse w-3/10 h-5 bg-loader rounded-full"></div>
                  {/* Skeleton Loading */}
                </div>
                <div className="rating-list">
                  <div className="pb-5 mb-5 border-b border-border last:pb-0 last:mb-0 last:border-b-0">
                    <p className="font-bold mb-2.5">Jimmy Matt</p>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="rating-outer">
                        <div className="rating-inner"></div>
                      </div> 
                      <span>5.0 <span className="opacity-50 inline-block ms-5">15 Oct, 25</span></span>
                    </div>
                    <div className="[&_>_*:last-child]:mb-0">
                      <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
                    </div>
                  </div>
                  <div className="pb-5 mb-5 border-b border-border last:pb-0 last:mb-0 last:border-b-0">
                    <p className="font-bold mb-2.5">James Michael</p>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="rating-outer">
                        <div className="rating-inner"></div>
                      </div> 
                      <span>5.0 <span className="opacity-50 inline-block ms-5">02 July, 25</span></span>
                    </div>
                    <div className="[&_>_*:last-child]:mb-0">
                      <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
                    </div>
                  </div>
                  <div className="pb-5 mb-5 border-b border-border last:pb-0 last:mb-0 last:border-b-0">
                    <p className="font-bold mb-2.5">Henry</p>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="rating-outer">
                        <div className="rating-inner"></div>
                      </div> 
                      <span>5.0 <span className="opacity-50 inline-block ms-5">1 year ago</span></span>
                    </div>
                    <div className="[&_>_*:last-child]:mb-0">
                      <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.</p>
                    </div>
                  </div>
                </div>

                
                {/* Skeleton Loading */}
                  <div className="w-full animate-pulse">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div className="pb-5 mb-5 border-b border-border last:pb-0 last:mb-0 last:border-b-0">
                          <div className="h-6 bg-loader rounded-full w-8/10 mb-3"></div>
                          <div className="h-3 bg-loader rounded-full w-6/10 mb-3"></div>
                          <div className="[&_>_*:not(:last-child)]:mb-2 w-full">
                              <div className="h-2.5 bg-loader rounded-full w-full"></div>
                              <div className="h-2.5 bg-loader rounded-full w-full"></div>
                              <div className="h-2.5 bg-loader rounded-full w-full"></div>
                          </div>
                      </div>
                    ))}
                  </div>
                {/* Skeleton Loading */}
              </div>
              {/* Reviews Section */}

              {/* Write Review Section */}
              <div className="write-review border-b border-border py-7.5">
                <form>
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl mb-5 font-bold">Write a review</h3>
                    <div id="full-stars-rating">
                      <div className="rating-group">
                          <input className="rating__input rating__input--none" name="rating" id="rating-none" value="0" type="radio" defaultChecked />
                          <label aria-label="No rating" className="rating__label" htmlFor="rating-none"><i className="rating__icon rating__icon--none fa fa-ban"></i></label>
                          <label aria-label="1 star" className="rating__label" htmlFor="rating-1">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.78191 4.12891L13.6921 4.70312C14.0202 4.75781 14.2936 4.97656 14.403 5.30469C14.5124 5.60547 14.4303 5.96094 14.1843 6.17969L11.3405 8.99609L12.0241 12.9883C12.0788 13.3164 11.9421 13.6445 11.6686 13.8359C11.3952 14.0547 11.0397 14.0547 10.7389 13.918L7.23894 12.0312L3.7116 13.918C3.43816 14.0547 3.05535 14.0547 2.80925 13.8359C2.53581 13.6445 2.3991 13.3164 2.45378 12.9883L3.11003 8.99609L0.266283 6.17969C0.0201894 5.96094 -0.0618419 5.60547 0.0475331 5.30469C0.156908 4.97656 0.430345 4.75781 0.75847 4.70312L4.69597 4.12891L6.44597 0.492188C6.58269 0.191406 6.88347 0 7.23894 0C7.56706 0 7.86785 0.191406 8.00456 0.492188L9.78191 4.12891Z" fill="currentcolor"/></svg>
                          </label>
                          <input className="rating__input" name="rating" id="rating-1" value="1" type="radio" />
                          <label aria-label="2 stars" className="rating__label" htmlFor="rating-2">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.78191 4.12891L13.6921 4.70312C14.0202 4.75781 14.2936 4.97656 14.403 5.30469C14.5124 5.60547 14.4303 5.96094 14.1843 6.17969L11.3405 8.99609L12.0241 12.9883C12.0788 13.3164 11.9421 13.6445 11.6686 13.8359C11.3952 14.0547 11.0397 14.0547 10.7389 13.918L7.23894 12.0312L3.7116 13.918C3.43816 14.0547 3.05535 14.0547 2.80925 13.8359C2.53581 13.6445 2.3991 13.3164 2.45378 12.9883L3.11003 8.99609L0.266283 6.17969C0.0201894 5.96094 -0.0618419 5.60547 0.0475331 5.30469C0.156908 4.97656 0.430345 4.75781 0.75847 4.70312L4.69597 4.12891L6.44597 0.492188C6.58269 0.191406 6.88347 0 7.23894 0C7.56706 0 7.86785 0.191406 8.00456 0.492188L9.78191 4.12891Z" fill="currentcolor"/></svg>
                          </label>
                          <input className="rating__input" name="rating" id="rating-2" value="2" type="radio" />
                          <label aria-label="3 stars" className="rating__label" htmlFor="rating-3">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.78191 4.12891L13.6921 4.70312C14.0202 4.75781 14.2936 4.97656 14.403 5.30469C14.5124 5.60547 14.4303 5.96094 14.1843 6.17969L11.3405 8.99609L12.0241 12.9883C12.0788 13.3164 11.9421 13.6445 11.6686 13.8359C11.3952 14.0547 11.0397 14.0547 10.7389 13.918L7.23894 12.0312L3.7116 13.918C3.43816 14.0547 3.05535 14.0547 2.80925 13.8359C2.53581 13.6445 2.3991 13.3164 2.45378 12.9883L3.11003 8.99609L0.266283 6.17969C0.0201894 5.96094 -0.0618419 5.60547 0.0475331 5.30469C0.156908 4.97656 0.430345 4.75781 0.75847 4.70312L4.69597 4.12891L6.44597 0.492188C6.58269 0.191406 6.88347 0 7.23894 0C7.56706 0 7.86785 0.191406 8.00456 0.492188L9.78191 4.12891Z" fill="currentcolor"/></svg>
                          </label>
                          <input className="rating__input" name="rating" id="rating-3" value="3" type="radio" />
                          <label aria-label="4 stars" className="rating__label" htmlFor="rating-4">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.78191 4.12891L13.6921 4.70312C14.0202 4.75781 14.2936 4.97656 14.403 5.30469C14.5124 5.60547 14.4303 5.96094 14.1843 6.17969L11.3405 8.99609L12.0241 12.9883C12.0788 13.3164 11.9421 13.6445 11.6686 13.8359C11.3952 14.0547 11.0397 14.0547 10.7389 13.918L7.23894 12.0312L3.7116 13.918C3.43816 14.0547 3.05535 14.0547 2.80925 13.8359C2.53581 13.6445 2.3991 13.3164 2.45378 12.9883L3.11003 8.99609L0.266283 6.17969C0.0201894 5.96094 -0.0618419 5.60547 0.0475331 5.30469C0.156908 4.97656 0.430345 4.75781 0.75847 4.70312L4.69597 4.12891L6.44597 0.492188C6.58269 0.191406 6.88347 0 7.23894 0C7.56706 0 7.86785 0.191406 8.00456 0.492188L9.78191 4.12891Z" fill="currentcolor"/></svg>
                          </label>
                          <input className="rating__input" name="rating" id="rating-4" value="4" type="radio" />
                          <label aria-label="5 stars" className="rating__label" htmlFor="rating-5">
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.78191 4.12891L13.6921 4.70312C14.0202 4.75781 14.2936 4.97656 14.403 5.30469C14.5124 5.60547 14.4303 5.96094 14.1843 6.17969L11.3405 8.99609L12.0241 12.9883C12.0788 13.3164 11.9421 13.6445 11.6686 13.8359C11.3952 14.0547 11.0397 14.0547 10.7389 13.918L7.23894 12.0312L3.7116 13.918C3.43816 14.0547 3.05535 14.0547 2.80925 13.8359C2.53581 13.6445 2.3991 13.3164 2.45378 12.9883L3.11003 8.99609L0.266283 6.17969C0.0201894 5.96094 -0.0618419 5.60547 0.0475331 5.30469C0.156908 4.97656 0.430345 4.75781 0.75847 4.70312L4.69597 4.12891L6.44597 0.492188C6.58269 0.191406 6.88347 0 7.23894 0C7.56706 0 7.86785 0.191406 8.00456 0.492188L9.78191 4.12891Z" fill="currentcolor"/></svg>
                          </label>
                          <input className="rating__input" name="rating" id="rating-5" value="5" type="radio" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap md:-mx-3.5 -mx-2.5">
                    <div className="flex-none md:w-1/2 w-full md:px-3.5 px-2.5 md:mb-7 mb-5">
                      <input type="text" name="name" id="user-name" placeholder="Name*" required className="w-full border border-border rounded-thm px-4 py-2.5 appearance-none" />
                    </div>
                    <div className="flex-none md:w-1/2 w-full md:px-3.5 px-2.5 md:mb-7 mb-5">
                      <input type="email" name="email" id="user-email" placeholder="Email*" required className="w-full border border-border rounded-thm px-4 py-2.5 appearance-none"/>
                    </div>
                    <div className="flex-none w-full md:px-3.5 px-2.5 md:mb-7 mb-5">
                      <textarea name="comment" id="user-comment" placeholder="Comment*" rows="4" className="w-full border border-border rounded-thm px-4 py-2.5 appearance-none resize-none"></textarea>
                    </div>
                    <div className="flex-none w-full md:px-3.5 px-2.5 md:mb-7 mb-5">
                      <button type="submit" className="btn btn-secondary">Submit Review</button>
                    </div>
                  </div>
                </form>

                {/* Skeleton Loading */}
                  <div className="w-full animate-pulse">
                    <div className="h-12 bg-loader rounded-thm w-full md:mb-7 mb-5"></div>
                    <div className="h-12 bg-loader rounded-thm w-full md:mb-7 mb-5"></div>
                    <div className="h-50 bg-loader rounded-thm w-full md:mb-7 mb-5"></div>
                    <div className="h-12 bg-loader rounded-thm w-50 md:mb-7 mb-5"></div>
                  </div>
                {/* Skeleton Loading */}
              </div>
              {/* Write Review Section */}
              
              {/* Location Section */}
              <div className="location py-7.5">
                <h3 className="text-2xl mb-3 font-bold">Clinic Location</h3>
                <div className="location-wrap rounded-thm overflow-hidden"> 
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58512.63886962216!2d-46.665022732007124!3d-23.56700937032972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59ceb1eb771f%3A0xe904f6a669744da1!2sMuseum%20of%20Art%20of%20S%C3%A3o%20Paulo%20Assis%20Chateaubriand!5e0!3m2!1sen!2sin!4v1764587738590!5m2!1sen!2sin" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="border-0 w-full md:h-[450px] h-[300px]"></iframe>
                </div>

                {/* Skeleton Loading */}
                    <div className="rounded-thm bg-loader animate-pulse w-full md:h-[450px] h-[300px]"></div>
                {/* Skeleton Loading */}

              </div>
              {/* Location Section */}
            </div>
            <div className="flex-none md:w-4/12 w-full px-3.5">
              {/* Sidebar Quote Box */}
                <div className="sticky top-2.5">
                  <div className="bg-primary rounded-thm lg:p-7.5 p-5 pb-6 text-center text-white md:mt-0 mt-5">
                    <h4 className="h2 mb-4">Get A Free<br/>Quote</h4>
                    <Link href="#" className="btn btn-secondary w-full mb-3 py-4">Get A Free Quote</Link>
                    <p className="mb-0">Or Contact Via <Link href="#" className="underline">WhatsApp</Link> or <Link href="#" className="underline">Telegram</Link></p>
                  </div>

                  {/* Skeleton Loading */}
                    <div className="bg-section-gray rounded-thm lg:p-7.5 p-5 pb-6 w-full animate-pulse">
                      <div className="h-6 bg-loader rounded-thm w-8/10 mb-3 mx-auto"></div>
                      <div className="h-6 bg-loader rounded-thm w-5/10 mb-3 mx-auto"></div>
                      <div className="h-12 bg-loader rounded-thm w-full mb-3"></div>
                      <div className="h-2.5 bg-loader rounded-thm w-7/10 mx-auto"></div>
                    </div>
                  {/* Skeleton Loading */}
                </div>
              {/* Sidebar Quote Box */}
            </div>
          </div>
        </div>
      </div>

      
      <div className="mt-18 md:mb-24 mb-18">
        <div className="container">
           <h2 className="h2 text-center md:mb-7 mb-5">Other Top Rated Clinics</h2>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7.5">
                {clinics.map((clinic) => (
                    <ProductCard 
                        key={clinic.id}
                        data={clinic}
                    />
                ))}
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-7.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <ProductCardLoader key={i} />
                ))}
            </div>
        </div>
      </div>
      <SwiperInit />
    </>
  );
}
