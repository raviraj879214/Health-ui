
"use client"
import { Phone, Mail, Globe, MessageCircle, Send, Router } from "lucide-react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useState } from "react";
import {adminHeaders} from "../utils/adminHeader";
import { usePermissions } from "@/context/PermissionContext";
import { formatBrazilDate } from "@/lib/formatDate";
import { ClinicStatus } from "@/lib/enums/ClinicStatus";
import {AssignCordinator} from "./assignCordinators";





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
              <li key={item.id} className="py-4 border-b last:border-b-0">
                <div className="grid grid-cols- lg:grid-cols-5 gap-6 items-start">


                  <div className="flex items-start gap-3 w-full min-w-0">
  <div className="w-full min-w-0">
    
    <p className="text-sm font-semibold text-heading flex flex-wrap items-center gap-2">
      
      <span className="break-words">
        {item.name}
      </span>

      <span
        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap
        ${item.status === ClinicStatus.PENDING
            ? "bg-yellow-100 text-yellow-700"
            : item.status === ClinicStatus.ACTIVE
              ? "bg-green-100 text-green-700"
              : item.status === ClinicStatus.BLOCKED
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
          }`}
      >
        {item.status === ClinicStatus.PENDING && "Pending"}
        {item.status === ClinicStatus.ACTIVE && "Active"}
        {item.status === ClinicStatus.BLOCKED && "Deactivated"}
      </span>

    </p>

    <p className="text-xs text-body mt-1 break-words">
      Registered on : {formatBrazilDate(item.createdAt)}
    </p>

  </div>
</div>

                  <div className="bg-white border rounded-lg p-4 shadow-sm w-full overflow-hidden">
  <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide border-b pb-2 mb-3">
    Clinic Managed By
  </h3>

  <div className="space-y-2 text-sm text-gray-800">
    
    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-3">
      <span className="text-gray-500">Name</span>
      <span className="font-medium break-words sm:text-right">
        {item?.clinicUser?.firstname} {item?.clinicUser?.lastname}
      </span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-3">
      <span className="text-gray-500">Phone</span>
      <span className="font-medium break-all">
        {item?.clinicUser?.phone}
      </span>
    </div>

    <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-3">
      <span className="text-gray-500">Email</span>
      <span className="font-medium break-all sm:text-right">
        {item?.clinicUser?.email}
      </span>
    </div>

  </div>

  <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t">
    
    <a href={`tel:${item?.clinicUser?.phone}`} title="Call" className="hover:opacity-80">
      <img width="26" className="max-w-full" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/phone.svg`} alt="Call" />
    </a>

    {item?.clinicUser?.whatsappNumber && (
      <a
        href={`https://wa.me/${item?.clinicUser?.whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        title="WhatsApp"
        className="hover:opacity-80"
      >
        <img width="26" className="max-w-full" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/whatsapp.svg`} alt="WhatsApp" />
      </a>
    )}

    {item?.clinicUser?.telegramNumber && (
      <a
        href={`https://t.me/${item?.clinicUser?.telegramNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Telegram"
        className="hover:opacity-80"
      >
        <img width="26" className="max-w-full" src={`${process.env.NEXT_PUBLIC_URL}/images/brand/telegram.svg`} alt="Telegram" />
      </a>
    )}

  </div>
                  </div>


                  <div>
                    <p className="text-xs text-gray-500 mb-2">Doctors</p>
                    <div className="flex -space-x-3">
                      {item.clinicDoctors?.length > 0 ? (
                        item.clinicDoctors.map((itemdoctor) => (
                          <img
                            key={itemdoctor.doctor.id}
                            className="w-10 h-10 border-2 border-white rounded-full object-cover"
                            src={
                              itemdoctor.doctor.image
                                ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${itemdoctor.doctor.image}`
                                : '/images/default-doctor.png'
                            }
                            alt={itemdoctor.doctor.name || 'Doctor'}
                          />
                        ))
                      ) : (
                        <span className="text-sm text-gray-400">No doctors</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <AssignCordinator clinicid={item.uuid} cordinator={item.cordinator} />
                  </div>


                  <div className="flex justify-end">
                    <button
                      onClick={() => router.push(`/admin/clinic-details/${item.uuid}`)}
                      className="text-xs font-semibold text-heading bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium px-4 py-2 rounded-base"
                    >
                      View Details
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