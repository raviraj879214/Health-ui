import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {MainBoostClinicPackages} from "../../../components-clinic/clinicboostpackage/mainBoostClinicPackages";
import {ListingSuccess} from "../../../components-clinic/clinicboostpackage/listingSuccess";


export default async function Page({searchParams}){

    const params = await searchParams;   // ✅ await whole object
    const session_id = params?.session_id;

    
    return(<>

         <PageBreadcrumb pageTitle="Clinic Boost" />
    
        

        {session_id ? (
                    <>
                  
                     <ListingSuccess session_id={session_id}></ListingSuccess>
                
                    </>
                ) : (
                    <MainBoostClinicPackages></MainBoostClinicPackages>
                )}
    </>);
}