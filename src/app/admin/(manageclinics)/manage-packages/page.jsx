import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManagePackages} from "../../../../components/manageclinics/managepackages/managePackages";


export default function Page(){



    return(<>
         <PageBreadcrumb pageTitle="Manage Clinic Packages" />
    
        <ManagePackages></ManagePackages>
    </>);
}