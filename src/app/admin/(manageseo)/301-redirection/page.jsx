

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Redirections} from "../../../../components/(ManageSeo)/301Redirections/redirections";



export const metadata = {
  title: "301 Redirections | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){



    return(<>
    
     <PageBreadcrumb pageTitle="301 Redirections" />

        <Redirections />
    </>);
}