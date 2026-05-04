



export  function WhyBrazil(){

const services = [
    { title: "Post-operative Nursing Care", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { title: "Citizenship by Birth Support", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Insurance Navigation", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
    { title: "Flight & Logistics Planning", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" },
    { title: "Visa & Legal Assistance", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
    { title: "Medical Translation Services", icon: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 11.37 9.19 15.624 5 18" },
  ];


  const benefits = [
    "50% to 80% Cost Savings vs. United States",
    "JCI-Accredited Hospitals & Clinics",
    "Physician-Led Clinical Supervision",
    "Access to World-Renowned Specialists",
    "State-of-the-art Medical Technology",
    "Premium Post-Op Recovery Experiences",
  ];



    return(<>

        <section className="bg-gray-50 py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
                {/* Top Center Content */}
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-xs tracking-widest uppercase bg-blue-50 text-blue-600 px-4 py-1 rounded-full">
                        Medical Excellence in South America
                    </span>
                    <h1 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Why Brazil for <br></br>
                        <span className="text-blue-600">Medical Tourism?</span>
                    </h1>
                    <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                        Brazil has emerged as a premier global hub for healthcare, combining
                        rigorous clinical standards with groundbreaking innovation. Through our
                        physician-guided platform, we bridge the gap between international
                        patients and Brazil's elite medical infrastructure.
                    </p>
                </div>
                {/* Bottom Section */}
                <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
                    {/* Left Content */}
                    <div>
                        <p className="text-xs tracking-widest uppercase text-red-500 mb-3">
                            Accredited Excellence
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                            World-Class Hospitals and Specialists
                        </h2>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Brazil is home to some of the most prestigious healthcare institutions
                            in the world. Many of our partner facilities are{" "}
                            <strong>JCI-accredited</strong>, maintaining the same safety protocols
                            and quality benchmarks as top-tier U.S. hospitals.
                        </p>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">✔</span>
                                Board-certified specialists with international fellowships.
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-blue-500 mt-1">✔</span>
                                State-of-the-art robotic surgery and diagnostic imaging.
                            </li>
                        </ul>
                    </div>
                    {/* Right Card */}
                    <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-blue-50 text-center p-4 rounded-xl">
                                <h3 className="text-2xl font-bold text-blue-600">450+</h3>
                                <p className="text-xs text-gray-500 mt-1">Hospitals</p>
                            </div>
                            <div className="bg-red-50 text-center p-4 rounded-xl">
                                <h3 className="text-2xl font-bold text-red-500">Top 5</h3>
                                <p className="text-xs text-gray-500 mt-1">Global Ranking</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 italic">
                            "The surgical expertise and nursing care I received in São Paulo
                            rivaled any top clinic in London or New York."
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="bg-white py-16 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Main Heading */}
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    A Global Leader in Medicine
                </h2>

                {/* Description Paragraph */}
                <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-12">
                    Brazil’s reputation for innovation is well-established, particularly in cardiology, oncology, and
                    aesthetic surgery. The country invests heavily in medical research and biotechnology, ensuring
                    that specialized professionals remain at the forefront of global clinical trends.
                </p>

                {/* Feature Grid - Matches the blue/red icon style in image */}
                <div className="flex flex-col md:flex-row gap-12">

                    {/* Clinical Innovation Item */}
                    <div className="flex gap-4 items-start max-w-sm">
                        <div className="bg-blue-50 p-3 rounded-lg flex-shrink-0">
                            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.282a2 2 0 01-1.806 0l-.628-.282a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.34.34a2 2 0 000 2.828l1.245 1.245A2 2 0 006.454 20h11.092a2 2 0 001.414-.586l1.245-1.245a2 2 0 000-2.828l-.34-.34z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 leading-tight">Clinical Innovation</h4>
                            <p className="text-gray-500 text-sm mt-1">
                                Pioneers in regenerative medicine and minimally invasive techniques.
                            </p>
                        </div>
                    </div>

                    {/* Specialized Talent Item */}
                    <div className="flex gap-4 items-start max-w-sm">
                        <div className="bg-red-50 p-3 rounded-lg flex-shrink-0">
                            <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 leading-tight">Specialized Talent</h4>
                            <p className="text-gray-500 text-sm mt-1">
                                A vast network of MDs with global training and multi-lingual capabilities.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <section className="bg-white py-20 px-6 font-sans">
            <div className="max-w-6xl mx-auto">

                {/* --- Top Dark Card --- */}
                <div className="bg-[#111827] rounded-3xl p-8 md:p-12 mb-20 flex flex-col md:flex-row gap-12 items-center overflow-hidden relative">
                    {/* Content Left */}
                    <div className="md:w-1/2 z-10">
                        <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-6">
                            Combine Medical Care with <br />
                            World-Class Travel
                        </h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Recovery is just as important as the procedure itself. Brazil offers a serene
                            environment for post-operative healing, allowing patients to rejuvenate
                            amidst breathtaking landscapes.
                        </p>

                        {/* Pill Tags */}
                        <div className="flex flex-wrap gap-3">
                            {["TROPICAL BEACHES", "IGUAÇU FALLS", "CULTURAL HUBS"].map((tag) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full border border-gray-700 text-[10px] font-bold tracking-widest text-gray-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial Box Right */}
                    <div className="md:w-1/2 w-full z-10">
                        <div className="bg-blue-900/20 border border-blue-500/30 backdrop-blur-sm rounded-2xl p-8">
                            <div className="flex items-center gap-3 mb-4 text-blue-400">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="font-semibold text-sm uppercase tracking-wider">Healing Environments</span>
                            </div>
                            <p className="text-gray-300 italic text-lg leading-relaxed">
                                "Being able to recover in a quiet, coastal setting significantly
                                reduced my stress levels and accelerated my recovery."
                            </p>
                        </div>
                    </div>

                    {/* Decorative Glow */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
                </div>

                {/* --- Bottom Process Section --- */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        A Structured and Physician-Guided Experience
                    </h2>
                    <p className="text-gray-500">
                        We don't just book appointments; we manage your entire clinical pathway.
                        Our platform is led by physicians who vet every hospital and doctor in our network.
                    </p>
                </div>

                {/* Three Column Features */}
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Vetted Access",
                            desc: "Only surgeons with verified outcomes and impeccable safety records are included.",
                            icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        },
                        {
                            title: "Personalized Planning",
                            desc: "Customized itineraries that align with your medical timeline and travel preferences.",
                            icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        },
                        {
                            title: "Continuity of Care",
                            desc: "Bridging communication between your home physician and your Brazilian surgical team.",
                            icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        }
                    ].map((item, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                            <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>

        <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
          Comprehensive Concierge Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="bg-white p-5 rounded-xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="flex-shrink-0">
                <svg 
                  className="w-5 h-5 text-red-500" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-800 tracking-tight">
                {service.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
        
    

    <section className="bg-gray-50 py-20 px-6 flex justify-center">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 md:p-10 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-10">
          Why Patients Choose Brazil
        </h3>

        <ul className="space-y-0">
          {benefits.map((text, index) => (
            <li 
              key={index} 
              className={`flex items-center gap-4 py-4 ${
                index !== benefits.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              {/* Custom Blue Checkmark Icon */}
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center">
                <svg 
                  className="w-3.5 h-3.5 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="3" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-semibold text-gray-800">
                {text}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex justify-center">
          <button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold py-3 px-8 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer">
            Start Your Medical Journey
          </button>
        </div>
      </div>
    </section>
    </>);
}