import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ManageBoostPackage } from "../../../../components/(manageboostpackage)/managePackage";
import { Suspense } from "react";
import { SpecialtiesLoader } from "@/components/(specialties)/managespecialties/loader/specialtiesloader";




export const metadata = {
    title: "Manage Boost Package | " + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};


export default function Page() {


    return (<>
        <PageBreadcrumb pageTitle="Manage Boost Package" />



        <Suspense fallback={<SpecialtiesLoader />}>
            <ManageBoostPackage />
        </Suspense>
    </>);
}