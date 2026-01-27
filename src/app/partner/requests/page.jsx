import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {RequestList} from "../../../components-clinic/requests/requestList";



export const metadata = {
  title: "Requests | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page(){


    return(<>
    
     <PageBreadcrumb pageTitle="Requests" />

    
        <RequestList />
    
    </>);
}