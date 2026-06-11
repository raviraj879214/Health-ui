import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ListOfBlogs } from "../../../../components/blogsmanagement/BlogsList";

export const metadata = {
  title: "Blogs List | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};





export default function Page(){


    return(<>
      <PageBreadcrumb pageTitle="Manage Blogs" />


     <ListOfBlogs />
    </>);
}