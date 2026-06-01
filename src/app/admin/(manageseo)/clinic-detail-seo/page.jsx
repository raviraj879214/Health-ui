import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ClinicDetailsSeo } from "../../../../components/(ManageSeo)/ClinicDetailsSeo/clinicdetailsseo";



export const metadata = {
  title: "Clinic Detail Seo | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){



    return(<>
    
     <PageBreadcrumb pageTitle="Clinic Details Page" />


        <ClinicDetailsSeo />
    </>);
}