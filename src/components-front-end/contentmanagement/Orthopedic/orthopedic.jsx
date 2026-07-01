"use client";
import HowItWorks from "@/components-front-end/homepage/howItWorks";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";



const faqs = [
  {
    question: "Is orthopedic surgery in Brazil safe for international patients?",
    answer:
      "Yes, orthopedic surgery in Brazil can be safe for international patients when they choose experienced doctors and well-referenced clinics. One of our key roles is to carefully curate clinics and surgeons that meet the quality, safety, communication, and care standards international patients expect.",
  },
  {
    question: "How long do I need to stay in Brazil after surgery?",
    answer:
      "It depends on the procedure. For arthroscopic or minor ligament repairs, 7–10 days is often sufficient. For major joint replacements like hip or knee arthroplasty, plan for at least 14–21 days before flying, to allow for initial rehabilitation and surgeon clearance. Your surgeon will give you a specific timeline. We factor this into your planning from day one.",
  },
  {
    question: "Will I need physiotherapy after my surgery?",
    answer:
      "Yes, for almost all orthopedic procedures particularly joint replacements and ligament reconstruction. Most Brazilian orthopedic centers include initial physiotherapy sessions as part of your recovery plan, and we'll help you understand what's included before you commit.",
  },
  {
    question: "Will I be able to communicate with the clinic in English?",
    answer:
      "Top clinics that regularly treat international patients will have English-speaking patient coordinators. We specifically work with clinics that have this in place. We also provide coordination support throughout, so you're never trying to navigate language barriers alone.",
  },
  {
    question:
      "How is “I Travel For Health” different from a regular medical tourism website?",
    answer:
      "We are a physician-led medical tourism platform in Brazil, not just a directory. Clinics and surgeons in our network are reviewed for medical quality and patient-care standards using our own knowledge as physicians in the selection process. Any promoted listings or packages, where applicable, do not replace our clinical review process or determine medical suitability.",
  },
  {
    question: "Is there a cost to use your service?",
    answer:
      "Our initial consultation and matching service is free. We explain any fees clearly before you commit to anything. There are no hidden charges.",
  },
  {
    question: "What if I have a complication after I return home?",
    answer:
      "We work with clinics that offer post-operative remote consultation. Before you travel, we'll make sure you understand your surgeon's follow-up protocol and what to do if you have concerns after returning. Our team also remains reachable to help you navigate any questions.",
  },
];


export function Orthopedic() {


     const [clinics,setClinics] = useState([]);
            const [clinicsimage,setClinicsImage] = useState([]);
            const [visible, setVisible] = useState(4);
            const [openIndex, setOpenIndex] = useState(0);
        
        
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
                        "specialization": "Orthopedic",
                        "treatments": [
                            "Hip Replacement (Total Hip Arthroplasty)",
                            "Knee Replacement (Total Knee Arthroplasty)",
                            "Sports Injuries & Ligament Reconstruction",
                            "Spine Treatments"
                           
                        ]
                    })
                });
                if(res.ok){
                    const result= await res.json();
                    setClinics(result.clinics);
                    setClinicsImage(result.clinicimages);
                }
            }
    



    return (<>
        <main className="relative overflow-hidden">


            <section
                className="relative min-h-screen"
                style={{ backgroundColor: "rgb(242, 244, 245)" }}>

                <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-10">
                    <div className="max-w-4xl">
                        <span className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-700">
                            Medical Tourism Excellence
                        </span>
                        <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                            Orthopedic Surgery in Brazil: Best Clinics, Costs, Procedures and Medical Travel Support

                        </h1>
                    </div>
                </div>
                <div className="px-6 pb-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 flex flex-col items-start gap-6 rounded-xl border border-gray-200 bg-white p-6 shadow-xl md:flex-row md:items-center md:p-8">
                            <div className="relative flex-shrink-0">
                                <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-blue-100 bg-gray-100">
                                    <img
                                        src={`/images/erikokuma.png`}
                                        alt="Dr. Erick Okuma, Anesthesiologist"
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
                                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600">
                                        Medical Review
                                    </span>
                                    <div className="h-px flex-grow bg-gray-200" />
                                </div>
                                <p className="leading-relaxed text-gray-600">
                                    <span className="font-bold text-gray-900">
                                        Medically reviewed by  Dr. Erick Okuma
                                    </span>
                                   , Anesthesiologist, CRM-PR 36384, Curitiba, Brazil. Board-Certified Anesthesiologist with the Brazilian Society of Anesthesiology (SBA), with over 6 years of experience providing anesthesia services for both routine and highly complex surgical procedures, including transplantation, cardiac surgery, neurosurgery, oncologic surgery, and major orthopedic cases.
                                </p>
                            </div>
                        </div>
                        <div className="max-w-4xl">
                            <div className="mb-8 space-y-4">
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Brazil is fast becoming one of the most trusted destinations for orthopedic surgery, particularly for joint replacement, spine care, and sports injury treatment.The country has a strong network of private hospitals, experienced orthopedic surgeons, modern surgical infrastructure, and rehabilitation-focused care in major cities like São Paulo, Rio de Janeiro, Curitiba, Brasília, and Porto Alegre.


                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Demand for orthopedic procedures across Latin America is growing at a<b> compound annual rate of nearly 19% through 2029,</b> as patients increasingly look beyond the US for high-quality, affordable care. A knee replacement that costs $30,000–$50,000 in the US typically runs $6,500–$9,000 in Brazil. Hip replacement, which can exceed $35,000–$60,000 in the US, is generally available for $7,000–$10,000. These aren't compromises on quality as Brazilian orthopedic centers increasingly use the same robotic navigation systems and FDA-approved implants found in top US hospitals.


                                </p>
                                <p className="italic text-gray-500">
                                    (Source: MNewsweek/Statista Latin America Hospital Rankings)


                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    At I Travel For Health, our medical team helps you compare trusted orthopedic clinics in Brazil, review surgeon credentials, understand estimated costs, and plan your treatment journey with care.

                                </p>
                            </div>
                            <button className="rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white transition hover:bg-cyan-700">
                                Get a free treatment estimate

                            </button>
                        </div>
                    </div>
                </div>
            </section>



            {clinics.length > 0 && (
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center rounded-full bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700 ring-1 ring-cyan-200">
                                Verified Orthopedic Clinics
                            </span>

                            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                Top-Rated Orthopedic Surgery Clinics in Brazil

                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Every clinic listed here has been reviewed by our medical team. We only list facilities with board-certified surgeons, international patient experience, and verifiable safety standards.

                            </p>
                        </div>



                        <section className="mb-16">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {clinics.slice(0, visible).map((item) => (
                                    <div
                                        key={item.uuid}
                                        className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="h-56 overflow-hidden">
                                            <img
                                                src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=clinic/banner/${clinicsimage.find(
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
                                                    onClick={() => {
                                                        window.location.href = `/clinics/${item.slug}`;
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




                        <div className="mt-20 overflow-hidden rounded-[32px] bg-gradient-to-r from-cyan-600 to-cyan-700 p-10 text-white lg:p-14">
                            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                                <div className="max-w-3xl">
                                    <h3 className="text-3xl font-bold">
                                        Not sure which clinic is right for you?
                                    </h3>

                                    <p className="mt-4 text-lg leading-8 text-cyan-50">
                                        Tell us your treatment goal and budget. Our team will match you
                                        with the right clinic, in the right city, at the right price.
                                    </p>
                                </div>

                                <button className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-cyan-700 transition hover:scale-105">
                                    Get My Free Match →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}


            <section className="bg-slate-50 py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            {/* Left */}
                            <div className="max-w-xl">
                                <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                                    Orthopedic Treatments
                                </span>

                                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                    Popular Orthopedic Surgery Procedures in Brazil
                                </h2>

                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    Explore the most requested orthopedic procedures performed by
                                    experienced specialists across Brazil.
                                </p>
                            </div>

                            {/* Procedure Buttons */}
                            <div className="flex max-w-3xl flex-wrap gap-4">
                                {[
                                    "Hip Replacement (Total Hip Arthroplasty)",
                                    "Knee Replacement (Total Knee Arthroplasty)",
                                    "Sports Injuries & Ligament Reconstruction",
                                    "Spine Treatments",
                                ].map((procedure) => (
                                    <button
                                        key={procedure}
                                        className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500 hover:bg-cyan-50 hover:text-cyan-700 hover:shadow-md"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-100 transition group-hover:bg-cyan-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-cyan-700 group-hover:text-white"
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

                                        <span>{procedure}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[1fr_520px] lg:items-start">
                        {/* Left Content */}
                        <div>
                            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                                Procedure Pricing
                            </span>

                            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                Orthopedic Surgery Cost in Brazil?
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Costs in Brazil are significantly lower than in the US or Western
                                Europe, not because of lower standards, but because of lower
                                operational costs, favorable exchange rates, and a highly competitive
                                market with thousands of qualified surgeons. Alongside  are average ranges
                                for the most common procedures, including what you might budget for
                                accommodation and travel.
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

                        {/* Pricing Card */}
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                            <div className="bg-cyan-600 px-8 py-6">
                                <h3 className="text-2xl font-bold text-white">
                                    Estimated Procedure Costs
                                </h3>

                                <p className="mt-2 text-cyan-100">
                                    Average private hospital pricing in Brazil
                                </p>
                            </div>

                            <div className="divide-y divide-slate-200">
                                {[
                                    {
                                        procedure: "Hip Replacement (Total Hip Arthroplasty)",
                                        cost: "USD 7,000 – 10,000",
                                    },
                                    {
                                        procedure: "Knee Replacement (Total Knee Arthroplasty)",
                                        cost: "USD 6,500 – 9,000",
                                    },
                                    {
                                        procedure:
                                            "Sports Injury & Ligament Reconstruction (e.g. ACL)",
                                        cost: "USD 4,500 – 8,000",
                                    },
                                    {
                                        procedure: "Spine Treatments (e.g. Spinal Fusion)",
                                        cost: "USD 10,000 – 15,000",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.procedure}
                                        className="flex items-center justify-between gap-6 px-8 py-6 transition hover:bg-slate-50"
                                    >
                                        <div>
                                            <h4 className="font-semibold text-slate-900">
                                                {item.procedure}
                                            </h4>
                                        </div>

                                        <div className="shrink-0 rounded-xl bg-cyan-50 px-4 py-2 text-lg font-bold text-cyan-700">
                                            {item.cost}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-200 bg-slate-50 p-6">
                                <button className="w-full rounded-xl bg-cyan-600 px-6 py-4 font-semibold text-white transition hover:bg-cyan-700">
                                    Get a Personalized Cost Estimate →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>        


            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[420px_1fr]">
                        {/* Left */}
                        <div>
                            <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                                Travel Budget
                            </span>

                            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                                What Else to Budget For
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Besides your surgery, it's helpful to plan for travel,
                                accommodation, and other related expenses during your stay in Brazil.
                            </p>

                            <div className="mt-8 rounded-3xl border border-cyan-200 bg-white p-6 shadow-sm">
                                <h3 className="text-xl font-semibold text-slate-900">
                                    Many clinics offer all-inclusive packages
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    Many clinics offer all-inclusive packages that bundle surgery,
                                    accommodation, and transfers. Ask us about package options.
                                </p>

                                <button className="mt-6 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700">
                                    Ask About Package Options →
                                </button>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
                            {/* Header */}
                            <div className="grid grid-cols-[1fr_auto] items-center bg-slate-900 px-8 py-5">
                                <h3 className="font-semibold text-white">
                                    Item
                                </h3>

                                <h3 className="font-semibold text-white">
                                    Estimated Cost
                                </h3>
                            </div>

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
                                    item: "Pre-operative tests & imaging",
                                    price: "$150 – $400",
                                },
                                {
                                    item: "Mobility aids & physiotherapy sessions",
                                    price: "$100 – $300",
                                },
                                {
                                    item: "Airport transfers",
                                    price: "$30 – $80",
                                },
                            ].map((item, index) => (
                                <div
                                    key={item.item}
                                    className="grid grid-cols-[1fr_auto] items-center gap-6 border-t border-slate-100 px-8 py-6 transition-colors hover:bg-slate-50"
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Number Badge */}
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-sm font-bold text-cyan-700">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <h4 className="font-semibold text-slate-900">
                                            {item.item}
                                        </h4>
                                    </div>

                                    <div className="rounded-xl bg-cyan-50 px-4 py-2 font-bold text-cyan-700">
                                        {item.price}
                                    </div>
                                </div>
                            ))}

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
                        <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                            Expert Guidance
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            How to Choose the Right Orthopedic Surgeon in Brazil: Tips by Experts
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Choosing a surgeon is the most important decision you'll make. Here's
                            what to look for:
                        </p>
                    </div>

                    {/* Tips */}
                    <div className="mx-auto mt-16 max-w-5xl">
                        {[
                            {
                                title: "Certification of the surgeon",
                                body: "Choose a surgeon who is board-certified by the SBOT (Sociedade Brasileira de Ortopedia e Traumatologia) or by the relevant Brazilian specialty board for the specific procedure and body area being treated.",
                            },
                            {
                                title: "Ask about implant brand and technology used",
                                body: "Reputable surgeons will explain which implant brand they use (e.g. FDA-approved or CE-marked systems) and whether the procedure is robotic-assisted or traditional.",
                            },
                            {
                                title: "Confirm the surgical facility is accredited.",
                                body: "Clinics serving international patients should meet all the Brazilian health authorities standards, including having a certified physician, who is legally responsible for continually enforcing those standards. Accreditation by international bodies (ISO or JCI) is a strong additional signal.",
                            },
                            {
                                title: "Understand your recovery and rehabilitation plan",
                                body: "Ask how long you should stay in Brazil, when you can fly back, what physiotherapy is included, and how follow-up and complications are handled after you return home.",
                            },
                            {
                                title: "Know the complete pricing",
                                body: "Very low prices may exclude important costs such as imaging, anesthesia, implants, hospital stay, physiotherapy, or revision support. Ask for a complete, itemized quote.",
                            },
                        ].map((tip, index) => (
                            <div
                                key={index}
                                className="relative flex gap-6 border-l-2 border-cyan-200 pl-8 pb-10 last:pb-0"
                            >
                                {/* Number */}
                                <div className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-cyan-600 text-sm font-bold text-white shadow">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                {/* Content */}
                                <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md">
                                    <h3 className="text-xl font-semibold text-slate-900">
                                        {tip.title}
                                    </h3>

                                    <p className="mt-4 leading-8 text-slate-600">
                                        {tip.body}
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
                        <span className="inline-flex items-center rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-700">
                            Frequently Asked Questions
                        </span>

                        <h3 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                            Frequently Asked Questions
                        </h3>
                    </div>

                    {/* Accordion */}
                    <div className="mt-12 space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all"
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? -1 : index)}
                                        className="flex w-full items-center justify-between px-6 py-5 text-left"
                                    >
                                        <span className="pr-6 text-lg font-semibold text-slate-900">
                                            {faq.question}
                                        </span>

                                        <ChevronDown
                                            className={`h-5 w-5 shrink-0 text-cyan-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid overflow-hidden transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="border-t border-slate-100 px-6 py-6">
                                                <p className="leading-8 text-slate-600">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>



                </div>
            </section>




            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-5xl px-6 lg:px-8">
                    <footer className="border-t border-slate-300 bg-[#f2f4f5] py-6">
                        <div className="mx-auto max-w-7xl px-6">
                            <p className="text-center text-sm leading-7 text-slate-600">
                                Page last updated: June,2026 | Medically reviewed by<b> Dr. Thiago Lima Barreto da Serra e Silva,</b> Anesthesiologist, CRM-PR 28659 - Curitiba, Brazil. Board-Certified Anesthesiologist


                            </p>
                        </div>
                    </footer>
                </div>

            </section>          




        </main>
    </>);
}