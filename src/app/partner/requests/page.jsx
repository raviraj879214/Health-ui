import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {RequestList} from "../../../components-clinic/requests/requestList";



export default function Page(){


    return(<>
    
     <PageBreadcrumb pageTitle="Requests" />

    
        <RequestList />
    
    </>);
}