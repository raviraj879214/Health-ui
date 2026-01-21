
import FreeQuoteLoader from "@/components-front-end/global/skeleton/freeQuoteLoader";
import PackageCardLoader from "@/components-front-end/global/skeleton/packageCardLoader";
import ProductCardLoader from "@/components-front-end/global/skeleton/productCardLoader";
import PromoteCardLoader from "@/components-front-end/global/skeleton/promoteCardLoader";
import TestimonialCardLoader from "@/components-front-end/global/skeleton/testimonialCardLoader";
import TreatmentCardLoader from "@/components-front-end/global/skeleton/treatmentCardLoader";
import Image from "next/image";
import Link from "next/link";



export function  BannerLoader(){


     const clinics = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Hospital Samaritano ${i + 1}`,
        image: `/images/product/img-${i + 1}.png`,
    }));

    


     const treatments = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Anesthesiology`,
        image: `/images/treatments/treatment-${i + 1}.svg`,
    }));


    const treatmentPackages = [
        {
            id: 1,
            title: "Urology Package",
            price: "$199,00",
            features: [
                "CBC, PS, ESR",
                "Creatinine",
                "PSA Level",
                "Urine R&M",
                "USG Kub with PVR",
                "Uroflowmetry",
                "Consultation (Urology)",
            ],
            buttonText: "Book Your Appointment",
            popular: false, // to highlight second card
        },
        {
            id: 2,
            title: "Supreme Health Check-up",
            price: "$299,00",
            features: [
                "CBC, PS, ESR",
                "Creatinine",
                "PSA Level",
                "Urine R&M",
                "USG Kub with PVR",
                "Uroflowmetry",
                "Consultation (Urology)",
            ],
            buttonText: "Book Your Appointment",
            popular: true, // Most Popular badge
        },
        {
            id: 3,
            title: "Cardio Package",
            price: "$499,00",
            features: [
                "CBC, PS, ESR",
                "Creatinine",
                "PSA Level",
                "Urine R&M",
                "USG Kub with PVR",
                "Uroflowmetry",
                "Consultation (Urology)",
            ],
            buttonText: "Book Your Appointment",
            popular: false,
        },
        {
            id: 4,
            title: "Urology Package",
            price: "$199,00",
            features: [
                "CBC, PS, ESR",
                "Creatinine",
                "PSA Level",
                "Urine R&M",
                "USG Kub with PVR",
                "Uroflowmetry",
                "Consultation (Urology)",
            ],
            buttonText: "Book Your Appointment",
            popular: false, // to highlight second card
        },
        {
            id: 5,
            title: "Supreme Health Check-up",
            price: "$299,00",
            features: [
                "CBC, PS, ESR",
                "Creatinine",
                "PSA Level",
                "Urine R&M",
                "USG Kub with PVR",
                "Uroflowmetry",
                "Consultation (Urology)",
            ],
            buttonText: "Book Your Appointment",
            popular: true, // Most Popular badge
        },
        {
            id: 6,
            title: "Cardio Package",
            price: "$499,00",
            features: [
                "CBC, PS, ESR",
                "Creatinine",
                "PSA Level",
                "Urine R&M",
                "USG Kub with PVR",
                "Uroflowmetry",
                "Consultation (Urology)",
            ],
            buttonText: "Book Your Appointment",
            popular: false,
        },
    ];


      const testimonials = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        description: `“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.”`,
        author: (<>Joshua, <strong>Brazil</strong></>),
        image: `/images/testi/img-${i + 1}.png`,
    }));


    return(<>
    

        <div className="bg-section-gray md:py-18 py-14">
            <div className="container">
                <h1 className="h1 text-center mb-5">We Take Care of You While Travelling</h1>
                <div className="hero-search max-w-[650px] mx-auto">
                    <form>
                        <div className="relative">
                            <input type="search" name="s" placeholder="Search Treatment, Hospital or Clinic" id="banner-search" className="bg-white border border-primary rounded-full md:py-5.5 md:ps-7.5 md:pe-18 py-4 ps-6 pe-15 w-full" />
                            <button type="submit" className="btn btn-primary p-3 md:w-[50px] md:h-[50px] w-[40px] h-[40px] rounded-full absolute top-1/2 right-2.5 -translate-y-1/2 flex justify-center items-center">
                                <svg width="20" height="20" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.6504 21.8602L16.9805 15.9194C18.4388 14.1763 19.2381 11.9697 19.2371 9.68999C19.2371 4.34701 14.9221 0 9.61853 0C4.31496 0 0 4.34701 0 9.68999C0 15.033 4.31496 19.38 9.61853 19.38C11.6096 19.38 13.5069 18.775 15.1291 17.6265L20.8421 23.6124C21.0809 23.8622 21.4021 24 21.7462 24C22.072 24 22.3811 23.8749 22.6157 23.6474C22.8551 23.4148 22.9933 23.096 22.9998 22.761C23.0063 22.426 22.8806 22.102 22.6504 21.8602ZM9.61853 2.52782C13.5387 2.52782 16.7279 5.74069 16.7279 9.68999C16.7279 13.6393 13.5387 16.8522 9.61853 16.8522C5.69835 16.8522 2.50918 13.6393 2.50918 9.68999C2.50918 5.74069 5.69835 2.52782 9.61853 2.52782Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
                <div className="mt-5 max-w-[600px] mx-auto">

                    <div role="status" className="space-y-2.5 animate-pulse max-w-lg mx-auto">
                        <div className="flex items-center w-full justify-center">
                            <div className="h-2.5 bg-loader rounded-full w-32"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-24"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-full"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[480px] justify-center mx-auto">
                            <div className="h-2.5 bg-loader rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-24"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[400px justify-center] mx-auto">
                            <div className="h-2.5 bg-loader rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-80"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-full"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>


        <div className="container">
            <h2 className="h2 text-center mb-7">Top Rated Clinics</h2>


            <div className="grid md:grid-cols-3 grid-cols-1 gap-7.5">
                {Array.from({ length: 6 }).map((_, i) => (
                    <ProductCardLoader key={i} />
                ))}
            </div>
        </div>


        <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center mb-7">Search By Treatments</h2>

                <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 grid-cols-2 md:gap-7.5 gap-5 [&>*:nth-child(n+7)]:hidden max-[1199px]:[&>*:nth-child(n+6)]:hidden max-[991px]:[&>*:nth-child(n+5)]:hidden max-[767px]:[&>*:nth-child(n+3)]:hidden">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <TreatmentCardLoader key={i} />
                    ))}
                </div>
            </div>

        </div>



          <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center mb-7">Popular Clinics</h2>
              
                <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5 [&>*:nth-child(n+5)]:hidden max-[1199px]:[&>*:nth-child(n+4)]:hidden max-[991px]:[&>*:nth-child(n+3)]:hidden max-[767px]:[&>*:nth-child(n+2)]:hidden">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <ProductCardLoader key={i} />
                    ))}
                </div>
            </div>
           
        </div>

          <PromoteCardLoader reverse={true}/>


            <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center md:mb-7 mb-5">Treatment Packages</h2>
                
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5 [&>*:nth-child(n+4)]:hidden max-[991px]:[&>*:nth-child(n+3)]:hidden max-[767px]:[&>*:nth-child(n+2)]:hidden">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <PackageCardLoader key={i}/>
                    ))}
                </div>
            </div>
        </div>


 <div className="py-18 bg-section-gray">
            <div className="container">
                <h2 className="h2 text-center mb-7">Patient Reviews</h2>
               
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7.5 [&>*:nth-child(n+4)]:hidden max-[991px]:[&>*:nth-child(n+3)]:hidden max-[767px]:[&>*:nth-child(n+2)]:hidden">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <TestimonialCardLoader key={i} />
                    ))}
                </div>
            </div>
        </div>



 <div className="md:my-18 my-16">
        <div className="container">
            <h2 className="h2 text-center mb-7">FAQ’s</h2>
           
            <div className="max-w-3xl mx-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div className="h-15 bg-loader rounded-thm w-full mb-5 last:mb-0 mx-auto animate-pulse" key={i}></div>
                ))}
            </div>
        </div>
    </div>


 <PromoteCardLoader reverse={false}/>

  <FreeQuoteLoader />
    </>);
}