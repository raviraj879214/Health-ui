
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PackageListing() {
  const [treatments, setTreatments] = useState([]);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
  });

  useEffect(() => {
    fetchPackagesTreatments();
    fetchPackages();
  }, []);

  const fetchPackagesTreatments = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/get-treatment-for-packages`
      );

      if (res.ok) {
        const result = await res.json();
        setTreatments(result || []);
      }
    } catch (error) {
      console.error("Treatment fetch error:", error);
    }
  };

  const fetchPackages = async (
    treatmentId = "",
    page = 1,
    append = false
  ) => {

    debugger;


    try {
      setLoading(true);

      let url = "";

      if (treatmentId) {
        url = `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/packages-by-treatment?treatmentId=${treatmentId}&page=${page}&limit=10`;
      } else {
        url = `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/homepage-banner/packages-by-treatment?page=${page}&limit=10`;
      }

      const res = await fetch(url);

      if (res.ok) {
        const result = await res.json();

        if (append) {
          setPackages((prev) => [...prev, ...(result.data || [])]);
        } else {
          setPackages(result.data || []);
        }

        setPagination(result.pagination);
      }
    } catch (error) {
      console.error("Package fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

const handleSearch = () => {
  setPackages([]);
  fetchPackages(selectedTreatment, 1, false);
};

  const handleLoadMore = () => {
    const nextPage = pagination.page + 1;

    fetchPackages(
      selectedTreatment,
      nextPage,
      true
    );
  };

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
            Compare treatment packages from top-rated clinics worldwide
            with accommodation, transfers and aftercare.
          </p>
        </div>

       
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-12">
          <div className="flex flex-col md:flex-row gap-4">

            <select
              value={selectedTreatment}
              onChange={(e) =>
                setSelectedTreatment(e.target.value)
              }
              className="w-full h-14 border rounded-xl px-4"
            >
              <option value="">
                Choose a Treatment
              </option>

              {treatments?.map((item) => (
                <option
                  key={item?.treatment?.id}
                  value={item?.treatment?.id}
                >
                  {item?.treatment?.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleSearch}
              className="btn btn-secondary md:min-w-[220px]"
            >
              Find Packages
            </button>
           
          {selectedTreatment && (
  <button
    onClick={() => {
      setSelectedTreatment("");
      fetchPackages();
    }}
    className="btn btn-outline-secondary md:min-w-[220px]"
  >
    Clear Selection
  </button>
)}
              
          </div>
          
        </div>
        

        {/* Result Count */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-lg">
            Showing {packages.length} of {pagination.total} Packages
          </h3>
        </div>

        {/* Loading */}
              {loading && (
                  <div className="space-y-8">
                      {[1, 2, 3].map((item) => (
                          <PackageSkeleton key={item} />
                      ))}
                  </div>
              )}

        {/* Empty State */}
        {!loading && packages.length === 0 && (
          <div className="bg-white rounded-3xl p-10 text-center">
            <h3 className="text-xl font-semibold mb-2">
              No Packages Found
            </h3>

            <p className="text-gray-500">
              Try selecting a different treatment.
            </p>
          </div>
        )}

        {/* Package Cards */}
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
                              src={
                                  item?.clinicImage
                                      ? `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=clinic/banner/${item.clinicImage}`
                                      : "/images/package-placeholder.jpg"
                              }
                              alt={item?.title}
                              className="w-full h-full min-h-[320px] object-cover group-hover:scale-105 transition duration-500"
                          />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h4 className="font-bold text-xl">
                      {item?.clinic?.name}
                    </h4>

                    <p className="text-white/80 text-sm">
                      {item?.clinic?.citycep ||
                        item?.clinic?.estado}
                    </p>
                  </div>

                  {item?.boosts?.length > 0 && (
                    <span className="absolute top-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded-full text-xs font-semibold">
                      Featured Package
                    </span>
                  )}

                </div>

                {/* Content */}
                <div className="p-8">

                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      Treatment Package
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    {item?.title}
                  </h2>

                  <p className="text-gray-600 mb-6">
                    {item?.briefdescription ||
                      "Comprehensive treatment package including consultation and support."}
                  </p>

                  <div className="grid md:grid-cols-2 gap-3 hidden">

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <span className="text-green-600">
                        ✓
                      </span>
                      <span>
                        Verified Clinic
                      </span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <span className="text-green-600">
                        ✓
                      </span>
                      <span>
                        Consultation Included
                      </span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <span className="text-green-600">
                        ✓
                      </span>
                      <span>
                        Medical Assistance
                      </span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                      <span className="text-green-600">
                        ✓
                      </span>
                      <span>
                        Patient Support
                      </span>
                    </div>

                  </div>

                </div>

                {/* Price */}
                <div className="border-l bg-gradient-to-b from-slate-50 to-white p-8 flex flex-col justify-center">

                  <div className="text-center">

                    <p className="text-sm text-gray-500 mb-2">
                      Starting From
                    </p>

                    {item?.actualprice &&
                      item?.actualprice !==
                        item?.discountedprice && (
                        <p className="line-through text-gray-400 text-lg mb-1">
                          ${item.actualprice}
                        </p>
                      )}

                    <h3 className="text-5xl font-bold text-primary mb-6">
                      ${item?.discountedprice}
                    </h3>

                    <div className="space-y-3">

                      <Link
                        href={`/package-info/${item?.clinic?.slug}?packid=${item.id}`}
                        className="btn btn-secondary w-full"
                      >
                        View Package
                      </Link>

                      <Link
                        href={`/clinics/${item?.clinic?.slug}`}
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
        {pagination?.hasNext && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="px-8 py-4 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition disabled:opacity-50"
            >
              {loading ? (
  <div className="flex items-center justify-center gap-2">
    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    Loading...
  </div>
) : (
  "Load More Packages"
)}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}



function PackageSkeleton() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-border animate-pulse">
      <div className="grid lg:grid-cols-[320px_1fr_240px]">
        
        {/* Image */}
        <div className="bg-slate-200 min-h-[320px]" />

        {/* Content */}
        <div className="p-8">
          <div className="h-6 w-32 bg-slate-200 rounded mb-4" />

          <div className="h-10 w-3/4 bg-slate-200 rounded mb-4" />

          <div className="space-y-3 mb-8">
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-4 w-4/6 bg-slate-200 rounded" />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-14 bg-slate-200 rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="border-l p-8 flex flex-col justify-center">
          <div className="h-4 w-24 bg-slate-200 rounded mx-auto mb-3" />

          <div className="h-12 w-32 bg-slate-200 rounded mx-auto mb-8" />

          <div className="space-y-3">
            <div className="h-12 bg-slate-200 rounded-xl" />
            <div className="h-12 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}