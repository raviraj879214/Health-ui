"use client";

import { useState } from "react";
import Link from "next/link";

export default function PackageListing() {
    const allPackages = [
        {
            id: 1,
            title: "Premium Liposuction Package",
            clinic: {
                name: "Rio Plastic Surgery Center",
                city: "Rio de Janeiro",
                country: "Brazil",
            },
            price: "$3,500",
            rating: 0,
            reviews: 142,
            image: "https://picsum.photos/500/350?random=1",
            popular: true,
            features: [
                "Consultation Included",
                "Airport Transfers",
                "4-Star Hotel Stay",
                "Post-Op Follow Up",
            ],
        },
        {
            id: 2,
            title: "Rhinoplasty Package",
            clinic: {
                name: "São Paulo Aesthetic Clinic",
                city: "São Paulo",
                country: "Brazil",
            },
            price: "$4,200",
            rating: 4.8,
            reviews: 95,
            image: "https://picsum.photos/500/350?random=2",
            features: [
                "Medical Evaluation",
                "Private Room",
                "Airport Pickup",
                "Medication Included",
            ],
        },
        {
            id: 3,
            title: "Breast Augmentation Package",
            clinic: {
                name: "Elite Cosmetic Hospital",
                city: "Brasília",
                country: "Brazil",
            },
            price: "$5,100",
            rating: 4.9,
            reviews: 178,
            image: "https://picsum.photos/500/350?random=3",
            features: [
                "Hotel Included",
                "Transfers Included",
                "24/7 Assistance",
                "Consultation Included",
            ],
        },
        {
            id: 4,
            title: "Facelift Package",
            clinic: {
                name: "Brazil Beauty Institute",
                city: "Curitiba",
                country: "Brazil",
            },
            price: "$4,900",
            rating: 4.7,
            reviews: 81,
            image: "https://picsum.photos/500/350?random=4",
            features: [
                "Consultation Included",
                "Hotel Stay",
                "Airport Transfer",
                "Post Care",
            ],
        },
        {
            id: 5,
            title: "Mommy Makeover Package",
            clinic: {
                name: "Luxury Cosmetic Clinic",
                city: "Salvador",
                country: "Brazil",
            },
            price: "$6,200",
            rating: 5.0,
            reviews: 210,
            image: "https://picsum.photos/500/350?random=5",
            features: [
                "Luxury Hotel",
                "VIP Transfer",
                "Dedicated Coordinator",
                "Follow Up Care",
            ],
        },
        {
            id: 6,
            title: "Tummy Tuck Package",
            clinic: {
                name: "Prime Surgery Center",
                city: "Fortaleza",
                country: "Brazil",
            },
            price: "$4,700",
            rating: 4.8,
            reviews: 112,
            image: "https://picsum.photos/500/350?random=6",
            features: [
                "Consultation",
                "Medication",
                "Airport Pickup",
                "Hotel Included",
            ],
        },
    ];

    const [visibleCount, setVisibleCount] = useState(3);

    const packages = allPackages.slice(0, visibleCount);

    return (
        <section className="bg-slate-50 py-16">
            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        Medical Tourism Packages
                    </span>

                    <h1 className="text-4xl font-bold mb-3">
                        Find Your Perfect Treatment Package
                    </h1>

                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Compare treatment packages from top-rated clinics
                        worldwide with accommodation, transfers and aftercare.
                    </p>
                </div>

                {/* Search */}
                <div className="bg-white rounded-3xl shadow-lg p-5 mb-12">
                    <div className="flex flex-col md:flex-row gap-4">

                        <select className="w-full h-14 border rounded-xl px-4">
                            <option>Choose a Treatment</option>
                            <option>Liposuction</option>
                            <option>Rhinoplasty</option>
                            <option>Breast Augmentation</option>
                            <option>Facelift</option>
                            <option>Mommy Makeover</option>
                        </select>

                        <button className="btn btn-secondary md:min-w-[220px]">
                            Find Packages
                        </button>

                    </div>
                </div>

                {/* Result Count */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-semibold text-lg">
                        Showing {packages.length} of {allPackages.length} Packages
                    </h3>
                </div>

                {/* Cards */}
                <div className="space-y-8">

                    {packages.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300"
                        >
                            <div className="grid lg:grid-cols-[320px_1fr_240px]">

                                {/* Image */}
                                <div className="relative group overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full min-h-[320px] object-cover group-hover:scale-105 transition duration-500"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                                        <h4 className="font-bold text-xl">
                                            {item.clinic.name}
                                        </h4>

                                        <p className="text-white/80 text-sm">
                                            {item.clinic.city}, {item.clinic.country}
                                        </p>
                                    </div>

                                    {item.popular && (
                                        <span className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
                                            Most Popular
                                        </span>
                                    )}

                                    
                                </div>

                                {/* Content */}
                                <div className="p-8">

                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                                            Cosmetic Surgery
                                        </span>

                                        
                                    </div>

                                    <h2 className="text-3xl font-bold mb-4">
                                        {item.title}
                                    </h2>

                                    <p className="text-gray-600 mb-6">
                                        Comprehensive treatment package including
                                        accommodation, airport transfers,
                                        consultation and post-operative care.
                                    </p>

                                    <div className="grid md:grid-cols-2 gap-3">
                                        {item.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl"
                                            >
                                                <span className="text-green-600">
                                                    ✓
                                                </span>

                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                                {/* Price */}
                                <div className="border-l bg-gradient-to-b from-slate-50 to-white p-8 flex flex-col justify-center">

                                    <div className="text-center">

                                        <p className="text-sm text-gray-500 mb-2">
                                            Starting From
                                        </p>

                                        <h3 className="text-5xl font-bold text-primary mb-6">
                                            {item.price}
                                        </h3>

                                        <div className="space-y-3">
                                            <Link
                                                href={`/packages/${item.id}`}
                                                className="btn btn-secondary w-full"
                                            >
                                                View Package
                                            </Link>

                                            <Link
                                                href={`/clinics/${item.id}`}
                                                className="btn btn-outline w-full"
                                            >
                                                View Clinic
                                            </Link>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                {visibleCount < allPackages.length && (
                    <div className="text-center mt-12">
                        <button
                            onClick={() =>
                                setVisibleCount((prev) => prev + 3)
                            }
                            className="px-8 py-4 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition"
                        >
                            Load More Packages
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}