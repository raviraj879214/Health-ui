
"use client"
import { Phone, Mail, Globe, MessageCircle, Send, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useState } from "react";
import {adminHeaders} from "../utils/adminHeader";
import { usePermissions } from "@/context/PermissionContext";





export function ClinicListAdmin(){

    const [clinic,setClinic] = useState([]);
    const [totalCount,setTotalCount] = useState([]);
    const { canRead, canCreate, canUpdate, canDelete , status } = usePermissions("Manage Clinic");

    const [page,setPage] = useState(1);
    const [limit,setLimit] = useState(10);


    const router = useRouter();

    useEffect(()=>{

        fetchClinic();


    },[page]);





    const fetchClinic = async()=>{
      
        
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-listing?page=${page}&limit=${limit}`,{
            method : "GET",
            headers : await adminHeaders()
        });

        if(res.ok){
            const result= await res.json();
            setClinic(result.data);
            setTotalCount(result.totalCount)
        }

    }




    const setPageLimitIncrease=(val)=>{
         
        if(val <= Math.ceil(totalCount / limit)){
            setPage(val);
        }
        else if(val > Math.ceil(totalCount / limit)) {
              setPage(1);
        }


    }


    const setPageLimitDecrease=(val)=>{
        if(val > 0){
            setPage(val);
        }
    }




    


    return(<>
    
   

    <ComponentCard>
        
            {!canRead  &&(
                <p className="text-red-500">Restricted</p>
            )}
           

            <div>
             <ul className="divide-y divide-default">
            {clinic.map((item)=>(
               <li key={item.id}  className="py-4">


                    <div className="flex items-center justify-between">
                        
                    <div className="flex items-center space-x-4 w-1/8">
                        <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-heading truncate">
                            {item.name}
                        </p>

                        <p className="text-xs text-body truncate">
                            # {item.address} {item.city.name} {item.country.name}
                        </p>

                        <div className="flex items-center gap-3 mt-1 text-body">

                            
                            <a href="tel:+919876543210" className="hover:text-heading">
                            <img width={"30px"} src={`${process.env.NEXT_PUBLIC_URL}/images/brand/phone.svg`} alt="WhatsApp" />
                            </a>

                        
                            <a
                            href="https://wa.me/919876543210"
                            target="_blank"
                            className="hover:text-heading">
                                <img width={"30px"}
                                 
                                 src={`${process.env.NEXT_PUBLIC_URL}/images/brand/whatsapp.svg`}
                                 
                                 alt="WhatsApp" />
                            </a>

                        
                            <a
                            href="https://t.me/clinic_support"
                            target="_blank"
                            className="hover:text-heading">
                            <img width={"30px"} 
                            
                             src={`${process.env.NEXT_PUBLIC_URL}/images/brand/telegram.svg`}
                            
                            alt="WhatsApp" />
                            </a>

                        
                        

                        </div>
                        </div>

                    </div>


                    <div className="flex -space-x-4 rtl:space-x-reverse">
                            {item.clinicDoctors && item.clinicDoctors.length > 0 ? (
                                item.clinicDoctors.map((itemdoctor) => (
                                <img
                                    key={itemdoctor.doctor.id} // make sure each doctor has a unique id
                                    className="w-10 h-10 border-2 border-buffer rounded-full"
                                    src={
                                    itemdoctor.doctor.image
                                        ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${itemdoctor.doctor.image}`
                                        : '/images/default-doctor.png' // fallback image
                                    }
                                    alt={itemdoctor.doctor.name || 'Doctor'}
                                />
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No doctors available</p>
                            )}
                        </div>



                        
                    <div className="flex items-center gap-2">
                    <button

                    onClick={()=>{
                            router.push(`/admin/clinic-details/${item.uuid}`);
                    }}
                    
                    
                    className="text-xs font-semibold text-heading bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium px-3 py-1.5 rounded-base">
                        View
                    </button>

                           
                    
                    </div>
                    </div>
              </li>
            ))}
            <li className="flex flex-col items-end">
                    
                    <div className="flex flex-col items-center mt-6">
                   
                    <span className="text-sm text-body">
                        Showing page <span className="font-semibold text-heading">{page}</span> to{" "}
                        <span className="font-semibold text-heading">{page * limit}</span> of{" "}
                        <span className="font-semibold text-heading">{totalCount}</span> Entries
                    </span>

                   
                    <div className="inline-flex mt-4 -space-x-px">
                        
                        <button
                        onClick={()=> setPageLimitDecrease(page - 1)}
                        type="button"
                        className="inline-flex items-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-s-base text-sm px-4 py-2.5 focus:outline-none"
                        >
                        <svg
                            className="w-4 h-4 me-1.5 -ms-0.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24">
                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h14M5 12l4-4m-4 4 4 4"/>
                        </svg>
                        Previous
                        </button>

                       
                        <button
                        onClick={()=> setPageLimitIncrease(page + 1)}
                        type="button"
                        className="inline-flex items-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading shadow-xs font-medium leading-5 rounded-e-base text-sm px-4 py-2.5 focus:outline-none">
                        Next
                        <svg
                            className="w-4 h-4 ms-1.5 -me-0.5 rtl:rotate-180"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24">

                            <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 12H5m14 0-4 4m4-4-4-4"/>

                        </svg>
                        </button>
                    </div>
                    </div>


            </li>
            </ul>
          </div>




        </ComponentCard>


    </>);
}