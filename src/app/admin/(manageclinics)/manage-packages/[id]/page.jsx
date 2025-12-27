import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManagePackageDetail} from "../../../../../components/manageclinics/managepackages/managePackageDetails";



export default async function Page({params}){

    const { id } = await params;

    return(<>
            <PageBreadcrumb pageTitle="Clinic Packages Details" />
        <ManagePackageDetail id={id} />


    </>);
}