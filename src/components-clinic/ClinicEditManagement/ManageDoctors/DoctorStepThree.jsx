"use client"
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import Label from "@/components/form/Label";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useEffect, useState } from "react";

export function DoctorThree({ onClose, nextStep, prevStep ,clinicuuid , doctoruuid}) {


  
  const [test, setTest] = useState(["Heart", "Skin", "Neuro", "Skin", "Neuro", "Skin", "Neuro", "Skin", "Neuro", "Skin", "Neuro"]);
  
  const uppercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const [specialty,setSpecialty]= useState([]);
  const [cantfind,setCantfine]= useState(false);
  const [othertext,setOhertext] = useState("");
  const [selectedspecialty,setSelectedspecialty] = useState([]);



  useEffect(()=>{
      fetchSpecialty();
      fetchSelectedSpeciality();

  },[]);




  const fetchSpecialty = async ()=>{
      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialty/get-specialty`,{
        method : "Get",
        headers : clinicHeaders()
      });
      if(res.ok){
         const result = await res.json();
         setSpecialty(result.data);
      }
    }
  
    
      const fetchSelectedSpeciality = async() => {
        debugger;
    
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialty/chose-specialty/${doctoruuid}`,{
          method : "Get",
          headers : clinicHeaders()
        });
    
        if(res.ok){
          const result = await res.json();
          console.log("result.data",result.data);
          setSelectedspecialty(result.data);
        }
      }
    
  




    const onCreateOther = async (doctoruuid) =>{
      debugger;
        const specializationExists = specialty.some(
            item => item.name.trim().toLowerCase() === othertext.trim().toLowerCase()
          );
      
          if (specializationExists) {
            alert("Specialty already exists!");
            setOhertext("");
            return ;
          }
      
      
      
          const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialty/create-other`,{
            method : "Post",
            headers : clinicHeaders(),
            body :JSON.stringify({
              doctorUuid: doctoruuid,
              othertext : othertext
            })
          });
      
          if(res.ok){ 
            const result = await res.json();
      
            setOhertext("");
            fetchSelectedSpeciality();
          }


    }


     const handleRemove=async (data)=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialty/remove-specialty/${data}`,{
          method : "DELETE",
          headers:clinicHeaders()
        });
    
        if(res.ok)
        {
          fetchSelectedSpeciality();
        }
      }
    



  const onCheck =async (data)=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialty/choose-specialty`,{
      method : "Post",
      headers : clinicHeaders(),
      body: JSON.stringify({
        specialtyId: data,
        doctorUuid : doctoruuid
      })
    });
    if(res.ok){

      fetchSelectedSpeciality();
    }
  }



  const onunChecked = async(id,doctoruuid)=>{

      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/doctor-specialty/delete-specialty`,{
        method : "Post",
        headers : clinicHeaders(),
        body:JSON.stringify({
          doctorUuid:doctoruuid,
          id:id
        })
      });
      if(res.ok){

        fetchSelectedSpeciality();
      }

  }


   const onCancel =()=>{

    window.location.href = `?doid=${doctoruuid}&step=2`;
  }



  return (
    <Dialog open={true} onClose={onClose} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">

         <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Choose Specialty </span>
            <span className="text-green-400 ">3/4</span>
          </DialogTitle>
          
          <div className="border theme-border rounded-lg p-3 w-auto flex flex-wrap max-h-[180px] overflow-auto ">
          {selectedspecialty.length == 0 ? "No records selected" : ""}
          
          {selectedspecialty.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full m-1 mt-1 background-theme"
            >
              <span className="text-white-700 text-sm font-semibold">
                {item.specialty?.name || item.suggestedCategory?.name || "test close icon"}
              </span>

              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-700 hover:text-red-500 transition">

                ✕

              </button>
            </div>
          ))}


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
                        ✔
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
        {specialty
          .filter(x => x.name.startsWith(item))
          .map(data => (
            <label
              key={data.id}
              className="flex items-center gap-2 p-1 hover:bg-gray-50 dark:hover:bg-neutral-800 cursor-pointer rounded"
            >
              <input
                type="checkbox"
                className="checkbox-theme w-4 h-4 text-primary-600"
                  checked={selectedspecialty.some(x => x.specialty?.id === data.id)}

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
                window.location.href = `?doid=${doctoruuid}&step=4`;
              }}
            className="btn btn-primary">Next</button>

          </div>

         
        </DialogPanel>
      </div>
    </Dialog>


  );
}
