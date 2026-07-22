import { ClinicDetail } from "@/components-front-end/cliniclisting/packagedetails/clinicDetail";
import { DoctorDetails } from "../../../../components-front-end/cliniclisting/doctordetails/doctorDetails";







export default function Page({params}){

const doctorid = params.id;



    return(<>
    
        <DoctorDetails id={doctorid} />
    </>);
}