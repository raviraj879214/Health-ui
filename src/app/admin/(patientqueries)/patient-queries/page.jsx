
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManagePatientQueries} from "../../../../components/patientqueries/managePatientQuery";




export const metadata = {
  title: "Manage Queries | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page(){



    return(<>
        
         <PageBreadcrumb pageTitle="Patient Queries" />

        <ManagePatientQueries></ManagePatientQueries>
        
    </>);
}