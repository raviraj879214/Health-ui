import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { PatientQueryDetails } from "@/components/patientqueries/patientQueryDetails";


export default async function Page({params}) {

    const { id } = await params;
    


    return (<>
       
        <PageBreadcrumb pageTitle="Patient Query Details" />
       
       <PatientQueryDetails id={id}></PatientQueryDetails>
      
    </>);
}