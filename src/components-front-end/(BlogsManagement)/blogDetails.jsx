import { formatBrazilDate } from "@/lib/formatDate";



export function BlogDetails({blog}){


    return(<>
        
        <section className="bg-gray-50 py-10 md:py-14 antialiased">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol
                        className="flex items-center gap-3 text-base"
                        style={{
                            listStyle: "none",
                            margin: 0,
                            padding: 0,
                        }}>
                        <li>
                            <a href="/" className="text-gray-400 hover:text-white">
                                Home
                            </a>
                        </li>
                        <li className="list-none text-gray-500">&gt;</li>
                        <li>
                            <a href="/blogs" className="text-gray-400 hover:text-white">
                                Blogs
                            </a>
                        </li>
                        <li className="list-none text-gray-500">&gt;</li>
                        <li>
                            <a href="/blogs" className="text-gray-400 hover:text-white">
                               {blog.title}
                            </a>
                        </li>
                    </ol>
                </nav>



                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
                    <main className="lg:col-span-8">
                        <article className="space-y-6">

                            {/* Banner */}
                            <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
                                <img
                                
                                
                                
                                    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blog.image_url}`}
                                    alt="Medical surgery safety guide banner"
                                    className="
                                    h-[220px]
                                    sm:h-[320px]
                                    lg:h-[380px]
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-700
                                    group-hover:scale-[1.02]"
                                />
                            </div>

                           
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                <span className="rounded-full bg-cyan-50 px-3 py-1 font-semibold text-cyan-700">
                                    {blog.category}
                                </span>
                                <span>•</span>
                                <time dateTime="2025-07-29">
                                    {formatBrazilDate(blog.created_at)}
                                </time>
                                <span>•</span>
                                <span>{blog.readingminutes} min read</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm">
                                <div className="flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-2">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blog.writerimage}`}

                                        className="h-8 w-8 rounded-full object-cover"
                                        alt=""/>
                                    <span className="text-gray-500">Writer:</span>
                                    <span className="font-semibold text-cyan-700">
                                        {blog.writername}
                                    </span>
                                </div>

                                <span className="text-gray-300">•</span>
                                <div className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-2">
                                    <img
                                        src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=blogs/${blog.reviewerimage}`}
                                        className="h-8 w-8 rounded-full object-cover"
                                        alt=""/>

                                    <span className="text-gray-500">
                                        Reviewed by: 
                                    </span>

                                    <span className="font-semibold text-violet-700">
                                        {blog.reviewername}
                                    </span>
                                </div>
                                <span className="text-gray-300">•</span>
                                <div className="rounded-full bg-gray-100 px-3 py-2">
                                    <span className="text-gray-500">
                                        Updated:
                                    </span>
                                    <span className="ml-1 font-semibold text-gray-800">
                                        {formatBrazilDate(blog.updated_at)}
                                    </span>
                                </div>
                            </div>

                            <h1 className="
                                text-3xl
                                lg:text-4xl
                                font-black
                                tracking-tight
                                leading-tight
                                text-gray-900">
                               {blog.title}
                            </h1>

                            
                              
                            <div
                                className="
                                        max-w-3xl
                                        text-base
                                        lg:text-lg
                                        leading-8
                                        text-gray-600
                                        
                                    ">
                                        
                                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                            </div>
                        </article>
                    </main>


                    <aside className="lg:col-span-4">
                        <div className="sticky top-24">
                            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 p-8 text-white shadow-2xl">
                                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/5 blur-3xl" />
                                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                                        />
                                    </svg>
                                </div>

                                <div className="relative z-10">
                                    <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                                        Free Assistance
                                    </span>

                                    <h2 className="mt-5 text-3xl font-black leading-tight tracking-tight">
                                        Help Me Plan
                                        <br />
                                        My Treatment Abroad
                                    </h2>
                                    <p className="mt-5 text-sm leading-7 text-white/90">
                                        End-to-end treatment planning specifically curated to your needs.
                                        Connect with our experts and get guidance on hospitals,
                                        doctors, costs, visas, and travel arrangements.
                                    </p>
                                </div>

                                <div className="relative z-10 mt-8 space-y-3">



                                    <a
                                        href="tel:+919999999999"
                                        className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        border
                                        border-white/30
                                        bg-white/10
                                        px-5
                                        py-4
                                        text-sm
                                        font-semibold
                                        backdrop-blur-sm
                                        transition
                                        hover:bg-white/15">
                                        📞 Just a Call Away
                                    </a>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    </>);
}