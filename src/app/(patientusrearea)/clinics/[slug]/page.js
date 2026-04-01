

import { Suspense } from "react";
import { ClinicDetail } from "../../../../components-front-end/cliniclisting/clinicdetailspage/clinicDetail";
import { ClinciDetailsSkeleton } from "@/components-front-end/cliniclisting/clinicdetailspage/clinciDetailsSkeleton";


export const metadata = {
  title: "Clinic Details | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};


export default async function Listing({params}) {

  const slug = params.slug;

  return (
    <>
     
    

      <Suspense fallback={<ClinciDetailsSkeleton />}>
        
        <ClinicDetail id={slug} />

      </Suspense>
    </>
  );
}
