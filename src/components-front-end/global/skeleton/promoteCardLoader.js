import ImagePlaceholder from "./ImagePlaceholder";

export default function PromoteCardLoader({ reverse = false}){

    return (
        <div className="my-18">
            <div className="container">
                <div className={`flex animate-pulse flex-wrap-reverse bg-section-gray rounded-[1.2rem] overflow-hidden ${reverse ? "flex-row-reverse" : "flex-row"}`}>
                    <div className="md:px-12 md:py-15 p-5 py-5 flex-auto lg:w-1/2 w-full flex flex-col justify-center items-start">
                        <div className="h-6 bg-loader rounded-full w-full mb-5"></div>
                        <div className="mb-5 w-full">
                            <div className="h-3.5 bg-loader rounded-full w-8/10 mb-3"></div>
                            <div className="h-3.5 bg-loader rounded-full w-6/10 mb-3"></div>
                            <div className="h-3.5 bg-loader rounded-full w-6/10 mb-3"></div>
                            <div className="h-3.5 bg-loader rounded-full w-6/10"></div>
                        </div>
                        <div className="h-10 bg-loader rounded-thm w-30"></div>
                    </div>
                    <div className="flex-auto lg:w-1/2 w-full">
                        <div className="relative overflow-hidden pb-[50%] h-full bg-loader">
                            <ImagePlaceholder />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}