"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { PackageStepOne } from "../ManagePackages/CreatePackagesSteps/PackageStepOne";
import { PackageStepTwo } from "../ManagePackages/CreatePackagesSteps/PackageStepTwo";
import {PackageStepThree} from "../ManagePackages/CreatePackagesSteps/PackageStepThree";
import {PackageStepFour} from "../ManagePackages/CreatePackagesSteps/PackageStepFour";
import {PackageStepFive} from "../ManagePackages/CreatePackagesSteps/PackageStepFive";
import {PackageStepSix} from "../ManagePackages/CreatePackagesSteps/PackageStepSix";
import {PackageStepSeven} from "../ManagePackages/CreatePackagesSteps/PackageStepSeven";

import { EyeIcon, PencilIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { brazilianCurrency } from "@/lib/brazilianCurrency";

export function MainPackages({ clinicuuid }) {
  const [step, setStep] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [packageid, setPackageId] = useState("");

  const [packages, setPackages] = useState([]);
  const [enabled, setEnabled] = useState(false);


  const fetchPackageDetails = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-one/get-package-list/${clinicuuid}`,
      {
        method: "GET",
        headers: clinicHeaders(),
      }
    );

    if (res.ok) {
      const result = await res.json();
      setPackages(result.data);
    }
  };

  
  
  useEffect(() => {
    const stepParam = searchParams.get("steppackage");
    if (stepParam) setStep(Number(stepParam));
    const pckidParam = searchParams.get("pckid");
    if (pckidParam) setPackageId(pckidParam);

    if (clinicuuid) {
      fetchPackageDetails();
    }
  }, [searchParams, clinicuuid]);








  // Add package
  const goToStepOne = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("steppackage", "1");
    params.set("pckid", "");
    router.push(`?${params.toString()}`);
  };

  // Edit package
  const EditPackageDetails = (id) => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set("pckid", id);
    params.set("steppackage", "1");
    router.push(`?${params.toString()}`);
  };




  return (
    <ComponentCard title="Manage Packages" className="max-h-[700px] overflow-auto">

      {/* TOP BAR */}
      <div className="flex justify-end mb-4">
        <button onClick={goToStepOne} className="btn btn-primary font-semibold">
          + Add Package
        </button>
      </div>

     

      {step === 1 && <PackageStepOne clinicuuid={clinicuuid} packageid={packageid} />}
      {step === 2 && <PackageStepTwo clinicuuid={clinicuuid} packageid={packageid} />}
      {step === 3 && <PackageStepThree clinicuuid={clinicuuid} packageid={packageid} />}
      {step === 4 && <PackageStepFour clinicuuid={clinicuuid} packageid={packageid}/>}
      {step === 5 && <PackageStepFive clinicuuid={clinicuuid} packageid={packageid} />}
      {step === 6 && <PackageStepSix clinicuuid={clinicuuid} packageid={packageid} />}
      {step === 7 && <PackageStepSeven clinicuuid={clinicuuid} packageid={packageid} />}
     






      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map((item, index) => (
          <div
            key={index}
            className="relative border theme-border rounded-2xl overflow-hidden shadow-md cursor-pointer p-5 bg-white hover:shadow-xl transition-all">
           
            <div className="absolute top-3 right-3 flex gap-2">
                

                <button onClick={() => setEnabled(!enabled)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${enabled ? "bg-green-700" : "bg-gray-300"}`}>
                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${ enabled ? "translate-x-5" : "translate-x-1"}`}/>
                </button>


              <button className="background-theme p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                <EyeIcon size={16} />
              </button>

              <button
                onClick={() => EditPackageDetails(item.id)}
                className="background-theme p-2 bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                <PencilIcon size={16} />
              </button>
            </div>

    
            <div className="flex flex-col items-center text-center mt-6">

             
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 font-semibold text-lg">
                PKG
              </div>

            
              <p className="text-xl font-bold text-[var(--primary-dark)] mt-3">
                {item.title}
              </p>

              <p className="text-sm text-gray-500 font-medium line-clamp-2">
                {item.briefdescription || "No description"}
              </p>

           
              <div className="mt-3">
                <p className="text-green-600 text-lg font-semibold">
                  {brazilianCurrency(item.discountedprice || 0)}
                </p>
                <p className="text-gray-500 line-through text-sm">
                  {brazilianCurrency(item.actualprice || 0)}
                </p>
              </div>
             

             <div className="flex flex-col items-start gap-2 mt-5">
                  {item.packagesDoctor.length > 0 ? (
                    item.packagesDoctor.map((pd) => (
                      <div key={pd.id} className="flex items-center gap-3 justify-start">
                        <img
                          src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${pd.doctors.image}`}
                          alt="Doctor Avatar"
                          className="h-10 w-10 rounded-full object-cover"
                        />

                        <span className="text-sm font-medium text-gray-800">
                          Dr. {pd.doctors.firstname} {pd.doctors.lastname}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-sm text-gray-500">
                      Doctor not assigned
                    </span>
                  )}
              </div>



            </div>
          </div>
        ))}
      </div>
    </ComponentCard>


  );
}
