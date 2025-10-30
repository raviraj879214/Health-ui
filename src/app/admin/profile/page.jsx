"use client"
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {UserMainArea} from "../../../components/user-profile/UserMain";


export const metadata = {
  title: "Manage Profile | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default function Page() {


    return (<>


        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Manage Users" />


            <UserMainArea></UserMainArea>

        </div>


    </>);
}