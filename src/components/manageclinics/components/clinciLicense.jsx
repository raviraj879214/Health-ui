"use client";
import { adminHeaders } from "@/components/utils/adminHeader";
import { useEffect, useState } from "react";




export function ClinicLicense({id}){


    const [licenses,setLicenses] = useState([]);

    
    useEffect(() => {
        if (id) {
            fetchLicense();
        }
    }, [id]);


     const fetchLicense = async (uuid = id) => {
    if (!uuid) return;

    try {
     

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic/get-clinic-license/${uuid}`,
        {
          method: "GET",
          headers : await adminHeaders(),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch licenses.");
      }

      setLicenses(result.data || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
     
    }
  };







    return(<>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
    <div>
      <h3 className="text-xl font-bold text-gray-900">
        Hospital Licenses
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Official licenses and certifications.
      </p>
    </div>

    <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
      {licenses?.length || 0} License{licenses?.length !== 1 && "s"}
    </span>
  </div>

  {/* Body */}
  <div className="p-6">
    {licenses?.length > 0 ? (
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {licenses.map((license, index) => (
          <div
            key={license.id}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
             {/\.(jpg|jpeg|png|gif|webp)$/i.test(license.image) ? (
  <img
    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}`}
    alt={`License ${index + 1}`}
    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
  />
) : /\.pdf$/i.test(license.image) ? (
  <iframe
    src={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}#toolbar=0&navpanes=0&scrollbar=0`}
    title={`License ${index + 1}`}
    className="h-full w-full border-0"
  />
) : null}
              <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow">
                Verified
              </span>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4">
              <div>
                <h4 className="font-semibold text-gray-900">
                  License #{index + 1}
                </h4>
                <p className="text-xs text-gray-500">
                  Hospital Registration
                </p>
              </div>

              <a
                href={`${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/uploads?filepath=license/${license.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-emerald-600 px-3 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 h-14 w-14 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9 12h6m-3-3v6m8-3A9 9 0 113 12a9 9 0 0118 0z"
          />
        </svg>

        <h4 className="text-lg font-semibold text-gray-700">
          No Licenses Available
        </h4>

        <p className="mt-1 text-sm text-gray-500">
          This hospital hasn't uploaded any licenses yet.
        </p>
      </div>
    )}
  </div>
</div>

    </>);

}