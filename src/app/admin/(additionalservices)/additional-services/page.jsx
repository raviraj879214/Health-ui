import PageBreadcrumb from "@/components/common/PageBreadCrumb";

import {AdditionalServices} from "../../../../components/(AdditionalServices)/additionalServices";

export const metadata = {
  title: "Additional Services | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){



    return(<>

     <PageBreadcrumb pageTitle="Additional Services" />

    
     <AdditionalServices />
    
    </>);
}