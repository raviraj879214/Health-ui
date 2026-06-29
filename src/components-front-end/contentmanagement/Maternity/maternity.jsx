"use client";
import HowItWorks from "@/components-front-end/homepage/howItWorks";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";


const faqs = [
  {
    question: "Is giving birth in Brazil safe for international patients?",
    answer:
      "Yes, giving birth in Brazil can be safe for international patients when they choose experienced obstetric teams and well-referenced hospitals. One of our key roles is to carefully curate hospitals and physicians that meet the quality, safety, communication, and care standards international patients expect.",
  },
  {
    question: "How long do I need to stay in Brazil before and after delivery?",
    answer:
      "Most patients arrive at least 4–6 weeks before their due date to complete final prenatal checks and settle in. After delivery, plan for at least 7–14 days in-country, depending on whether the birth is vaginal or cesarean and whether any follow-up care is needed for mother or baby. Your obstetrician will give you a specific timeline. We factor this into your planning from day one.",
  },
  {
    question: "Can I choose between a natural birth and a planned cesarean?",
    answer:
      "Yes, your preference matters and should be discussed with your obstetric team well in advance, based on your health, the baby's position, and any medical considerations. That said, birth is unpredictable even with a planned approach, your physician may need to adjust the plan during labor if a complication arises or the situation changes. We'll help you raise this with your hospital during consultation.",
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
    question:
      "What if there's a complication during delivery or after I return home?",
    answer:
      "We work with hospitals that have on-site NICU access and offer post-delivery remote consultation. Before you travel, we'll make sure you understand your obstetric team's protocol for complications and what to do if you have concerns after returning. Our team also remains reachable to help you navigate any questions.",
  },
];



export function Maternity(){


     const [openIndex, setOpenIndex] = useState(0);
    const [clinics, setClinics] = useState([]);
    const [clinicsimage, setClinicsImage] = useState([]);
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
                            "specialization": "Maternity",
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




    return (<>
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
                            Maternity & Birth Planning in Brazil: Best Clinics, Costs, Procedures and Medical Travel Support


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
                                    Planning a birth in another country is a very personal decision. For many families, it is about feeling supported, choosing the right maternity hospital, understanding delivery options clearly, and knowing that both mother and baby will have access to safe, well-coordinated care.



                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Brazil is considered for maternity and birth planning because of its private hospital network, experienced OB-GYN teams, neonatal care, planned delivery support, and more manageable costs compared to the US. In major cities like São Paulo, Rio de Janeiro, Curitiba, Brasília, and Porto Alegre, private maternity hospitals offer structured pregnancy care, delivery planning, anesthesia support, pediatric care, and postpartum follow-up.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    While in the US, a vaginal delivery with insurance typically runs $13,000–$15,500, and a cesarean delivery $19,000–$26,000 once facility and professional fees are combined. In Brazil's private hospitals, equivalent care is generally available for <b>$5,000–$8,000 for a vaginal birth and $6,500–$10,000 for a cesarean delivery</b>, inclusive of physician, hospital, and pediatrician fees.

                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Some families also consider Brazil because children born in the country are generally Brazilian citizens by birth. This can be part of the decision, but it should not be the only reason to plan childbirth abroad. The first priority should always be safe maternity care, the right hospital, proper newborn support, and a clear travel and recovery plan.

                                </p>


                                <p className="italic text-gray-500">
                                    (Source: FAIR Health Cost of Giving Birth Tracker, Peterson-KFF Health System Tracker)


                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    At I Travel For Health, our physician-led team helps international families compare trusted maternity hospitals in Brazil, understand delivery options, review doctor and hospital credentials, estimate costs, and plan the birth journey with care.


                                </p>
                            </div>
                            <button className="rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700">
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
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 ring-1 ring-emerald-200">
                                Verified Maternity  Clinics
                            </span>

                            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                Top-Rated Maternity  Surgery Clinics in Brazil

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




                        <div className="mt-20 overflow-hidden rounded-[32px] bg-gradient-to-r from-emerald-600 to-emerald-700 p-10 text-white lg:p-14">
                            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                                <div className="max-w-3xl">
                                    <h3 className="text-3xl font-bold">
                                        Not sure which clinic is right for you?
                                    </h3>

                                    <p className="mt-4 text-lg leading-8 text-emerald-50">
                                        Tell us your treatment goal and budget. Our team will match you
                                        with the right clinic, in the right city, at the right price.
                                    </p>
                                </div>

                                <button className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-emerald-700 transition hover:scale-105">
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
                                <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                                    Maternity Services
                                </span>

                                <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                                    Maternity & Birth Services in Brazil
                                </h2>

                                <p className="mt-4 text-lg leading-8 text-slate-600">
                                    Explore maternity care provided by experienced obstetricians and
                                    hospitals across Brazil.
                                </p>
                            </div>

                            {/* Service Buttons */}
                            <div className="flex max-w-3xl flex-wrap gap-4">
                                {[
                                    "Planned Cesarean Delivery",
                                    "Natural Childbirth",
                                    "Full Prenatal & Postnatal Care",
                                ].map((service) => (
                                    <button
                                        key={service}
                                        className="group inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-left font-medium text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 hover:shadow-md"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 transition group-hover:bg-emerald-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 text-emerald-700 transition group-hover:text-white"
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

                                        <span>{service}</span>
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
                            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                                Service Pricing
                            </span>

                            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                Maternity Care Cost in Brazil?
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Costs in Brazil are significantly lower than in the US or Western
                                Europe, not because of lower standards, but because of lower
                                operational costs, favorable exchange rates, and a private hospital
                                system built around personalized obstetric care. Below are average
                                ranges for the most common procedures, including what you might budget
                                for accommodation and travel.
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
                                        Final pricing depends on hospital, physician, length of stay, and
                                        any additional care required for mother or baby. We'll provide you
                                        with a personalized quote after your free consultation.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Pricing Card */}
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                            <div className="bg-emerald-600 px-8 py-6">
                                <h3 className="text-2xl font-bold text-white">
                                    Estimated Service Costs
                                </h3>

                                <p className="mt-2 text-emerald-100">
                                    Average private hospital pricing in Brazil
                                </p>
                            </div>

                            <div className="divide-y divide-slate-200">
                                {[
                                    {
                                        service: "Natural Childbirth (Vaginal Delivery)",
                                        cost: "USD 5,000 – 8,000",
                                    },
                                    {
                                        service: "Planned Cesarean Delivery",
                                        cost: "USD 6,500 – 10,000",
                                    },
                                    {
                                        service: "Full Prenatal Care Package (per trimester)",
                                        cost: "USD 1,500 – 3,000",
                                    },
                                    {
                                        service: "Postnatal Care & Follow-up (per month)",
                                        cost: "USD 500 – 1,200",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.service}
                                        className="flex items-center justify-between gap-6 px-8 py-6 transition hover:bg-slate-50"
                                    >
                                        <div>
                                            <h4 className="font-semibold text-slate-900">
                                                {item.service}
                                            </h4>
                                        </div>

                                        <div className="shrink-0 rounded-xl bg-emerald-50 px-4 py-2 text-lg font-bold text-emerald-700">
                                            {item.cost}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-slate-200 bg-slate-50 p-6">
                                <button className="w-full rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white transition hover:bg-emerald-700">
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
                            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                                Travel Budget
                            </span>

                            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900">
                                What Else to Budget For
                            </h2>

                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                Besides your maternity care, it's helpful to plan for travel,
                                accommodation, and additional support during your stay in Brazil.
                            </p>

                            <div className="mt-8 rounded-3xl border border-emerald-200 bg-white p-6 shadow-sm">
                                <h3 className="text-xl font-semibold text-slate-900">
                                    Many hospitals offer all-inclusive maternity packages
                                </h3>

                                <p className="mt-3 leading-7 text-slate-600">
                                    Many hospitals offer all-inclusive maternity packages that bundle
                                    delivery, hospital stay, and basic newborn care. Ask us about
                                    package options.
                                </p>

                                <button className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700">
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
                                    item: "Extended-stay accommodation (per week)",
                                    price: "$400 – $900",
                                },
                                {
                                    item: "Doula support (optional)",
                                    price: "$400 – $800",
                                },
                                {
                                    item: "Newborn pediatric check-ups",
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
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-emerald-700">
                                            {String(index + 1).padStart(2, "0")}
                                        </div>

                                        <h4 className="font-semibold text-slate-900">
                                            {item.item}
                                        </h4>
                                    </div>

                                    <div className="rounded-xl bg-emerald-50 px-4 py-2 font-bold text-emerald-700">
                                        {item.price}
                                    </div>
                                </div>
                            ))}

                            {/* Footer */}
                            <div className="border-t border-slate-200 bg-slate-50 px-8 py-5">
                                <p className="text-sm leading-7 text-slate-600">
                                    Many hospitals offer all-inclusive maternity packages that bundle
                                    delivery, hospital stay, and basic newborn care. Ask us about
                                    package options.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <HowItWorks title={"How “I Travel For Health” Helps – Our Process"} />   


            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    {/* Heading */}
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Expert Guidance
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            How to Choose the Right Maternity Hospital in Brazil: Tips by Experts
                        </h2>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Choosing where to give birth is one of the most important decisions
                            you'll make. Here's what to look for:
                        </p>
                    </div>

                    {/* Tips */}
                    <div className="mx-auto mt-16 max-w-5xl">
                        {[
                            {
                                title: "Certification of the obstetric team",
                                body: "Choose a hospital with obstetricians certified by FEBRASGO (Federação Brasileira das Associações de Ginecologia e Obstetrícia), the leading Brazilian board for OB-GYN specialists or by the relevant Brazilian specialty board for the specific procedure",
                            },
                            {
                                title: "Confirm the surgical facility is accredited",
                                body: "Clinics serving international patients should meet all the Brazilian health authorities standards, including having a certified physician, who is legally responsible for continually enforcing those standards. Accreditation by international bodies (ISO or JCI) is a strong additional signal.",
                            },
                            {
                                title: "Understand your birth plan and recovery support",
                                body: "Ask how the hospital supports your birth preference (natural or cesarean), whether a doula or midwife can be present, and what postnatal follow-up is included for both mother and baby.",
                            },
                            {
                                title: "Know the complete pricing",
                                body: "Very low prices may exclude important costs such as anesthesia, NICU access, extended hospital stay, or pediatric consultations. Ask for a complete, itemized quote.",
                            },
                        ].map((tip, index) => (
                            <div
                                key={index}
                                className="relative flex gap-6 border-l-2 border-emerald-200 pl-8 pb-10 last:pb-0"
                            >
                                {/* Number */}
                                <div className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-sm font-bold text-white shadow">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                {/* Content */}
                                <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-emerald-300 hover:shadow-md">
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


            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-5xl px-6 lg:px-8">
                    {/* Heading */}
                    <div className="text-center">
                        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
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
                                            className={`h-5 w-5 shrink-0 text-emerald-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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

                    {/* Bottom CTA */}
                    <div className="mt-12 rounded-3xl bg-emerald-600 p-8 text-center text-white">
                        <h4 className="text-2xl font-bold">
                            Still have questions?
                        </h4>

                        <p className="mt-3 text-emerald-50">
                            Speak with our medical travel team for personalized guidance,
                            hospital recommendations, and maternity care planning.
                        </p>

                        <button className="mt-6 rounded-xl bg-white px-8 py-3 font-semibold text-emerald-700 transition hover:bg-slate-100">
                            Get Free Consultation →
                        </button>
                    </div>
                </div>
            </section>


            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-5xl px-6 lg:px-8">
                    <footer className="border-t border-slate-300 bg-[#f2f4f5] py-6">
                        <div className="mx-auto max-w-7xl px-6">
                            <p className="text-center text-sm leading-7 text-slate-600">
                                Page last updated: June,2026 | Medically reviewed by <b> Dr. Thiago Lima Barreto da Serra e Silva,</b> Anesthesiologist, CRM-PR 28659 - Curitiba, Brazil. Board-Certified Anesthesiologist


                            </p>
                        </div>
                    </footer>
                </div>

            </section>




        </main>

    </>);
}