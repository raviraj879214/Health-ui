


export function Gurantees(){


    return(<>
    
        <section className="bg-gray-50 py-20 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        
        {/* Left Content */}
        <div className="md:w-3/5">
          <span className="inline-block bg-[#26bba4] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
            Patient Trust Manifest
          </span>
          
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter mb-8">
            Your Guarantees
          </h2>
          
          <p className="text-gray-600 text-xl leading-relaxed max-w-2xl">
           We understand that choosing to undergo medical treatment abroad is a major decision. That’s why we’ve built a <strong>physician-led platform focused on safety, transparency, and accountability at every step. </strong>

            Our commitment is simple: no surprises, no shortcuts, and no compromises on quality. 
          </p>
        </div>

        {/* Right Cards */}
        <div className="md:w-2/5 flex flex-col gap-4 w-full">
          {/* Card 1 */}
          <div className="bg-white/60 border border-white p-10 rounded-2xl shadow-sm">
            <span className="block text-4xl font-extrabold text-[#005c8a] mb-2">
              100%
            </span>
            <span className="text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase">
              Physician Coordination
            </span>
          </div>

          {/* Card 2 */}
          <div className="bg-white/60 border border-white p-10 rounded-2xl shadow-sm">
            <span className="block text-4xl font-extrabold text-[#005c8a] mb-2">
              Zero
            </span>
            <span className="text-[11px] font-bold tracking-[0.15em] text-gray-500 uppercase">
              Hidden Commissions
            </span>
          </div>
        </div>

      </div>
    </section>
    
        <section className="bg-gray-50 py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Quality Assurance Guarantee - Large Span */}
        <div className="md:col-span-2 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-50 p-2 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Quality Assurance Guarantee</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Carefully selected hospitals Only</h4>
                <p className="text-gray-500 text-sm leading-relaxed">We partner exclusively with high-standard hospitals and clinics, selected based on infrastructure, safety protocols, and consistent clinical outcomes. </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Verified medical professionals</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Every physician in our network is thoroughly vetted and holds the necessary certifications, credentials, and proven experience in their field.</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Real patient-centered approach </h4>
                <p className="text-gray-500 text-sm leading-relaxed">We prioritize transparency and clarity, ensuring patients receive honest medical guidance and realistic expectations before any procedure. </p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Physician-led coordination</h4>
                <p className="text-gray-500 text-sm leading-relaxed">Your case is handled by medical professionals, not sales agents—ensuring accuracy, ethics, and clinical responsibility. </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Financial Transparency Guarantee - Blue Card */}
        <div className="bg-[#93c5fd] rounded-3xl p-8 md:p-10 flex flex-col">
          <svg className="w-8 h-8 text-blue-900 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <h2 className="text-2xl font-bold text-blue-900 leading-tight mb-8">Financial <br/> Transparency <br/> Guarantee</h2>
          <ul className="space-y-6">
            <li className="flex gap-3">
              <span className="text-blue-900 font-bold mt-1">✓</span>
              <p className="text-blue-900/80 text-sm font-medium">No hidden costs: All treatment plans are clearly presented and discussed in advance. Patients receive full cost transparency before committing. </p>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-900 font-bold mt-1">✓</span>
              <p className="text-blue-900/80 text-sm font-medium">Pre-approved treatment plans : Any additional procedures or changes are only performed with patient awareness and consent. </p>
            </li>
          </ul>
        </div>

        {/* 3. Patient Safety Guarantee - White Card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <svg className="w-6 h-6 text-red-600 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-8">Patient Safety Guarantee</h3>
          <div className="space-y-6 uppercase tracking-wider">
            <div>
              <h5 className="text-[10px] font-black text-gray-900 mb-1">Strict selection and oversight</h5>
              <p className="text-gray-500 text-[11px] normal-case tracking-normal leading-relaxed">We work only with providers that meet rigorous safety and hygiene standards, aligned with international best practices. </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-gray-900 mb-1">Ongoing support in case of complications </h5>
              <p className="text-gray-500 text-[11px] normal-case tracking-normal leading-relaxed">If any issue arises, our team remains actively involved to facilitate communication and help coordinate solutions with the medical provider. </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-gray-900 mb-1">Clear medical communication </h5>
              <p className="text-gray-500 text-[11px] normal-case tracking-normal leading-relaxed">Patients are fully informed about risks, benefits, and recovery expectations before proceeding with any treatment. </p>
            </div>
          </div>
        </div>

        {/* 4. Medical Support Guarantee - White Card */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <svg className="w-6 h-6 text-emerald-500 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold text-gray-900 mb-8">Medical Support Guarantee</h3>
          <div className="space-y-6 uppercase tracking-wider">
            <div>
              <h5 className="text-[10px] font-black text-gray-900 mb-1">Dedicated medical coordinator </h5>
              <p className="text-gray-500 text-[11px] normal-case tracking-normal leading-relaxed">Each patient is assisted by a healthcare professional who guides them through the entire journey—from initial consultation to recovery. </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-gray-900 mb-1">Second medical opinion </h5>
              <p className="text-gray-500 text-[11px] normal-case tracking-normal leading-relaxed">When needed, patients can request a second opinion to confirm diagnosis and explore the best treatment options. </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-gray-900 mb-1">Post-treatment follow-up </h5>
              <p className="text-gray-500 text-[11px] normal-case tracking-normal leading-relaxed">We remain available after the procedure to support recovery and ensure continuity of care. </p>
            </div>
          </div>
        </div>

        {/* 5. Privacy & Security Guarantee - Black Card */}
        <div className="bg-[#1a1a1a] rounded-3xl p-8 md:p-10 text-white shadow-xl">
          <svg className="w-6 h-6 text-blue-400 mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-bold mb-8">Privacy & Security <br/> Guarantee</h3>
          <div className="space-y-6 uppercase tracking-wider">
            <div>
              <h5 className="text-[10px] font-black text-white mb-1">Confidential medical care </h5>
              <p className="text-gray-400 text-[11px] normal-case tracking-normal leading-relaxed">All patient information is handled with strict confidentiality and professional discretion.</p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-white mb-1">Secure data handling </h5>
              <p className="text-gray-400 text-[11px] normal-case tracking-normal leading-relaxed">We follow international standards for data protection and secure communication, ensuring patient privacy at all times. </p>
            </div>
            <div>
              <h5 className="text-[10px] font-black text-white mb-1">Discreet Experience</h5>
              <p className="text-gray-400 text-[11px] normal-case tracking-normal leading-relaxed">Patients may request additional privacy measures throughout their journey. </p>
            </div>
          </div>
        </div>

      </div>
    </section>
        

<div className="bg-white space-y-24 py-20 font-sans">
      



      <section className="max-w-4xl mx-auto px-6 text-center hidden">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
          Our commitment is physician-led.
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
          If you have questions about our vetting process or clinical protocols, our medical directors are available for a direct consultation to discuss your specific requirements.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Primary Action Button */}
          <button className="w-full sm:w-auto bg-gradient-to-r from-[#006ca3] to-[#36aae3] hover:brightness-110 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer">
            Speak with a Medical Director
          </button>
          
          {/* Secondary Action Button */}
          <button className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-4 px-8 rounded-xl transition-all cursor-pointer border border-transparent">
            Download Trust Brochure
          </button>
        </div>
      </section>

    </div>





    
    </>);
}