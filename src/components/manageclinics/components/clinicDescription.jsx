import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";




export function ClinicDescription({id}){


    const [descriptions,setDescriptions] = useState([]);


    useEffect(()=>{
            fetchDescription();
    },[id]);



    const fetchDescription =async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-description/${id}`,{
            method : "Get",
            headers: await adminHeaders(),
        });

        if(res.ok){
            const result = await res.json();

            setDescriptions(result.data);
        }
    }










    return(<>

 <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            Hospital Description
                        </h3>
                    </div>
                    <div className="p-4 md:p-5">
                        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                            <div className="h-80 overflow-y-auto p-4 md:p-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Brief Description
                                </h3>
                               <div className="mt-2 text-gray-500 dark:text-neutral-400 h-[400px] overflow-auto">
                                <div
                                    className="prose prose-sm max-w-none 
                                            prose-ul:list-disc prose-ul:pl-5 
                                            prose-ol:list-decimal prose-ol:pl-5"
                                    dangerouslySetInnerHTML={{
                                    __html: descriptions?.briefDescription,
                                    }}
                                />
                                </div>

                            </div>
                            
                        </div>
                        <div className="mt-5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                            <div className="h-80 overflow-y-auto p-4 md:p-5 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                    Full Description
                                </h3>
                               

                                <div className="mt-2 text-gray-500 dark:text-neutral-400 h-[400px] overflow-auto">
                                <div
                                    className="prose prose-sm max-w-none 
                                            prose-ul:list-disc prose-ul:pl-5 
                                            prose-ol:list-decimal prose-ol:pl-5"
                                    dangerouslySetInnerHTML={{
                                    __html: descriptions?.fullDescription,
                                    }}
                                />
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>



    
    
    </>);
}   