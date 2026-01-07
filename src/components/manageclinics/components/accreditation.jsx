import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";




export function Accreditation({id}){


    const [accreditaions,setAccredtitaions]= useState([]);


    useEffect(()=>{
        fetchAccreditaion();
    },[id]);

        const fetchAccreditaion  = async ()=>{
            const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-accreditation/${id}`,{
                method : "Get",
                headers :await adminHeaders(),
            });
            if(res.ok){
                const result = await res.json();
                setAccredtitaions(result.data);
            }
        }







    return(<>
    
     <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Hospital Accreditation & Certification
                        </h3>
                        <div className="flex items-center gap-x-1">

                        </div>
                    </div>
                    {accreditaions.length > 0 ? (
                         <div className="p-4 md:p-5 overflow-y-auto max-h-80">

                        <ul className=" divide-y divide-default">
                           
                            {accreditaions.map((item)=>(
                                 <li className="pb-3 sm:pb-4">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="shrink-0">
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src={`${item.accreditation.image}`}
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-heading truncate">{item.accreditation.name}</p>
                                        
                                    </div>
                                    <div className="inline-flex items-center text-base font-semibold text-heading">

                                    </div>
                                </div>
                            </li>
                            ))}
                           

                           
                        </ul>


                    </div>
                    ):(
                        <p className="p-5">No records found</p>
                    )}
                  
    
                </div>

                
    
    </>);
}