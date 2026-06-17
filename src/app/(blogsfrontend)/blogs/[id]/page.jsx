import { BlogDetails } from "../../../../components-front-end/(BlogsManagement)/blogDetails";

async function getBlog(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-blogs-details/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
  return data.data;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

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


export default async function Page({ params }) {
  const { id } = await params;
  const blog = await getBlog(id);

  
  
  return(<> 
     {blog?.se_structure && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(blog.se_structure),
          }}
        />
      )}
  
  <BlogDetails blog={blog} />
  </>);
}