"use client"
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addTreatment } from "../redux/cliniclisting/store/clinicListing";
import { useRouter } from "next/navigation";


export default function TreatmentCard({ data }){

    const dispatch = useDispatch();
    const router = useRouter();





    const onTreatmentClick = (data)=>{
        debugger;
        
        dispatch(
            addTreatment({
                name : data.title,
                id: data.id
            })
        );

        router.push('/clinics');
    }



    return (
        <button  onClick={()=> onTreatmentClick(data)} className="block border border-border py-7.5 px-4 text-center rounded-thm h-full">
            <div className="w-[48px] mx-auto">
                <div className="relative overflow-hidden pb-[100%] mb-4.5">
                    <Image
                        src={data.image}
                        alt={data.title}
                        width={48}
                        height={48}
                        className="absolute top-0 left-0 w-full h-full"
                    />
                </div>
            </div>
            <div className="content">
                <p className="m-0">{data.title}</p>
            </div>
        </button>
    )
}