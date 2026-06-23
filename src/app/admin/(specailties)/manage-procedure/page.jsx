
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {Main} from "../../../../components/(specialties)/manageprocedure/main";
import {SpecialtiesLoader} from "../../../../components/(specialties)/manageprocedure/loader/specialtiesloader";
import { Suspense } from "react";



export const metadata = {
  title: "Adjunctive Items | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Pages(){


    return(<>
    
     <PageBreadcrumb pageTitle="Adjunctive Items" />


     

      
      <Suspense fallback={<SpecialtiesLoader />}>
         <Main />
      </Suspense>


    </>);
}