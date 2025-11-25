"use client"
import ComponentCard from "@/components/common/ComponentCard";
import { useEffect, useState } from "react";
import { clinicHeaders } from "../../utils/clinicHeaders";
import { useRouter } from "next/navigation";


export function ClinicList() {


    const [cliniclist, setClinicList] = useState([]);
    const router = useRouter();

    const fetchclinic = async () => {
        debugger;
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinics`, {
            method: "GET",
            headers: clinicHeaders()
        });

        if (res.ok) {
            const result = await res.json();
            setClinicList(result.data);
        }

    }

    useEffect(() => {
        fetchclinic();

    }, []);


    const onClick = async (url) => {

        router.push(url);

    }




    return (<>
        <div className="grid grid-cols-12">
            <div className="col-span-6">
                <ComponentCard>
                    <div className="flex justify-end">
                        <button className="btn btn-primary rounded-3xl px-6 py-2">
                            + Add Clinic
                        </button>
                    </div>

                    <ul>
                        {cliniclist.map((data) => (
                            <li
                                key={data.id}
                                className="p-5  border theme-border rounded-2xl m-2 flex justify-between items-center  ">
                                <span className="text-green-700 font-bold">{data.name}</span>

                                <button
                                    onClick={() => onClick(`/partner/clinic/${data.uuid}`)}
                                    className="btn btn-primary ">Edit Clinic</button>
                            </li>
                        ))}
                    </ul>
                </ComponentCard>
            </div>
        </div>

    </>);
}