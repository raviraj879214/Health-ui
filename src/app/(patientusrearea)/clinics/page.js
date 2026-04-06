
import {ClinicListing} from "../../../components-front-end/cliniclisting/clinicListing";

export const metadata = {
  title: "Clinics | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Listing() {


  return (
    <>

        <ClinicListing></ClinicListing>
     
    </>
  );
}
