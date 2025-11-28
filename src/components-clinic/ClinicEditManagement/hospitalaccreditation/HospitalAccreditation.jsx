"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useConfirm } from "@/hooks/useConfirm";
import { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { clinicHeaders } from "@/components-clinic/utils/clinicHeaders";
import { FaClosedCaptioning, FaTrash, FaWindowClose } from "react-icons/fa";
import { toast } from "react-toastify";

export function Accreditation({ clinicuuid }) {
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const { ConfirmDialog } = useConfirm();
  const [reset,setReset]= useState([]);

  
  const fetchAccreditations = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-accreditation/get-all-accreditation`,
        { method: "GET", headers: clinicHeaders() }
      );

      if (res.ok) {


        const data = await res.json();

        debugger;

       const ids = selected.map((s) => s.id);
       console.log("ids",ids);

        const formattedOptions = data.data
        .filter((x) => !ids.includes(x.id)) 
        .map((item) => ({
            id: item.id,
            name: item.name,
            image: item.image,
        }));





        setOptions(formattedOptions);
      }
    } catch (error) {
      console.error("Error fetching accreditations:", error);
    }
  };

  // Fetch accreditations already selected for this clinic
  const fetchSelectedAccreditations = async () => {
    debugger;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-accreditation/get-selected-accreditation/${clinicuuid}`,
        { method: "GET", headers: clinicHeaders() }
      );

      if (res.ok) {
        const data = await res.json();
        const selectedItems = data.data.map((item) => ({
          mainid : item.id,  
          id: item.accreditation.id,
          name: item.accreditation.name,
          image: item.accreditation.image,
        }));


        setSelected(selectedItems);

        
      }
    } catch (error) {
      console.error("Error fetching selected accreditations:", error);
    }
  };



useEffect(() => {
  const loadData = async () => {
    if (clinicuuid) {
      await fetchSelectedAccreditations();
    }
  };
  loadData();
}, [clinicuuid]);



useEffect(()=>{
     fetchAccreditations();  
},[selected]);


const insertAccreditations = async (clinicuuid, values) => {
    debugger;
    
    if (!values || values.length === 0) return;

    const id = Number(values[0].id); 




   let payload = {
        clinicuuid: clinicuuid,
        accreditationId: Number(id),  // ensure it's integer
        };

    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-accreditation/insert-accreditation`,{
        method : "Post",
        headers : clinicHeaders(),
        body : JSON.stringify({
            clinicuuid : clinicuuid,
            accreditationId : id
        })
    });
    if(res.ok)
    {
        const result = await res.json();
         toast.success("Accreditation added successfully", {
              position: "bottom-right",
              autoClose: 3000,
            });
            await fetchSelectedAccreditations();
    }
};


const deleteAccreditation = async(id)=>{

    debugger;


    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-accreditation/delete-accreditation/${id}`,{
        method : "Delete",
        headers : clinicHeaders(),
    });

    if(res.ok){

             toast.success("Accreditation deleted successfully", {
              position: "bottom-right",
              autoClose: 3000,
            });


        await fetchSelectedAccreditations();
    }
}


  return (
    <ComponentCard title="Hospital Accreditation & Certification">
      <div className="flex flex-col w-1/2 mb-4">
         <Select
      options={options}
      
      onChange={async (values) => {
    // first set the dropdown selected value
    setReset(values);

    // then insert
    await insertAccreditations(clinicuuid, values);

    // clear dropdown
    setReset([]);
  }}

        values={reset}
      labelField="name"
      valueField="id"
      placeholder="Select accreditations..."
      itemRenderer={({ item, methods }) => (
        <div
          className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
          onClick={() => methods.addItem(item)}
        >
          <img src={item.image} alt={item.name} className="w-6 h-6 mr-2 rounded" />
          <span>{item.name}</span>
        </div>
      )}
      valueRenderer={({ values, methods }) => (
        <div className="flex flex-wrap gap-1">
          {values.map((v) => (
            <div
              key={v.id}
              className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded"
            >
              <img src={v.image} alt={v.name} className="w-4 h-4 rounded" />
              <span>{v.name}</span>
              <button
                className="ml-1 text-red-500 font-bold"
                onClick={(e) => {
                  e.stopPropagation();
                  methods.removeItem(v);
                }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    />
      </div>


    {selected.length === 0 ? (
  <p>No accreditations selected.</p>
) : (
  selected.map((s) => (
    <div
      key={s.id}
      className="flex items-center gap-2 py-1 border theme-border rounded-2xl w-fit px-4"
    >
      <img src={s.image} alt={s.name} className="w-6 h-6 rounded" />
      <span>{s.name}</span>
      <button
       onClick={()=>deleteAccreditation(s.mainid)}
        className="text-red-500 ml-2">

        <FaTrash></FaTrash> 
      </button>
    </div>
  ))
)}



      <ConfirmDialog />
    </ComponentCard>
  );
}
