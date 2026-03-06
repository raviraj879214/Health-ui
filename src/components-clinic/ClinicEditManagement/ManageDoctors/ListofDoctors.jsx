"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { DoctorSteps } from "../ManageDoctors/AddDoctor";
import { useEffect, useState } from "react";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { useSearchParams } from "next/navigation";
import { EyeCloseIcon, EyeIcon, PencilIcon } from "@/icons";
import {DoctorList} from "../ManageDoctors/DoctorsList";
import { DoctorVerifyStatus } from "@/lib/enums/doctorVerifyStatus";


export function ListofDoctor({ clinicuuid }) {

  const [show, setShow] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [doctoruuid,setDoctoruuid] = useState(null);
  const searchParams = useSearchParams();
  const [step ,setStep] = useState(1);
  const [doctorsmodal,setDoctorsModal] = useState(false);













  const fetchdoctors = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctors/get-doctors/${clinicuuid}`, {
      method: "Get",
      headers: clinicHeaders()
    });
    if (res.ok) {
      const result = await res.json();
      setDoctors(result.data);
      
    }
  }








  useEffect(() => {
    if (clinicuuid) {
      fetchdoctors();
    }
    debugger;


      const doid = searchParams.get("doid");
      const step = searchParams.get("step");
    if(doid && step){

      setDoctoruuid(doid);
      setStep(parseInt(step));
      setShow(true)
    }

  }, []);


   const assignmodal = ()=>{
    fetchdoctors();
   }



  return (

    <ComponentCard title="Doctors" className=" overflow-auto max-h-[700px]">

       <div className="flex justify-end">
          <button
          onClick={()=> setDoctorsModal(true)}
            type="button"
            className="btn btn-primary">

            Assign From <b className="text-yellow-200">{process.env.NEXT_PUBLIC_PROJECT_NAME}</b>

          </button>
      </div>
      {doctorsmodal &&  <DoctorList sendData={assignmodal} onClose={() => setDoctorsModal(false)}  clinicuuid={clinicuuid}></DoctorList>}



      {show && <DoctorSteps  onClose={() => setShow(false)}  clinicuuid={clinicuuid} doctoruuid={doctoruuid} stepcount={step} />}
       


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 ">


       <div
                onClick={() => {
                  setShow(true);
                  setDoctoruuid(null);
                }}
                className="relative flex flex-col items-center justify-center 
                          border theme-border rounded-2xl bg-white shadow-md 
                          cursor-pointer p-6
                          hover:shadow-xl hover:bg-gray-50 transition-all"
              >
               
                <div className="w-16 h-16 flex items-center justify-center 
                                rounded-full border-2 border-[var(--primary-dark)] 
                                text-[var(--primary-dark)] text-5xl font-bold">
                  +
                </div>

                
                <p className="mt-3 text-sm text-gray-600 font-medium">
                  Add New Doctor
                </p>
              </div>



     {doctors.map((item, index) => (
  <div
    key={index}
    className="relative border theme-border rounded-2xl overflow-hidden shadow-md cursor-pointer p-4 bg-white hover:shadow-xl transition-all duration-300">

      
    <div className="absolute top-3 right-3 flex gap-2 items-center">
      
     

      {item.clinicuuid === clinicuuid ? (
        <button
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
          onClick={() => {
            setShow(true);
            setDoctoruuid(item.uuid);
          }}
        >
          <PencilIcon size={16} />
        </button>
      ) : (
        <button
          disabled
          className="p-2 bg-gray-100 rounded-full opacity-50 cursor-not-allowed"
        >
          <PencilIcon size={16} />
        </button>
      )}

    </div>

    {/* Doctor Info */}
    <div className="flex flex-col items-center text-center mt-4">
      {/* Profile Picture */}
      <div className="w-20 h-20 rounded-full overflow-hidden border theme-border mb-3">
        <img
          src={
            item.image
              ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${item.image}`
              : "/default-avatar.png"
          }
          alt={`${item.firstname} ${item.lastname}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Name */}
      <p className="text-xl font-bold text-[var(--primary-dark)]">
        {item.firstname} {item.lastname}
      </p>

      {/* Degree */}
      <p className="text-sm text-gray-500 font-medium">
        {item.degree || "Specialist"}
        {item.DoctorVerify}
      </p>

      
      <div
        className="line-clamp-2 text-gray-600 mt-2 text-sm"
        dangerouslySetInnerHTML={{ __html: item.briefDescription }}/>
    </div>

        {item.DoctorVerify === DoctorVerifyStatus.VERIFIED && (
             <span className="flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5z" />
                </svg>
                Verified |  {process.env.NEXT_PUBLIC_PROJECT_NAME}
            </span>
        )}

         {item.DoctorVerify === DoctorVerifyStatus.PENDING && (
             <span className="flex items-center bg-gradient-to-r from-green-400 to-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11h-4V7h2v4h2v2z" />
                </svg>


                Pending |  {process.env.NEXT_PUBLIC_PROJECT_NAME}
            </span>
        )}






        
    



  </div>
))}

      </div>








    </ComponentCard>
  );
}
