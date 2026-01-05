import { addStep, addTreatmentID } from "@/components-front-end/redux/patinetquery/patientQueryRedux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";





export function SelectTreatment() {


    const [specialties,setSpecialties] = useState([]);
    const dispatch = useDispatch();


    useEffect(()=>{
        fetchSpecialties();
    },[]);


    const fetchSpecialties = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/patient-query/Get-specialty`,{
            method : "Get"
        });
        if(res.ok){
            const result = await res.json();
            setSpecialties(result.data);
        }
    }


    const selectTreatment = (treatmentid,name)=>{
        
        
        dispatch(addTreatmentID({ id: treatmentid, name: name }));

    }





  return (

    <div className=" bg-gray-50 flex flex-col items-center py-10 px-4">
 
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Choose Your Specialty
      </h1>

     
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
        {specialties.map((treatment, index) => (
          <a
            key={index}
            onClick={()=> selectTreatment(treatment.id,treatment.name)}
            className="bg-white p-4 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-neutral-primary-soft text-center w-fit cursor-pointer"
          >
            <h5 className="text-base font-semibold text-gray-800">
              {treatment.name}
            </h5>
          </a>
        ))}


      </div>
    </div>
  );
}
