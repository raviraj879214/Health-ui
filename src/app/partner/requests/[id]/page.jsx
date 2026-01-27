import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {RequestDetails} from "../../../../components-clinic/requests/requestDetails";


export const metadata = {
  title: "Request Details | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page({params}){
    const {id} = params;

    return(<>
        


                <PageBreadcrumb pageTitle="Requests Details" />
            <RequestDetails id={id}/>



    
    </>);
}