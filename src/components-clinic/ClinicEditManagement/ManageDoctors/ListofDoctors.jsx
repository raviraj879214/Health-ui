"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { DoctorSteps } from "../ManageDoctors/AddDoctor";
import { useEffect, useState } from "react";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { useSearchParams } from "next/navigation";
import { EyeCloseIcon, EyeIcon, PencilIcon } from "@/icons";
import {DoctorList} from "../ManageDoctors/DoctorsList";


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
              className="relative border theme-border rounded-2xl overflow-hidden shadow-md cursor-pointer p-4 bg-white hover:shadow-xl transition-all">
              <div className="absolute top-3 right-3 flex gap-2">
                <button className="background-theme p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                  <EyeIcon size={16} />
                </button>
                
                {item.clinicuuid == clinicuuid ? (<>
                    <button className="background-theme p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                  <PencilIcon size={16} 
                    onClick={() => {
                    setShow(true);
                    setDoctoruuid(item.uuid);
                  }}
                  />
                </button>
                </>) : (
                  <>
                    <button disabled={true} className="btn btn-primary background-theme p-2 bg-gray-100 hover:bg-gray-200 rounded-full">
                        <PencilIcon size={16} />
                    </button>
                  </>
                )}

              </div>
              <div className="flex flex-col items-center text-center mt-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border theme-border mb-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads/doctors/profilepicture/${item.image}` || "/default-avatar.png"}
                    alt="doctor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xl font-bold text-[var(--primary-dark)]">
                  {item.firstname} {item.lastname}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  {item.degree || "Specialist"}
                </p>
                   <div className="line-clamp-2" dangerouslySetInnerHTML={{ __html: item.briefDescription }}/>
              </div>
            </div>
        ))}
      </div>








    </ComponentCard>
  );
}
