import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Patients} from "../../../../components/managepatients/PatientDetails";


export const metadata = {
  title: "Patients Details | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page({params}){

   const { uuid } = params;


    return(<>

        <PageBreadcrumb pageTitle="Patients Details" />

        <Patients  uuid = {uuid}  ></Patients>  
        
    </>);

}