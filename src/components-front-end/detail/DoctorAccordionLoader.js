import ImagePlaceholder from "../global/skeleton/ImagePlaceholder";

export default function DoctorAccordionLoader(){
    return (
        <>
            <div className="border border-border rounded-thm mb-5 md:px-7.5 px-4 pt-5 animate-pulse">
                <div className="md:h-8 h-6 bg-loader rounded-full w-full mb-4"></div>
                {Array.from({ length: 2 }).map((_, i) => (
                    <div className="border-b border-border last:border-b-0 flex pb-5 mb-5 last:pb-0">
                        <div className="thumb-wrap md:w-[100px] w-[70px] flex-none me-5">
                            <div className="w-full relative overflow-hidden pb-[100%] rounded-thm bg-loader">
                                <ImagePlaceholder />
                            </div>
                        </div>
                        <div className="grow flex md:flex-nowrap flex-wrap justify-between gap-5 items-center">
                            <div className="m-0 grow-[0.5] md:w-1/2 w-full">
                                <div className="h-6 bg-loader rounded-full w-full mb-2"></div>
                                <div className="h-4 bg-loader rounded-full w-full mb-2"></div>
                                <div className="[&_>_*:not(:last-child)]:mb-2 w-full">
                                    <div className="h-2.5 bg-loader rounded-full w-full"></div>
                                    <div className="h-2.5 bg-loader rounded-full w-4/10"></div>
                                </div>
                            </div>
                            <div className="md:h-12 h-8 bg-loader rounded-thm w-30"></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border border-border rounded-thm mb-5 md:px-7.5 px-4 py-5 animate-pulse">
                <div className="md:h-8 h-6 bg-loader rounded-full w-full"></div>
            </div>
            <div className="border border-border rounded-thm mb-5 md:px-7.5 px-4 py-5 animate-pulse">
                <div className="md:h-8 h-6 bg-loader rounded-full w-full"></div>
            </div>
        </>
    )
}