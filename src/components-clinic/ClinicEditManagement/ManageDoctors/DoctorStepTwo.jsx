"use client"
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import Label from "@/components/form/Label";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function DoctorTwo({ onClose, nextStep, prevStep ,clinicuuid , doctoruuid }) {


const [test, setTest] = useState(["Heart", "Skin", "Neuro", "Skin", "Neuro", "Skin", "Neuro", "Skin", "Neuro", "Skin", "Neuro"]);


  const [specialization,setSpecialization]= useState([]);

  const uppercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const [selectedspecilization,setSpecilaization] = useState([]);
  const [cantfind,setCantfine]= useState(false);
  const [othertext,setOhertext] = useState("");
  const[otherbutton,setOtherButton] = useState(false);


 

  useEffect(()=>{
        fetchSpecialization();
        fetchSelectedSpecializations();
  },[]);


  const fetchSpecialization = async ()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialization/get-specialization`,{
      method : "Get",
      headers : clinicHeaders()
    });
    if(res.ok){
       const result = await res.json();
       setSpecialization(result.data);
    }
  }


  const onCheck =async (data)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialization/choose-specialization`,{
      method : "Post",
      headers : clinicHeaders(),
      body: JSON.stringify({
        specializationId: data,
        doctorUuid : doctoruuid
      })
    });
    if(res.ok){

      fetchSelectedSpecializations();
    }
  }


  const onunChecked = async(id,doctoruuid)=>{

      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialization/delete-specialization`,{
        method : "Post",
        headers : clinicHeaders(),
        body:JSON.stringify({
          doctorUuid:doctoruuid,
          id:id
        })
      });
      if(res.ok){

        fetchSelectedSpecializations();
      }

  }






  const fetchSelectedSpecializations = async() => {
    debugger;

    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialization/chose-specialization/${doctoruuid}`,{
      method : "Get",
      headers : clinicHeaders()
    });

    if(res.ok){
      const result = await res.json();
      console.log("result.data",result.data);
      setSpecilaization(result.data);
    }
  }


  const handleRemove=async (data)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialization/remove-specialization/${data}`,{
      method : "DELETE",
      headers:clinicHeaders()
    });

    if(res.ok)
    {
      fetchSelectedSpecializations();
    }
  }




  const onCreateOther = async (doctoruuid)=>{

    setOtherButton(true);
    const specializationExists = specialization.some(
      item => item.name.trim().toLowerCase() === othertext.trim().toLowerCase()
    );

    if (specializationExists) {
      alert("Speciality already exists!");
        setOhertext("");
      return ;
    }


  
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialization/create-other`,{
      method : "Post",
      headers : clinicHeaders(),
      body :JSON.stringify({
        doctorUuid: doctoruuid,
        othertext : othertext,
        clinicuuid: clinicuuid
      })
    });

    if(res.ok){ 
      const result = await res.json();

      setOhertext("");
      fetchSelectedSpecializations();
      toast.success(
  "Sent for approval. We will update you within 24 hours.",
  {
    position: "bottom-right",
    autoClose: 3000,
  }
);

    }
setOtherButton(false);

  }




  const onCancel =()=>{
    window.location.href = `?doid=${doctoruuid}&step=1`;
  }




  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
          <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Choose Speciality </span>
            <span className="text-green-400 ">2/7</span>
          </DialogTitle>

         
        <div className="border theme-border rounded-lg p-3 w-auto max-h-[180px] overflow-auto">

  {/* Empty State */}
  {selectedspecilization.length === 0 && (
    <p className="text-gray-500 text-sm">No records selected</p>
  )}

  {/* Specializations */}
  {selectedspecilization.some(item => item.specialization) && (
    <>
      <h4 className="text-sm font-semibold text-gray-700 mb-2">
        Selected Specializations
      </h4>

      <div className="flex flex-wrap">
        {selectedspecilization
          .filter(item => item.specialization)
          .map((item, index) => (
            <div
              key={`spec-${index}`}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full m-1 background-theme"
            >
              <span className="text-sm font-semibold text-white">
                {item.specialization?.name}
              </span>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-700 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))}
      </div>
    </>
  )}

  {/* Suggested Categories */}
  {selectedspecilization.some(item => item.suggestedCategory) && (
    <>
      <h4 className="text-sm font-semibold text-gray-700 mt-4 mb-2">
         (Pending Approval)
      </h4>

      <div className="flex flex-wrap">
        {selectedspecilization
          .filter(item => item.suggestedCategory)
          .map((item, index) => (
            <div
              key={`suggested-${index}`}
              className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full m-1"
            >
              <span className="text-sm font-semibold text-yellow-900">
                {item.suggestedCategory?.name}
              </span>

              {/* <button
                onClick={() => handleRemove(item.id)}
                className="text-red-700 hover:text-red-500 transition"
              >
                ✕
              </button> */}
            </div>
          ))}
      </div>
    </>
  )}
</div>


        <div className="border theme-border rounded-lg p-3 w-100% flex flex-wrap mt-2 max-h-[400px] overflow-auto">
            <div className="flex items-center justify-between mb-2 w-full">
              <label className="text-sm font-semibold text-gray-800">
                Choose
              </label>

              <button
                type="button"
                onClick={() => setCantfine(true)}
                className={`text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline underline-offset-4 transition ${cantfind ? "hidden" : "block"}`}
              >
                Can’t find? Add new
              </button>


               <div className={`flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow-sm ${cantfind ? "block" : "hidden"}`}>
                   
                    <input
                      type="text"
                      className="flex-1 outline-none text-sm text-gray-700"
                      placeholder="Enter other value"
                      value={othertext}
                      onChange={(e)=> setOhertext(e.target.value)}
                    />
                  
                   {othertext.length > 0 ? (
                      <button
                        type="button"
                        onClick={() => {
                          
                          onCreateOther(doctoruuid)
                          
                        }}
                        className="text-green-600 hover:text-green-500 transition p-1 rounded-md hover:bg-green-50"
                      >
                      {otherbutton ? (<>
                                                 <ButtonSpinner></ButtonSpinner>
                                               </>):(
                                                 <>
                                                    ✔
                                                 </>
                                               )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCantfine(false)}
                        className="text-red-600 hover:text-red-500 transition p-1 rounded-md hover:bg-red-50"
                      >
                        ✕
                      </button>
                    )}


              </div>

            </div>
            <div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
  {uppercaseLetters.map((item) => (
    <div key={item} className="border theme-border p-3 rounded-md">
      {/* Letter header */}
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item}</h3>

      {/* Specializations starting with this letter */}
      <div className="space-y-2 max-h-[200px] overflow-auto ">
        {specialization
          .filter(x => x.name.startsWith(item))
           .sort((a, b) => a.name.localeCompare(b.name))
          .map(data => (
            <label
              key={data.id}
              className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer rounded"
            >
              <input
                type="checkbox"
                className="checkbox-theme w-4 h-4 text-primary-600"
                 checked={selectedspecilization.some(x => x.specialization?.id === data.id)}

                 onChange={(e) => {
                  if (e.target.checked) {
                    onCheck(data.id);   // Only call when checked
                  }
                  else{
                    onunChecked(data.id,doctoruuid)
                  }
                  
                }}
              />
              <span className="text-gray-700 dark:text-white">{data.name}</span>
            </label>
          ))
        }
      </div>
    </div>
  ))}
</div>

      </div>

            



        </div>


          

          <div className="flex justify-between gap-2 mt-4">


            <button onClick={onCancel} className="btn btn-secondary">Back</button>

            <button 
              onClick={()=>{
                window.location.href = `?doid=${doctoruuid}&step=3`;
              }}
            className="btn btn-primary">Next</button>

          </div>



        </DialogPanel>
      </div>
    </Dialog>
  );
}
