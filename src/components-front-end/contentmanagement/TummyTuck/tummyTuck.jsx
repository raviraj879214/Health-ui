"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";


const faqs = [
  {
  question: "What is the difference between a tummy tuck and a panniculectomy?",
  answer:
    "A panniculectomy removes only the overhanging apron of skin and fat, without repairing the abdominal muscles or repositioning the navel. It is a functional procedure, sometimes covered by US insurance after major weight loss. A tummy tuck also tightens the muscle wall and reshapes the abdomen.",
},
{
  question: "Can I combine a tummy tuck with liposuction or a breast procedure?",
  answer:
    "Yes — combining abdominoplasty with liposuction is standard, and combining it with a breast procedure is what is often marketed as a 'mommy makeover'. Whether everything can be done safely in one session depends on your health and total operating time.",
},
{
  question: "Is there a cost to use your service?",
  answer:
    "Our initial consultation and matching service is free. We explain any fees clearly before you commit to anything. There are no hidden charges.",
},
{
  question: "What if I have a complication after I return home?",
  answer:
    "We work with clinics that offer post-operative remote consultation. Before you travel, we’ll make sure you understand your surgeon’s follow-up protocol and what to do if you have concerns after returning.",
},
];


export function TummyTuck(){

    const [openIndex, setOpenIndex] = useState(0);
    const [clinics, setClinics] = useState([]);
    const [clinicsimage, setClinicsImage] = useState([]);
    const [visible, setVisible] = useState(4);

      const [slugs,setSlugs] = useState([]);
  useEffect(() => {
    fetchSlug();
  }, []);


  const fetchSlug = async()=>{
    debugger;
    const res= await fetch(`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-seo-slug`,{
      method : "Get",
      headers :{
        "Content-Type" : "application/json"
      }
    });

    if(res.ok){
      const result= await res.json();
      setSlugs(result.data);
    }
  }


            
            
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
                            "specialization": "Plastic Surgery",
                            "treatments": [
                                "Tummy Tuck"
                                
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
                style={{ backgroundColor: "rgb(242, 244, 245)" }}
            >
                <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:py-10">

                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex list-none flex-wrap items-center gap-2 p-0 m-0 text-sm">
                            <li>
                                <a href="/" className="text-slate-500 hover:text-blue-600">
                                    Home
                                </a>
                            </li>

                            <li className="text-slate-400">&gt;</li>

                            <li>
                                <a href={slugs.find(x => x.title === "Plastic Surgery")?.slug || ""} className="text-slate-500 hover:text-blue-600">
                                    Plastic Surgery
                                </a>
                            </li>

                            <li className="text-slate-400">&gt;</li>

                            <li className="font-medium text-slate-900">
                                Tummy Tuck
                            </li>
                        </ol>
                    </nav>

                    <div className="max-w-4xl">
                        <span className="mb-6 inline-block rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700">
                            Medical Tourism Excellence
                        </span>

                        <h1 className="mb-8 text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
                            Tummy Tuck (Abdominoplasty) in Brazil: Cost, Techniques, Recovery and Top Clinics
                        </h1>
                    </div>
                </div>

                {/* Rest of your existing code */}
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
                                    A tummy tuck is the procedure people turn to when diet and exercise have stopped making a difference,  usually after pregnancy or weight loss, when the problem is no longer fat but loose skin and separated abdominal muscles. Brazil performs more abdominoplasty procedures than any other country: 192,961 in 2024, ahead of the United States. Brazilian surgeons are particularly associated with lipoabdominoplasty, which combines liposuction of the flanks with the abdominoplasty itself.
                                </p>
                                <p className="text-lg leading-relaxed text-gray-600">
                                    Cost in Brazil generally ranges from $3,500–$5,500 for a full abdominoplasty with muscle repair. In the US, the average surgeon’s fee alone is $8,174, before anesthesia, facility fees and post-operative care commonly bring the total past $12,000.
                                </p>

                                <p className="text-lg leading-relaxed text-gray-600">
                                    Explore the techniques available, what each one involves, realistic costs, recovery timelines, and how to choose the right surgeon for your case.
                                </p>
								<p><i>Sources: ISAPS Global Survey, 2024 | American Society of Plastic Surgeons, 2023</i></p>
                            </div>
                            <button className="btn btn-primary">
                                Get a free treatment estimate

                            </button>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[420px_1fr] lg:items-start">
                        {/* Left */}
                        <div>
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                Procedure Overview
                            </span>

                            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                What Is Tummy Tuck?
                            </h2>
                        </div>

                        {/* Right */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
                            <p className="text-lg leading-8 text-slate-600">
                                A tummy tuck known medically as abdominoplasty removes excess skin and fat from the abdomen and, in most cases, repairs the abdominal muscles where they have separated down the midline, a condition common after pregnancy. It is not a weight-loss procedure and not a substitute for liposuction: liposuction removes fat but does nothing for loose skin or separated muscle. It does leave a permanent horizontal scar low across the abdomen, usually positioned to sit below a bikini line.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="bg-slate-50 py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
                        {/* Left */}
                        <div>
                            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                Tummy Tuck Methods
                            </span>

                            <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                Tummy Tuck Techniques Available in Brazil
                            </h2>

                            <div className="mt-8 rounded-2xl border border-blue-200 bg-white p-6 shadow-sm">
                                <p className="leading-8 text-slate-600">
                                    Your surgeon will recommend the technique based on how much loose skin you have, where it sits, whether your abdominal muscles have separated, and your weight history. This is a decision that depends on examination, it cannot be made from photographs alone.
                                </p>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 bg-blue-600">
                                <div className="px-6 py-5 font-semibold text-white">
                                    Technique
                                </div>

                                <div className="px-6 py-5 font-semibold text-white">
                                    How It Works
                                </div>

                                <div className="px-6 py-5 font-semibold text-white">
                                    Best For
                                </div>

                                <div className="px-6 py-5 font-semibold text-white">
                                    Typical Recovery
                                </div>
                            </div>

                            {/* Row 1 */}
                            <div className="grid grid-cols-4 border-t border-slate-200 hover:bg-slate-50">
                                <div className="px-6 py-6 font-semibold text-slate-900">
                                    Full Abdominoplasty
                                </div>

                                <div className="px-6 py-6 leading-7 text-slate-600">
                                    Skin and fat removed from the pubic area to the navel; muscles repaired; navel repositioned
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    Loose skin above and below the navel, with muscle separation
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    2 weeks light activity, 6–8 weeks full healing
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-4 border-t border-slate-200 hover:bg-slate-50">
                                <div className="px-6 py-6 font-semibold text-slate-900">
                                    Mini Tummy Tuck
                                </div>

                                <div className="px-6 py-6 leading-7 text-slate-600">
                                    Addresses only the area below the navel through a shorter incision
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    A small amount of loose skin low down, with good muscle tone
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    1–2 weeks light activity, 4–6 weeks full healing
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-4 border-t border-slate-200 hover:bg-slate-50">
                                <div className="px-6 py-6 font-semibold text-slate-900">
                                    Lipoabdominoplasty
                                </div>

                                <div className="px-6 py-6 leading-7 text-slate-600">
                                    Combines liposuction of the flanks and upper abdomen with a full abdominoplasty
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    Patients wanting waist definition as well as skin removal
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    2 weeks light activity, 6–8 weeks full healing
                                </div>
                            </div>
							
							{/* Row 4 */}
                            <div className="grid grid-cols-4 border-t border-slate-200 hover:bg-slate-50">
                                <div className="px-6 py-6 font-semibold text-slate-900">
                                    Extended / Fleur-de-Lis
                                </div>

                                <div className="px-6 py-6 leading-7 text-slate-600">
                                    Adds a vertical incision, tightening skin side-to-side as well as up-and-down
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    Significant loose skin after major or bariatric weight loss
                                </div>

                                <div className="px-6 py-6 text-slate-600">
                                    2 weeks light activity, 6 weeks full healing
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {clinics.length > 0 && (
                <section className="bg-white py-20">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">

                        <div className="mx-auto max-w-3xl text-center">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-400 ring-1 ring-blue-200">
                                Verified Tummy Tuck  Clinics
                            </span>

                            <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                                Top-Rated Clinics for Tummy Tuck in Brazil


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
                                                    className="inline-flex items-center gap-2 font-medium text-blue-400 transition-colors hover:text-blue-600">
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
                                        className="rounded-full bg-blue-400 px-8 py-3 font-medium text-white shadow-md transition-all duration-300 hover:bg-blue-600 hover:shadow-lg"
                                    >
                                        Load More Clinics
                                    </button>
                                </div>
                            )}
                        </section>




                        <div className="mt-20 overflow-hidden rounded-[32px] bg-gradient-to-r from-blue-400 to-blue-600 p-10 text-white lg:p-14">
                            <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
                                <div className="max-w-3xl">
                                    <h3 className="text-3xl font-bold">
                                        Not sure which clinic is right for you?
                                    </h3>

                                    <p className="mt-4 text-lg leading-8 text-blue-50">
                                        Tell us your treatment goal and budget. Our team will match you
                                        with the right clinic, in the right city, at the right price.
                                    </p>
                                </div>

                                <button className="rounded-2xl bg-white px-8 py-4 text-lg font-semibold text-blue-400 transition hover:scale-105">
                                    Get My Free Match →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}



        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
                    {/* Left */}
                    <div>
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                            Procedure Pricing
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            How Much Does Tummy Tuck Cost in Brazil?
                        </h2>

                        <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                <svg
                                    className="h-5 w-5 text-blue-400"
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
                                    All figures are estimates in USD
                                </span>{" "}
                                Final pricing depends on surgeon, technique, the extent of liposuction included, anesthesia type, and whether an overnight stay is required. We’ll provide you with a personalized quote after your free consultation.
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                        {/* Header */}
                        <div className="grid grid-cols-[1fr_auto] bg-blue-600 px-8 py-5">
                            <div className="font-semibold text-white">
                                Procedure
                            </div>

                            <div className="font-semibold text-white">
                                Estimated Cost in Brazil
                            </div>
                        </div>

                        {[
                            {
                                treatment: "Mini tummy tuck",
                                price: "USD 2,500 – 3,800",
                            },
                            {
                                treatment: "Full abdominoplasty with muscle repair",
                                price: "USD 3,500 – 5,500",
                            },
                            {
                                treatment: "Lipoabdominoplasty (with liposuction of flanks)",
                                price: "USD 4,500 – 6,500",
                            },
							{
                                treatment: "Extended / fleur-de-lis (post-weight-loss)",
                                price: "USD 5,500 – 8,000",
                            },
                        ].map((item) => (
                            <div
                                key={item.treatment}
                                className="grid grid-cols-[1fr_auto] items-center gap-6 border-t border-slate-100 px-8 py-6 transition hover:bg-slate-50"
                            >
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        {item.treatment}
                                    </h3>
                                </div>

                                <div className="rounded-xl bg-blue-50 px-4 py-2 font-bold text-blue-700">
                                    {item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>



        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
                    {/* Left */}
                    <div>
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                            Travel Budget
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            What Else to Budget For
                        </h2>

                    </div>

                    {/* Right */}
                    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
                        {/* Header */}
                        <div className="grid grid-cols-[1fr_auto] bg-blue-600 px-8 py-5">
                            <div className="font-semibold text-white">
                                Item
                            </div>

                            <div className="font-semibold text-white">
                                Estimated Cost
                            </div>
                        </div>

                        {[
                            {
                                item: "Round-trip flights (from US)",
                                price: "$600 – $1,200",
                            },
                            {
                                item: "Recovery accommodation (1–2 weeks)",
                                price: "$400 – $1,100",
                            },
                            {
                                item: "Pre-operative tests",
                                price: "$100 – $150",
                            },
                            {
                                item: "Compression garment",
                                price: "$60 – $120",
                            },
                            {
                                item: "Airport transfers",
                                price: "$30 – $80",
                            },
                        ].map((item) => (
                            <div
                                key={item.item}
                                className="grid grid-cols-[1fr_auto] items-center gap-6 border-t border-slate-100 px-8 py-6 transition hover:bg-slate-50"
                            >
                                <div>
                                    <h3 className="font-semibold text-slate-900">
                                        {item.item}
                                    </h3>
                                </div>

                                <div className="rounded-xl bg-blue-50 px-4 py-2 font-bold text-blue-700">
                                    {item.price}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>               


        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
                    {/* Left */}
                    <div>
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                            Recovery Guide
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            Recovery Timeline After Tummy Tuck
                        </h2>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        {/* Main Content */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
                            <p className="text-lg leading-8 text-slate-600">
                                Abdominoplasty has the longest recovery of the body procedures on this site. Surgical drains are commonly in place for 5–10 days, and most patients need help with everyday tasks during the first week. Light daily activity resumes at around 2 weeks and desk-based work at 2–3 weeks. No lifting or core exercise for 6–8 weeks, as this risks disrupting the muscle repair, with a compression garment worn throughout. The final contour becomes clear at 3–6 months.
                            </p>
                        </div>

                        {/* Highlight */}
                        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
                                    ✓
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">
                                        Recommended Stay
                                    </h3>

                                    <p className="mt-2 leading-7 text-slate-700">
                                        We generally recommend planning to stay in Brazil for 14 days post-procedure. This is longer than most procedures for a medical reason: abdominoplasty carries a higher risk of blood clots, and long-haul flights add to that risk. Please do not book a return flight before your surgeon has advised on timing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>               


        <section className="bg-slate-50 py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-14 lg:grid-cols-[380px_1fr] lg:items-start">
                    {/* Left */}
                    <div>
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                            Patient Eligibility
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                            Am I a Good Candidate for Tummy Tuck?
                        </h2>
                    </div>

                    {/* Right */}
                    <div className="space-y-6">
                        {/* Main Content */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm lg:p-10">
                            <p className="text-lg leading-8 text-slate-600">
                                A tummy tuck works best for people at or near a stable weight,  ideally held for six to twelve months, who have loose abdominal skin or separated muscles that will not respond to exercise. Surgeons usually recommend waiting until you have finished having children, since pregnancy afterwards can undo the muscle repair. Smoking is a particular concern here because it increases wound-healing problems along a long incision. If you have a history of blood clots or diabetes, mention it early — it changes the pre-operative plan.
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
                            Expert Tips
                        </span>

                        <h2 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                             How to Choose the Right Surgeon for Tummy Tuck in Brazil
                        </h2>
                    </div>

                    {/* Tips */}
                    <div className="mx-auto mt-16 max-w-5xl">
                        {[
                            "Certification of the surgeon",
                            "Ask to see before-and-after photos of patients with a similar weight history to yours",
                            "Confirm which technique they recommend, and where the scar will sit",
                            "Ask what their protocol is for preventing blood clots, and when they clear patients to fly",
							"Know the complete pricing, including garments and drain removal",
                        ].map((item, index) => (
                            <div
                                key={item}
                                className="relative flex gap-6 border-l-2 border-blue-200 pl-8 pb-10 last:pb-0"
                            >
                                {/* Step Number */}
                                <div className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-sm font-bold text-white shadow">
                                    {String(index + 1).padStart(2, "0")}
                                </div>

                                {/* Card */}
                                <div className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                                    <h3 className="text-xl font-semibold text-slate-900">
                                        {item}
                                    </h3>
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
                        <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-400">
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
                                            className={`h-5 w-5 shrink-0 text-blue-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
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


            <footer className="border-t border-slate-300 bg-[#f2f4f5] py-6">
                <div className="mx-auto max-w-7xl px-6">
                    <p className="text-center text-sm leading-7 text-slate-600">
                        Page last updated: June, 2026 | Medically reviewed by Dr. Thiago
                        Lima Barreto da Serra e Silva, Anesthesiologist, CRM-PR 28659 -
                        Curitiba, Brazil. Board-Certified Anesthesiologist
                    </p>
                </div>
            </footer>


     </main>
    </>);
}