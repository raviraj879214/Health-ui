import PackageCard from "../../components-front-end/global/packageCard";
import PackageCardLoader from "../../components-front-end/global/skeleton/packageCardLoader";


export default function Packages(){

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


    return (
        <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center md:mb-7 mb-5">Treatment Packages</h2>
                <div className="swiper swiper-packages md:py-7! py-4!">
                    <div className="swiper-wrapper">
                        {treatmentPackages.map((card) => (
                            <div className="swiper-slide h-auto!" key={card.id}>
                                <PackageCard 
                                    data={card}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
                
            </div>
        </div>
    )
}