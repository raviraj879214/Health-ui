

import { Suspense } from "react";
import { ClinicDetail } from "../../../../components-front-end/cliniclisting/clinicdetailspage/clinicDetail";
import { ClinciDetailsSkeleton } from "@/components-front-end/cliniclisting/clinicdetailspage/clinciDetailsSkeleton";




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
