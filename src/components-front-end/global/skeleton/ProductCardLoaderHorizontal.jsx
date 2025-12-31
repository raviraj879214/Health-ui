import ImagePlaceholder from "./ImagePlaceholder";




export function ProductCardLoaderHorizontal(){


    return (<>

 <div className="animate-pulse flex items-center gap-4">

  <div className="relative overflow-hidden rounded-thm w-50 h-50 bg-loader">
    <ImagePlaceholder />
  </div>


  <div className="flex-1 flex items-center gap-4">
    <span className="h-3 bg-loader rounded-full w-4/10"></span>
    <span className="h-3 bg-loader rounded-full w-2/10"></span>
    <span className="h-3.5 bg-loader rounded-full w-full"></span>
    <span className="h-3.5 bg-loader rounded-full w-6/10"></span>
  </div>
</div>




    </>);
}