import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import HoverZoomImage from "../../../reusable/hoverZoomImage";
import { DoctorVerifyStatus } from "@/lib/enums/doctorVerifyStatus";




export function DoctorList({id}){

    const [clinic,setClinic] = useState([]);

    const [doctors,setDoctors] = useState([]);

    useEffect(()=>{
        fetchClinic();

    },[id]);
    
    
  const fetchClinic = async()=>{
    debugger;
     const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-listing?clinicuuid=${id}`,{
            method : "GET",
            headers : await adminHeaders()
        });

        if(res.ok){
            const result= await res.json();

            setClinic(result.data);

             const ddoc = [];

                result.data.forEach(item => {
                    (item.clinicDoctors || []).forEach(itemDoctor => {
                        ddoc.push(itemDoctor.doctor); 
                    });
                });
                console.log("ddoc",ddoc);
                setDoctors(ddoc);
        }
    }
    



    return(<>

     <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                    <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">

                         Doctors ({doctors.length})

                        </h3>
                        <div className="flex items-center gap-x-1">

                        </div>
                    </div>
                    
                       
                      
                    <div className="p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">
                        {doctors.map((item) => (
                            <div
                            key={item.uuid}
                            className="relative bg-neutral-primary-soft max-w-xs w-full p-6 border border-default rounded-base shadow-xs">
                                    
<div className="absolute top-4 right-4 flex items-center gap-3">


    <div
    onClick={() =>
      window.open(
        `/admin/doctor-details/${item.uuid}`,
        "_blank",
        "noopener,noreferrer"
      )
    }
    className="cursor-pointer text-body hover:text-heading"
  >
    <FaEye />
  </div>
  <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
    {DoctorVerifyStatus.PENDING === item.DoctorVerify && "Review"}
    {DoctorVerifyStatus.VERIFIED === item.DoctorVerify && "Verified"}
    {DoctorVerifyStatus.INACTIVE === item.DoctorVerify && "Inactive"}
  </span>



</div>

                            <div className="flex flex-col items-center">
                                {/* <img
                                className="w-24 h-24 mb-6 rounded-full object-cover"
                               src = {`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${item.image}`}
                                alt={`${item.firstname} ${item.lastname}`}
                                /> */}


                                <HoverZoomImage
                                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${item.image}`}
                                    alt={`${item.firstname} ${item.lastname}`}
                                    size={120}            
                                    borderRadius="100px"     
                                    className=""/>


                                     <h5 className="mb-0.5 text-sm font-semibold tracking-tight text-heading">
                                CRM : {item.crm} 
                                </h5>
                                <h5 className="mb-0.5 text-xl font-semibold tracking-tight text-heading">
                                {item.firstname} {item.lastname}
                                </h5>
                                <span className="text-sm text-body">{item.degree}</span>
                            </div>
                            </div>
                        ))}

                    </div>




                    
                </div>
    
    
    
    </>);
}