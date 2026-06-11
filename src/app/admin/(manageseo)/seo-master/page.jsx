

import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {SeoMaster} from "../../../../components/(ManageSeo)/SeoMaster/seoMaster";



export const metadata = {
  title: "Seo Master | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){



    return(<>
    
     <PageBreadcrumb pageTitle="Seo Master" />

        <SeoMaster />
    </>);
}