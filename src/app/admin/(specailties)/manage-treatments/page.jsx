
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Main} from "../../../../components/(specialties)/managetreatment/main";
import {SpecialtiesLoader} from "../../../../components/(specialties)/managetreatment/loader/specialtiesloader";
import { Suspense } from "react";



export const metadata = {
  title: "Manage Treatment | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Pages(){


    return(<>
    
     <PageBreadcrumb pageTitle="Manage Treatment" />


     

      
      <Suspense fallback={<SpecialtiesLoader />}>
         <Main />
      </Suspense>


    </>);
}