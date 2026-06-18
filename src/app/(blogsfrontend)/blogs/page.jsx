
import {BlogsList} from "../../../components-front-end/(BlogsManagement)/blogsList";



async function getPageData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-blogs`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch SEO data");
  }

  const result = await res.json();

  return result.data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  )[0];
}

export async function generateMetadata() {
  const blog = await getPageData();

 

  return {
    title: blog.metatitle || blog.title,
    description: blog.metadescription,
    keywords: blog.metakeywords,

    openGraph: {
      title: blog.metatitle || blog.title,
      description: blog.metadescription,
      url: blog.ogurl,
      type: blog.ogtype || "article",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blog.ogimageurl}`,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.metatitle || blog.title,
      description: blog.metadescription,
      images: [
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blog.ogimageurl}`,
      ],
    },

    authors: [
      {
        name: blog.writername,
      },
    ],

    publisher: blog.publisher,

    alternates: {
      canonical: `/blogs/${blog.titleurl}`,
    },
  };


}


export default async function Page(){

    const blog = await getPageData();
  
    return(<>

     {blog?.se_structure && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blog.se_structure),
          }}
        />
      )}


        <BlogsList />
    </>);
}