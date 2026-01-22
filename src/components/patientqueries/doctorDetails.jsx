import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";
import { toast, ToastContainer } from "react-toastify";
import { formatBrazilDate } from "@/lib/formatDate";
import { PatientQueryStatus } from "@/lib/enums/PatientQueryStatus";







export function DoctorDetails({querydetails ,id ,onData}){

      const [changename,setChangeName] = useState(false);
      const [doctorlist,setDoctroList] = useState([]);
      const [selecteddoctor,setSelectedDoctor] = useState("");

      useEffect(() => {
        fetchDoctorList();
      }, [id]);

      const fetchDoctorList =async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/get-doctor-list/${id}`,{
          method : "Get",
          headers : await adminHeaders(),
        });
        if(res.ok){
          const result = await res.json();
          setDoctroList(result.data);
        }
      }



      const assignDoctorQuery= async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-queries/assign-doctor-query`,{
                        method : "Post",
                        headers : await adminHeaders(),
                        body:JSON.stringify({
                          doctorid: selecteddoctor,
                          queryid: querydetails.id
                        })
                      });
                      if(res.ok){
                        const result = await res.json();
                          setChangeName(false);
                          setSelectedDoctor("");
                           onData(result.data.updatedAt);
                          toast.success("Doctor changed/assigned successfully",{
                            position : "bottom-right",
                            autoClose : 3000
                          });
              
                      }
        
      }



    return(<>
    
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      <ToastContainer></ToastContainer>
                <div className="flex items-center justify-between mb-4">
            <h6 className="font-bold text-gray-900">
              Doctor Details 
            </h6>

          
          </div>


                
                {changename ? (
        <>
        
<div className=" relative bg-white border border-gray-200 rounded-xl shadow-md p-4 flex items-center justify-between mb-5">

  <select
    className="flex-1 px-3 py-2 text-gray-700 bg-transparent border-none focus:outline-none focus:ring-0"
    value={selecteddoctor}
    onChange={(e)=> setSelectedDoctor(e.target.value)}
  >
    <option value="" disabled>
      Select Doctor
    </option>
    {doctorlist.map((item)=>(
         <option key={item.id} value={item.uuid}>
       Dr. {item.firstname} {item.lastname}
    </option>
    ))}
  </select>

  <button
    type="button"
    className="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
    onClick={() => {
      setChangeName(false);
    }}
  >
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
                  {querydetails.doctor?.name}
                </p>

        </>
      )}


{querydetails.doctor ? (
  <div className="mt-4 rounded-lg border border-gray-200 p-4 bg-gray-50 flex gap-4">
    {/* Doctor Image */}
    <img
      src={
        querydetails.doctor.image
          ? `http://localhost:8000/v1/uploads/doctors/profilepicture/${querydetails.doctor.image}`
          : "/images/doctor-placeholder.png"
      }
      alt="Doctor"
      className="w-20 h-20 rounded-full object-cover border"
    />

    {/* Doctor Info */}
    <div className="flex-1">
      <p className="text-gray-800 font-semibold text-lg mb-1">
        Dr. {querydetails.doctor.firstname} {querydetails.doctor.lastname}
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Degree:</span>{" "}
        {querydetails.doctor.degree || "N/A"}
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-semibold">CRM:</span>{" "}
        {querydetails.doctor.crm || "N/A"}
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Email:</span>{" "}
        {querydetails.doctor.email || "N/A"}
      </p>

      <p className="text-gray-600 mb-1">
        <span className="font-semibold">Languages:</span>{" "}
        {querydetails.doctor.languages
          ? JSON.parse(querydetails.doctor.languages).join(", ")
          : "N/A"}
      </p>

      <p className="text-gray-600">
        <span className="font-semibold">DOB:</span>{" "}
        {formatBrazilDate(querydetails.doctor.dob)}
      </p>
    </div>
  </div>
) : (
  <div className="mt-4 rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500 bg-gray-50">
    Doctor has not been assigned to this query yet.
  </div>
)}






               

    {selecteddoctor !== "" ? (
      <>
       <button
      onClick={()=> assignDoctorQuery()}
     className="border border-black px-4 py-2 rounded-2xl hover:bg-gray-100 transition w-full">
          Save Changes
    </button>
      </>
    ):(<>
      

    {querydetails.status === PatientQueryStatus.PENDING &&(<>
                <button
     onClick={()=> setChangeName(true)}
     className="border border-black px-4 py-2 rounded-2xl hover:bg-gray-100 transition w-full">
          Edit
    </button>
            </>)}
    </>)}
  

              </div>
    
    </>);
}