



export function BannerSkeleton(){

    return(<>
    <div role="status" className="space-y-2.5 animate-pulse max-w-lg mx-auto">
                        <div className="flex items-center w-full justify-center">
                            <div className="h-2.5 bg-loader rounded-full w-32"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-24"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-full"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[480px] justify-center mx-auto">
                            <div className="h-2.5 bg-loader rounded-full w-full"></div>
                                    <div className="h-2.5 ms-2 bg-loader rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-24"></div>
                        </div>
                        <div className="flex items-center w-full max-w-[400px justify-center] mx-auto">
                            <div className="h-2.5 bg-loader rounded-full w-full"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-80"></div>
                            <div className="h-2.5 ms-2 bg-loader rounded-full w-full"></div>
                        </div>
                        <span className="sr-only">Loading...</span>
    </div>
    
    
    </>);
}