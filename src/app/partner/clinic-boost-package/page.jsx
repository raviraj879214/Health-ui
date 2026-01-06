import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {MainBoostClinicPackages} from "../../../components-clinic/clinicboostpackage/mainBoostClinicPackages";
import {ListingSuccess} from "../../../components-clinic/clinicboostpackage/listingSuccess";


export default function Page({searchParams}){

    const session_id = searchParams?.session_id;


    
    return(<>

         <PageBreadcrumb pageTitle="Clinic Boost Package" />
    
        

        {session_id ? (
                    <>
                  
                     <ListingSuccess session_id={session_id}></ListingSuccess>
                
                    </>
                ) : (
                    <MainBoostClinicPackages></MainBoostClinicPackages>
                )}
    </>);
}