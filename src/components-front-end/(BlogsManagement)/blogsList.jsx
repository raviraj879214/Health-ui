"use client";

import { formatBrazilDate } from "@/lib/formatDate";
import React, { useEffect, useState } from "react";

export function BlogsList() {
  const [latestPosts,setLatestPosts] = useState([]);

  const latestPostsdd = [
    {
      id: 1,
      title: "Average Cost Of Surrogacy In 2026: Complete Breakdown For Intended Parents",
      image: "http://localhost:8000/v1/uploads?filepath=blogs/7abf004dfcbb0f779b6ca4f1707fa439.png",
      slug: "average-cost-of-surrogacy",
      publishedDate: "2026-06-04",
    },
    {
      id: 2,
      title: "What Is Surrogacy and How Much Does Surrogacy Cost in 2026?",
      image: "http://localhost:8000/v1/uploads?filepath=blogs/7abf004dfcbb0f779b6ca4f1707fa439.png",
      slug: "what-is-surrogacy",
      publishedDate: "2026-06-04",
    },
    {
      id: 3,
      title: "Factors That Affect Single Frozen Embryo Transfer Success Rates",
      image: "http://localhost:8000/v1/uploads?filepath=blogs/7abf004dfcbb0f779b6ca4f1707fa439.png",
      slug: "frozen-embryo-transfer",
      publishedDate: "2026-06-01",
    },
  ];

  const [posts,setPosts] = useState([]);

  const postsdd = [
    {
      id: 1,
      image: "http://localhost:8000/v1/uploads?filepath=blogs/7abf004dfcbb0f779b6ca4f1707fa439.png",
      date: "2026-06-04",
      slug: "what-is-surrogacy",
      title: "What Is Surrogacy and How Much Does Surrogacy Cost in 2026?",
      description:
        "Surrogacy is a family-building process in which a woman carries and gives birth to a child for intended parents...",
    },
  ];


  const [bloglist,setBlogList] = useState([]);


  useEffect(() => {
    fetchblogs();
  }, []);


  const fetchblogs = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-blogs`,{
      method : "Get"
    });

    if(res.ok){
      const result =await res.json();

      const latestBlog = result.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
      setBlogList(latestBlog);


      const blogData = result.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).map((item, index) => ({
        id: item.id,
        image: `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${item.image_url}`,
        date: item.created_at,
        slug: `blogs/${item.titleurl}`,
        title: item.title,
        description: item.content.replace(/<[^>]+>/g, "").slice(0, 90) + "...",
        category : item.category,
        readingminutes : item.readingminutes
      }));

      const latestData = [...result.data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5).map((item) => ({
          id: item.id,
          title: item.title,
          image: `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${item.image_url}`,
          slug: `blogs/${item.titleurl}`,
          publishedDate: item.created_at,}));


      setLatestPosts(latestData);
      setPosts(blogData);
    }
  }



  

  return (<>

  <section className="bg-gray-50 py-10 md:py-14 antialiased">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      
      {/* Featured Blog */}
      <main className="lg:col-span-8">
        <article className="space-y-6">

          {/* Banner */}
          <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
            <img
               src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${bloglist.image_url}`}
              alt="Medical surgery safety guide banner"
              className="
                h-[220px]
                sm:h-[320px]
                lg:h-[380px]
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.02]
              "
            />
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <span className="rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700">
              {bloglist.category}
            </span>

            <span>•</span>

            <time dateTime="2025-07-29">
             {formatBrazilDate(bloglist.created_at)}
            </time>

            <span>•</span>

            <span>{bloglist.readingminutes} min read</span>
          </div>

          {/* Title */}
          <h1 className="
            text-3xl
            lg:text-4xl
            font-black
            tracking-tight
            leading-tight
            text-gray-900">
            {bloglist.title}
          </h1>

        
              <p className="
                  max-w-3xl
                  text-base
                  lg:text-lg
                  leading-8
                  text-gray-600
                  line-clamp-3
                  ">
                <div dangerouslySetInnerHTML={{ __html: bloglist.content }} />
              </p>


        </article>
      </main>

      {/* Latest Posts */}
      <aside className="lg:col-span-4">
        <div className="sticky top-24">

          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">

            {/* Header */}
            <div className="border-b border-gray-100 px-6 py-5">
              <h2 className="text-xl font-bold text-gray-900">
                Latest Articles
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Fresh insights from our experts
              </p>
            </div>

            {/* Posts */}
            <div className="divide-y divide-gray-100">
              {latestPosts.map((post) => (
                <a
                  key={post.id}
                  href={`${post.slug}`}
                  className="group flex gap-4 p-4 transition hover:bg-gray-50"
                >
                  <div className="h-[72px] w-[72px] overflow-hidden rounded-2xl">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold leading-6 text-gray-900 transition group-hover:text-cyan-600">
                      {post.title}
                    </h3>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {formatBrazilDate(post.publishedDate)}
                      </span>

                      <svg
                        className="h-4 w-4 text-cyan-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Footer */}
            <div className="p-5 scroll-smooth">
              <a
                href="#all-articles"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gray-900
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-cyan-600
                "
              >
                View All Articles
              </a>
            </div>

          </div>

        </div>
      </aside>

    </div>
  </div>
</section>




<section className="bg-white py-16 md:py-20 antialiased scroll-mt-24" id="all-articles" >
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

      {posts.map((post) => (
        <article
          key={post.id}
          className="
            group
            overflow-hidden
            rounded-[32px]
            border
            border-gray-100
            bg-white
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-2
            hover:shadow-2xl
            hover:shadow-slate-200/50
          "
        >

          {/* Image */}
          <a
            href={`${post.slug}`}
            className="block overflow-hidden"
          >
            <img
              src={post.image}
              alt={post.title}
              className="
                h-56
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-105
              "
            />
          </a>

          {/* Content */}
          <div className="p-6">

            {/* Meta */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{formatBrazilDate(post.date)}</span>

              <span>•</span>

              <span>{post.readingminutes} min read</span>
            </div>

            {/* Title */}
            <a
              href={`/${post.slug}`}
              className="mt-4 flex items-start justify-between gap-4"
            >
              <h3
                className="
                  line-clamp-2
                  text-xl
                  font-bold
                  leading-snug
                  tracking-tight
                  text-slate-900
                  transition-colors
                  duration-300
                  group-hover:text-cyan-600
                "
              >
                {post.title}
              </h3>

              <div
                className="
                  shrink-0
                  rounded-full
                  bg-gray-50
                  p-2
                  transition-colors
                  duration-300
                  group-hover:bg-cyan-50
                "
              >
                <svg
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H9M17 7V15"
                  />
                </svg>
              </div>
            </a>

            {/* Description */}
            <p
              className="
                mt-4
                line-clamp-3
                text-base
                leading-7
                text-gray-600
              "
            >
              <div dangerouslySetInnerHTML={{ __html: post.description }}/>
            </p>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-between">

              <a
                href={`${post.slug}`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  text-cyan-600
                  transition
                  hover:text-cyan-700
                "
              >
                Read Article

                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>

              <button
                className="
                  rounded-full
                  bg-slate-50
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-gray-500
                "
              >
                {post.category}
              </button>

            </div>

          </div>

        </article>
      ))}

    </div>

  </div>
</section>



    
 </>);
}