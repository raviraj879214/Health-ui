import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManageCordinator} from "../../../components/managecordinator/manageCordinator";



export const metadata = {
  title: "Manage Cordinator | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function page(){


    return(<>
    
            <PageBreadcrumb pageTitle="Manage Cordinator" />


            <ManageCordinator />
    
    </>);
}