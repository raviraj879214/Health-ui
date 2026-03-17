import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {MainPackage} from "../../../components-clinic/boostpackages/MainPackages";
import {PackageSuccess} from "../../../components-clinic/boostpackages/PackageSuccess";



export default async function Page({searchParams }){


    const params = await searchParams;  // ✅ await here

    const session_id = params?.session_id; // ✅ then access
    

    return(<>

    <PageBreadcrumb pageTitle="Boost Package" />
        {session_id ? (
            <>

             <PackageSuccess session_id={session_id}></PackageSuccess>
        
            </>
        ) : (
            <MainPackage></MainPackage>
        )}
        

        



    </>);
}