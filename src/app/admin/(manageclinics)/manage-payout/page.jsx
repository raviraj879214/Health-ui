import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {MainPayout} from "../../../../components/managepayout/mainPayout";




export default async function Page({ searchParams }) {
  const id = searchParams.id; 
  
    


    return(<>
    
        <PageBreadcrumb pageTitle=" Manage Payout" />
             


        <MainPayout id={id} />
    </>);
}