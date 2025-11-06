

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { CreateSpecialty } from "../../../components/managespecialty/CreateSpecialt";



export const metadata = {
  title: "Manage Specialty | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};






export default function Page(){


    return(<>

     <PageBreadcrumb pageTitle="Manage Specialty" />

      <CreateSpecialty></CreateSpecialty>

    
    </>);
}