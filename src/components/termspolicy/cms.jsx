"use client";

import { useEffect, useState } from "react";
import { Editor } from "primereact/editor";
import ComponentCard from "../common/ComponentCard";
import { adminHeaders } from "../utils/adminHeader";
import { toast, ToastContainer } from "react-toastify";

export function Cms() {
  const [selectedOption, setSelectedOption] = useState("");
  const [text, setText] = useState("");
    

  const [cms,setCms] = useState([]);





  useEffect(()=>{
    fetchPages();
  },[]);

  



  const fetchPages = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-details/get-cms`,{
        method : "Get",
        headers : await adminHeaders(),
    });
    if(res.ok){
        const result = await res.json();
        setCms(result.data);
    }
  }

  
  const handleText = async(id)=>{
     if(id){
         const data = cms.find(x=>x.id == id).content;
        setText(data);
     }
     else{
        setText(null);
     }
  } 



  

  const handleUpdate = async () => {
    console.log({
      page: selectedOption,
      content: text,
    });
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/clinic-details/post-cms`,{
        method : "Post",
        headers : await adminHeaders(),
        body : JSON.stringify({
            "id" : selectedOption,
            "content" : text
        })
    });
    if(res.ok){
        const result= await res.json();
        setText(null);
        setSelectedOption(null);
        setCms(null);
        setCms(result.data);

        toast.success(result.message,{
            position : "bottom-right",
            autoClose : 3000
        });

        setTimeout(() => {
                 window.location.href= "";
        }, 3000);

       

    }
  };


  return (
    <div className="grid grid-cols-12 gap-4">
        <ToastContainer></ToastContainer>
      <div className="col-span-12">
        <ComponentCard title="" desc="" showReload={true}>
            
 
          <div className="mb-6">


           <label
    htmlFor="page"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Select Page Version
  </label>
<p className="mb-2 text-xs text-gray-500">
  <strong>Version Guide:</strong> V stands for <strong>Version</strong>. A new
  version (V2, V3, V4, etc.) is created each time the page content is updated.
  Select the version you want to view or edit.
</p>

            <select
              id="page"
              value={selectedOption}
              onChange={(e) => {
                setSelectedOption(e.target.value);
                handleText(e.target.value);
              }}
              className="w-full max-w-sm rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select a page</option>
              
             

              {cms.map((item)=>(
                 <option value={`${item.id}`}>{item.name}- v{item.version}</option>
              ))}
            </select>
          </div>


          <Editor
            value={text}
            onTextChange={(e) => setText(e.htmlValue)}
            style={{ height: "320px" }}/>

        
          <div className="mt-6 flex justify-end">
           
            {selectedOption &&(<>
                 <button
                 type="submit"
              onClick={handleUpdate}
              className="rounded-md bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
            >
              Update
            </button>
            
            </>)}
          </div>
     
        </ComponentCard>
      </div>
    </div>
  );
}