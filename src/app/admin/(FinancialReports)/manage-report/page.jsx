
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Report} from "../../../../components/managereports/reportPage";

export const metadata = {
  title: "Manage Report | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page(){


    return(<>
         <PageBreadcrumb pageTitle="Manage Report" />
    
        <Report />
    </>);
}