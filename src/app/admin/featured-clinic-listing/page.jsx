

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ClientPackage} from "../../../components/ManagePackageListing/Client";


export const metadata = {
  title: "Manage Featured Listing | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};





export default function Page(){


  




    return(<>
         <PageBreadcrumb pageTitle="Manage Featured Listing" />



         <ClientPackage></ClientPackage>
    </>);



}