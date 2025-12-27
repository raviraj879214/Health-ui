import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ClinicDetails} from "../../../../../components/manageclinics/clinicDetails";





export default async function Page({params}) {

    const { id } = await params;
    




    return (<>
       
        <PageBreadcrumb pageTitle="Clinic Details" />
        <ClinicDetails id={id} ></ClinicDetails>
      
    </>);
}