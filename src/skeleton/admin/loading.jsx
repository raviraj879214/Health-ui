



export default function Loading() {

  return (<>
    <div className="animate-pulse">
  <div className="bg-gray-200 rounded h-8 w-full mb-4"></div> 
  <div className="space-y-2">
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gray-200 rounded h-6 col-span-1"></div>
      <div className="bg-gray-200 rounded h-6 col-span-2"></div>
      <div className="bg-gray-200 rounded h-6 col-span-1"></div>
    </div>
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gray-200 rounded h-6 col-span-1"></div>
      <div className="bg-gray-200 rounded h-6 col-span-2"></div>
      <div className="bg-gray-200 rounded h-6 col-span-1"></div>
    </div>
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-gray-200 rounded h-6 col-span-1"></div>
      <div className="bg-gray-200 rounded h-6 col-span-2"></div>
      <div className="bg-gray-200 rounded h-6 col-span-1"></div>
    </div>
  </div>
</div>
  </>);
}