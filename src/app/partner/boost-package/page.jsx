import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {MainPackage} from "../../../components-clinic/boostpackages/MainPackages";
import {PackageSuccess} from "../../../components-clinic/boostpackages/PackageSuccess";



export default function Page({searchParams }){


    const session_id = searchParams?.session_id;
    

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