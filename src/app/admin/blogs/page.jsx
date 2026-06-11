import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import {ManageBlog} from "../../../components/blogsmanagement/ManageBlogs";

export const metadata = {
  title: "Manage Blogs | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};


export default function Page(){



    return(<>
        <div className="space-y-6">
            <PageBreadcrumb pageTitle="Manage Blogs" />
            <ManageBlog />
        </div>

    </>)
}