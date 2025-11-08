"use client"
import { useRouter } from "next/navigation";
import ComponentCard from "../common/ComponentCard";
import { useEffect, useState } from "react";

import { useDispatch , useSelector  } from "react-redux";
import { setTabvalue } from "@/redux/admin/features/Patienttabs";
import Loading from "../../skeleton/admin/loading";
 import React, { Suspense } from "react";



 const ListOfPatients = React.lazy(() => import("../managepatients/ListOfPatient"));




export function ManagePatient() {
    const router = useRouter();
   
    const dispatch = useDispatch();


     const [activeTab, setActiveTab] = useState(useSelector((state) => state.common.value));


     useEffect(()=>{
        dispatch(setTabvalue(activeTab));
     },[activeTab]);


    const tabs = [
        { label: "Pending", value: "pending" , code : 0 },
        { label: "Active", value: "active" , code : 1 },
        { label: "Blocked", value: "blocked" , code : 2 },
    ];




    return (<>
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-12">
                <ComponentCard tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} title="" desc="" showReload={true}>

                    {/* <ListOfPatients trigger={""} active={tabs.find(tab => tab.value === activeTab)?.code}></ListOfPatients> */}


                        <Suspense fallback = {<Loading></Loading>} >
                                <ListOfPatients trigger={""} active={tabs.find(tab => tab.value === activeTab)?.code}></ListOfPatients>
                        </Suspense>
                       
                </ComponentCard>
            </div>
        </div>
    </>);
}