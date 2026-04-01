"use client";
import { useEffect, useState } from "react";




export function DoctorDetails({id}){


    const [doctor,setDoctor] = useState({});


    useEffect(()=>{

        fetchDoctor();
    },[id]);


    const fetchDoctor = async()=>{
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-listing/get-doctor-details/${id}`,{method : "Get"});

        if(res.ok){
            const result= await res.json();
            setDoctor(result.data);
        }
    }

    return(<>
    <div className="bg-gray-100">
        
  <div className="container mx-auto py-8">
    <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
      <div className="col-span-4 sm:col-span-3">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col items-center">
            <img
              src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=doctors/profilepicture/${doctor.image}`}
              className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
            />
            <h1 className="text-xl font-bold">Dr. {doctor.firstname} {doctor.lastname}</h1>
            <p className="text-gray-700">{doctor.degree}</p>
           
          </div>
          <hr className="my-6 border-t border-gray-300" />
          
        </div>
      </div>
      <div className="col-span-4 sm:col-span-9">
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">About Me</h2>
                            <div className="text-gray-700">
                                <p dangerouslySetInnerHTML={{ __html: doctor.briefDescription }}></p>
                                <p dangerouslySetInnerHTML={{ __html: doctor.fullDescription }}></p>
                            </div>
                        </div>
      </div>
    </div>
  </div>
</div>
    
    </>);
}