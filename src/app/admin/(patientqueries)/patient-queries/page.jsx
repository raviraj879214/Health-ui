
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManagePatientQueries} from "../../../../components/patientqueries/managePatientQuery";


export default function Page(){



    return(<>
        
         <PageBreadcrumb pageTitle="Patient Queries" />

        <ManagePatientQueries></ManagePatientQueries>
        
    </>);
}