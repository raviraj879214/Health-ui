import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {CreateFaqs} from "../../../../components/(Faqs)/createFaq";



export default function Page() {


    return (<>

        <PageBreadcrumb pageTitle="Manage Faq's" />

        <CreateFaqs />
    </>);
}