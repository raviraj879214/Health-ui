

import {MainPatinetQuery} from "../../../../../components-front-end/patientquery/mainPatientQuery";



export default function Page({params}){

    const { id, slug } = params;




    return(<>
       
       <MainPatinetQuery id={id} name={slug} />

    
    </>);
}