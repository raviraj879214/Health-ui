import ImagePlaceholder from "./ImagePlaceholder";


export default function TreatmentCardLoader(){
    return (
        <div className="animate-pulse border border-border py-7.5 px-4 text-center rounded-thm h-full">
            <div className="w-[48px] mx-auto">
                <div className="relative overflow-hidden rounded-thm pb-[100%] mb-4.5 text-loader-text">
                    <ImagePlaceholder />
                </div>
            </div>
            <div className="content">
                <div className="h-2.5 bg-loader rounded-full w-7/10 mb-2 mx-auto"></div>
            </div>
        </div>
    )
}