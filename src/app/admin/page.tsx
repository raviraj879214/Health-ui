

import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import StripConnectedAccount from "../../components/ecommerce/stripeConnectedAccount";



export const metadata = {
  title: "DashBoard | "  + `${process.env.NEXT_PUBLIC_PROJECT_NAME}`,
};



export default function Ecommerce() {

  
  return (<>
    <div className="grid grid-cols-12 gap-4 md:gap-6 mb-2">
      <div className="col-span-12 space-y-6 xl:col-span-12">
        <EcommerceMetrics />
      </div>
    </div>

    <MonthlySalesChart />

    <StripConnectedAccount />

    </>
  );
}
