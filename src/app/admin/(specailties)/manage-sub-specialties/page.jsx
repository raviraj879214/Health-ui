
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Main} from "../../../../components/(specialties)/managesubspecialties/main";
import {SpecialtiesLoader} from "../../../../components/(specialties)/managesubspecialties/loader/specialtiesloader";
import { Suspense } from "react";



export const metadata = {
  title: "Manage Sub Specialties | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Pages(){


    return(<>
    
     <PageBreadcrumb pageTitle="Manage Specialty" />


     

      
      <Suspense fallback={<SpecialtiesLoader />}>
         <Main />
      </Suspense>


    </>);
}