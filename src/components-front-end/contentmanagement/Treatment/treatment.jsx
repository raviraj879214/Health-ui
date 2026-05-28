


export function Treatment(){
const categories = ["PLASTIC SURGERY IN BRAZIL", "ORTHOPEDICS", "MATERNITY", "IVF", "DENTAL"];

const procedures = [
    "Breast augmentation and reduction ",
    "Liposuction and body contouring ",
    "Tummy tuck (abdominoplasty) ",
    "Facelift and eyelid surgery ",
    "Rhinoplasty ",
  ];


  const specialties = [
    {
      title: "Hip replacement (total hip arthroplasty) ",
      description: ""
    },
    {
      title: "Knee replacement (total knee arthroplasty) ",
      description: ""
    },
    {
      title: "Sports injuries and ligament reconstruction ",
      description: ""
    },
    {
      title: "Spine treatments ",
      description: ""
    }
  ];


  const features = [
    "Planned cesarean delivery ",
    "Natural childbirth ",
    "Full prenatal and postnatal care ",
  ];


  const points = [
    {
      id: "01",
      title: "In vitro fertilization (IVF) ",
      description: ""
    },
    {
      id: "02",
      title: "Egg donation and fertility preservation ",
      description: ""
    },
    {
      id: "03",
      title: "Advanced reproductive diagnostics ",
      description: ""
    },
    {
      id: "04",
      title: "Personalized fertility treatment plans ",
      description: ""
    }
  ];

  const treatments = [
    { label: "Dental implants ", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Full mouth rehabilitation ", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { label: "Veneers and cosmetic dentistry ", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { label: "Orthodontics ", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" }
  ];

  const steps = [
    {
      title: "INDIVIDUALLY PLANNED",
      desc: "Your medical history is reviewed by a board-certified physician before you ever arrive in Brazil."
    },
    {
      title: "MEDICALLY COORDINATED",
      desc: "We handle all clinical logistics, prescriptions, and follow-ups so you can focus on healing."
    },
    {
      title: "TRAVEL ALIGNED",
      desc: "We seamlessly integrate recovery periods with curated, low-impact travel experiences."
    }
  ];


  const featureslaststep = [
    "Internationally recognized medical expertise",
    " Advanced hospitals and modern technology",
    "Significantly lower costs compared to the U.S. ",
    " Wide range of specialties, including fertility treatments ",
    "Physician-led coordination and support "
  ];

    return(<>
     <section className="bg-white pt-24 pb-12 px-6 text-center">
  <div className="max-w-4xl mx-auto">

    <span className="inline-block bg-[#26bba4] text-white text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
      Medical Excellence
    </span>

    {/* Split headline */}
    <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
      Treatments in Brazil
      <span className="block text-4xl md:text-5xl font-semibold text-gray-700 mt-3">
        World-Class Care, Tailored to You
      </span>
    </h1>

    <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-4">
      Brazil is internationally recognized for delivering <strong>high-quality medical treatments across multiple specialties,</strong> combining advanced technology, experienced physicians, and significantly lower costs compared to the United States and other countries.
    </p>

    <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto mb-16">
      Through our physician-led platform, patients gain access to <strong>carefully selected specialists and top-tier medical facilities,</strong> ensuring safe, effective, and personalized treatment.
    </p>

  </div>
</section>

        <div className="sticky top-0 z-50 bg-white">
  <div className="flex flex-wrap justify-center gap-8 md:gap-12 border-t border-gray-100 pt-4 pb-4">
    {categories.map((item) => (
      <a
        key={item}
         href={`#${item}`}
        className="text-[11px] font-bold tracking-[0.15em] text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
        
        
        >
        {item}
      </a>
    ))}
  </div>
</div>


     <section className="bg-gray-50 py-24 px-6 text-center" id="PLASTIC SURGERY IN BRAZIL">
  <div className="max-w-6xl mx-auto">

    {/* Header */}
    <div className="flex flex-col items-center mb-12">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-white p-1.5 rounded-md shadow-sm border border-gray-100">
          <svg className="w-5 h-5 text-[#00669b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <span className="text-[10px] font-bold tracking-[0.2em] text-[#00669b] uppercase">
          Esthetics & Reconstruction
        </span>
      </div>

      <h2 className="text-4xl font-bold text-gray-900 mb-6">
        Plastic Surgery In Brazil
      </h2>

      <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto">
        Brazil is a <strong>global leader in plastic and cosmetic surgery,</strong> with decades of innovation and one of the highest procedure volumes in the world.
      </p>
    </div>

    {/* Informational Grid (NOT clickable) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">

      {procedures.map((item, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
        >
          <div className="flex gap-3 items-start">
            <div className="w-2 h-2 mt-2 rounded-full bg-[#00669b] flex-shrink-0"></div>

            <p className="text-sm font-semibold text-gray-900 leading-relaxed">
              {item}
            </p>
          </div>
        </div>
      ))}

    </div>

    {/* Footer text */}
    <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto mt-10">
      Patients benefit from <strong>exceptional aesthetic results combined with affordability and expertise.</strong>
    </p>

  </div>
</section>


    <section className="bg-white py-24 px-6 text-center font-sans" id="ORTHOPEDICS">
      <div className="max-w-6xl mx-auto">
        
        {/* Sub-header Badge */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <svg className="w-5 h-5 text-[#00669b]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#00669b] uppercase">
            Mobility & Longevity
          </span>
        </div>

        {/* Main Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
          Orthopedic Surgery
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto mb-20">
          Brazil offers excellent care in <strong> orthopedic procedures,</strong> with modern techniques and highly experienced specialists. 
        </p>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-left">
          {specialties.map((item, index) => (
            <div key={index} className="relative pl-6 border-l-2 border-blue-400">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

                <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto mt-10">
          All performed in <strong> advanced medical facilities focused on recovery and long-term outcomes. </strong>
        </p>

      </div>
    </section>


<section className="bg-gray-50 py-24 px-6" id="MATERNITY">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl p-12 md:p-20 shadow-xl shadow-gray-200/50 border border-gray-100 text-center">
        
        {/* Badge */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <svg className="w-4 h-4 text-red-800" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C10.34 2 9 3.34 9 5s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm3 7h-6c-1.1 0-2 .9-2 2v6h2v5h2v-5h2v5h2v-6c0-1.1-.9-2-2-2z" />
          </svg>
          <span className="text-[10px] font-bold tracking-[0.2em] text-red-800 uppercase">
            New Beginnings
          </span>
        </div>

        {/* Header */}
        <h2 className="text-4xl font-bold text-gray-900 mb-8 tracking-tight">
          Maternity & Birth Planning in Brazil
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto mb-16">
          For families interested in <strong> citizenship by birth,</strong> Brazil offers a unique opportunity combined with <strong>high-quality obstetric care.</strong> 
        </p>

        {/* Horizontal Checklist */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full border border-teal-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-teal-600" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                {feature}
              </span>
            </div>
          ))}
          
        </div>
        
        <div className="mt-6 text-center">
  <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light tracking-wide">
    Providing a safe, comfortable, and well-coordinated birth experience.
  </p>
</div>
      </div>
    </section>


<section className="bg-white py-24 px-6 text-center font-sans" id="IVF">
  <div className="max-w-6xl mx-auto">

    {/* Reproductive Science Badge */}
    <div className="flex items-center justify-center gap-2 mb-6">
      <svg
        className="w-5 h-5 text-[#00669b]"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.282a2 2 0 01-1.806 0l-.628-.282a6 6 0 00-3.86-.517l-2.387.477a2 2 0 00-1.022.547l-.34.34a2 2 0 000 2.828l1.245 1.245A2 2 0 006.454 20h11.092a2 2 0 001.414-.586l1.245-1.245a2 2 0 000-2.828l-.34-.34z"
        />
      </svg>

      <span className="text-[10px] font-bold tracking-[0.2em] text-[#00669b] uppercase">
        Reproductive Science
      </span>
    </div>

    {/* Main Heading */}
    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight">
      In Vitro Fertilization (IVF) in Brazil
    </h2>

    {/* Lead Paragraph */}
    <p className="text-gray-500 text-lg leading-relaxed max-w-4xl mx-auto mb-20">
      Brazil is an increasingly sought-after destination for <strong>fertility treatments,</strong> offering advanced reproductive technologies and highly specialized professionals.
    </p>

    {/* Updated Card Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">

      {points.map((point, index) => (
        <div
          key={point.id}
          className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-lg hover:-translate-y-1 transition duration-300"
        >

          {/* Icon Area */}
          <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-2xl bg-blue-100">
            
            {index === 0 && (
              <svg
                className="w-7 h-7 text-[#00669b]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21s-6-4.35-9-8.5C.5 8.5 3 4 7.5 4c2.2 0 3.6 1.2 4.5 2.4C12.9 5.2 14.3 4 16.5 4 21 4 23.5 8.5 21 12.5 18 16.65 12 21 12 21z"
                />
              </svg>
            )}

            {index === 1 && (
              <svg
                className="w-7 h-7 text-[#00669b]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v8m-4-4h8"
                />
                <circle cx="12" cy="12" r="9" />
              </svg>
            )}

            {index === 2 && (
              <svg
                className="w-7 h-7 text-[#00669b]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}

            {index === 3 && (
              <svg
                className="w-7 h-7 text-[#00669b]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            )}
          </div>

          <h4 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
            {point.title}
          </h4>

          <p className="text-gray-500 text-sm leading-relaxed">
            {point.description}
          </p>
        </div>
      ))}
    </div>

    <p className="text-gray-500 text-lg leading-relaxed max-w-4xl mx-auto mt-10">
      This makes Brazil a strong option for couples and individuals seeking effective and supportive fertility solutions abroad.
    </p>

  </div>
</section>

    <div className="max-w-4xl mx-auto py-12 px-6 text-center">

  <div className="inline-flex items-center gap-3 mb-10">
    <span className="h-px w-12 bg-gray-300"></span>
    <h3 className="text-sm md:text-base font-semibold tracking-[0.3em] text-gray-700 uppercase">
      Patients choose Brazil for
    </h3>
    <span className="h-px w-12 bg-gray-300"></span>
  </div>

  <div className="grid md:grid-cols-2 gap-6 text-left">

    <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
      <p className="text-gray-800 text-lg leading-relaxed">
        High-quality care with modern laboratory technology
      </p>
    </div>

    <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
      <p className="text-gray-800 text-lg leading-relaxed">
        Experienced fertility specialists
      </p>
    </div>

    <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
      <p className="text-gray-800 text-lg leading-relaxed">
        More accessible pricing compared to the U.S.
      </p>
    </div>

    <div className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition">
      <p className="text-gray-800 text-lg leading-relaxed">
        Personalized and discreet treatment experience
      </p>
    </div>

  </div>

</div>


    <section className="bg-gray-50 py-24 px-6 text-center" id="DENTAL">
      <div className="max-w-6xl mx-auto">
        
        
        <h2 className="text-4xl font-bold text-gray-900 mb-16">Advanced Dental Treatments</h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-4xl mx-auto mb-20">
          Brazil is also a leading destination for high-quality dental care, offering advanced procedures at competitive prices. 
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {treatments.map((t, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center gap-6 hover:shadow-md transition-shadow cursor-pointer">
              <svg className="w-8 h-8 text-[#00669b]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
              </svg>
              <span className="text-[14px] font-bold tracking-widest text-gray-900">{t.label}</span>
            </div>
          ))}
        </div>
          <p className="text-gray-500 text-lg leading-relaxed max-w-4xl mx-auto mt-10">
          With modern clinics and highly trained specialists, patients achieve both functional and aesthetic results. 
        </p>
      </div>
    </section>

    <section className="bg-white py-24 px-6 text-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-20 tracking-tight">
        Our Comprehensive Approach To Care 
      </h2>
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* The signature blue dot indicator from the reference */}
            <div className="w-3 h-3 bg-[#00669b] rounded-full mb-8 shadow-[0_0_10px_rgba(0,102,155,0.3)]" />
            <h4 className="text-xs font-black tracking-[0.15em] text-gray-900 mb-6 uppercase">
              {step.title}
            </h4>
            <p className="text-gray-500 text-[15px] leading-relaxed max-w-[280px]">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>

    
 <section className="bg-gray-50 py-24 px-6 font-sans">
  <div className="max-w-3xl mx-auto">

    {/* Header */}
    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-14 tracking-tight">
      Why Choose Brazil?
    </h2>

    {/* Timeline / Steps Style */}
    <div className="relative">

      {/* Vertical Line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200"></div>

      <div className="space-y-10">

        {featureslaststep.map((feature, index) => (
          <div key={index} className="relative flex items-start gap-6">

            {/* Dot */}
            <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white border-2 border-teal-600 text-teal-600 font-bold text-sm shadow-sm">
              {index + 1}
            </div>

            {/* Content */}
            <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
              <p className="text-lg md:text-xl font-medium text-gray-800 leading-relaxed">
                {feature}
              </p>
            </div>

          </div>
        ))}

      </div>
    </div>

  </div>
</section>
    </>);
}