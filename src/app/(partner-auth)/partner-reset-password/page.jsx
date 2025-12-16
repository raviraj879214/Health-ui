import {PartnerReset} from "../../../components-clinic/partnerauth/PartnerResetPassword";




export default function Page({searchParams}){

     const resettoken = searchParams?.resettoken;

    return(<>

        <PartnerReset resettoken={resettoken} />


    </>);
}