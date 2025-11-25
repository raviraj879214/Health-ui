import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ClinicList} from "../../../components-clinic/ClinicEditManagement/ClinicList/ClinicListPage";




export const metadata = {
  title: "Clinic List | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};





export default function Page(){

   

    return(<>
    
       
       <div className="space-y-6">
        <PageBreadcrumb pageTitle="Clinics" />
       

         <ClinicList></ClinicList>

      </div>
    
    

    </>);
}