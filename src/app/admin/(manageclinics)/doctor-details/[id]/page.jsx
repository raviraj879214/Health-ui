import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import { DoctorDetails } from "@/components/manageclinics/doctordetails/doctorDetails";

export default async function Page({params}) {

    const { id } = await params;



    return(<>
     <PageBreadcrumb pageTitle="Doctor Details" />
    

      <DoctorDetails id={id} />    


      
    </>);
}

