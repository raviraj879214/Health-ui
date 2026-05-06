



export function PersonalAssistance(){

    return(<>
    
<section className="bg-white dark:bg-slate-950 py-24 md:py-32 px-6 font-sans overflow-hidden">
  <div className="max-w-6xl mx-auto">
    
    {/* Small Pill Label */}
    <div className="mb-8">
      <span className="bg-[#26c1b3] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block">
        Personal Assistance
      </span>
    </div>

    {/* Main Headline */}
    <div className="max-w-5xl mb-10">
      <h1 className="text-6xl md:text-8xl font-bold text-slate-900 dark:text-white tracking-tighter leading-[0.9] lg:leading-[0.85]">
        Personal Assistance <br />
        <span className="text-[#3ca9e2]">— Dedicated</span> Post- <br />
        Operative Care.
      </h1>
    </div>

    {/* Subheadline/Description */}
    <div className="max-w-2xl">
      <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
       Recovering from a medical procedure abroad requires not only excellent clinical care—but also <strong> continuous support, comfort, and peace of mind. </strong>
      </p>
      <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
       Through our <strong> Personal Assistance service,</strong> we offer patients the option of having a <strong> dedicated healthcare professional by their side during recovery,</strong> ensuring safety and personalized attention at all times. 
      </p>
    </div>

  </div>
</section>


<section className="bg-white dark:bg-slate-950 py-24 px-6 font-sans scroll-mt-20">
  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-start">
    
    {/* --- LEFT COLUMN: CONTENT --- */}
    <div className="lg:w-1/2 space-y-6">
      <span className="text-6xl font-bold text-[#3ca9e2]/20 dark:text-blue-500/10 block leading-none">
        01
      </span>

      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
        24/7 Post-Operative <br />
        Nursing Support
      </h2>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-md">
        For patients who desire additional support, we can arrange private nursing care available 24 hours a day, during the critical post-operative period.
      </p>

      <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-md">
        Our goal is to provide a safe, closely monitored recovery experience, especially during the first days after surgery.
      </p>
    </div>

    {/* --- RIGHT COLUMN: SERVICE CARD --- */}
    <div className="lg:w-1/2 w-full">
      <div className="bg-slate-50/80 dark:bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 space-y-10">

        <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
          This service includes:
        </p>

        {/* Continuous Monitoring */}
        <div className="flex gap-6 items-start">
          <div className="text-[#3ca9e2] mt-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h4l3 8 4-16 3 8h4" />
            </svg>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white mb-3">
              Continuous monitoring during recovery
            </h4>
          </div>
        </div>

        {/* Mobility Assistance */}
        <div className="flex gap-6 items-start">
          <div className="text-[#3ca9e2] mt-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white mb-3">
              Assistance with mobility and daily activities
            </h4>
          </div>
        </div>

        {/* Medication */}
        <div className="flex gap-6 items-start">
          <div className="text-[#3ca9e2] mt-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white mb-3">
              Medication management and adherence
            </h4>
          </div>
        </div>

        {/* Immediate Response */}
        <div className="flex gap-6 items-start">
          <div className="text-[#3ca9e2] mt-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
            </svg>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white mb-3">
              Immediate response to any concerns or discomfort
            </h4>
          </div>
        </div>

        {/* Communication */}
        <div className="flex gap-6 items-start">
          <div className="text-[#3ca9e2] mt-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
            </svg>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white mb-3">
              Communication support between patient and medical team
            </h4>
          </div>
        </div>

      </div>
    </div>
  </div>
</section>
<section className="bg-white dark:bg-slate-950 py-24 px-6 font-sans">
  <div className="max-w-6xl mx-auto">
    
    {/* --- TOP SECTION: HEADER & INTRO --- */}
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16">
      <div className="lg:w-1/3">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
          Trusted Healthcare <br /> Professionals
        </h2>
        <div className="h-1.5 w-16 bg-[#3ca9e2] mt-6 rounded-full"></div>
      </div>
      
      <div className="lg:w-2/3 space-y-6">
        <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
          We work with a carefully selected network of licensed nursing professionals, experienced in post-surgical care and patient assistance.
        </p>

        <p className="text-slate-500 dark:text-slate-400 text-lg font-light leading-relaxed">
          This ensures that patients receive high-quality, reliable care beyond the hospital environment.
        </p>
      </div>
    </div>

    {/* --- BOTTOM SECTION: FEATURE CARDS --- */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:ml-[33.333%]">
      
      {/* Qualified and trained in clinical care */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 p-10 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="text-[#3ca9e2] mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
          Qualified and trained in clinical care
        </h3>
      </div>

      {/* Experienced in post-operative recovery support */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 p-10 rounded-2xl border border-slate-100 dark:border-slate-800">
        <div className="text-[#3ca9e2] mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m4 0a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
          Experienced in post-operative recovery support
        </h3>
      </div>

      {/* Aligned with our standards */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 p-10 rounded-2xl border border-slate-100 dark:border-slate-800 md:col-span-2">
        <div className="text-[#3ca9e2] mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-3.866 0-7 1.79-7 4v4h14v-4c0-2.21-3.134-4-7-4zm0 0V6m0 2a4 4 0 110-8 4 4 0 010 8z" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
          Aligned with our standards of professionalism and discretion
        </h3>
      </div>

    </div>
  </div>
</section>
<section className="bg-white dark:bg-slate-950 py-24 px-6 font-sans">
  <div className="max-w-6xl mx-auto">
    
    {/* --- HEADER --- */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
        Flexible Care: Hospital, Hotel, or Residence
      </h2>
      <p className="text-slate-500 dark:text-slate-400 font-light max-w-2xl mx-auto">
        Personal Assistance can be provided in different settings, depending on the patient’s needs:
      </p>
    </div>

    {/* --- BENTO GRID --- */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
      
      {/* Hospital */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-2xl border border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
          During extended hospital stays (when applicable)
        </h4>
      </div>

      {/* Hotel */}
      <div className="bg-[#0a5a8c] text-white p-10 rounded-2xl flex items-center">
        <h4 className="text-sm font-bold">
          At the hotel or recovery accommodation
        </h4>
      </div>

      {/* Residence */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-2xl border border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          At a private residence
        </h4>
      </div>

      {/* Flexibility Description */}
      <div className="md:col-span-3 bg-slate-50/50 dark:bg-slate-900/50 p-10 rounded-2xl border border-slate-100 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed max-w-2xl">
          This flexibility allows patients to recover in the environment they feel most comfortable in, without compromising care.
        </p>
      </div>
    </div>


    {/* --- INTERNATIONAL PATIENTS --- */}
    <div className="mb-20 max-w-4xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        🌍 Ideal for International Patients
      </h3>

      <p className="text-slate-500 dark:text-slate-400 font-light mb-6">
        This service is especially valuable for patients who:
      </p>

      <ul className="space-y-3 text-slate-600 dark:text-slate-400 list-none">
        <li> Are traveling alone</li>
        <li> Would benefit from additional professional support during recovery</li>
        <li> Want a more comfortable and assisted recovery</li>
        <li> Seek peace of mind during their stay in Brazil</li>
      </ul>

      <p className="text-slate-500 dark:text-slate-400 font-light mt-8">
        It bridges the gap between hospital care and independent recovery, offering continuous support.
      </p>
    </div>


    {/* --- OPTIONAL SERVICE --- */}
    <div className="mb-20 max-w-4xl mx-auto text-center">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        ➕ Optional, Personalized Service
      </h3>

      <p className="text-slate-500 dark:text-slate-400 font-light mb-6">
        Personal Assistance is offered as an optional service, tailored to each patient’s needs and recovery plan.
      </p>

      <p className="text-slate-500 dark:text-slate-400 font-light mb-6">
        We coordinate:
      </p>

      <ul className="space-y-3 text-slate-600 dark:text-slate-400 list-none">
        <li> Duration of care (hours or full-time)</li>
        <li> Level of assistance required</li>
        <li> Integration with your medical and travel schedule</li>
      </ul>
    </div>


    {/* --- CTA: HIGHER STANDARD --- */}
    <div className="bg-slate-50/50 dark:bg-slate-900/30 rounded-3xl p-12 md:p-20">
      <div className="max-w-2xl">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-10 tracking-tight">
          🌟 A Higher Standard of Care
        </h2>

        <ul className="space-y-6 mb-12">
          <li className="flex gap-4 items-start">
            <span className="text-[#3ca9e2]">✔</span>
            <p className="text-sm text-slate-600 dark:text-slate-400">24/7 dedicated nursing support (optional)</p>
          </li>
          <li className="flex gap-4 items-start">
            <span className="text-[#3ca9e2]">✔</span>
            <p className="text-sm text-slate-600 dark:text-slate-400">Personalized post-operative assistance</p>
          </li>
          <li className="flex gap-4 items-start">
            <span className="text-[#3ca9e2]">✔</span>
            <p className="text-sm text-slate-600 dark:text-slate-400">Trusted and qualified healthcare professionals</p>
          </li>
          <li className="flex gap-4 items-start">
            <span className="text-[#3ca9e2]">✔</span>
            <p className="text-sm text-slate-600 dark:text-slate-400">Flexible care locations (hospital, hotel, or residence)</p>
          </li>
          <li className="flex gap-4 items-start">
            <span className="text-[#3ca9e2]">✔</span>
            <p className="text-sm text-slate-600 dark:text-slate-400">Enhanced safety, comfort, and peace of mind</p>
          </li>
        </ul>

        
      </div>
    </div>

  </div>
</section>


    
    </>)
}