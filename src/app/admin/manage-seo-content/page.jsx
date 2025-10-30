import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ManageSeoPage } from "../../../components/manageseo/ManageSeo";



export const metadata = {
  title: "Manage Seo | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page(){


    return(<>
    
     <PageBreadcrumb pageTitle="Manage Specialties" />


        <ManageSeoPage></ManageSeoPage>

    </>);
}