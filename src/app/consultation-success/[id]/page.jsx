import {ConsultationSuccess} from "../../../components/constultationsucces/consultationSuccess";


export default async function Page({params}){

    const { id } = await params;

    return(<>

        <ConsultationSuccess id={id}></ConsultationSuccess>

        

    </>);
}