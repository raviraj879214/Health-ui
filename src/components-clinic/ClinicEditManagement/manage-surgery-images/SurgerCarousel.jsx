"use client";

import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { useConfirm } from "@/hooks/useConfirm";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export function SurgeriesCarouselImages({dataReset}) {
    const [surgeries,setSurgeries] = useState([]);
    const [surgeryid,setSurgeryid] = useState("");
    const { confirm, ConfirmDialog } = useConfirm();


  const [current, setCurrent] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);


  useEffect(() => {
    fetchsurgeries();
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dataReset,surgeryid]);

  const nextSlide = () =>
    setCurrent((prev) => (prev + 1) % surgeries.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + surgeries.length) % surgeries.length);



  const fetchsurgeries = async()=>{
        debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-surgeries/get-surgeries-images`,{
        method : "Get",
        headers : clinicHeaders()
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
            surgeryId : item.surgeryId

        };
    }); 
    

    setSurgeries(surgeriesArray);
       
    }


  }





  const deleteSurgeryimages = async(id)=>{

      debugger;
     const result = await confirm("Are you sure you want to delete this item?");
                if (!result) {
                    console.log("User not confirmed!");
                    return false;
                }

    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-surgeries/delete-surgeries-images/${id}`,{
      method : "Delete",
      headers : clinicHeaders()
    });

    if(res.ok){
      const result = await res.json();
      const rand = Math.random();
      setSurgeryid(rand);
       toast.success("Images deleted successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });


    }
  }


  const deleteimages=(id)=>{


    deleteSurgeryimages(id);
  }

if (surgeries.length === 0) {
  return (
    <p className="text-center text-gray-500 text-lg font-medium mt-12">
      No Images
    </p>
  );
}






  return (
    <div className="relative w-full overflow-hidden p-4 bg-gray-50 dark:bg-neutral-800 rounded-xl">
      <ConfirmDialog></ConfirmDialog>

      

      <div
        className="flex transition-transform duration-500"
        style={{
          transform: `translateX(-${(current * 100) / visibleItems}%)`,
        }}>


        {surgeries.map((surgery, idx) => (
          
                <div
                    key={idx}
                    className={`flex-shrink-0 w-[calc(100%/${visibleItems})] gap-2 flex border border-gray-300 dark:border-neutral-600 rounded-lg p-2 relative`}
                >
                  
                    <div className="absolute top-2 right-2 flex gap-1 z-10">

                    
                    <button onClick={()=> deleteimages(surgery.surgeryId)}  className="text-red-500 hover:text-red-700 bg-white/80 rounded px-1">🗑</button>
                    </div>


                    <div className="relative w-1/2 h-[180px] overflow-hidden rounded">
                    <img
                        src={surgery.before}
                        alt="Before"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-blue-600 text-white px-2 py-0.5 text-xs rounded">
                        Before 
                    </div>
                    </div>

                    {/* After Image */}
                    <div className="relative w-1/2 h-[180px] overflow-hidden rounded">
                    <img
                        src={surgery.after}
                        alt="After"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-green-600 text-white px-2 py-0.5 text-xs rounded">
                        After
                    </div>
                    </div>
                </div>
        ))}




      </div>

      
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/70 dark:bg-black/40 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-black"
      >
        ◀
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/70 dark:bg-black/40 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-black"
      >
        ▶
      </button>
    </div>


  );
}
