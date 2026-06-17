
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import  { BlogDetails } from "../../../../../components/blogsmanagement/blogDetails";



export const metadata = {
  title: "Blog Detail | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};




export default async function Page({ params }) {
  const { id } = await params;

  return (

          <>
          
            <PageBreadcrumb pageTitle="Blog Details" />


            <BlogDetails id={id} />
          </>
  );
}