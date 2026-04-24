

import {MainPatinetQuery} from "../../../../../components-front-end/patientquery/mainPatientQuery";

export const metadata = {
  title: "Patient Query | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page({params}){

    const { id, slug } = params;




    return(<>
       
       <MainPatinetQuery id={id} name={slug} />

    
    </>);
}