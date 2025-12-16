import Image from "next/image";
import ImagePlaceholder from "./ImagePlaceholder";

export default function TestimonialCardLoader(){
    return (
        <div className="animate-pulse p-7.5 rounded-thm h-full relative bg-white flex flex-col items-start">
            <Image
                src="/images/testi-quote.svg"
                alt="Testimonial"
                width={46}
                height={42}
                className="w-[46px] h-[42px] object-contain mb-5"
            />
            <div className="[&_>_*:not(:last-child)]:mb-2 mb-5 w-full">
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
                <div className="h-2.5 bg-loader rounded-full w-full"></div>
            </div>
            <div className="flex items-center mt-auto">
                <div className="w-[50px] h-[50px] rounded-full overflow-hidden me-2.5 relative flex items-center justify-center bg-loader">
                    <div className="relative w-[30px] h-[30px]">
                        <ImagePlaceholder />
                    </div>
                </div>
                <div className="h-3.5 bg-loader rounded-full w-30 mb-2"></div>
            </div>
        </div>
    )
}