"use client"
import { TableDateCell } from "@fullcalendar/core/internal";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import { useEffect, useState } from "react";
import { adminHeaders } from "../utils/adminHeader";
import { formatBrazilDate } from "@/lib/formatDate";



export default function StripConnectedAccount(){

    const [sampledata, setSampleData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cliniclist,setClinicList] = useState([]);


      useEffect(() => {

  fetchAdminData();
}, []);

      
        const fetchAdminData = async () => {
            debugger;
            //stripeaccoun details
            setLoading(true);
          try {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_NODEJS_URL}/v1/api/admin-dashboard/admin-dashboard-data`,
              {
                method: "GET",
                headers: await adminHeaders(),
              }
            );
      
            if (!res.ok) throw new Error("Failed to fetch dashboard data");
            debugger;
            const result = await res.json();
            console.log("admin dashboard result",result.stripeaccount);
            setSampleData(result.stripeaccount);
            setClinicList(result.clinic);

          } catch (err) {
           
            setError("Something went wrong while loading dashboard.");
          } finally {}


          setLoading(false);
        };


    return(<>
        <div className="w-full bg-white border rounded-lg shadow-sm p-6 mt-3">
            <div className="flex justify-between mb-6 items-center">
                <div>
                    <h5 className="text-gray-500 text-sm"></h5>
                    <p className="text-2xl font-semibold"> Stripe Connected Accounts</p>
                   
                </div>
            </div>
    
                <div className="max-h-[800px] overflow-auto rounded-lg border border-gray-200 dark:border-white/[0.05]">
<Table>
  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] sticky top-0 bg-white dark:bg-gray-900 z-10">
    <TableRow>
      <TableCell className="px-5 py-3 font-medium text-gray-500">
        Account Details
      </TableCell>
      <TableCell className="px-5 py-3 font-medium text-gray-500">
        Card Payments Capability
      </TableCell>
      <TableCell className="px-5 py-3 font-medium text-gray-500">
        Account Country
      </TableCell>
      <TableCell className="px-5 py-3 font-medium text-gray-500">
        Onboarding Status
      </TableCell>
      <TableCell className="px-5 py-3 font-medium text-gray-500">
        Connected On
      </TableCell>
      <TableCell className="px-5 py-3 font-medium text-gray-500">
        Business Type
      </TableCell>
      <TableCell className="px-5 py-3 font-medium text-gray-500">
        Account Status
      </TableCell>
    </TableRow>
  </TableHeader>

  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
    
    {/* 🔄 Loading */}
    {loading && (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-8">
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-500">fetching from stripe...</span>
          </div>
        </TableCell>
      </TableRow>
    )}

    {/* ❌ No Data */}
    {!loading && sampledata.length === 0 && (
      <TableRow>
        <TableCell colSpan={7} className="text-center py-8 text-gray-500">
          No Connected Accounts Found
        </TableCell>
      </TableRow>
    )}


    {!loading &&
      sampledata.length > 0 &&
      sampledata.map((item) => (
        <TableRow key={item.accountId}>
            <TableCell className="px-5 py-4">
                  <div className="flex items-start gap-4">


                      <div className="flex-shrink-0">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 
                    text-white flex items-center justify-center 
                    font-semibold text-sm shadow-sm">
                              {item.name ? item.name.charAt(0) : "A"}
                          </div>
                      </div>


                      <div className="flex flex-col min-w-0">

                          <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {item.name || "Unnamed Account"}
                          </p>

                          <p className="text-xs text-green-600 dark:text-gray-400 truncate">
                              <b>Clinic: {cliniclist.find(x => x.stripeaccountid === item.accountId)?.name || "Not Linked"}</b>
                          </p>

                          <p className="text-xs text-gray-400 truncate">
                              ID: {item.accountId}
                          </p>

                      </div>

                  </div>
            </TableCell>

          <TableCell className="px-5 py-4">
            {item.cardPaymentsCapabilityStatus}
          </TableCell>

          <TableCell className="px-5 py-4">
            {item.accountCountry}
          </TableCell>

          <TableCell className="px-5 py-4">
            {item.onboardingStatus}
          </TableCell>

          <TableCell className="px-5 py-4">
            {formatBrazilDate(item.connectedOn)}
          </TableCell>

          <TableCell className="px-5 py-4">
            {item.businessType}
          </TableCell>

          <TableCell className="px-5 py-4">
            {item.accountStatus}
          </TableCell>
        </TableRow>
      ))}
  </TableBody>
</Table>
</div>




        </div>
    </>);
}