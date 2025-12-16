import TestimonialCard from "../../components-front-end/global/testimonialCard";
import TestimonialCardLoader from "../../components-front-end/global/skeleton/testimonialCardLoader";


export default function Testimonials(){

    // Dummy Content
    const testimonials = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        description: `“Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.”`,
        author: (<>Joshua, <strong>Brazil</strong></>),
        image: `/images/testi/img-${i + 1}.png`,
    }));


    return (
        <div className="py-18 bg-section-gray">
            <div className="container">
                <h2 className="h2 text-center mb-7">Patient Reviews</h2>
                <div className="swiper-offet-wrap">
                    <div className="swiper swiper-testimonials">
                        <div className="swiper-wrapper">
                            {testimonials.map((card) => (
                                <div className="swiper-slide h-auto!" key={card.id}>
                                    <TestimonialCard 
                                        data={card}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="swiper-button-prev">
                        <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.9166 24C12.0589 24.0001 12.1998 23.972 12.3312 23.9171C12.4626 23.8623 12.582 23.7818 12.6825 23.6804C12.7831 23.5791 12.863 23.4589 12.9175 23.3266C12.972 23.1942 13 23.0524 13 22.9091C13 22.7658 12.972 22.624 12.9175 22.4916C12.863 22.3593 12.7831 22.2391 12.6825 22.1378L2.61523 12L12.6825 1.86215C13.1058 1.43588 13.1058 0.745603 12.6825 0.319603C12.2592 -0.106398 11.5737 -0.106671 11.1507 0.319603L0.317516 11.2287C0.216859 11.3299 0.137007 11.4502 0.0825253 11.5825C0.0280428 11.7149 9.53674e-07 11.8567 9.53674e-07 12C9.53674e-07 12.1432 0.0280428 12.2851 0.0825253 12.4174C0.137007 12.5498 0.216859 12.67 0.317516 12.7713L11.1507 23.6804C11.2511 23.7818 11.3705 23.8623 11.502 23.9171C11.6334 23.972 11.7743 24.0001 11.9166 24Z" fill="currentcolor"/>
                        </svg>
                    </div>
                    <div className="swiper-button-next">
                        <svg width="13" height="24" viewBox="0 0 13 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.08342 24C0.941143 24.0001 0.800238 23.972 0.6688 23.9171C0.537362 23.8623 0.417982 23.7818 0.317517 23.6804C0.21686 23.5791 0.137006 23.4589 0.0825244 23.3266C0.0280423 23.1942 0 23.0524 0 22.9091C0 22.7658 0.0280423 22.624 0.0825244 22.4916C0.137006 22.3593 0.21686 22.2391 0.317517 22.1378L10.3848 12L0.317517 1.86215C-0.105788 1.43588 -0.105788 0.745603 0.317517 0.319603C0.740823 -0.106398 1.42629 -0.106671 1.84933 0.319603L12.6825 11.2287C12.7831 11.3299 12.863 11.4502 12.9175 11.5825C12.972 11.7149 13 11.8567 13 12C13 12.1432 12.972 12.2851 12.9175 12.4174C12.863 12.5498 12.7831 12.67 12.6825 12.7713L1.84933 23.6804C1.74886 23.7818 1.62948 23.8623 1.49804 23.9171C1.3666 23.972 1.2257 24.0001 1.08342 24Z" fill="currentcolor"/>
                        </svg>
                    </div>
                </div>
                            
            </div>
        </div>
    )
}