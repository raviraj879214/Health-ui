import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Cms} from "../../../../components/termspolicy/cms";



export const metadata = {
  title: "Manage Cms | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){


    return(<>

    <PageBreadcrumb pageTitle="Manage Cms" />
    
        <Cms></Cms>
    </>);
}