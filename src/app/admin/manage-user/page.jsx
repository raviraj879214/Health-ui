
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManageUser} from "../../../components/manageusers/ManageUsers";


export const metadata = {
  title: "Manage User | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Page() {


    return (<>


        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Manage Users" />


            <ManageUser></ManageUser>

        </div>


    </>);
}