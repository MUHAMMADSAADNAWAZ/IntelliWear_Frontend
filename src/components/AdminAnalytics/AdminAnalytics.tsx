
import { useState } from "react";

import { updateLoader } from "@redux/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import AdminAnalyticsApi from "@api/adminanalytics.api";
import { MonthlySales } from "@components/MonthlySales";
import { Select } from "@components/common";
import { SalesAnalyticsComponent } from "@components/SalesAnalyticsComponent";
import { filterAnalyticsOptions } from "@Data/data";

const AdminAnalytics = () => {

  const [selectedPeriod, setSelectedPeriod] = useState(filterAnalyticsOptions[0]?.value || "last_7_days");

  const dispatch = useDispatch();
  const adminanalyticsapi = new AdminAnalyticsApi();

  const getAnalyticsData = async () => {
    dispatch(updateLoader(true));
    const res = await adminanalyticsapi.getAdminAnalytics(selectedPeriod);
    dispatch(updateLoader(false));
    return res;
  };

  const { data } = useQuery({
    queryKey: ["adminanalytics" , selectedPeriod],
    queryFn: getAnalyticsData,
    enabled: !!selectedPeriod
  });

  const analyticsData = [
    {
      name: "Total Sales",
      price: data?.data?.total_sales || 0,
      color: "text-blue-500",
    },
    {
      name: "Today's Sales",
      price: data?.data?.today_sales || 0,
      color: "text-red-500",
    },
    {
      name: "Total Orders",
      price: data?.data?.total_orders || 0,
      color: "text-green-500",
    },
    {
      name: "Average Order Rate",
      price: data?.data?.avg_order_value || 0,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Analytics Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {analyticsData?.map((analtics) => {
          return (
            <SalesAnalyticsComponent
              name={analtics?.name}
              price={analtics?.price}
              color={analtics?.color}
            />
          );
        })}
      </div>

      <div className="flex items-end justify-end mb-6">
        <div className="w-1/2">
          <Select
            name="filter_type"
            placeholder="Select Time Period"
            labelText="Filter by Time Period"
            labelClass="text-blue-500"
            className=" outline-none rounded-xl  text-[#8b8b8b] bg-white"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            options={filterAnalyticsOptions?.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
          />
        </div>
      </div>

      <MonthlySales orderStatusData={data?.data?.order_status_data} />

    </div>
  );
};

export default AdminAnalytics;
