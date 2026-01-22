"use client"
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { adminHeaders } from "@/components/utils/adminHeader";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { PackageVerifyStatus } from "@/lib/enums/packageVerifyStatus";
import HoverZoomImage from "@/reusable/hoverZoomImage";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";





export function PackageClinicList({ id }) {
    const [packages,setPackages] = useState([]);



    useEffect(()=>{

        fetchPackages();


    },[id]);



    const fetchPackages = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-packages/${id}`,{
            method : "Get",
            headers :await adminHeaders(),
        });
        if(res.ok){
            const result = await res.json();
            setPackages(result.data);
        }
    }











    return (<>


        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Packages ({packages.length})
                </h3>
                <div className="flex items-center gap-x-1">

                </div>
            </div>



            <div className="p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto">


               
                {packages.map((item)=>(

                     <div key={item.id} className="relative bg-neutral-primary-soft max-w-xs w-full p-6 border border-default rounded-base shadow-xs">
                        <div className="absolute top-4 right-4 flex items-center gap-3">
  {/* View icon */}
  <div
    onClick={() =>
      window.open(
        `/admin/manage-packages/${item.id}`,
        "_blank",
        "noopener,noreferrer"
      )
    }
    className="cursor-pointer text-body hover:text-heading"
  >
    <FaEye />
  </div>

  {/* Status badge */}
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold
      ${
        item.status === PackageVerifyStatus.VERIFIED
          ? "bg-green-100 text-green-700"
          : item.status === PackageVerifyStatus.PENDING
          ? "bg-yellow-100 text-yellow-700"
          : "bg-gray-100 text-gray-600"
      }`}
  >
    {item.status === PackageVerifyStatus.VERIFIED
      ? "Active"
      : item.status === PackageVerifyStatus.PENDING
      ? "Pending"
      : "Unknown"}
  </span>
</div>

                        <div className="mb-6">
                            <h4 className="text-lg font-bold text-heading mb-1">
                            {item.title}
                            </h4>

                            <p className="text-xl font-semibold text-green-600 mb-2">
                             {brazilianCurrency(item.discountedprice)} <p className="text-sm text-black line-through">{brazilianCurrency(item.actualprice)} </p>
                             
                            </p>

                          {/* <p className="text-sm text-gray-500 font-medium line-clamp-2">
                            {item.briefdescription || "No description"}
                          </p> */}

                        </div>
                        
                        {item.packagesDoctor?.length > 0 ? (
                            <div className="flex items-center gap-4 border-t pt-4">
                                <HoverZoomImage
                                src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${item.packagesDoctor[0].doctors?.image}`}
                                alt="Doctor Profile"
                                size={60}
                                borderRadius="50%"
                                />

                                <div>
                                <h5 className="text-md font-semibold text-heading">
                                    Dr. {item.packagesDoctor[0].doctors?.firstname}{" "}
                                    {item.packagesDoctor[0].doctors?.lastname}
                                </h5>

                                <p className="text-sm text-body">
                                    {item.packagesDoctor[0].doctors?.degree}
                                </p>

                                <p className="text-sm text-body">
                                    CPF: {item.packagesDoctor[0].doctors?.cpf}
                                </p>
                                </div>
                            </div>
                        ) : (
                            <p className="flex items-end gap-4 border-t pt-4">No Doctor assigned</p>
                        )}

                </div>

                ))}



            </div>

        </div>

    </>);
}