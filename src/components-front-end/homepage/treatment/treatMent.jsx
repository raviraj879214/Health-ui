import TreatmentCard from "../../global/treatmentCard";
import SwiperInit from "../../shared/SwiperInit";
import TreatmentCardLoader from "../../global/skeleton/treatmentCardLoader";


export default function Treatments(){

    // Dummy Content
    const treatments = Array.from({ length: 8 }, (_, i) => ({
        id: i + 1,
        title: `Anesthesiology`,
        image: `/images/treatments/treatment-${i + 1}.svg`,
    }));

    return (
        <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center mb-7">Search By Treatments</h2>
                <div className="swiper swiper-treatments a-hover-secondary">
                    <div className="swiper-wrapper">
                        {treatments.map((treatment) => (
                            <div className="swiper-slide h-auto!" key={treatment.id}>
                                <TreatmentCard data={treatment}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
               
            </div>
            <SwiperInit />
        </div>
    )
}