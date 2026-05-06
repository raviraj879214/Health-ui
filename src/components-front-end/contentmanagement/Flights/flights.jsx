






export function Flights(){



    return (<>


            <section className="bg-white dark:bg-slate-950 py-24 md:py-32 px-6 font-sans overflow-hidden">
                <div className="max-w-6xl mx-auto">

                    {/* Top Label */}
                    <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#0a5a8c] dark:text-blue-400 mb-6 block">
                        The Clinical Architect Experience
                    </span>

                    {/* Heading */}
                    <div className="max-w-5xl mb-10">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1]">
                            Precision Logistics for Your <br />
                            <span className="text-[#0a5a8c] dark:text-blue-400">
                                Medical Journey
                            </span>
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="max-w-2xl">
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                            At MedConcierge, we transcend standard travel. Our logistics engine integrates
                            clinical timelines with luxury mobility—ensuring your path to health is as
                            precise as the procedures you seek.
                        </p>
                    </div>

                </div>
            </section>

            <section className="bg-white dark:bg-slate-950 px-6 pb-16">
                <div className="max-w-6xl mx-auto flex justify-center lg:justify-center">

                    <nav className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-full px-2 py-2 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/50 dark:border-slate-800 flex items-center gap-1">

                        <a
                            href="#flights"
                            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0a5a8c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Flights
                        </a>

                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />

                        <a
                            href="#hotel"
                            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0a5a8c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Hotels
                        </a>

                        <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />

                        <a
                            href="#transportation"
                            className="px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-[#0a5a8c] hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                            Transportation
                        </a>

                    </nav>

                </div>
            </section>

<section id="flights" className="bg-white dark:bg-slate-950 py-24 px-6 font-sans scroll-mt-20">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* --- LEFT COLUMN: CONTENT & HUBS --- */}
      <div className="lg:col-span-5 space-y-10">
        <header>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight mb-6">
            Flights to Brazil: <br />
            <span className="text-[#0a5a8c] dark:text-blue-400">Full Medical Concierge Experience™</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Traveling to Brazil for medical care can be not only simple—but exceptionally comfortable. 
          </p>
          <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            Through our Full Medical Concierge Experience™, we ensure that every aspect of your journey is carefully planned, optimized, and fully supported, allowing you to focus entirely on your treatment and recovery. 
          </p>
          <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            While many of our patients come from the United States, we proudly serve international patients from all over the world, delivering the same high level of care, coordination, and personalized attention—regardless of origin
          </p>
        </header>

        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0a5a8c] mb-2">Departure Hubs</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              United States (Miami, JFK, LAX), Europe (London, Frankfurt, Paris, Madrid).
            </p>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0a5a8c] mb-2">Arrival Gateways</h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
              São Paulo (GRU), Rio de Janeiro (GIG), Brasília (BSB), Campinas (VCP).
            </p>
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: FLIGHT CARDS & ACCESS --- */}
      <div className="lg:col-span-7 space-y-6">
        
        {/* Top Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#0a5a8c] mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Miami to Brazil</h3>
            <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider font-semibold">Optimal non-stop routes</p>
            <span className="text-3xl font-bold text-[#0a5a8c]">8.5 Hours</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-[#0a5a8c] mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">NY to Brazil</h3>
            <p className="text-xs text-slate-400 mb-6 uppercase tracking-wider font-semibold">Clinical comfort suites</p>
            <span className="text-3xl font-bold text-[#0a5a8c]">9.5 Hours</span>
          </div>
        </div>

        {/* Bottom Detailed Box */}
        <div className="bg-[#e2f1ff] dark:bg-blue-950/40 p-8 md:p-10 rounded-3xl border border-blue-100 dark:border-blue-900/50">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Nationwide Medical Access</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Our domestic air-ambulance and executive charters connect you directly to elite centers in Curitiba, São Paulo, and Rio de Janeiro within 60 minutes of landing.
          </p>
          <div className="grid grid-cols-2 gap-y-4">
            {[
              "Fast-track Customs", "Tarmac Pickup", 
              "Medical Clearance", "Luggage Concierge"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                <div className="w-5 h-5 rounded-full border border-blue-400 flex items-center justify-center">
                   <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                {feature}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
     


<section className="bg-white dark:bg-slate-950 py-24 px-6 font-sans">
  <div className="max-w-6xl mx-auto space-y-20">

    {/* Full Concierge Travel Support */}
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
        Full Concierge Travel Support
      </h2>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
        We offer a complete, high-touch travel experience, managing every detail of your journey:
      </p>

      <ul className="text-left max-w-2xl mx-auto space-y-3 text-slate-600 dark:text-slate-400">
        <li> Personalized flight selection based on comfort and schedule</li>
        <li> Full assistance with ticket booking and purchasing</li>
        <li> Route optimization aligned with your medical timeline</li>
        <li> Coordination of layovers and domestic connections</li>
        <li> Guidance on baggage, medical travel needs, and special requests</li>
      </ul>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mt-8 mb-6">
        In addition, we can arrange:
      </p>

      <ul className="text-left max-w-2xl mx-auto space-y-3 text-slate-600 dark:text-slate-400">
        <li> Private chauffeur services, including transfers between airport, hotel, and clinic</li>
        <li> Carefully selected hotel partnerships, offering options from high value (cost-benefit) to luxury accommodations</li>
        <li> Seamless coordination between all stages of your journey</li>
      </ul>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mt-8">
        These services can be included as part of your customized experience, depending on your preferences and selected package.
      </p>
    </div>


    {/* Curated Hotel Selection */}
    <div className="max-w-4xl mx-auto text-center" id="hotel">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
        🏨 Curated Hotel Selection — Our Top Picks
      </h2>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
        To ensure comfort, safety, and convenience, we work with a curated network of hotels personally vetted by our team.
      </p>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-6">
        We provide a Top 5 hotel selection in each destination, tailored to your preferences:
      </p>

      <ul className="text-left max-w-2xl mx-auto space-y-3 text-slate-600 dark:text-slate-400">
        <li> Best value hotels (excellent cost-benefit)</li>
        <li> Premium comfort options</li>
        <li> Luxury hotels and high-end recovery stays</li>
      </ul>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mt-8 mb-6">
        Each recommendation is carefully chosen based on:
      </p>

      <ul className="text-left max-w-2xl mx-auto space-y-3 text-slate-600 dark:text-slate-400">
        <li> Location relative to medical facilities</li>
        <li> Comfort and recovery suitability</li>
        <li> Service quality and reliability</li>
      </ul>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mt-8">
        This ensures you stay in an environment that supports both rest and recovery with peace of mind.
      </p>
    </div>


    {/* Travel & Leisure */}
    <div className="max-w-4xl mx-auto text-center" id="transportation">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
        🌴 Travel & Leisure Experiences
      </h2>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-8">
        For patients who wish to enhance their stay, we also offer access to curated tourism experiences through trusted local partners.
      </p>

      <p className="text-slate-500 dark:text-slate-400 font-light mb-6">
        These may include:
      </p>

      <ul className="text-left max-w-2xl mx-auto space-y-3 text-slate-600 dark:text-slate-400">
        <li> Guided city tours</li>
        <li> Nature and cultural experiences</li>
        <li> Private excursions and premium activities</li>
      </ul>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed mt-8">
        This allows patients and their companions to enjoy Brazil beyond the medical experience, in a safe and well-organized way.
      </p>
    </div>


    {/* Seamless Experience Block */}
    <div className="bg-[#111111] rounded-3xl p-10 md:p-16 text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold italic mb-12 tracking-tight">
        🌟 A Seamless, Global Experience
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
        <div>✔ International patient support (not limited to the U.S.)</div>
        <div>✔ Access to Brazil’s top medical destinations nationwide</div>
        <div>✔ Flexible travel planning tailored to each patient</div>
        <div>✔ Premium flight options and concierge coordination</div>
        <div>✔ Optional chauffeur, hotel, and full logistics services</div>
        <div>✔ Curated Top 5 hotel recommendations per destination</div>
        <div>✔ Optional tourism and leisure experiences</div>
        <div>✔ End-to-end support from departure to recovery</div>
      </div>

      
    </div>

  </div>
</section>




    </>);


}