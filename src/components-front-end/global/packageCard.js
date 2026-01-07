import Link from "next/link";
import Image from "next/image";


export default function PackageCard({ data }){
    return (
        <div className={`border md:pt-10 md:pb-7.5 md:px-7.5 px-5 pt-8 pb-5 rounded-thm h-full relative flex flex-col items-start border-border`}>
            {data.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-thm-yellow text-white px-3 py-1 rounded-full">
                Most Popular
                </div>
            )}
            <h3 className="text-[1.4rem] text-center mb-2 font-bold w-full">{data.title}</h3>
            <p className="h1 text-center mb-5 text-primary w-full">{data.price}</p>
            <div className="description mb-4 w-full">
                <ul className="[&_li:not(:last-child)]:mb-1.5">
                    {data.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                
            </div>
            <Link href="#" className="btn btn-secondary w-full mt-auto">Book Your Appointment</Link>
        </div>
    )
}