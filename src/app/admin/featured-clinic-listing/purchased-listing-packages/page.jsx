import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ClinetPurchasedPackages} from "../../../../components/ManagePurchasedPackageListing/Client";




export default function Page(){


    return (<>
         <PageBreadcrumb pageTitle="Purchased Featured Listing" />
    

        <ClinetPurchasedPackages></ClinetPurchasedPackages>



    </>);
}