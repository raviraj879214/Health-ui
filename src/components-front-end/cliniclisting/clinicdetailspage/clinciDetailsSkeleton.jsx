import DoctorAccordionLoader from "@/components-front-end/detail/DoctorAccordionLoader";
import ImagePlaceholder from "@/components-front-end/global/skeleton/ImagePlaceholder";
import Image from "next/image";
import Link from "next/link";



export function ClinciDetailsSkeleton(){



    return(<>


     <div className="product-detail-section mb-18">
            <div className="container">
              <div className="flex -mx-3.5 flex-wrap">
                <div className="flex-none md:w-8/12 w-full px-3.5">
                  {/* Top Details Heading */}
                    <div className="detail-top-content">
                      
                      <div className="flex justify-between items-center gap-5 mb-5 leading-none">
                          <div className="flex items-center">
                            
                             
                          </div>
                          
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
                 
    
                  
                  <div className="treatment-packages border-b border-border py-7.5">
                    <h3 className="text-2xl mb-2.5 font-bold">Treatment Packages</h3>
                    
    
                    
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
                     
                      {/* Skeleton Loading */}
                      <div className="animate-pulse w-3/10 h-5 bg-loader rounded-full"></div>
                      {/* Skeleton Loading */}
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
                    
    
                    {/* Skeleton Loading */}
                        <div className="rounded-thm bg-loader animate-pulse w-full md:h-[450px] h-[300px]"></div>
                    {/* Skeleton Loading */}
    
                  </div>
                  {/* Location Section */}
                </div>
                <div className="flex-none md:w-4/12 w-full px-3.5">
                  {/* Sidebar Quote Box */}
                    <div className="sticky top-2.5">
                      
    
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



    </>);
}