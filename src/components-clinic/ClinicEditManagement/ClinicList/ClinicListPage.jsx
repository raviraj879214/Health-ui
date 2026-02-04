"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useState } from "react";
import { clinicHeaders } from "../../utils/clinicHeaders";
import { useRouter } from "next/navigation";
import { ClinicStatus } from "@/lib/enums/ClinicStatus";
import { customStep, setclinicid, setuuid } from "@/components-front-end/redux/partnerregister/registerSlice";
import Cookies from "js-cookie";
import {AddClinicBasicDetails} from "./addMoreClinicRegistration/addClinicBasicDetails";
import { toast, ToastContainer } from "react-toastify";



export function ClinicList() {

    const [isOpen,SetIsOpen] = useState(false);


    const [cliniclist, setClinicList] = useState([]);
    const router = useRouter();
    const[isactiveone,setIsActiveOne] = useState(false);
  
    const [uuids,setUuids] = useState("");
    const token = Cookies.get("clinic_user_uuid");



    const fetchclinic = async () => {
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinics`, {
            method: "GET",
            headers: clinicHeaders()
        });

        if (res.ok) {
            const result = await res.json();
            setClinicList(result.data);

           
             const hasStatusZero = result.data.some(item => item.status === String(ClinicStatus.ACTIVE));
             setIsActiveOne(hasStatusZero);
        
        }

    }

    useEffect(() => {
        fetchclinic();


        


    }, []);


    const onClick = async (url) => {
        router.push(url);
    }



    const onSucessAddClinic = ()=>{
         toast.success("Clinic Created Successfull add more data by clicking edit clinic",{
                position : "bottom-right",
                autoClose : 3000
            });
            fetchclinic();
    }   


    return (<>
    
        <div className="grid grid-cols-12">
             
            <div className="col-span-6">
                <ToastContainer></ToastContainer>

                <ComponentCard>
                    <div className="flex justify-end">
                        
                        <button
                            onClick={()=>{
                                
                                SetIsOpen(true);
                            
                            }}
                            className="btn btn-primary rounded-3xl px-6 py-2">
                            + Add Clinic 
                            </button>
                    </div>

                    <ul>
                        {cliniclist.map((data) => (
                            <li
                                key={data.id}
                                className="p-5  border theme-border rounded-2xl m-2 flex justify-between items-center  ">
                                <span className="text-green-700 font-bold">{data.name} <p className="text-sm text-green-400">({data.cnpj})</p> </span>


                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold inline-block
                                     ${data.status === ClinicStatus.PENDING
                                            ? "bg-yellow-100 text-yellow-700"
                                            : data.status === ClinicStatus.ACTIVE
                                                ? "bg-green-100 text-green-700"
                                                : data.status === ClinicStatus.BLOCKED
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-100 text-gray-600"
                                        }`}
                                >
                                    {data.status === ClinicStatus.PENDING && "Pending"}
                                    {data.status === ClinicStatus.ACTIVE && "Active"}
                                    {data.status === ClinicStatus.BLOCKED && "Deactivated"}
                                </span>

                                 <button onClick={() => onClick(`/partner/clinic/${data.uuid}`)} className="btn btn-primary ">Edit Clinic</button>


                            </li>
                        ))}
                    </ul>
                </ComponentCard>
            </div>
        </div>
                        {isOpen === true ? (<>
                            <AddClinicBasicDetails uuid={token} modalpopup={isOpen} onFade={()=>SetIsOpen(false)} onSuccess={onSucessAddClinic} />
                        </>):(<></>)}
    </>);
}