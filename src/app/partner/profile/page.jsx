
import ComponentCard from "@/components/common/ComponentCard";
import { Account } from "../../../components-clinic/profilemanagement/AccountSetting";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";


export const metadata = {
  title: "Clinic Profile |" + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};






export default function Page() {




  return (<>

    <div className="space-y-6">
      <PageBreadcrumb pageTitle="Account Setting" />


      <Account></Account>

    </div>


  </>);
}