"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { adminHeaders } from "@/components/utils/adminHeader";
import { brazilianCurrency } from "@/lib/brazilianCurrency";
import { formatBrazilDate } from "@/lib/formatDate";
import { useEffect, useState } from "react";




export function ManagePackageDetail({ id }) {

    const [packages,setPackages] = useState({});
    const [boostpackages,setBoostPackages] = useState({});



    useEffect(()=>{
        if(id){
            fetchPackageDetails();
        }
        

    },[id]);


    const fetchPackageDetails =async()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-packages-details/${id}`,{
            method : "Get",
            headers : await adminHeaders()
        });
        if(res.ok){
            debugger;
            const result = await res.json();
            setPackages(result.data);

            const boostdeteails = result.data.boosts.find(x=>x.clinicPackageId == id);

            setBoostPackages(boostdeteails);



        }
    }













    return (<>
        <ComponentCard>


            <div className="bg-white ">
                <div className="">

                    <div className="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200  lg:mx-0 lg:flex lg:max-w-none">
                        <div className="p-8 sm:p-10 lg:flex-auto">
                            <h3 className="text-2xl font-bold tracking-tight text-gray-900">{packages.title}</h3>
                            <p className="mt-6 text-base leading-7 text-gray-600">{packages.briefdescription}</p>
                          
                            {packages?.fieldValues?.map((item) => (
                                <div key={item.id} className="mt-10">
                                    {/* Heading */}
                                    <div className="flex items-center gap-x-4">
                                        <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">
                                            {item.field.label}
                                        </h4>
                                        <div className="h-px flex-auto bg-gray-100"></div>
                                    </div>

                                    {/* Description List */}
                                    <ul
                                        role="list"
                                        className="mt-4 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600"
                                    >
                                        <li className="flex gap-x-3">
                                            <svg
                                                className="h-6 w-5 flex-none text-indigo-600"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>

                                            <span
                                                dangerouslySetInnerHTML={{ __html: item.valueText }}
                                            />
                                        </li>
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                            <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                                <div className="mx-auto max-w-xs px-8">
                                    <p className="text-base font-semibold text-gray-600">Package Price</p>
                                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                                        <span className="text-5xl font-bold tracking-tight text-gray-900">{brazilianCurrency(packages.discountedprice)}</span>
                                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-900 line-through">{brazilianCurrency(packages.actualprice)}</span>
                                    </p>
                                    
                                    <p className="mt-6 text-xs leading-5 text-gray-600"></p>
                                </div>

                                
                            </div>
                            
                             
                             <div className="mt-6 mx-auto max-w-3xl rounded-3xl bg-white/70 backdrop-blur-md shadow-lg ring-1 ring-black/5">
  <div className="grid gap-6 p-6 md:grid-cols-2">

    {/* ================= Clinic Section ================= */}
    <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
          Clinic
        </h3>
       
      </div>

      <p className="mt-3 text-2xl font-bold text-gray-900">
        {packages?.clinic?.name ?? "—"}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {packages?.clinic?.address},{" "}
        {packages?.clinic?.city?.name},{" "}
        {packages?.clinic?.state},{" "}
        {packages?.clinic?.country?.name}
      </p>
    </div>

    {/* ================= Boost Section ================= */}
    <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide text-emerald-600 uppercase">
          Boost Package
        </h3>

        {boostpackages && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
            Running
          </span>
        )}
        
      </div>

      <p className="mt-3 text-xl font-semibold text-gray-900">
        {boostpackages?.boostPackage?.name ?? "No Boost"}
      </p>

      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p>
          <span className="font-medium">Price:</span>{" "}
          ₹{boostpackages?.boostPackage?.price ?? "—"}
        </p>

        <p>
          <span className="font-medium">Duration:</span>{" "}
          {boostpackages?.boostPackage?.durationDays
            ? `${boostpackages.boostPackage.durationDays} days`
            : "—"}
        </p>

        <p>
          <span className="font-medium">Start:</span>{" "}
          {boostpackages?.startAt
            ? formatBrazilDate(boostpackages.startAt)
            : "—"}
        </p>

        <p>
          <span className="font-medium">End:</span>{" "}
          {boostpackages?.endAt
            ? formatBrazilDate(boostpackages.endAt)
            : "—"}
        </p>
      </div>
    </div>

  </div>
</div>





                           
                       </div>
                        
                        
                    </div>
                </div>
            </div>
        </ComponentCard>




    </>);
}