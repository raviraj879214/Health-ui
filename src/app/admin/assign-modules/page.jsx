
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {AssignModule} from "../../../components/assignmodules/AssignModules";

export const metadata = {
  title: "Manage Modules | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page(){


    return(<>
    
     <div className="space-y-6">
                <PageBreadcrumb pageTitle="Assign Modules" />

                <AssignModule></AssignModule>
            </div>
    
    </>);
}