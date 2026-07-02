"use client";
import HowItWorks from "@/components-front-end/homepage/howItWorks";
import { ChevronDown,BadgeCheck,Images,Building2,HeartPulse,Wallet, } from "lucide-react";
import { useEffect, useState } from "react";
export function PlasticSurgery(){



    const [clinics,setClinics] = useState([]);
    const [clinicsimage,setClinicsImage] = useState([]);
    const [visible, setVisible] = useState(4);


    useEffect(()=>{
        fetchClinic();
    },[]);

    const fetchClinic = async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/search-clinic`,{
            method :"Post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                "specialization": "Plastic Surgery ",
                "treatments": [
                    "Liposuction",
                    "Breast augmentation",
                    "Tummy tuck",
                    "Rhinoplasty",
                    "Mommy makeover",
                    "Facelift"
                ]
            })
        });
        if(res.ok){
            const result= await res.json();
            setClinics(result.clinics);
            setClinicsImage(result.clinicimages);
        }
    }








    return(<>

        <main className="relative overflow-hidden">

            <section
                className="relative min-h-screen"
                style={{ backgroundColor: "rgb(242, 244, 245)" }}>

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-10">
                    <div className="max-w-4xl">
                        <span className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                            Medical Tourism Excellence
                        </span>
                        <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                            Plastic Surgery in Brazil: Best Clinics, Costs, Procedures and Medical
                            Travel Support
                        </h1>
                    </div>
                </div>
                <div className="px-6 pb-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 flex flex-col items-start gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-xl md:flex-row md:items-center md:p-8">
                            <div className="relative flex-shrink-0">
                                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-blue-100 bg-gray-100">
                                    <img
                                        src={`/images/thiago.png`}
                                        alt="Dr. Thiago Lima Barreto da Serra e Silva"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white">
                                    <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="h-5 w-5"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M2.25 12c0-1.51.82-2.82 2.04-3.52a3.75 3.75 0 0 1 4.19-4.19A4.125 4.125 0 0 1 12 2.25c1.51 0 2.82.82 3.52 2.04a3.75 3.75 0 0 1 4.19 4.19A4.125 4.125 0 0 1 21.75 12c0 1.51-.82 2.82-2.04 3.52a3.75 3.75 0 0 1-4.19 4.19A4.125 4.125 0 0 1 12 21.75a4.125 4.125 0 0 1-3.52-2.04 3.75 3.75 0 0 1-4.19-4.19A4.125 4.125 0 0 1 2.25 12Zm13.28-2.53a.75.75 0 1 0-1.06-1.06l-3.22 3.22-1.72-1.72a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.06 0l3.75-3.75Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-grow">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">
                                        Medical Review
                                    </span>
                                    <div className="h-px flex-grow bg-gray-200" />
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    <span className="font-bold text-gray-900">
                                        Medically reviewed by Dr. Thiago Lima Barreto da Serra e Silva
                                    </span>
                                    , Anesthesiologist, CRM-PR 28659 - Curitiba, Brazil. Board-Certified
                                    Anesthesiologist, TSA Certification (Superior Title in
                                    Anesthesiology) with the Brazilian Anesthesiology Society, with over
                                    15 years of experience providing anesthesia services for the
                                    simplest to the most complex surgical cases.
                                </p>
                            </div>
                        </div>
                        <div className="max-w-4xl">
                            <div className="mb-8 space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Brazil is one of the world's leading destinations for plastic
                                    surgery. According to the International Society of Aesthetic Plastic
                                    Surgery, Brazil ranks among the top countries globally for aesthetic
                                    procedures and plastic surgeons, with approximately 2.3 million
                                    surgeries carried out in 2024 alone. It ranks second globally for
                                    total cosmetic procedures, behind only the United States. The
                                    country has over 7,000 licensed plastic surgeons, and its medical
                                    tourism market, valued at $3.7 billion in 2025, is growing at nearly
                                    18% annually.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Plastic surgery procedures that cost $10,000–$15,000 in the US
                                    routinely run $3,000–$6,500 in Brazil, without sacrificing quality.
                                    Brazilian surgeons are internationally recognized for body
                                    contouring, liposuction, and procedures like the Brazilian Butt Lift
                                    techniques they helped pioneer.
                                </p>
                                <p className="italic text-gray-500">
                                    (Source: ISAPS, Associação Médica Brasileira, IMARC Group)
                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    At I Travel For Health, our medical team helps you compare trusted
                                    plastic surgery clinics in Brazil, review doctor credentials,
                                    understand estimated costs, and plan your treatment journey with
                                    care.
                                </p>
                            </div>
                            <button className="btn btn-primary">
                                Get a free treatment estimate

                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-[#f8fafb] py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {clinics.length > 0 &&(<>
                        <div className="mb-16">
                            <h2 className="mb-6 text-4xl font-bold text-slate-900 md:text-5xl">
                                Top-Rated Plastic Surgery Clinics in Brazil
                            </h2>

                            <p className="max-w-4xl text-lg leading-8 text-slate-600">
                                Every clinic listed here has been reviewed by our medical team.
                                We only list facilities with board-certified surgeons,
                                international patient experience, and verifiable safety
                                standards.
                            </p>
                        </div>
                    </>) }                    
                        
                         

                   {clinics.length > 0 && (
  <section className="mb-16">
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {clinics.slice(0, visible).map((item) => (
        <div
          key={item.uuid}
          className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="h-56 overflow-hidden">
            <img
              src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=clinic/banner/${
                clinicsimage.find(
                  (img) =>
                    img.clinicuuid === item.uuid &&
                    img.type === "banner"
                )?.Images
              }`}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="flex flex-1 flex-col p-6">
            <h3 className="mb-2 text-xl font-semibold text-slate-900">
              {item.name}
            </h3>

            <p className="mb-6 text-sm text-slate-600">
             {item.street} ,{item.complement} {item.neighborhood} {item.citycep}-{item.state},{item.cep}
            </p>

            <div className="mt-auto">
              <button
                onClick={()=>{
                    window.location.href=`/clinics/${item.slug}`;
                }}
              className="inline-flex items-center gap-2 font-medium text-teal-600 transition-colors hover:text-teal-700">
                View Details
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Load More Button */}
    {visible < clinics.length && (
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => setVisible((prev) => prev + 4)}
          className="rounded-full bg-teal-600 px-8 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-teal-700 hover:shadow-lg"
        >
          Load More Clinics
        </button>
      </div>
    )}
  </section>
)}

                   

                    <section className="bg-slate-50 py-16">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
                                <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-center">
                                    {/* Left */}
                                    <div>
                                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                            Popular Procedures
                                        </span>

                                        <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                            Popular Plastic Surgery Procedures in Brazil
                                        </h2>

                                        <p className="mt-4 text-lg leading-8 text-slate-600">
                                            Discover the most requested cosmetic and reconstructive procedures
                                            performed by experienced plastic surgeons across Brazil.
                                        </p>
                                    </div>

                                    {/* Right */}
                                    <div className="flex flex-wrap gap-4">
                                        {[
                                            "Breast augmentation and reduction",
                                            "Liposuction and body contouring",
                                            "Tummy tuck (abdominoplasty)",
                                            "Facelift and eyelid surgery",
                                            "Rhinoplasty",
                                        ].map((item) => (
                                            <a
                                                key={item}
                                                href="#"
                                                className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 hover:shadow-md"
                                            >
                                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-600">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-4 w-4 text-blue-700 transition group-hover:text-white"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 5l7 7-7 7"
                                                        />
                                                    </svg>
                                                </span>

                                                <span>{item}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>



                    <section className="bg-white py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="grid gap-14 lg:grid-cols-[1fr_520px] lg:items-start">
                                {/* Left */}
                                <div>
                                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                        Procedure Pricing
                                    </span>

                                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                        Plastic Surgery Cost in Brazil?
                                    </h2>

                                    <p className="mt-6 text-lg leading-8 text-slate-600">
                                        Costs in Brazil are significantly lower than in the US or Western
                                        Europe, not because of lower standards, but because of lower
                                        operational costs, favorable exchange rates, and a highly
                                        competitive market with thousands of qualified surgeons. Below are
                                        average ranges for the most common procedures, including what you
                                        might budget for accommodation and travel.
                                    </p>

                                    {/* Note */}
                                    <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
                                        <div className="flex gap-4">
                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100">
                                                <svg
                                                    className="h-5 w-5 text-amber-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 9v4m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
                                                    />
                                                </svg>
                                            </div>

                                            <p className="text-sm leading-7 text-slate-700">
                                                <span className="font-semibold">
                                                    All figures are estimates in USD.
                                                </span>{" "}
                                                Final pricing depends on surgeon, clinic, complexity of the
                                                procedure, and city. We'll provide you with a personalized quote
                                                after your free consultation.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                    <div className="bg-blue-600 px-8 py-6">
                                        <h3 className="text-2xl font-bold text-white">
                                            Estimated Procedure Costs
                                        </h3>

                                        <p className="mt-2 text-blue-100">
                                            Average private plastic surgery pricing in Brazil
                                        </p>
                                    </div>

                                    <div className="divide-y divide-slate-200">
                                        {[
                                            {
                                                procedure: "Liposuction",
                                                cost: "USD 4,250–6,000",
                                            },
                                            {
                                                procedure: "Breast augmentation",
                                                cost: "From around USD 4,500",
                                            },
                                            {
                                                procedure: "Tummy tuck",
                                                cost: "USD 5,000–10,000+",
                                            },
                                            {
                                                procedure: "Rhinoplasty",
                                                cost: "USD 1,500–9,000+",
                                            },
                                            {
                                                procedure: "Mommy makeover",
                                                cost: "USD 8,000–15,000+",
                                            },
                                            {
                                                procedure: "Facelift",
                                                cost: "USD 2,000–12,000+",
                                            },
                                        ].map((item) => (
                                            <div
                                                key={item.procedure}
                                                className="flex items-center justify-between gap-6 px-8 py-6 transition hover:bg-slate-50"
                                            >
                                                <h3 className="font-semibold text-slate-900">
                                                    {item.procedure}
                                                </h3>

                                                <div className="shrink-0 rounded-xl bg-blue-50 px-4 py-2 text-lg font-bold text-blue-700">
                                                    {item.cost}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-slate-200 bg-slate-50 p-6">
                                        <button className="w-full rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white transition hover:bg-blue-700">
                                            Get a Personalized Cost Estimate →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>                



                    <section className="bg-slate-50 py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="grid gap-14 lg:grid-cols-[1fr_520px] lg:items-start">
                                {/* Left */}
                                <div>
                                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                        Travel Budget
                                    </span>

                                    <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                        What Else to Budget For
                                    </h2>

                                    <div className="mt-8 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
                                        <h3 className="text-xl font-semibold text-slate-900">
                                            Planning your trip
                                        </h3>

                                        <p className="mt-4 leading-7 text-slate-600">
                                            Many clinics offer all-inclusive packages that bundle surgery,
                                            accommodation, and transfers. Ask us about package options.
                                        </p>

                                        <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700">
                                            Ask About Package Options →
                                        </button>
                                    </div>
                                </div>

                                {/* Right */}
                                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                                    {/* Header */}
                                    <div className="grid grid-cols-[1fr_auto] items-center bg-blue-600 px-8 py-5">
                                        <h3 className="font-semibold text-white">Item</h3>
                                        <h3 className="font-semibold text-white">Estimated Cost</h3>
                                    </div>

                                    <div className="divide-y divide-slate-200">
                                        {[
                                            {
                                                item: "Round-trip flights (from US)",
                                                price: "$600 – $1,200",
                                            },
                                            {
                                                item: "Recovery accommodation (per week)",
                                                price: "$400 – $900",
                                            },
                                            {
                                                item: "Pre-operative tests",
                                                price: "$100 – $300",
                                            },
                                            {
                                                item: "Post-op garments & medication",
                                                price: "$100 – $250",
                                            },
                                            {
                                                item: "Airport transfers",
                                                price: "$30 – $80",
                                            },
                                        ].map((item, index) => (
                                            <div
                                                key={item.item}
                                                className="grid grid-cols-[1fr_auto] items-center gap-6 px-8 py-6 transition hover:bg-slate-50"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                                                        {String(index + 1).padStart(2, "0")}
                                                    </div>

                                                    <h4 className="font-semibold text-slate-900">
                                                        {item.item}
                                                    </h4>
                                                </div>

                                                <div className="rounded-xl bg-blue-50 px-4 py-2 font-bold text-blue-700">
                                                    {item.price}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-slate-200 bg-slate-50 px-8 py-5">
                                        <p className="text-sm leading-7 text-slate-600">
                                            Many clinics offer all-inclusive packages that bundle surgery,
                                            accommodation, and transfers. Ask us about package options.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>




                    <section className="bg-white py-20">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            {/* Heading */}
                            <div className="mx-auto max-w-4xl text-center">
                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                    Expert Guidance
                                </span>

                                <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                    How to Choose the Right Plastic Surgeon in Brazil: Tips by Experts
                                </h2>
                            </div>

                            {/* Timeline */}
                            <div className="mx-auto mt-16 max-w-5xl">
                                {[
                                    {
                                        title: "Certification of the surgeon",
                                        body: "Choose a surgeon who is board-certified by the SBCP (Sociedade Brasileira de Cirurgia Plástica) or by the relevant Brazilian specialty board for the specific procedure and body area being treated.",
                                    },
                                    {
                                        title: "Ask to see before-and-after photos",
                                        body: "A reputable surgeon will always have a portfolio. Look for cases that are similar to your own goals in terms of body type and procedure.",
                                    },
                                    {
                                        title: "Confirm the surgical facility is accredited",
                                        body: "Clinics serving international patients should meet the all the Brazilian health authorities standards, including having a certified physician, who is legally responsible for continuously enforcing those standards. Accreditation by international bodies (ISO or JCI) is a strong additional signal.",
                                    },
                                    {
                                        title: "Understand your recovery plan",
                                        body: "Ask how long you should stay in Brazil, when you can fly back, what follow-up is included, and how complications are handled after you return home.",
                                    },
                                    {
                                        title: "Know the complete pricing",
                                        body: "Very low prices may exclude important costs such as tests, anaesthesia, hospital stay, garments, medication, or revision support.",
                                    },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="relative flex gap-6 border-l-2 border-blue-200 pl-8 pb-10 last:pb-0"
                                    >
                                        {/* Number */}
                                        <div className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-sm font-bold text-white shadow">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        {/* Card */}
                                        <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                                            <h3 className="text-xl font-semibold text-slate-900">
                                                {item.title}
                                            </h3>

                                            <p className="mt-4 leading-8 text-slate-600">
                                                {item.body}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>



                   <HowItWorks title={"How “I Travel For Health” Helps – Our Process"} />



                    <section className="bg-slate-50 py-20">
                        <div className="mx-auto max-w-5xl px-6 lg:px-8">
                            {/* Heading */}
                            <div className="text-center">
                                <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                    Frequently Asked Questions
                                </span>

                                <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                    Frequently Asked Questions
                                </h2>

                                <p className="mt-5 text-lg leading-8 text-slate-600">
                                    Find answers to the most common questions about plastic surgery in Brazil.
                                </p>
                            </div>

                            {/* FAQs */}
                            <div className="mt-12 space-y-5">

                                <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-6 text-lg font-semibold text-slate-900">
                                        Is plastic surgery in Brazil safe for international patients?
                                        <ChevronDown className="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-slate-100 px-7 py-6 leading-8 text-slate-600">
                                        Yes, it can be safe when choosing experienced doctors and accredited
                                        facilities. Brazil has some of the world's strictest medical
                                        regulations for plastic surgery.
                                    </div>
                                </details>

                                <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-6 text-lg font-semibold text-slate-900">
                                        How long do I need to stay in Brazil after surgery?
                                        <ChevronDown className="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-slate-100 px-7 py-6 leading-8 text-slate-600">
                                        Depends on procedure, typically 7-10 days for minor surgeries and
                                        14-21 days for major procedures to ensure proper initial healing
                                        before flying.
                                    </div>
                                </details>

                                <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-6 text-lg font-semibold text-slate-900">
                                        Can I combine multiple procedures in one trip?
                                        <ChevronDown className="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-slate-100 px-7 py-6 leading-8 text-slate-600">
                                        Yes, this is often done to reduce total recovery time and overall
                                        costs, provided the combined surgery duration and complexity are
                                        within safe limits for the patient.
                                    </div>
                                </details>

                                <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-6 text-lg font-semibold text-slate-900">
                                        Will I be able to communicate with the clinic in English?
                                        <ChevronDown className="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-slate-100 px-7 py-6 leading-8 text-slate-600">
                                        Top clinics catering to international patients always have English
                                        coordinators and many surgeons have international training and are
                                        fluent in English.
                                    </div>
                                </details>

                                <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-6 text-lg font-semibold text-slate-900">
                                        How is “I Travel For Health” different?
                                        <ChevronDown className="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-slate-100 px-7 py-6 leading-8 text-slate-600">
                                        We are a physician-led platform with a rigorous clinical review
                                        process. We don't just list clinics; we vet them based on medical
                                        outcomes and safety data.
                                    </div>
                                </details>

                                <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-6 text-lg font-semibold text-slate-900">
                                        Is there a cost to use your service?
                                        <ChevronDown className="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-slate-100 px-7 py-6 leading-8 text-slate-600">
                                        Initial consultation and matching with clinics is free of charge for
                                        patients. We facilitate the connection to ensure you find the right
                                        medical match.
                                    </div>
                                </details>

                                <details className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all open:shadow-md">
                                    <summary className="flex cursor-pointer list-none items-center justify-between px-7 py-6 text-lg font-semibold text-slate-900">
                                        What if I have a complication?
                                        <ChevronDown className="h-5 w-5 text-blue-600 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <div className="border-t border-slate-100 px-7 py-6 leading-8 text-slate-600">
                                        Post-op remote consultation is included in our service packages. We
                                        coordinate between your local doctor and the Brazilian surgeon to
                                        ensure continuity of care.
                                    </div>
                                </details>
                            </div>


                        </div>
                    </section>


                     <div className="mb-16 rounded-2xl bg-[#36b2ab] px-8 py-10 md:px-16 md:py-14">
                        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

                            <div className="max-w-3xl">
                                <h3 className="mb-4 text-3xl font-semibold text-[#073b44] md:text-5xl">
                                    Not sure which clinic is right for you?
                                </h3>

                                <p className="max-w-2xl text-lg leading-9 text-[#0b4d56]">
                                    Tell us your procedure and budget. Our team will match you with
                                    the right clinic, in the right city, at the right price.
                                </p>
                            </div>

                            <button className="shrink-0 rounded-xl bg-[#006d68] px-10 py-5 text-xl font-semibold text-white shadow-lg transition-all duration-300 hover:bg-[#005b57]">
                                Get My Free Match →
                            </button>

                        </div>
                    </div>


                    <footer className="border-t border-slate-300 bg-[#f2f4f5] py-6">
                        <div className="mx-auto max-w-7xl px-6">
                            <p className="text-center text-sm leading-7 text-slate-600">
                                Page last updated: June, 2026 | Medically reviewed by Dr. Thiago
                                Lima Barreto da Serra e Silva, Anesthesiologist, CRM-PR 28659 -
                                Curitiba, Brazil. Board-Certified Anesthesiologist
                            </p>
                        </div>
                    </footer>


                </div>
            </section>

  


        </main>
    </>);
}