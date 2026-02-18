
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Main} from "../../../../components/(specialties)/manageprocedure/main";
import {SpecialtiesLoader} from "../../../../components/(specialties)/manageprocedure/loader/specialtiesloader";
import { Suspense } from "react";



export const metadata = {
  title: "Manage Procedure | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Pages(){


    return(<>
    
     <PageBreadcrumb pageTitle="Manage Procedure" />


     

      
      <Suspense fallback={<SpecialtiesLoader />}>
         <Main />
      </Suspense>


    </>);
}