"use client"
import Label from "@/components/form/Label";
import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useConfirm } from "../../../hooks/useConfirm";




export function ClinicSpecialty({ id }) {


    const [specialties, setSpecialties] = useState([]);
    const { confirm, ConfirmDialog } = useConfirm();
    const [open, setOpen] = useState(false);


    const [specialty,setSpecialty] = useState([]);
    const [searchtext,setSearchText] = useState("");
    const[button,setButton] = useState(false);






    useEffect(() => {
        fetchClinicSpecialty();

        fetchSpecialty();

    }, [open]);


    const fetchSpecialty=async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-specialty/${id}`,{
            method : "Get",
            headers:await adminHeaders()
        });
        if(res.ok){
             
            const result = await res.json();

           setSpecialty([...result.data].sort((a, b) => a.name.localeCompare(b.name)));

        }
    }


    const fetchClinicSpecialty = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-specialty/${id}`, {
            method: "Get",
            headers: await adminHeaders()
        });

        if (res.ok) {
            const result = await res.json();
            setSpecialties(result.data);
            
        }
    }


    const acceptRequested = async(ids)=>{
       
         const result = await confirm("Are you sure you want to approve this item?");
             if (!result) {
                console.log("User not confirmed!");
            return false;
        }

 setButton(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/accept-clinic-specialty/${ids}/${id}`,{
            method : "Get",
            headers : await adminHeaders(),
        });

        if(res.ok){

            fetchClinicSpecialty();
            
            toast.success("Specialty approved successfully", {position: "bottom-right",autoClose: 3000,});

        }
        setButton(false);
    }


    useEffect(()=>{

        searchText();

    },[searchtext]);



        const searchText = () => {
             


            const value = searchtext.toLowerCase();

            if(value == ""){

                fetchSpecialty();
                return;
            }
            const searchList = specialty.filter(item =>
                item.name.toLowerCase().includes(value)
            );

            console.log(searchList);
            setSpecialty(searchList);

        };



     const rejectRequested = async(ids)=>{
       
         const result = await confirm("Are you sure you want to delete this item?");
             if (!result) {
                console.log("User not confirmed!");
            return false;
        }

 setButton(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/reject-clinic-specialty/${ids}${id}`,{
            method : "Get",
            headers : await adminHeaders(),
        });

        if(res.ok){

            fetchClinicSpecialty();
            toast.success("Specialty deleted successfully", {position: "bottom-right",autoClose: 3000,});

        }

        setButton(false);
    }


    const assignSpecialty=async(assignid)=>{
       
        setButton(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/assign-clinic-specialty`,{
            method : "Post",
            headers: await adminHeaders(),
            body: JSON.stringify({
                "assignid" : assignid,
                "clinicuuid" : id
            })
        });

        
        if(res.ok){
            fetchClinicSpecialty();
            fetchSpecialty();
             setSearchText("");
        }
        setButton(false);
    }



    const unassignSpecialty = async(unassignid)=>{
    setButton(true);

         const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/unassign-clinic-specialty`,{
            method : "Post",
            headers: await adminHeaders(),
            body: JSON.stringify({
                "unassignid" : unassignid,
                "clinicuuid" : id
            })
        });

        
        if(res.ok){
            fetchClinicSpecialty();
            fetchSpecialty();
            setSearchText("");
        }
setButton(false);
    }







    return (<>

        <ConfirmDialog />
        <div className="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
            <div className="flex justify-between items-center border-b border-gray-200 rounded-t-xl py-3 px-4 md:px-5 dark:border-neutral-700">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Specialty
                </h3>
                <div className="flex items-center gap-x-1">

                </div>
            </div>

            <div className="p-4 md:p-5 grid grid-cols-1  md:grid-cols-2 gap-5" >

                
                <div className="border theme-border rounded-2xl bg-white dark:bg-neutral-900 shadow-sm w-full">
                    <div className="flex items-center justify-between px-5 py-3 border-b theme-border">
                        <Label className="text-sm font-semibold text-heading">
                            Selected ({specialties.filter(item => item.specialization?.name).length})
                        </Label>
                        <div className="relative inline-block">
                            
                            <button
                                type="button"
                                onClick={() => setOpen(!open)}
                                className="btn btn-primary"
                            >
                               
                               {button ?(<>...</>):(<>Assign</>)}
                               
                            </button>

                            
                            {open && (
                                <div className="bg-white absolute z-10 mt-2 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-100" >
                                   <p className="m-1 p-3 text-sm text-neutral-600 bg-neutral-50 border theme-border rounded-lg">
                                        Click beside a specialty name to assign or unassign it from the clinic.
                                   </p>

                                    
                                <ul className="p-2 text-sm text-body font-medium mt-1 h-[400px] overflow-auto">
                                    <li>
                                       <input
                                        value={searchtext}
                                           onChange={(e)=> setSearchText(e.target.value)}
                                            placeholder="Search"
                                            type="text"
                                            className="w-full px-4 py-2 text-sm text-heading bg-neutral-primary border border-default rounded-base focus:outline-none focus:ring-2 focus:ring-brand-medium focus:border-brand-medium"/>
                                    </li>
                                    {specialty.map((item)=>(
                                      <li key={item.id} className="flex items-center justify-between p-2 border border-neutral-100 rounded-base transition-colors hover:bg-brand-soft">
                                            <span>{item.name}</span>

                                            {item.clinics?.some(clinic => clinic.clinicUuid === id) ? (
                                                <button
                                                    onClick={()=> unassignSpecialty(item.id)}
                                                    className="text-xs font-medium text-red-600 bg-red-100 px-3 py-1 rounded hover:bg-red-200">
                                                    
                                                    {button ?(<>...</>):(<>UnAssign</>)}

                                                </button>
                                            ) : (
                                                <button
                                                    onClick={()=> assignSpecialty(item.id)}
                                                    className="text-xs font-medium text-brand bg-brand-soft px-3 py-1 rounded hover:bg-brand-medium">
                                                    {button ?(<>...</>):(<>Assign</>)}

                                                 </button>
                                            )}
                                    </li>


                                    ))}

                                
                                </ul>
                                </div>
                            )}
                            </div>
                    </div>

                    <div className="p-5 min-h-[120px] text-sm text-body border border-neutral-200 rounded-2xl bg-white">

                            {specialties.filter(item => item.specialization?.name).length === 0 ? (
                                <p className="text-sm text-neutral-500 text-center flex items-center justify-center h-[80px]">
                                No items selected
                                </p>
                                ) : (
                                <div className="flex flex-wrap gap-2">
                                {specialties.map((item, index) =>
                                    item.specialization?.name ? (
                                        <span
                                        key={index}
                                        className="inline-flex items-center bg-brand-softer border border-brand-subtle
                                                    text-fg-brand-strong text-xs font-medium
                                                    px-3 py-1 rounded-full
                                                    hover:bg-brand-soft transition"
                                        >
                                        {item.specialization.name}
                                        </span>


                                    ) : null
                                )}

                            </div>
                        )}
                    </div>
                </div>

               
              
                    <div className="border theme-border rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
                        <div className="flex items-center justify-between px-5 py-3 border-b theme-border">
                            <Label className="text-sm font-semibold text-heading">
                                Requested ({specialties.filter(item => item.suggestedCategory?.name).length})
                            </Label>
                        </div>
                            
                        
                    <div className="p-1 min-h-[120px] text-sm text-body  rounded-2xl bg-white">

                            {specialties.filter(item => item.suggestedCategory?.name).length === 0 ? (
                                <p className="text-sm text-neutral-500 flex items-center justify-center min-h-[80px]">
                                No items selected
                                </p>
                            ) : (
                                <ul className="space-y-2 w-full max-h-[200px] overflow-y-auto">
                                {specialties
                                    .filter(item => item.suggestedCategory?.name)
                                    .map(item => (
                                    <li
                                        key={item.id}
                                        className="flex items-center justify-between p-3 rounded-xl
                                                border border-neutral-200 bg-white
                                                hover:bg-neutral-50 transition"
                                    >
                                        {/* Name */}
                                        <span className="text-sm font-medium text-heading">
                                        {item.suggestedCategory.name}
                                        </span>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                        <button
                                            onClick={()=> acceptRequested(item.suggestedCategory.id)}
                                            type="button"
                                            className="px-2.5 py-1 text-xs font-medium rounded-full
                                                    bg-green-50 text-green-700 border border-green-200
                                                    hover:bg-green-100 transition"
                                        >
                                            
                                            {button ?(<>...</>):(<>Accept</>)}
                                        </button>

                                        <button
                                        onClick={()=> rejectRequested(item.suggestedCategory.id)}
                                            type="button"
                                            className="px-2.5 py-1 text-xs font-medium rounded-full
                                                    bg-red-50 text-red-700 border border-red-200
                                                    hover:bg-red-100 transition"
                                        >
                                            
                                            {button ?(<>...</>):(<>Reject</>)}
                                        </button>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                            )}

                    </div>




                        
                    </div>     
                


               

            </div>

        </div>


    </>);
}