


export  function AboutUs() {

  return (<>


    <div class="bg-white py-14 md:py-20">
      <div class="max-w-4xl mx-auto px-4 text-center">


        <div class="inline-block mb-4">
          <span class="text-xs tracking-widest uppercase bg-blue-50 text-blue-600 px-4 py-1 rounded-full">
            World-Class Expertise
          </span>
        </div>

        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          About Us
        </h1>

        <strong></strong>
        <p class="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
          We are a <strong>physician-led medical tourism platform in Brazil </strong>dedicated to connecting international patients—especially from the United States—with <strong>high-quality, affordable medical care in Brazil. </strong>
            <br></br>
          Founded by three experienced physicians—Dr. Bruno Clementi, Dr. Erick Okuma, and Dr. Thiago Lima Barreto—our mission is to make <strong>safe, world-class healthcare accessible to patients seeking treatment abroad. </strong>

        </p>


        <div class="flex flex-col sm:flex-row justify-center gap-4 hidden">

          <button class="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition">
            Our Approach
          </button>

          <button class="border border-blue-500 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition">
            Contact Support
          </button>

        </div>

      </div>
    </div>

    
<section className="bg-gray-50 py-16 md:py-24">
  <div className="max-w-6xl mx-auto px-4">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
        Comprehensive Medical Care In Brazil
      </h2>

      <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6">
        While Brazil is globally recognized for{" "}
        <strong>plastic and cosmetic surgery,</strong> our network extends far
        beyond aesthetics.
      </p>

      <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
        Every partner is vetted to ensure{" "}
        <strong>
          international standards of safety, technology, and medical expertise.
        </strong>
      </p>
    </div>

    {/* Medical Areas */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">

      {[
        "Plastic & Cosmetic Surgery",
        "Fertility Treatments (IVF and reproductive medicine)",
        "Orthopedic Surgery and Sports Medicine",
        "Dental Procedures and Full Smile Rehabilitation",
      ].map((item, index) => (
        <div
          key={index}
          className="
            group bg-white border border-gray-200
            rounded-2xl p-6
            transition-all duration-300
            hover:shadow-lg hover:-translate-y-1
          "
        >
          <div className="flex items-start gap-4">

            {/* Standard Checkmark Icon */}
            <div className="
              w-10 h-10 rounded-full
              bg-green-100
              flex items-center justify-center
              shrink-0
            ">
              <svg
                className="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            {/* Text */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 leading-snug">
                {item}
              </h3>
            </div>
          </div>
        </div>
      ))}

      {/* More Areas */}
      <div className="sm:col-span-2 hidden">
        <div className="
          bg-white border border-dashed border-gray-300
          rounded-2xl p-6
        ">
          <div className="flex items-center gap-4">

            <div className="
              w-10 h-10 rounded-full
              bg-blue-100
              flex items-center justify-center
              shrink-0
            ">
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>

            <span className="text-lg font-semibold text-gray-800">
              And many more Medical Areas of expertise…
            </span>
          </div>
        </div>
      </div>

    </div>

    {/* Bottom Badge */}
    <div className="mt-14 flex justify-center">
      <div className="
        flex items-center gap-3
        bg-white border border-gray-200
        rounded-full px-6 py-4
        shadow-sm
        text-sm md:text-base text-gray-700
      ">

        <div className="
          w-7 h-7 rounded-full
          bg-green-100
          flex items-center justify-center
        ">
          <svg
            className="w-4 h-4 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <span className="font-medium">
          Vetted for international standards of safety & expertise
        </span>
      </div>
    </div>

  </div>
</section>

    <div class="bg-white-100 py-16 md:py-24">
      <div class="max-w-6xl mx-auto px-4 text-center">


        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Why Patients Choose Brazil
        </h2>


        <p class="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-14">
          Brazil has become a leading destination for <strong>medical tourism, offering: </strong>
        </p>


        <div class="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-10 mb-16">


          <div>
            <div class="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 8c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z"></path>
                <path d="M12 2v4M12 18v4"></path>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900">60%+</h3>
            <p class="text-xs tracking-widest text-gray-400 mt-1">LOWER COSTS</p>
            <p class="text-gray-500 text-sm mt-2">Compared to USA/UK prices</p>
          </div>


          <div>
            <div class="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 15l-3.5 2 1-4L6 10l4-.5L12 6l2 3.5 4 .5-3.5 3 1 4z"></path>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900">Top-Tier</h3>
            <p class="text-xs tracking-widest text-gray-400 mt-1">SPECIALISTS</p>
            <p class="text-gray-500 text-sm mt-2">World-renowned experts</p>
          </div>


          <div>
            <div class="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18"></path>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900">Modern</h3>
            <p class="text-xs tracking-widest text-gray-400 mt-1">HOSPITALS</p>
            <p class="text-gray-500 text-sm mt-2">JCI accredited facilities</p>
          </div>


          <div>
            <div class="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-50">
              <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M12 6v6l4 2"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <h3 class="text-3xl font-bold text-gray-900">Fast</h3>
            <p class="text-xs tracking-widest text-gray-400 mt-1">ACCESS</p>
            <p class="text-gray-500 text-sm mt-2">Minimal wait times</p>
          </div>

        </div>


        <div class="relative max-w-4xl mx-auto">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl px-8 py-12 md:px-16 md:py-14 shadow-md relative overflow-hidden">


            <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3"></div>

            <p class="text-lg md:text-xl italic leading-relaxed">
              “Patients benefit from premium medical care at a fraction of the cost, without compromising quality.”
            </p>

            <div class="w-12 h-1 bg-red-400 mx-auto mt-6 rounded"></div>
          </div>
        </div>

      </div>
    </div>
    
    <section className="bg-white py-20 md:py-28">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
        A Seamless Medical Travel Experience
      </h2>
      <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
        We provide end-to-end coordination for international patients,
        including:
      </p>
    </div>
    {/* Features */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-lg">
        <span className="text-5xl font-bold text-gray-200">01</span>
        <h3 className="mt-5 text-2xl font-semibold text-gray-900">
          Personalized treatment planning
        </h3>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-lg">
        <span className="text-5xl font-bold text-gray-200">02</span>
        <h3 className="mt-5 text-2xl font-semibold text-gray-900">
          Direct connection with specialists
        </h3>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-lg">
        <span className="text-5xl font-bold text-gray-200">03</span>
        <h3 className="mt-5 text-2xl font-semibold text-gray-900">
          Travel and accommodation guidance
        </h3>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-gray-50 p-8 transition-all duration-300 hover:bg-white hover:shadow-lg">
        <span className="text-5xl font-bold text-gray-200">04</span>
        <h3 className="mt-5 text-2xl font-semibold text-gray-900">
          Pre- and post-operative support
        </h3>
      </div>
    </div>
    {/* Bottom Text */}
    <div className="mt-16 rounded-3xl bg-gray-900 px-8 py-10 text-center">
      <p className="text-xl md:text-2xl font-medium leading-9 text-white">
        Our goal is to make your medical journey to Brazil safe, organized, and
        stress-free.
      </p>
    </div>
  </div>
</section>




    <div className="relative bg-[#f4f7fb] py-20 overflow-hidden">
      {/* angled background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#e6eef5] skew-x-[-12deg] origin-top-right" />
      <div className="relative max-w-5xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-sky-500 uppercase mb-2">
            Our Board of Directors
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            The Visionaries
          </h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto">
            Decades of surgical precision and clinical innovation meeting to
            redefine global patient care.
          </p>
        </div>
        {/* Doctor 1 */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHLLao8dUarsHY7SUlphUzoxx25KqHaEzc0q9XzLfp7e-cqskJAyXGQ5go_YIVdWFtQbX4hB9PeoiLZR_DIkvugNptGcHfgHX-ArOsLmfF5VjteviF7SFmlxVLvxQVzCxo7SMc5FYUsnWhPodgfCj0Fxy7cUVJk0Gl5oaUg_80pHtd38mMj2v9nLnFCmjD_XBFvc5ffvV5iq8J8u_ymQEkqOAdENJ-dBVvOpPH-PaxCxSCO-8cHt5ai6graw3BlGCW86uz6elpOlQ"
              className="w-64 h-80 object-cover rounded-xl shadow-md border border-gray-200"
            />
          </div>
          {/* Content */}
          <div>
            <span className="text-xs bg-sky-100 text-sky-600 px-3 py-1 rounded-full">
              Plastic Surgeon
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              Dr. Bruno Clementi
            </h3>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
              Distinguished member of the Brazilian Society of Plastic Surgery with
              over 15 years of surgical excellence. Known for precision and patient
              safety.
            </p>
            <div className="flex gap-8 mt-6 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-800">
                  Surgical Reconstruction
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Member of BSPS</p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sky-600 mt-6 text-sm font-medium"
            >
              Explore Full Profile →
            </a>
          </div>
        </div>
        {/* Doctor 2 (reverse) */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-20">
          {/* Content */}
          <div className="md:order-1 order-2">
            <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
              Fertility Specialist
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              Dr. Erick Okuma
            </h3>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
              A pioneer in advanced IVF protocols and reproductive genetics,
              delivering innovative fertility treatments worldwide.
            </p>
            <div className="flex gap-8 mt-6 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-800">
                  Advanced IVF Protocols
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Genetic Screening</p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sky-600 mt-6 text-sm font-medium"
            >
              Explore Full Profile →
            </a>
          </div>
          {/* Image */}
          <div className="flex justify-center md:order-2 order-1">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHLLao8dUarsHY7SUlphUzoxx25KqHaEzc0q9XzLfp7e-cqskJAyXGQ5go_YIVdWFtQbX4hB9PeoiLZR_DIkvugNptGcHfgHX-ArOsLmfF5VjteviF7SFmlxVLvxQVzCxo7SMc5FYUsnWhPodgfCj0Fxy7cUVJk0Gl5oaUg_80pHtd38mMj2v9nLnFCmjD_XBFvc5ffvV5iq8J8u_ymQEkqOAdENJ-dBVvOpPH-PaxCxSCO-8cHt5ai6graw3BlGCW86uz6elpOlQ"
              className="w-64 h-80 object-cover rounded-xl shadow-md border border-gray-200 ring-4 ring-pink-100"
            />
          </div>
        </div>
        {/* Doctor 3 */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="flex justify-center">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHLLao8dUarsHY7SUlphUzoxx25KqHaEzc0q9XzLfp7e-cqskJAyXGQ5go_YIVdWFtQbX4hB9PeoiLZR_DIkvugNptGcHfgHX-ArOsLmfF5VjteviF7SFmlxVLvxQVzCxo7SMc5FYUsnWhPodgfCj0Fxy7cUVJk0Gl5oaUg_80pHtd38mMj2v9nLnFCmjD_XBFvc5ffvV5iq8J8u_ymQEkqOAdENJ-dBVvOpPH-PaxCxSCO-8cHt5ai6graw3BlGCW86uz6elpOlQ"
              className="w-64 h-80 object-cover rounded-xl shadow-md border border-gray-200"
            />
          </div>
          {/* Content */}
          <div>
            <span className="text-xs bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full">
              Orthopedic Surgeon
            </span>
            <h3 className="text-2xl font-bold text-gray-900 mt-4">
              Dr. Thiago Lima
            </h3>
            <p className="text-gray-500 mt-4 text-sm leading-relaxed">
              Globally recognized for minimally invasive orthopedic surgery and
              sports medicine, helping elite athletes recover faster.
            </p>
            <div className="flex gap-8 mt-6 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-gray-800">5,000+ Surgeries</p>
              </div>
              <div>
                <p className="font-semibold text-gray-800">Sports Medicine</p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sky-600 mt-6 text-sm font-medium"
            >
              Explore Full Profile →
            </a>
          </div>
        </div>
      </div>
    </div>

    <div className="font-sans antialiased bg-white hidden">
      {/* How It Works Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">How It Works</h2>
          <p className="text-slate-500 text-sm mb-20">
            A seamless, end-to-end medical travel experience coordinated by experts.
          </p>

          <div className="relative">
            {/* Dashed Connector Line */}
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] border-t border-dashed border-slate-200 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-12 relative z-10">
              {/* Step 01 */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
                  </div>
                  <div className="absolute -top-2 -right-3 w-7 h-7 bg-[#38bdf8] text-white text-[10px] font-bold rounded-lg flex items-center justify-center border-2 border-white shadow-sm">01</div>
                </div>
                <h4 className="mt-6 text-[13px] font-bold text-slate-800">Personalized Planning</h4>
                <p className="text-[11px] text-slate-400 mt-2 max-w-[170px] leading-relaxed">
                  Tailored clinical roadmaps based on your unique health requirements.
                </p>
              </div>

              {/* Step 02 */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="m10 8 5 2.5-5 2.5z" /></svg>
                  </div>
                  <div className="absolute -top-2 -right-3 w-7 h-7 bg-[#38bdf8] text-white text-[10px] font-bold rounded-lg flex items-center justify-center border-2 border-white shadow-sm">02</div>
                </div>
                <h4 className="mt-6 text-[13px] font-bold text-slate-800">Direct Connections</h4>
                <p className="text-[11px] text-slate-400 mt-2 max-w-[170px] leading-relaxed">
                  Consult directly with world-class surgeons and specialists before you travel.
                </p>
              </div>

              {/* Step 03 */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /><path d="m15 15 3-3-3-3" /></svg>
                  </div>
                  <div className="absolute -top-2 -right-3 w-7 h-7 bg-[#38bdf8] text-white text-[10px] font-bold rounded-lg flex items-center justify-center border-2 border-white shadow-sm">03</div>
                </div>
                <h4 className="mt-6 text-[13px] font-bold text-slate-800">Travel Guidance</h4>
                <p className="text-[11px] text-slate-400 mt-2 max-w-[170px] leading-relaxed">
                  Concierge support for your stay in Brazil's most comfortable locations.
                </p>
              </div>

              {/* Step 04 */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 12c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Z" /><path d="m15 15 3.5 3.5a2.12 2.12 0 0 1-3 3L12 18l-3.5 3.5a2.12 2.12 0 0 1-3-3L9 15l-3.5-3.5a2.12 2.12 0 0 1 3-3L12 12l3.5-3.5a2.12 2.12 0 0 1 3 3L15 15Z" /></svg>
                  </div>
                  <div className="absolute -top-2 -right-3 w-7 h-7 bg-[#38bdf8] text-white text-[10px] font-bold rounded-lg flex items-center justify-center border-2 border-white shadow-sm">04</div>
                </div>
                <h4 className="mt-6 text-[13px] font-bold text-slate-800">Recovery Support</h4>
                <p className="text-[11px] text-slate-400 mt-2 max-w-[170px] leading-relaxed">
                  Continuous care monitoring throughout your recovery and journey home.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
            <div className="relative bg-[#f8fafc] rounded-r-xl py-6 px-12 max-w-2xl border-l-4 border-[#38bdf8]">
              <p className="text-[#38bdf8] font-medium italic text-base sm:text-lg leading-relaxed text-center">
                "Our goal is to make your medical journey to Brazil safe, organized, and stress-free."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment Section */}
      <section className="bg-[#f8fafc] py-24 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-sm font-bold text-slate-900 mb-3 tracking-widest uppercase">Our Commitment</h2>

          <p>As a<strong> doctor-founded platform,</strong> every recommendation is guided by medical expertise and patient safety. </p>
          <div className="w-8 h-[2px] bg-red-400 mx-auto mb-14" />

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#ecfdf5] flex items-center justify-center mb-6">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M12 8v8" /><path d="M8 12h8" /></svg>
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-2">Safe & Ethical Care</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">

              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#eff6ff] flex items-center justify-center mb-6">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /><path d="M7 15h.01" /><path d="M11 15h.01" /></svg>
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-2">Transparent Pricing</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">

              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-xl bg-[#fef2f2] flex items-center justify-center mb-6">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2"><path d="M4 14v-3a8 8 0 1 1 16 0v3" /><path d="M18 19c0 1.1-.9 2-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" /><path d="M7 14H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2Z" /></svg>
              </div>
              <h4 className="text-[13px] font-bold text-slate-900 mb-2">Personalized Support</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">

              </p>
            </div>
          </div>

        </div>
      </section>
    </div>




<section className="bg-gray-50 py-20 md:py-28">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Heading */}
    <div className="text-center">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-tight">
        🤝 Our Commitment
      </h2>
      <p className="mt-6 text-lg md:text-xl leading-8 text-gray-600 max-w-3xl mx-auto">
        We are committed to delivering:
      </p>
    </div>
    {/* Commitment Cards */}
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
        <span className="text-5xl font-bold text-gray-200">01</span>
        <h3 className="mt-5 text-2xl font-semibold text-gray-900">
          Safe and ethical medical care
        </h3>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
        <span className="text-5xl font-bold text-gray-200">02</span>
        <h3 className="mt-5 text-2xl font-semibold text-gray-900">
          Transparent communication and pricing
        </h3>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:shadow-lg">
        <span className="text-5xl font-bold text-gray-200">03</span>
        <h3 className="mt-5 text-2xl font-semibold text-gray-900">
          Personalized patient support
        </h3>
      </div>
    </div>
    {/* Bottom Statement */}
    <div className="mt-16 rounded-3xl bg-gray-900 px-8 py-10 text-center">
      <p className="text-xl md:text-2xl font-medium leading-9 text-white">
        As a doctor-founded platform, every recommendation is guided by medical
        expertise and patient safety.
      </p>
    </div>
  </div>
</section>



    <div className="bg-[#3da0d8] py-24 text-center text-white">
      <div className="max-w-3xl mx-auto px-6 flex flex-col items-center">

        {/* SVG Star Container */}
        <div className="mb-8 flex justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm"
          >
            <path
              d="M50 0L65.45 31.22L100 36.33L75 60.78L80.9 95L50 78.78L19.1 95L25 60.78L0 36.33L34.55 31.22L50 0ZM50 25.1L40.75 43.83L20 46.88L35 61.54L31.46 82.04L50 72.33L68.54 82.04L65 61.54L80 46.88L59.25 43.83L50 25.1Z"
              fill="#a0e2ff"
              fillRule="evenodd"
            />
          </svg>
        </div>

        {/* Typography */}
        <h2 className="text-2xl font-bold mb-4 tracking-tight">Our Mission</h2>
        <p className="text-base text-blue-50/90 leading-relaxed mb-10 max-w-2xl">
          To become a trusted leader in medical tourism in Brazil, helping
          international patients access affordable, high-quality healthcare abroad
          with confidence and peace of mind.
        </p>

        {/* CTA Button */}
        <button className="bg-[#f87171] hover:bg-[#ef4444] text-white text-[13px] px-8 py-3.5 rounded-full font-bold uppercase tracking-wider transition-all shadow-md active:scale-95">
          Get Started Today
        </button>

        {/* Trust Badge */}
        <div className="mt-8 flex items-center gap-2 text-xs font-medium text-blue-100/80">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Trusted by international patients
        </div>
      </div>
    </div>



  </>);
}


