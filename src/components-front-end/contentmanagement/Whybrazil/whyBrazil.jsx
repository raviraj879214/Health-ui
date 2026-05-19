



export  function WhyBrazil(){

const services = [
  {
    title: "Post-operative care with qualified healthcare professionals ",
    icon: "M19 8h-1a3 3 0 00-2.83 2H14V9a2 2 0 00-2-2h-1V6a2 2 0 10-4 0v1H6a2 2 0 00-2 2v1H3a1 1 0 000 2h1v1a2 2 0 002 2h1v1a2 2 0 104 0v-1h1a2 2 0 002-2v-1h1a3 3 0 002.83 2H19a1 1 0 100-2z"
  },
  {
    title: "Assistance for patients traveling alone ",
    icon: "M17 20h5V4H2v16h5m10 0v-6a2 2 0 10-4 0v6m4 0H7"
  },
  {
    title: "Support related to citizenship by birth opportunities in Brazil ",
    icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.5 2.5 4 6 4 10s-1.5 7.5-4 10c-2.5-2.5-4-6-4-10s1.5-7.5 4-10z"
  },
  {
    title: "Guidance with international health insurance options ",
    icon: "M12 3l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z"
  },
  {
    title: "Assistance with flight planning and logistics ",
    icon: "M2 16l20-5-20-5v4l15 1-15 1v4z"
  },
  {
    title: "Support with visa requirements and documentation ",
    icon: "M9 12h6m-6 4h6M7 3h6l4 4v14H7a2 2 0 01-2-2V5a2 2 0 012-2z"
  }
];


  const benefits = [
    "Affordable, high-quality medical care",
    "Internationally recognized physicians",
    "Modern hospitals and infrastructure ",
    "Unique recovery and travel opportunities ",
    "Physician-led coordination and support ",
    "Access to premium additional services ",
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
              Brazil is one of the world’s leading destinations for medical tourism, attracting international patients—especially from the United States—seeking high-quality, affordable medical care abroad.
              Through our physician-led platform, patients gain access to carefully selected hospitals, experienced specialists, and a fully coordinated medical travel experience in Brazil.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">


            <div className="">
              <p className="text-xs tracking-widest uppercase text-blue-500 mb-3">
                Cost Advantage
              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Affordable Surgery Without Compromising Quality
              </h2>

              <p className="text-gray-600 mb-6 leading-relaxed">
                One of the main reasons patients choose Brazil is the{" "}
                <strong>significant cost advantage.</strong> Medical procedures can cost{" "}
                <strong>50% to 80% less</strong> than in the United States, while still offering:
              </p>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✔</span>
                  Advanced medical technology
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✔</span>
                  Highly trained physicians
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✔</span>
                  International standards of care
                </li>
              </ul>
            </div>


            <div className="bg-white shadow-lg rounded-2xl p-6 md:p-8">

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 text-center p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-blue-600">50–80%</h3>
                  <p className="text-xs text-gray-500 mt-1">Lower Cost</p>
                </div>

                <div className="bg-green-50 text-center p-4 rounded-xl">
                  <h3 className="text-2xl font-bold text-green-600">High</h3>
                  <p className="text-xs text-gray-500 mt-1">Quality Care</p>
                </div>
              </div>

              {/* Highlight Box */}
              <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 italic">
                This makes <strong>affordable surgery in Brazil</strong> a practical and safe alternative.
              </div>

            </div>

          </div>

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
                Brazil is home to <strong> top-tier hospitals and internationally recognized physicians,</strong> with modern infrastructure comparable to leading healthcare systems worldwide.
                Through our network, patients are connected with:
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✔</span>
                  Board-certified and highly experienced doctors
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✔</span>
                  Fully equipped, accredited medical facilities
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 mt-1">✔</span>
                  Professionals trained in advanced and up-to-date techniques
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
                We focus on quality, safety, and consistency, ensuring every patient receives care aligned with international standards.
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            A Global Leader in Medicine
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-10">
            Brazil has a long-standing reputation in the global medical community, particularly in
            <strong> high-volume, high-expertise specialties.</strong>
          </p>

          <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mb-12">
            Today, Brazil is recognized for delivering
            <strong> comprehensive, high-quality healthcare across multiple disciplines.</strong>
          </p>

          {/* Unified feature list */}
          <div className="grid md:grid-cols-3 gap-8 border-t pt-10">

            {[
              "Continuous innovation in medical techniques",
              "Highly specialized professionals",
              "Strong clinical outcomes across multiple fields"
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <p className="text-gray-800 font-medium leading-snug">
                  {text}
                </p>
              </div>
            ))}

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
                Choosing Brazil allows patients to combine medical treatment with a unique recovery experience.
              </p>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                This combination enhances both recovery and overall experience.
              </p>


            </div>


            <div className="md:w-1/2 w-full z-10">
              <div className="bg-blue-900/20 border border-blue-500/30 backdrop-blur-sm rounded-2xl p-8">

                {/* Header */}
                <div className="flex items-center gap-3 mb-6 text-blue-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="font-semibold text-sm uppercase tracking-wider">
                    Patients can recover while enjoying
                  </span>
                </div>

                {/* List */}
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-gray-300 italic text-lg leading-relaxed">
                    <span className="text-blue-500">✔</span>
                    <span>Beautiful beaches and coastal destinations</span>
                  </li>

                  <li className="flex items-start gap-3 text-gray-300 italic text-lg leading-relaxed">
                    <span className="text-blue-500">✔</span>
                    <span>Vibrant urban centers and cultural experiences</span>
                  </li>

                  <li className="flex items-start gap-3 text-gray-300 italic text-lg leading-relaxed">
                    <span className="text-blue-500">✔</span>
                    <span>
                      Natural wonders such as the Iguaçu Falls and the city of Foz do Iguaçu,
                      known for its excellent tourism infrastructure
                    </span>
                  </li>

                  <li className="flex items-start gap-3 text-gray-300 italic text-lg leading-relaxed">
                    <span className="text-blue-500">✔</span>
                    <span>Restful environments ideal for post-operative recovery</span>
                  </li>
                </ul>

              </div>
            </div>


            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
          </div>

          {/* --- Bottom Process Section --- */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A Structured and Physician-Guided Experience
            </h2>
            <p className="text-gray-500">
              Navigating healthcare abroad can be complex—but that’s where we come in.
            </p>
            <p className="text-gray-500">
              We deliver the organization, clarity, and reliability international patients need.
            </p>
          </div>


          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Direct access to vetted doctors and hospitals ",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              {
                title: "Personalized treatment planning led by experienced physicians ",
                icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              },
              {
                title: "Full coordination and continuous support throughout the journey ",
                icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 
        bg-gradient-to-br from-blue-100 to-blue-50 
        group-hover:from-blue-500 group-hover:to-indigo-500 transition-all duration-300">

                  <svg
                    className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>

                {/* Title */}
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h4>

                {/* Optional subtle line */}
                <div className="mt-4 h-1 w-10 bg-blue-500 rounded-full opacity-70 group-hover:w-16 transition-all duration-300"></div>

              </div>
            ))}

          </div>

        </div>

      </section>

     <section className="bg-gray-50 py-24 px-6">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-14">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Additional Services for International Patients
      </h2>

      <p className="text-gray-600 text-base leading-relaxed">
        To enhance your experience, we offer additional services designed for comfort,
        safety, and convenience from start to finish.
      </p>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {services.map((service, index) => (
        <a
          key={index}
          href={service.href}
          className="group bg-white border border-gray-100 rounded-2xl p-6 flex items-center gap-4
                     transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gray-200"
        >

          {/* Icon */}
          <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center
                          group-hover:bg-blue-50 transition">
            <svg
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
            </svg>
          </div>

          {/* Title */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-gray-900">
              {service.title}
            </h3>
          </div>

          {/* Subtle indicator (NOT link-like) */}
          <div className="opacity-0 group-hover:opacity-100 transition">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          </div>

        </a>
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
                className={`flex items-center gap-4 py-4 ${index !== benefits.length - 1 ? "border-b border-gray-50" : ""
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

          {/* <div className="mt-10 flex justify-center">
          <button className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white text-xs font-bold py-3 px-8 rounded-xl shadow-md transition-all active:scale-95 cursor-pointer">
            Start Your Medical Journey
          </button>
        </div> */}
        </div>
      </section>
    </>);
}