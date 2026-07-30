




export function Insurance(){
 const items = [
    "Access to specialized medical travel insurance ",
    "Carefully selected, high-quality coverage options ",
    "Protection against unexpected events ",
    "Seamless integration with your treatment journey ",
    "Peace of mind from start to finish",
  ];

    return(<>
    
        <div className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24">
            <div className="max-w-5xl mx-auto px-6">

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold tracking-widest uppercase mb-6">
                    <span className="w-4 h-4 flex items-center justify-center">
                        🛡️
                    </span>
                    Patient Protection Protocol
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                    Insurance –{" "}
                    <span className="text-blue-500">Protection</span>{" "}
                    for Your <br className="hidden md:block" />
                    Medical Journey
                </h1>


                <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg leading-relaxed max-w-3xl">
                    When traveling abroad for medical care, having the right insurance coverage is essential for <strong> peace of mind, financial protection, and a secure experience. </strong>

                    As part of our commitment to delivering a seamless and worry-free journey, we provide access to <strong> high-quality insurance solutions specifically designed for medical tourism. </strong>
                </p>

            </div>
        </div>

        <section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24 hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

        {/* LEFT CONTENT */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">
            Risk Management
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Insurance Tailored for <br />
            Medical Travel
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            We offer access to specialized insurance coverage for international
            patients, designed to support every stage of your journey.
          </p>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
            These solutions may include:
          </p>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li> Coverage for medical travel-related risks</li>
            <li> Protection against unexpected complications</li>
            <li> Travel disruptions and unforeseen events</li>
            <li> Additional security throughout your treatment and recovery</li>
          </ul>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-6">
            Our goal is to ensure that every patient travels with confidence,
            protection, and complete peace of mind.
          </p>
        </div>

        {/* RIGHT CARDS */}
        <div className="space-y-6">

          {/* Card 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="text-blue-500 text-xl">➕</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Medical Complications
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                  Dedicated coverage for unexpected clinical outcomes or extended hospital stays.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="text-blue-500 text-xl">✈️</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Travel Disruptions
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                  Protection against cancelled flights, lost documentation, or delays.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="text-blue-500 text-xl">🛡️</div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  Recovery Security
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                  Support for post-treatment recovery, extended stays, and special transport needs.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

      <section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24">
  <div className="max-w-6xl mx-auto px-6">

    {/* Wrapper Box */}
    <div className="bg-[#efebe9] dark:bg-slate-900 rounded-3xl p-10 md:p-16 text-center">

      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Medical Travel Insurance
      </h2>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12">
        We partner with trusted international insurance providers to offer our
        medical travelers specialized coverage designed for travel accidents,
        illness, and unexpected medical complications during their journey.
      </p>


      {/* Insurance Card */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700">

        {/* Logo */}
        <div className="mb-6">
          <img
            src="/images/gps-logo.png"
            alt="Global Protective Solutions"
            className="h-16 mx-auto object-contain"
          />
        </div>


        {/* Title */}
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Specialized International Travel Insurance
        </h3>


        {/* Text */}
        <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          Coverage designed specifically for international medical travelers,
          including travel accidents, illness, emergency assistance, and medical
          complications related to elective procedures abroad.
        </p>


        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

          <div className="bg-[#f5f2f1] dark:bg-slate-700 rounded-xl p-5">
            <div className="text-2xl mb-3">
              🛡️
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Medical Complications Coverage
            </h4>
          </div>


          <div className="bg-[#f5f2f1] dark:bg-slate-700 rounded-xl p-5">
            <div className="text-2xl mb-3">
              ✈️
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              Travel Accident & Illness Protection
            </h4>
          </div>


          <div className="bg-[#f5f2f1] dark:bg-slate-700 rounded-xl p-5">
            <div className="text-2xl mb-3">
              📞
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white">
              24/7 Emergency Assistance
            </h4>
          </div>

        </div>


        {/* Button */}
        <a
          href="https://www.globalprotectivesolutions.com/enroll/itfh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 transition-all"
        >
          Get Insurance Quote
        </a>

      </div>

    </div>

  </div>
</section>


    <section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">

        {/* Wrapper Box */}
        <div className="bg-[#efebe9] dark:bg-slate-900 rounded-3xl p-10 md:p-16 text-center">

          {/* Heading */}
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Carefully Selected Partnerships
          </h2>

          {/* Subtext */}
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
           We work with <strong>trusted partners in the international insurance market</strong> to offer our patients <strong>the best available solutions for medical travel coverage.</strong> 
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-left shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                🤝
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Absolute Reliability
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
               
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-left shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                🛡️
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Comprehensive Protection
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-left shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition-all">
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-4">
                🎧
              </div>
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                Patient-Focused Support
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>

    <section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Integrated with Your Treatment Journey
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
            Insurance options are aligned with:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">01.</span>
              <span className="text-gray-800 dark:text-gray-200">
                Your medical procedure
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">02.</span>
              <span className="text-gray-800 dark:text-gray-200">
                Travel duration
              </span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-semibold">03.</span>
              <span className="text-gray-800 dark:text-gray-200">
                Individual needs and preferences
              </span>
            </li>
          </ul>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            This ensures that your coverage is relevant, personalized, and fully
            compatible with your medical plan.
          </p>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-[#156082] text-white rounded-3xl p-8 md:p-10 shadow-lg">
          <div className="mb-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10">
              📊
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">
            Precision Underwriting
          </h3>

          <p className="text-white/80 leading-relaxed mb-6">
            By aligning insurance with your treatment plan and travel logistics,
            we ensure tailored coverage that adapts to your specific medical
            journey and personal requirements.
          </p>

          <div className="h-1 w-16 bg-white/40 mb-4 rounded"></div>

          <p className="text-xs tracking-widest text-white/60 uppercase">
            Personalized Coverage Framework
          </p>
        </div>

      </div>
    </section>


         <section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10">
          Travel with Confidence
        </h2>

        {/* List */}
        <div className="space-y-5">
          {items.map((text, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-[#efebe9] dark:bg-slate-900 rounded-2xl px-6 py-5 text-left"
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-100">
                <svg
                  className="w-5 h-5 text-teal-600"
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
              <p className="text-gray-800 dark:text-gray-200 text-sm md:text-base">
                {text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>


    </>);
}