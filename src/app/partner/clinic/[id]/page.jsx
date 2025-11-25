
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {MainClinic} from "../../../../components-clinic/ClinicEditManagement/MainClinicPage";


export const metadata = {
  title: "Edit Clinic | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page({ params }){
 const { id } = params;


    return(<>

     <div className="space-y-6">
        <PageBreadcrumb pageTitle="Edit Clinic" />
        <MainClinic clinicuuid={id}></MainClinic>

      </div>

        
    
    </>);
}