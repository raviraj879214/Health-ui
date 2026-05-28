



export function Visa(){


    return(<>
        <section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24">
  <div className="max-w-4xl mx-auto px-6 text-left">
    
 
    <div className="flex items-center gap-4 mb-8">
      <span className="bg-[#2eb1a7] text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full">
        Priority Care
      </span>
      <div className="h-[1px] w-12 bg-slate-300 dark:bg-slate-700"></div>
    </div>


    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] text-slate-900 dark:text-white mb-8">
      Visa Assistance — 
      <span className="block text-[#0a5a8c] dark:text-blue-400 font-light italic">
        We Handle Everything for You
      </span>
    </h1>


  
    <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl">
      Traveling abroad for medical care should be simple and completely stress-free. 
     
    </p>
      <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl">
    That’s why we take full responsibility for the entire visa process, ensuring your entry into Brazil is smooth, secure, and effortless
    </p>

  </div>
</section>

<section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24">
  <div className="max-w-6xl mx-auto px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
      
      {/* Left Column: Text Content */}
      <div className="space-y-6">
        <h2 className="text-[#0a5a8c] dark:text-blue-400 font-bold uppercase tracking-widest text-xs">
          Global Eligibility
        </h2>
        <h3 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
          Who Needs a Visa?
        </h3>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-md">
          Brazil requires a visa for travelers from several countries, including
        </p>
      </div>

      {/* Right Column: Country Cards & Info Box */}
      <div className="space-y-4">
        {/* Country Grid */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { code: 'US', name: 'UNITED STATES' },
            { code: 'CA', name: 'CANADA' },
            { code: 'AU', name: 'AUSTRALIA' }
          ].map((country) => (
            <div key={country.code} className="bg-white dark:bg-slate-900 rounded-xl p-8 shadow-sm flex flex-col items-center justify-center border border-slate-100 dark:border-slate-800">
              <span className="text-4xl font-bold text-slate-200 dark:text-slate-700 mb-2">
                {country.code}
              </span>
              <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 tracking-widest text-center">
                {country.name}
              </span>
            </div>
          ))}
        </div>

        {/* Global Info Box */}
        <div className="bg-[#e8f1f8] dark:bg-blue-900/20 rounded-xl p-6 flex items-center gap-4 border border-[#d1e3f0] dark:border-blue-800/30">
          <div className="text-[#0a5a8c] dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
          </div>
          <p className="text-[#0a5a8c] dark:text-blue-300 text-sm italic leading-tight">
            Our service is available to all international patients who require a visa, regardless of nationality. 
          </p>
        </div>
      </div>

    </div>
  </div>
</section>
        <section className="bg-[#f5f2f1] dark:bg-slate-950 py-20 text-slate-900 dark:text-slate-100 antialiased">
  <div className="max-w-5xl mx-auto px-6 space-y-32">

    {/* Section 01: A Truly Hands-Off Process */}
   <div className="relative">

  {/* Large Background Number */}
  <span className="absolute -top-12 -left-8 text-8xl font-black text-slate-200/60 dark:text-slate-800/40 select-none">
    01
  </span>

  <div className="relative z-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm">

    {/* Heading */}
    <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
      A Truly Hands-Off Process
    </h3>

    {/* Intro Text */}
    <div className="max-w-4xl space-y-5 mb-10">
      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
        We handle 100% of the visa application process on your behalf.
      </p>

      <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light">
        There are no forms to fill out, no bureaucracy to deal with, and no complex steps for you to manage.
      </p>
    </div>

    {/* Requirements Box */}
    <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-3xl p-8">

      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-[#00669b]/10 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-[#00669b]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
          All we require from you is:
        </h4>
      </div>

      {/* Requirement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Passport */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex items-start gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-[#00669b]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21H8a2 2 0 01-2-2V5a2 2 0 012-2h8a2 2 0 012 2v14a2 2 0 01-2 2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 7h6M9 11h6M9 15h3"
              />
            </svg>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              A valid passport
            </h5>

            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              (signed, valid through your travel period, with at least 2 blank visa pages)
            </p>
          </div>
        </div>

        {/* Photo */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex items-start gap-4">

          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
            <svg
              className="w-6 h-6 text-[#00669b]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14"
              />
              <rect
                width="12"
                height="12"
                x="3"
                y="6"
                rx="2"
                ry="2"
              />
            </svg>
          </div>

          <div>
            <h5 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              A Photo That’s it.
            </h5>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 bg-[#00669b]/5 border border-[#00669b]/10 rounded-2xl p-6">
        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
          <strong className="text-slate-900 dark:text-white">
            
          </strong>
        </p>

        <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
          We take care of everything else—from application to submission—ensuring accuracy and compliance at every step.
        </p>
      </div>
    </div>
  </div>
</div>

  
<div className="relative">
  <span className="absolute -top-12 -left-8 text-8xl font-black text-slate-200/60 dark:text-slate-800/40 select-none">
    02
  </span>

  <div className="relative z-10 space-y-8">
    <h3 className="text-2xl font-bold">No Cost, No Effort</h3>

    <div className="bg-[#eeebed] dark:bg-slate-900/50 p-8 md:p-12 rounded-sm border-l-2 border-blue-600 max-w-3xl">
      <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 italic font-light leading-snug">
        "We cover the visa application fees for our patients"
      </blockquote>
    </div>

    {/* Added Points */}
    <div className="space-y-4 max-w-2xl">
      <p className="text-slate-700 font-medium">You will not need to:</p>

      <ul className="space-y-3 text-slate-600 text-base md:text-lg">
        <li>Pay any visa-related fees</li>
        <li>Navigate government systems</li>
        <li>Handle paperwork or submissions</li>
      </ul>
    </div>

    <p className="text-slate-500 dark:text-slate-500 text-sm max-w-xl font-light">
      Our goal is to remove every possible barrier between you and your treatment.
      This service is fully integrated into our standard patient package at no additional surcharge to you.
    </p>
  </div>
</div>

    {/* Section 03: Seamless and Fully Coordinated */}
    <div className="relative">
  <span className="absolute -top-12 -left-8 text-8xl font-black text-slate-200/60 dark:text-slate-800/40 select-none">
    03
  </span>

  <div className="relative z-10">

    <h3 className="text-2xl font-bold mb-8">
      Seamless and Fully Coordinated
    </h3>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

      {/* Left Content */}
      <div className="space-y-8">

        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
          Your visa process is:
        </p>

        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-sm md:text-base font-medium text-slate-700">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Fully managed by our team
          </li>

          <li className="flex items-center gap-3 text-sm md:text-base font-medium text-slate-700">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Aligned with your travel and treatment schedule
          </li>

          <li className="flex items-center gap-3 text-sm md:text-base font-medium text-slate-700">
            <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
            Handled with precision and efficiency
          </li>
        </ul>

        <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
          You can focus entirely on your medical journey—we handle the rest.
        </p>

      </div>

      {/* Right Highlight Card */}
      <div className="bg-gradient-to-br from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">

        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" clipRule="evenodd"/>
          </svg>
        </div>

        <h4 className="font-bold text-slate-900 dark:text-white">
          Fully Coordinated System
        </h4>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          Precision and efficiency are our core clinical values—extended to your logistics.
        </p>

      </div>

    </div>
  </div>
</div>
  </div>
</section>

<section className="bg-[#f5f2f1] dark:bg-slate-950 py-16 md:py-24 px-6">
  <div className="max-w-5xl mx-auto">
    {/* Dark Container Card */}
    <div className="bg-[#121417] dark:bg-slate-900 rounded-[2rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            A Frictionless Start to Your Journey
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
            Ready to begin your healing journey? Our team is standing by to initiate your documentation process immediately upon enrollment.
          </p>
         
        </div>

        {/* Right Feature List Column */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
          <ul className="space-y-6">
            {[
              { label: "100% hands-off visa process" },
              { label: "Only passport and photo required" },
              { label: "No forms, no bureaucracy" },
              { label: "No cost to the patient" },
              { label: "Fully managed from start to finish" }
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-4 group">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#4fd1c5] flex items-center justify-center shadow-[0_0_15px_rgba(79,209,197,0.3)]">
                  <svg className="w-3.5 h-3.5 text-[#121417]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white font-bold uppercase tracking-widest text-[10px] md:text-[11px] opacity-90 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  </div>
</section>
    </>);
}