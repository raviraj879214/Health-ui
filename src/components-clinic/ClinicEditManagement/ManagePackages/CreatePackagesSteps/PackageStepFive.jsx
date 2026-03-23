


import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { ButtonSpinner } from "@/reusable/buttonSpinner";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";






export function PackageStepFive({clinicuuid,packageid}){
    const [open, setOpen] = useState(true);
    const uppercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
    const searchParams = useSearchParams();
    const router = useRouter();
    const [specializationselected,setSpecializationSelected] = useState([]);
    const [specialization,setSpecialization] = useState([]);
    const [cantfind,setCantfine]= useState(false);
    const [othertext,setOhertext] = useState("");
    const [otherbutton,setOtherButton] = useState(false);


      useEffect(()=>{
             if(packageid){
                 fetchSelectedClinicSpecialization();
             }
             
             fetchClinicSpecialization();
     
         },[packageid]);




          const fetchSelectedClinicSpecialization = async()=>{
                 const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-procedure/get-package-procedure/${packageid}`,{
                     method : "Get",
                     headers : clinicHeaders(),
                 });
         
                 if(res.ok){
                     const result = await res.json();
                     console.log("result-test",result);
                     setSpecializationSelected(result.data);
                 }
              }
         


               const fetchClinicSpecialization = async()=>{
                      const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-procedure/get-procedure`,{
                          method : "Get",
                          headers : clinicHeaders(),
                      });
              
                      if(res.ok){
                          const result = await res.json();
                          console.log("result-test",result);
              
                          setSpecialization(result.data);
                      }
                   }
              


    


 const onCheck =async (data)=>{
       debugger;
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-procedure/choose-procedure`,{
      method : "Post",
      headers : clinicHeaders(),
      body: JSON.stringify({
        packageid : packageid,
        procedureid : data
      })
    });
    if(res.ok){
        fetchSelectedClinicSpecialization();
    }
  }



   const onunChecked = async(id,clinicuuid)=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-procedure/delete-procedure`,{
          method : "Post",
          headers : clinicHeaders(),
          body:JSON.stringify({
            packageid:id,
            
          })
        });
        if(res.ok){
  
          fetchSelectedClinicSpecialization();
        }
    }
    



      const onCreateOther = async (clinicuuid)=>{
    setOtherButton(true);
    
        const specializationExists = specialization.some(
          item => item.name.trim().toLowerCase() === othertext.trim().toLowerCase()
        );
    
        if (specializationExists) {
          alert("Specialization already exists!");
            setOhertext("");
          return ;
        }
    
    
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-package-procedure/create-other`,{
          method : "Post",
          headers : clinicHeaders(),
          body :JSON.stringify({
            packageid: packageid,
            othertext : othertext,
            clinicuuid:clinicuuid
          })
        });
    
        if(res.ok){ 
          const result = await res.json();
    
          setOhertext("");
          fetchSelectedClinicSpecialization();
        }
    setOtherButton(false);
    
      }








    




     const onCancel=()=>{
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      params.set("pckid", packageid);
      params.set("steppackage", "4");
      router.push(`?${params.toString()}`);
    }


     const OnNext =()=>{
      debugger;
      const params = new URLSearchParams(Array.from(searchParams.entries()));

      params.set("pckid", packageid);
      params.set("steppackage", "6");

      router.push(`?${params.toString()}`);
    }

    return(<>
        <Dialog open={true} onClose={() => setOpen(false)} className="relative z-10">
             <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
             <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center p-4">
               <DialogPanel className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6">
                <DialogTitle className="flex justify-between items-center text-lg font-semibold mb-4">
                   <span>Choose Procedure </span>
                   <span className="text-green-400 ">5/8</span>
                 </DialogTitle>
<div className="border theme-border rounded-lg p-3 w-auto max-h-[180px] overflow-auto flex flex-col gap-3">


  {specializationselected.length === 0 && (
    <p className="text-center text-gray-500">No records selected</p>
  )}

  {/* Procedures */}
  {specializationselected.some(item => item.procedure) && (
    <div>
      
       <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        
       Selected Procedures
      </h4>
      <div className="flex flex-wrap">
        {specializationselected
          .filter(item => item.procedure)
          .map((item, index) => (
            <div
              key={`procedure-${index}`}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full m-1"
            >
              <span className="text-gray-800 text-sm font-semibold">
                {item.procedure.name}
              </span>

              <button
                onClick={() => onunChecked(item.id, clinicuuid)}
                className="text-red-700 hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))}
      </div>
    </div>
  )}

  {/* Suggested Categories */}
  {specializationselected.some(item => item.suggestedCategory) && (
    <div>
      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        
        Pending Approval
      </h4>
      <div className="flex flex-wrap">
        {specializationselected
          .filter(item => item.suggestedCategory)
          .map((item, index) => (
            <div
              key={`suggested-${index}`}
              className="flex items-center gap-2 bg-yellow-100 px-3 py-1 rounded-full m-1 border border-yellow-300"
            >
              <span className="text-yellow-900 text-sm font-semibold">
                {item.suggestedCategory.name}
              </span>

              {/* <button
                onClick={() => onunChecked(item.id, clinicuuid)}
                className="text-red-700 hover:text-red-500 transition"
              >
                ✕
              </button> */}
            </div>
          ))}
      </div>
    </div>
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
                          
                          onCreateOther(clinicuuid)
                          
                        }}
                        className="text-green-600 hover:text-green-500 transition p-1 rounded-md hover:bg-green-50"
                      >
                        {otherbutton ? (<>
                                                                                 <ButtonSpinner></ButtonSpinner>
                                                                               </>):(
                                                                                 <> ✔</>
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
                 checked={specializationselected.some(x => x.procedure?.id === data.id)}
                  onChange={(e) => {
                  if (e.target.checked) {
                    onCheck(data.id);   
                  }
                  else{
                    onunChecked(specializationselected.find(x => x.procedure?.id === data.id)?.id,clinicuuid)
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


                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
                                    
                                      <button
                                          onClick={()=> OnNext()}
                                          type="submit" className="btn btn-primary">
                                          Next
                                      </button>


                                    <button
                                        type="button"
                                        onClick={() => onCancel()}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-700 shadow-sm border hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                    >
                                        Back
                                    </button>

                                   
                                </div>
        </DialogPanel>
        </div>
    </Dialog>










    </>);
}