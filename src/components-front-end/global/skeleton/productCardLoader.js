import ImagePlaceholder from "./ImagePlaceholder";

export default function ProductCardLoader(){
    return (
        <div className="animate-pulse">
            <div className="relative overflow-hidden rounded-thm pb-[70%] mb-4.5 bg-loader text-loader-text">
                <ImagePlaceholder />
            </div>
            <div className="content">
                <div className="flex justify-between gap-5 mb-4">
                    <span className="h-3 bg-loader rounded-full w-4/10"></span>
                    <span className="h-3 bg-loader rounded-full w-2/10"></span>
                </div>
                <div className="h-3.5 bg-loader rounded-full w-full mb-2"></div>
                <div className="h-3.5 bg-loader rounded-full w-6/10"></div>
            </div>
        </div>
    )
}