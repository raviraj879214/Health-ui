import Image from "next/image";
import Link from "next/link";

import ProductCard from "../../global/productCard";
import ProductCardLoader from "../../global/skeleton/productCardLoader";


export default function TopRated(){

    // Dummy Content
    const clinics = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        title: `Hospital Samaritano ${i + 1}`,
        image: `/images/product/img-${i + 1}.png`,
    }));

    return (
        <div className="md:my-18 my-16">
            <div className="container">
                <h2 className="h2 text-center mb-7">Top Rated Clinics</h2>

                
                <div className="grid md:grid-cols-3 grid-cols-1 gap-7.5">
                    {clinics.map((clinic) => (
                        <ProductCard 
                            key={clinic.id}
                            data={clinic}
                        />
                    ))}
                </div>
                

                <div className="text-center mt-7">
                    <Link href="/clinics" className="btn btn-secondary-outline">View All Clinics</Link>
                </div>
            </div>
        </div>
    )
}