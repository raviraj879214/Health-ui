import Link from "next/link";
import Image from "next/image";


export default function TestimonialCard({ data }){
    return (
        <div className="p-7.5 rounded-thm h-full relative bg-white flex flex-col items-start">
            <Image
                src="/images/testi-quote.svg"
                alt="Testimonial"
                width={46}
                height={42}
                className="w-[46px] h-[42px] object-contain mb-5"
            />
            <div className="[&_>_*:last-child]:mb-0 mb-5">
                <p>{data.description}</p>
            </div>
            <div className="flex items-center mt-auto">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden me-2.5">
                    <Image
                        src={data.image}
                        alt={data.author}
                        width={50}
                        height={50}
                        className="w-full h-full object-cover"
                    />
                </div>
                <p className="mb-0">{data.author}</p>
            </div>
        </div>
    )
}