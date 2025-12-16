export default function FreeQuoteLoader(){
    return (
        <div className="my-18">
            <div className="container">
                <div className="bg-section-gray text-white rounded-thm flex md:flex-nowrap flex-wrap items-center justify-between gap-5 md:px-12 md:py-14 px-5 py-7.5">
                    <div className="m-0 grow-[0.6] md:w-1/2 w-full">
                        <div className="h-8 bg-loader rounded-full w-full mb-5"></div>
                        <div className="[&_>_*:not(:last-child)]:mb-2 w-full">
                            <div className="h-2.5 bg-loader rounded-full w-8/10"></div>
                            <div className="h-2.5 bg-loader rounded-full w-5/10"></div>
                        </div>
                    </div>
                    <div className="h-10 bg-loader rounded-thm w-40"></div>
                </div>
            </div>
        </div>
    )
}