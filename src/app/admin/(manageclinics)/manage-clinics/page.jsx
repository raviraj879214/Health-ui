

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ClinicListAdmin} from "../../../../components/manageclinics/clinicList";



export const metadata = {
  title: "Manage Clinics | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};





export default function Page(){




    return(<>

      <PageBreadcrumb pageTitle="Manage Clinics" />
    
      <ClinicListAdmin></ClinicListAdmin>
      
    </>);
}