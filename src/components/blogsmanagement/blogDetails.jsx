"use client";
import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";
import ComponentCard from "../common/ComponentCard";
import { formatBrazilDate } from "@/lib/formatDate";




export function BlogDetails({id}){

    const [blogdetails,setBlogDetails] = useState({});
    useEffect(() => {
        if (id) {
            fetchBlogDetails(id);
        }
    }, [id]);

    const fetchBlogDetails = async (id) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-blog/get-blog/${id}`,
                {
                    method: "GET",
                    headers: await adminHeaders(),
                }
            );
            if (!res.ok) {
                throw new Error("Failed to fetch blog details");
            }
            const result = await res.json();
            setBlogDetails(result.data);

        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    };






    return(<>
       
          <div className="mb-4">
        <a
          href="/admin/blog-list"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          ← Back to Blogs
        </a>
      </div>


        <ComponentCard>
            <div className=" bg-gray-50">
                {/* Hero Section */}
                <section className="relative h-[450px] overflow-hidden">
                    <img
                        src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blogdetails.image_url}`}
                        alt="Blog"
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/50" />

                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-5xl mx-auto w-full px-6 pb-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm">
                                {blogdetails.category}
                            </span>

                            <h1 className="mt-4 text-4xl md:text-6xl font-bold text-white leading-tight">
                                {blogdetails.title}
                            </h1>

                            <div className="flex items-center gap-4 mt-4 text-white/80 text-sm">
                                <span>{formatBrazilDate(blogdetails.created_at)}</span>
                                <span>•</span>
                                <span>{blogdetails.readingminutes} min read</span>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="mx-auto px-6 py-16">
                    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">

                        {/* Author & Reviewer */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-gray-200 pb-8 mb-8">

                            {/* Author */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blogdetails.writerimage}`}
                                    alt="Author"
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>
                                    <p className="text-sm text-gray-500">Written by</p>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {blogdetails.writername}
                                    </h3>
                                </div>
                            </div>

                            {/* Reviewer */}
                            <div className="flex items-center gap-4">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blogdetails.reviewerimage}`}
                                    alt="Reviewer"
                                    className="w-14 h-14 rounded-full object-cover"
                                />

                                <div>
                                    <p className="text-sm text-gray-500">Medically Reviewed By</p>
                                    <h3 className="font-semibold text-lg text-gray-900">
                                        {blogdetails.reviewername}
                                    </h3>

                                </div>
                            </div>

                        </div>

                        {/* Blog Content */}
                        <div className="prose prose-lg max-w-none">
                            <div dangerouslySetInnerHTML={{ __html: blogdetails.content }} />
                        </div>

                    </div>
                </section>


                
               <section className="mx-auto px-6 py-4">
  <div className="bg-white rounded-3xl shadow-lg p-8">

    <h2 className="text-2xl font-bold text-gray-900 mb-6">
      SEO Details
    </h2>

    <div className="space-y-6">

      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">
          Meta Title
        </p>
        <p className="text-lg font-semibold text-gray-900">
          {blogdetails.metatitle}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">
          Meta Keywords
        </p>
        <div className="flex flex-wrap gap-2">
          {blogdetails.metakeywords
            ?.split(",")
            .filter(Boolean)
            .map((keyword, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
              >
                {keyword.trim()}
              </span>
            ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">
          Meta Description
        </p>
        <p className="text-gray-700 leading-relaxed">
          {blogdetails.metadescription}
        </p>
      </div>

    </div>

  </div>
</section>

<section className="mx-auto px-6 py-4">
  {(blogdetails.ogurl ||
    blogdetails.ogtype ||
    blogdetails.publisher ||
    blogdetails.ogimageurl) && (
    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">

      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Open Graph Details
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {blogdetails.ogurl && (
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm font-medium text-gray-500 mb-2">
              OG URL
            </p>
            <p className="text-gray-900 break-all">
              {blogdetails.ogurl}
            </p>
          </div>
        )}

        {blogdetails.ogtype && (
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm font-medium text-gray-500 mb-2">
              OG Type
            </p>
            <span className="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              {blogdetails.ogtype}
            </span>
          </div>
        )}

        {blogdetails.publisher && (
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm font-medium text-gray-500 mb-2">
              Publisher
            </p>
            <p className="text-gray-900">
              {blogdetails.publisher}
            </p>
          </div>
        )}

        {blogdetails.ogimageurl && (
          <div className="bg-gray-50 rounded-2xl p-5">
            <p className="text-sm font-medium text-gray-500 mb-4">
              OG Image
            </p>

            <img
              src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blogdetails.ogimageurl}`}
              alt="OG Image"
              className="w-full h-56 object-cover rounded-xl border"
            />
          </div>
        )}

      </div>
    </div>
  )}
</section>

{blogdetails.se_structure && (
  <section className="mx-auto px-6 py-4">
    <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">

      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Structured Data (JSON-LD)
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">Schema Type</p>
          <p className="font-semibold">
            {blogdetails.se_structure["@type"]}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">Context</p>
          <p className="font-semibold break-all">
            {blogdetails.se_structure["@context"]}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">Name</p>
          <p className="font-semibold">
            {blogdetails.se_structure.name}
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-5">
          <p className="text-sm text-gray-500 mb-1">URL</p>
          <p className="font-semibold break-all">
            {blogdetails.se_structure.url}
          </p>
        </div>

      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-4">
          Complete JSON-LD
        </h3>

        <pre className="bg-slate-900 text-slate-100 rounded-2xl p-6 overflow-x-auto text-sm">
          <code>
            {JSON.stringify(blogdetails.se_structure, null, 2)}
          </code>
        </pre>
      </div>

    </div>
  </section>
)}

            </div>



        </ComponentCard>

    
    </>);
}