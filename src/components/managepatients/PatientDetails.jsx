"use client"
import { Suspense, useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import { toast } from "react-toastify";
import { formatBrazilDate } from "../../lib/formatDate";
import { formatDate } from "@fullcalendar/core/index.js";
import { PatientRegister } from "@/lib/enums/PatientRegistration";
import {BlockPatients} from "../managepatients/Blockpatient";
import {ManageNotes} from "../managepatients/NotesManagement";






export function Patients({ uuid }) {

    const [patientdetails, setPatientDetails] = useState({});
    const [trigger,setTrigger] = useState();



    useEffect(() => {

        fetchpatientdetails(uuid);

    }, [trigger]);



    const fetchpatientdetails = async (uuid) => {
        const resdsd = await fetch("/api/auth/get-token");
        const token = await resdsd.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-patients/get-by-id/${uuid}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token.token}`
            }
        });

        if (res.status == 400) {
            const result = await res.json();
            toast.error(result.message, { position: "bottom-right", autoClose: 3000, });
        }

        if (res.ok) {
            const result = await res.json();
            setPatientDetails(result.data);
        }
    }



    const SideEffect=(data)=>{

        setTrigger(data);
    }




    return (<>

       



 <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[900px]">
                    <ComponentCard  title={`Patient Code : ${patientdetails?.patient_code}`} showReload={true}>

                            <div className="flex justify-end mb-3">
                                   <button className="primary-default" onClick={() => window.history.back()}>
                                            ⬅ Back
                                    </button>
                             </div>

                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-8 grid grid-cols-2 gap-6 text-sm">
                                <div>
                                    <p className="text-gray-500">First Name</p>
                                    <p className="font-semibold">{patientdetails?.first_name}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Last Name</p>
                                    <p className="font-semibold">{patientdetails?.last_name}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Email</p>
                                    <p className="font-semibold">{patientdetails?.email}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Gender</p>
                                    <p className="font-semibold">{patientdetails?.gender}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">DOB</p>
                                    <p className="font-semibold">{formatBrazilDate(patientdetails?.dob)}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Phone</p>
                                    <p className="font-semibold">{patientdetails?.phone}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">City</p>
                                    <p className="font-semibold">{patientdetails?.city}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">State</p>
                                    <p className="font-semibold">{patientdetails?.state}</p>
                                </div>


                                <div>
                                    <p className="text-gray-500">State</p>
                                    <p className="font-semibold">{patientdetails?.state}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Pincode</p>
                                    <p className="font-semibold">{patientdetails?.pincode}</p>
                                </div>


                                <div>
                                    <p className="text-gray-500">Address</p>
                                    <p className="font-semibold">{patientdetails?.address}</p>
                                </div>

                                <div>
                                    <p className="text-gray-500">Note</p>
                                    <p className="font-semibold break-words whitespace-pre-line">
                                        {patientdetails?.notes}
                                    </p>
                                </div>




                                <div>
                                    <p className="text-gray-500">Created At</p>
                                    <p className="font-semibold">{formatDate(patientdetails?.created_at)}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Updated At</p>
                                    <p className="font-semibold">{formatDate(patientdetails?.updated_at)}</p>
                                </div>



                            </div>

                           
                            <div className="col-span-4">

                                
                                    <>
                                           <BlockPatients data ={{
                                            id: patientdetails.id,
                                            blockreason: patientdetails.blockreason,
                                            status: patientdetails.status,
                                           }} sendData={SideEffect}></BlockPatients>


                                           

                                    </>
                              
                               
                            </div>

                        </div>

                    </ComponentCard>
                </div>
            </div>
        </div>



    </>);
}