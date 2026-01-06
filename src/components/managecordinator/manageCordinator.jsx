"use client"

import { Select } from "@headlessui/react";
import ComponentCard from "../common/ComponentCard"
import { useEffect, useState } from "react";
import Label from "../form/Label";
import { Info } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";






export function ManageCordinator(){


    const [cordinator,setCordinator] = useState([]);
    const [cliniclist,setClinicList] = useState([]);
    const [selectedclinic,setSelectedClinic] = useState("");
    const  [selectedcordinator,setSelectedCordinator] = useState("");
    const [selectedclincilist,setSelectedClinicList] = useState([]);




    useEffect(()=>{
        fetchCordinators();
        fetchClinicList();
    },[]);



    const fetchCordinators = async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-cordinator/get-cordinators`,{
            method : "Get"
        });
        if(res.ok){
            const result = await res.json();
            setCordinator(result.data);
        }
    }

    const fetchClinicList= async ()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-cordinator/get-clinic-list`,{
            method : "Get"
        });
        if(res.ok){
            const result = await res.json();
            setClinicList(result.data);
        }
    }


    const assignClinic = async (clinicid, id) => {

        if (!selectedcordinator) {
            alert("Please select a coordinator");
            setSelectedClinic("");
            return null;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-cordinator/assign-clinic-cordinator`,{
            method : "PUT",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                id : id,
                clinicid: clinicid
            })
        });
        if(res.ok){
            const result = await res.json();
            setSelectedClinic("");
            fetchClinicList();
             getSlectedClinic(id);
             toast.success("Clinic assigned successfully",{
                position : "bottom-right",
                autoClose : 300
            });
        }
    }


    const getSlectedClinic = async(id)=>{
        if(id === ""){
            setSelectedClinicList([]);
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-cordinator/get-selected-clinic/${id}`,{
            method : "Get"
        });
        if(res.ok){
            const result = await res.json();
            setSelectedClinicList(result.data);
        }
    }



    const removeClinic = async(id)=>{
         const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-cordinator/assign-clinic-cordinator`,{
            method : "PUT",
            headers:{
                "content-type" : "application/json"
            },
            body: JSON.stringify({
                clinicid: id
            })
        });
        if(res.ok){
            const result = await res.json();
            setSelectedClinic("");
            fetchClinicList();
            getSlectedClinic(selectedcordinator);

            toast.success("Clinic removed successfully",{
                position : "bottom-right",
                autoClose : 300
            });
        }
    }








    return (<>
        <div className="grid grid-cols-12 gap-4">
            <ToastContainer></ToastContainer>
            <div className="col-span-12 sm:col-span-12 space-y-5 sm:space-y-6">

                <ComponentCard title="" desc="" showReload={true}>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Coordinator */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600">
                                Coordinator
                            </label>

                            <Select
                                className="
                                        w-full h-11 px-3
                                        border border-gray-300
                                        rounded-lg bg-white
                                        text-gray-700
                                        focus:outline-none
                                        focus:ring-2 focus:ring-indigo-500
                                        focus:border-indigo-500"
                                        onChange={(e)=> {
                                            setSelectedCordinator(e.target.value);
                                            getSlectedClinic(e.target.value);
                                        }}>
                                           

                                <option value="">Select Coordinator</option>

                                {cordinator.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.firstname} {item.lastname} ({item.email})
                                    </option>
                                ))}
                            </Select>
                        </div>

                        {/* Clinic */}
                        <div>
                            <label className="block mb-1 text-sm font-medium text-gray-600">
                                Clinic
                            </label>

                            <Select
                                           className="
                                            w-full h-11 px-3
                                            border border-gray-300
                                            rounded-lg bg-white
                                            text-gray-700
                                            focus:outline-none
                                            focus:ring-2 focus:ring-indigo-500
                                            focus:border-indigo-500"
                                            value={selectedclinic}

                                            onChange={(e)=> {
                                                setSelectedClinic(e.target.value);
                                                assignClinic(e.target.value,selectedcordinator);
                                            }}>


                                <option value="">Select Clinic</option>

                                {cliniclist?.map((item) => (
                                    <option key={item.uuid} value={item.uuid}>
                                        {item.name}
                                    </option>
                                ))}
                            </Select>


                        </div>
                    </div>

                    <div className="relative w-full mb-6">


                        <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
                            <Info size={18} />
                        </button>


                        <h2 className="text-lg font-semibold text-gray-800">
                            Selected Clinic : ({selectedclincilist.length})
                        </h2>

                        <div className="mt-2">


                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                                {selectedclincilist.map((item) => (
                                    <div
                                        key={item.uuid}
                                        className="relative bg-neutral-primary-soft p-4 border border-default rounded-lg shadow-xs hover:bg-neutral-secondary-medium"
                                    >
                                        
                                        <button
                                            type="button"
                                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
                                            aria-label="Remove"
                                            onClick={() => removeClinic(item.uuid)}>
                                            ✕
                                        </button>

                                        {/* Clinic Name */}
                                        <h5 className="mb-2 text-lg font-semibold text-heading">
                                            {item.name}
                                        </h5>


                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                                

                          



                </ComponentCard>
            </div>
        </div>



    </>);
}