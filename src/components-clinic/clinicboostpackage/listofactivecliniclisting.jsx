import { useEffect, useState } from "react";
import { clinicHeaders } from "../utils/clinicHeaders";
import {formatBrazilDate} from "../../lib/formatDate";
import {brazilianCurrency} from "../../lib/brazilianCurrency";

export function Listofactivecliniclisting() {

  const [currentboostpackages, setCurrentBoostPackages] = useState([]);

  useEffect(() => {
    fetchCurrentPakages();
  }, []);

  const fetchCurrentPakages = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/manage-clinic-boost-package/get-current-clinic-listing`,
      {
        method: "GET",
        headers: clinicHeaders(),
      }
    );

    if (res.ok) {
      const result = await res.json();


      setCurrentBoostPackages(result.data || []);
     



    }
  };


    const getBadgeText = (pkg) => {
  switch (true) {
    case pkg.placement == 2:
      return "Main Listing";
    case pkg.placement === 1:
      return "Top Rated";
    case pkg.placement === 0:
      return "POPULAR";
    default:
      return null;
  }
};


  return (
    <>
      <div className="border theme-border rounded-xl p-4 bg-white shadow-sm mt-6">
        <h2 className="text-lg font-semibold mb-4">List of boosted packages</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm">
                <th className="p-3 border theme-border">Boost Name</th>
                <th className="p-3 border theme-border">Boost Duration</th>
                <th className="p-3 border theme-border">Clinic Name</th>
                <th className="p-3 border theme-border">Price</th>
                <th className="p-3 border theme-border">Package Type</th>
                <th className="p-3 border theme-border">Status</th>
                <th className="p-3 border theme-border">Start At</th>
                <th className="p-3 border theme-border">End At</th>
              </tr>
            </thead>

            <tbody className="text-sm">
              {currentboostpackages.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-4 text-gray-500 border theme-border"
                  >
                    No active boost packages found.
                  </td>
                </tr>
              ) : (
                currentboostpackages.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="p-3 border theme-border">
                      <p className="background-theme p-2 rounded-2xl w-fit">
                           {item.boostPackage?.name || "--"}
                      </p>
                     
                    </td>

                    <td className="p-3 border theme-border">
                      {item.boostPackage?.durationDays + " Days" || "0 Days"}
                    </td>

                    <td className="p-3 border theme-border">
                      {item.clinics.name || "--"}
                    </td>

                    <td className="p-3 border theme-border">
                      
                      {brazilianCurrency(item.boostPackage?.price)}
                    </td>
                    <td className="p-3 border theme-border ">
                           <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">{getBadgeText(item.boostPackage)}</span>
                    </td>

                    <td className="p-3 border theme-border ">
                      {item.isActive ? (
                        <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
                          Active
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                          Expired
                        </span>
                      )}
                    </td>

                    <td className="p-3 border theme-border">
                      

                      {formatBrazilDate(item.startAt)}
                      
                    </td>

                    <td className="p-3 border theme-border">
                      
                      {formatBrazilDate(item.endAt)}


                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
