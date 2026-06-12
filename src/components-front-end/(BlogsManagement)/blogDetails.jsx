


export function BlogDetails(){


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
                                How to Get Surgery Abroad Without Getting Scammed: 7 Red Flags You Must Know
                            </a>
                        </li>
                    </ol>
                </nav>



                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">

                    {/* Featured Blog */}
                    <main className="lg:col-span-8">
                        <article className="space-y-6">

                            {/* Banner */}
                            <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-lg">
                                <img
                                    src="http://localhost:8000/v1/uploads?filepath=blogs/7abf004dfcbb0f779b6ca4f1707fa439.png"
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
                                    Patient Safety
                                </span>

                                <span>•</span>

                                <time dateTime="2025-07-29">
                                    July 29, 2025
                                </time>

                                <span>•</span>

                                <span>6 min read</span>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm">

                                <div className="flex items-center gap-2 rounded-full bg-cyan-50 px-3 py-2">
                                    <img
                                        src="https://api.itravelforhealth.com/v1/uploads?filepath=doctors/profilepicture/2132d2b1c81dd99296d0aeefcf3b82f7.jpeg"
                                        className="h-8 w-8 rounded-full object-cover"
                                        alt=""
                                    />

                                    <span className="text-gray-500">Writer:</span>

                                    <span className="font-semibold text-cyan-700">
                                        Aaleya Sanyal Talapatra
                                    </span>
                                </div>

                                <span className="text-gray-300">•</span>

                                <div className="flex items-center gap-2 rounded-full bg-violet-50 px-3 py-2">
                                    <img
                                        src="https://api.itravelforhealth.com/v1/uploads?filepath=doctors/profilepicture/2132d2b1c81dd99296d0aeefcf3b82f7.jpeg"
                                        className="h-8 w-8 rounded-full object-cover"
                                        alt=""
                                    />

                                    <span className="text-gray-500">
                                        Reviewed by:
                                    </span>

                                    <span className="font-semibold text-violet-700">
                                        Dr. Mohamad El Chami, M.D.
                                    </span>
                                </div>

                                <span className="text-gray-300">•</span>

                                <div className="rounded-full bg-gray-100 px-3 py-2">
                                    <span className="text-gray-500">
                                        Updated:
                                    </span>

                                    <span className="ml-1 font-semibold text-gray-800">
                                        June 4, 2026
                                    </span>
                                </div>

                            </div>  
                            

                            {/* Title */}
                            <h1 className="
                                text-3xl
                                lg:text-4xl
                                font-black
                                tracking-tight
                                leading-tight
                                text-gray-900
                            ">
                                How to Get Surgery Abroad Without Getting Scammed:{" "}
                                <span className="bg-gradient-to-r from-cyan-600 to-sky-600 bg-clip-text text-transparent">
                                    7 Red Flags You Must Know
                                </span>
                            </h1>

                            {/* Description */}
                            <p className="
            max-w-3xl
            text-base
            lg:text-lg
            leading-8
            text-gray-600
          ">
                                Across the globe, surrogacy has become an easy and legally defined path to becoming parents with a complete genetic connection. It has made the dream of thousands of people possible, including couples, single parents, and LGBTQ+ couples/families. But the average cost of surrogacy and the factors influencing it have become one of the biggest concerns for intended parents today. Due to advanced treatments, strict legal protections, compensation for the surrogate, and insurance coverage, the average cost of surrogacy continues to rise in 2026.
                        <br></br>
                                Depending on the geographic location, agency, and requirements for the IVF, the average cost of surrogacy fluctuates from moderate to extremely high. If a donor is required, expenses can be even higher. Due to strong legal protection, high-end medical standards, and high success rates, parents are choosing the US despite its expenses. This guide explains the complete breakdown of surrogacy expenses, risks, timelines, financing options, and how to budget effectively for your journey.
                            </p>
                        </article>
                    </main>


                    <aside className="lg:col-span-4">
                        <div className="sticky top-24">

                            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-cyan-600 via-sky-600 to-blue-700 p-8 text-white shadow-2xl">

                                {/* Decorative Blur */}
                                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                                <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

                                {/* Icon */}
                                <div className="relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                                    <svg
                                        className="h-8 w-8"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                                        />
                                    </svg>
                                </div>

                                {/* Content */}
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
                                        hover:bg-white/15
                                    "
                                    >
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