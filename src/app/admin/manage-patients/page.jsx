
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManagePatient} from "../../../components/managepatients/ManagePatients";



export const metadata = {
  title: "Manage Patients | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){


    return(<>

     <PageBreadcrumb pageTitle="Manage Patients" />

      <ManagePatient></ManagePatient>
    
    </>);
}