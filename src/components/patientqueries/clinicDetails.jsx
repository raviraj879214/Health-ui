"use client"
import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";
import { toast, ToastContainer } from "react-toastify";
import { PatientQueryStatus } from "@/lib/enums/PatientQueryStatus";






export function ClinicDetails({ querydetails , onData }) {
    const [changename,setChangeName] = useState(false);
    const [cliniclist,setClinicList] = useState([]);
    const [selectedclinic,setSelectedClinic] = useState("");


      useEffect(()=>{
        fetchClinicDetails();
      },[]);


      const fetchClinicDetails = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/get-clinic-list`,{
          method : "Get",
          headers: await adminHeaders(),
        });
        if(res.ok){
          const result= await res.json();
            setClinicList(result.data);
        }
      }


      const updateClinic = async()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/assign-clinic-query`,{
          method : "Post",
          headers : await adminHeaders(),
          body:JSON.stringify({
            clinicid: selectedclinic,
            queryid: querydetails.id
          })
        });
        if(res.ok){
          const result = await res.json();
            setSelectedClinic("");
            setChangeName(false);
            onData(result.data.updatedAt);
            toast.success("Clinic changed/assigned successfully",{
              position : "bottom-right",
              autoClose : 3000
            });

        }
      }








  return (<>

    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <ToastContainer></ToastContainer>
      <div className="flex items-center justify-between mb-4">
        <h6 className="font-bold text-gray-900">
          Patient Inquiry Raised For
        </h6>

      
      </div>

     

      {changename ? (
        <>
        
          <div className=" relative bg-white border border-gray-200 rounded-xl shadow-md p-4 flex items-center justify-between mb-5">

            <select
              onChange={(e)=> setSelectedClinic(e.target.value)}
              className="flex-1 px-3 py-2 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
              defaultValue=""
            >
              <option value="" disabled>
                Select Clinic
              </option>

              {cliniclist.map((item)=>(
                <option key={item.uuid} value={item.uuid}>{item.name}</option>
              ))}
            </select>

            <button
              type="button"
              className="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={() => {
                setChangeName(false);
                setSelectedClinic("");
              }}>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>


        </>
      ) :(
        <>

         <p className="text-lg font-semibold text-gray-800 mb-2">
             {querydetails.clinic?.name}
         </p>
        </>
      )}


        {querydetails.clinic ? (<>
           <p className="text-gray-600 mb-1">
        <span className="font-semibold">Address:# </span>{" "}
        

         <b>{querydetails.clinic?.cep},{" "}
              {querydetails.clinic?.street},{" "}
              {querydetails.clinic?.complement},{" "}
              {querydetails.clinic?.neighborhood}
              {querydetails.clinic?.city}
              {querydetails.clinic?.state}</b>
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Phone:</span>{" "}
        {querydetails.clinic?.phone}
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Email:</span>{" "}
        {querydetails.clinic?.email}
      </p>

      <p className="text-gray-600 mb-1 flex items-center">
        <span className="font-semibold">Commission:</span>
        <span className="ml-2 text-xs px-2 py-1 rounded-full border border-orange-400 text-orange-600">
          {querydetails.clinic?.commission}%
        </span>
      </p>

      <p className="text-gray-600 mt-2">
        <span className="font-semibold">Website:</span>{" "}
        <a
          href={querydetails.clinic?.websiteurl}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Visit website 
        </a>
      </p>
        
        </>):(<>
        <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500 bg-gray-50">
          Clinic has not been assigned to this query yet.
        </div>
        </>)}

     


    
    {selectedclinic !== "" ? (
        <>
          <button
            onClick={()=> updateClinic()}
          className="border border-black px-4 py-2 rounded-2xl hover:bg-gray-100 transition w-full">
                Save Changes
          </button>
        </>
    ):(
      <>
          

        {querydetails.status === PatientQueryStatus.PENDING &&(<>
            <button
        onClick={()=> setChangeName(true)}
        className="border border-black px-4 py-2 rounded-2xl hover:bg-gray-100 transition w-full">
              Edit
        </button>
        </>)}
      </>
    )}



    </div>


  </>);
}