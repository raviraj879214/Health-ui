
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ManageRole } from "../../../components/manageroles/ManageRoles";


export const metadata = {
  title: "Manage Roles | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page(){


    return(<>
    
    <div className="space-y-6">
                <PageBreadcrumb pageTitle="Manage Roles" />

                 <ManageRole></ManageRole>

            </div>
       
    </>);
}