"use client"
import { adminHeaders } from "@/components/utils/adminHeader";
import HoverZoomImage from "@/reusable/hoverZoomImage";
import { useEffect, useState } from "react";




export function SurgeryImages({id}){



    const [surgeryimage,setSurgeryImage] = useState([]);


    useEffect(()=>{

        fetchSurgeryImages();

    },[id]);



    const fetchSurgeryImages = async()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-surgery-images/${id}`,{
            method : "Get",
            headers :await adminHeaders()
        });

        if(res.ok){
            const result = await res.json();
            const beforephotos = result.data.filter(x=>x.imageType == "before");
            const afterphotos = result.data.filter(x=>x.imageType == "after");

           const surgeriesArray = beforephotos.map(item => {
                const afterItem = afterphotos.find(x => x.surgeryId === item.surgeryId);
                return {
                    before:`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/surgery/beforeandafter/${item.imageUrl}`,
                    after:`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/surgery/beforeandafter/${afterItem.imageUrl}`,
                    surgeryId : item.surgeryId,
                    id:item.id
                };
            }); 


            setSurgeryImage(surgeriesArray);
        }
    }










    return(<>
    
      <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Before & After Photos ({surgeryimage.length})
          </h3>
          <div className="flex items-center gap-x-1"></div>
        </div>

        <div className="p-4 md:p-5">
  {/* Scrollable container */}
  <div className="max-h-[400px] overflow-y-auto">
    {surgeryimage?.length > 0 ? (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {surgeryimage.map((surgery, index) => (
          <div
            key={surgery.id ?? index}
            className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl shadow-sm border"
          >
            {/* BEFORE */}
            <div className="relative h-[180px] overflow-hidden rounded-lg group">
              <HoverZoomImage
                src={surgery.before}
                alt="Before Surgery"
                size={200}
                borderRadius="10px"
                className="shadow-lg"
              />
              <span className="absolute top-2 left-2 bg-blue-600/90 text-white px-2 py-1 text-xs font-medium rounded-md">
                Before
              </span>
            </div>

            {/* AFTER */}
            <div className="relative h-[180px] overflow-hidden rounded-lg group">
              <HoverZoomImage
                src={surgery.after}
                alt="After Surgery"
                size={200}
                borderRadius="10px"
                className="shadow-lg"
              />
              <span className="absolute top-2 left-2 bg-green-600/90 text-white px-2 py-1 text-xs font-medium rounded-md">
                After
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-500 py-4">
        No surgery images available
      </p>
    )}
  </div>
</div>

      </div>

    
    </>);
}