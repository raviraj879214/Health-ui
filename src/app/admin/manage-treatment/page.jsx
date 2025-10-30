import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {MangageSpecailty} from "../../../components/managespecialties/CreateSpecialty";


export const metadata = {
  title: "Manage Treatment | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){



    return(<>
    
         <PageBreadcrumb pageTitle="Manage Specialties" />


        <MangageSpecailty></MangageSpecailty>


    </>);
}