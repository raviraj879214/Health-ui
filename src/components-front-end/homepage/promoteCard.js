import Image from "next/image";
import Link from "next/link";


export default function PromoteCard({ reverse = false, data = {}}){

    const {
        title = "",
        description = "",
        buttonText = "",
        buttonLink = "/partner-register",
        image = "",
        imageAlt = "",
    } = data;

    return (
        <div className="my-18">
            <div className="container">
                <div className={`flex flex-wrap-reverse bg-section-gray rounded-[1.2rem] overflow-hidden ${reverse ? "flex-row-reverse" : "flex-row"}`}>
                    <div className="md:px-12 md:py-15 p-5 py-5 flex-auto lg:w-1/2 w-full flex flex-col justify-center items-start">

                        {title && <h2 className="h2 mb-2.5">{title}</h2>}

                        {description && (
                            <div className="[&_>_*:last-child]:mb-0 mb-7.5">
                                <p>{description}</p>
                            </div>
                        )}

                        {buttonText && (
                            <Link href={buttonLink} className="btn btn-secondary">
                                {buttonText}
                            </Link>
                        )}
                    </div>
                    {image && (
                        <div className="flex-auto lg:w-1/2 w-full">
                            <div className="relative overflow-hidden pb-[50%] h-full">
                                <Image
                                    src={image}
                                    alt={imageAlt || title}
                                    width={600}
                                    height={400}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}