import { adminHeaders } from "@/components/utils/adminHeader";
import HoverZoomImage from "@/reusable/hoverZoomImage";
import { useEffect, useState } from "react";




export function DoctorClinics({id,clinicuuid ,onData }){


    const [clinics,setClinics] = useState([]);
    const [ clinicbannerimage,setClinicBannerImage] = useState([]);


    useEffect(()=>{
        fetchClinics();
    },[id]);



    const fetchClinics= async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-doctor/get-doctor-clinics-address/${id}`,{
            method : "Get",
            headers : await adminHeaders(),
        });
        if(res.ok){
            const result = await res.json();
            setClinics(result.data);
            console.log("result.data",result.data);
            setClinicBannerImage(result.ClinicImages);

            const selected = result?.data?.find((x) => x.clinicUuid === clinicuuid);
            if (selected?.clinic && onData) {
              onData(selected.clinic);
            }
            
        }

    }




    return(<>
       <div className="mt-5 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">

  <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
      Clinics ({clinics.length})
    </h3>
  </div>


  <div className="p-4 md:p-5">
    <div className="max-h-[400px] overflow-y-auto">
      {clinics.length === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No clinics available.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {clinics.map((item) => {
          const addresses = item?.clinic?.clinicDoctorAddress || [];

          
          const bannerImage = clinicbannerimage
            ?.find(img => img?.clinicuuid === item?.clinic?.uuid)
            ?.Images;

          return (
            <a
              key={item.id}
              href="#"
              className="rounded-2xl bg-neutral-primary-soft block max-w-sm p-4 border border-default shadow-xs hover:bg-neutral-secondary-medium"
            >
            
              <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8 text-center">
                {item?.clinic?.name}
              </h5>


            
             <div className="w-full h-48 relative overflow-hidden rounded-lg mb-3 flex items-center justify-center">
  {bannerImage ? (
    <HoverZoomImage
      src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/clinic/banner/${bannerImage}`}
      alt={`Clinic Banner for ${item?.clinic?.name}`}
      size={200}
      borderRadius="0px"
      className="max-w-full max-h-full object-contain"
    />
  ) : (
    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 rounded-lg">
      <span className="text-sm">No image available</span>
    </div>
  )}
</div>


             
              {addresses.length > 0 ? (
                addresses.map((address) => (
                  <p key={address.id} className="text-body text-sm">
                    Doctor Address:{" "}
                    <b>
                      {`${address.street}${address.complement ? `, ${address.complement}` : ""}, 
                      ${address.neighborhood}, ${address.city} - ${address.stateCode}, ${address.zipcode}`}
                    </b>
                  </p>
                ))
              ) : (
                <p className="text-body text-sm">
                  Doctor Address:{" "}
                  <b>
                    {`${item?.clinic?.address}, ${item?.clinic?.city?.name}, ${item?.clinic?.state}, ${item?.clinic?.country?.name}`}
                  </b>
                </p>
              )}

              
            </a>
          );
        })}
      </div>
    </div>
  </div>
</div>



    </>);
}