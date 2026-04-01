import { ClinicDetail } from "@/components-front-end/cliniclisting/packagedetails/clinicDetail";




export const metadata = {
  title: "Package Details | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page({ params, searchParams}){

const clinicid = params.id;

const pckid = searchParams.packid;

    return(<>
       
       

        <ClinicDetail id={clinicid} pckid={pckid}/>
    </>);
}