
import { useState } from "react";

import { updateLoader } from "@redux/slices/loaderSlice";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import AdminAnalyticsApi from "@api/adminanalytics.api";
import { BaseDataTable } from "@components/BaseDataTable";
import { MonthlySales } from "@components/MonthlySales";
import { SalesAnalyticsComponent } from "@components/SalesAnalyticsComponent";
import { filterAnalyticsOptions, topProducts } from "@Data/data";
import { Select } from "@components/common";


interface TopProduct {
  name: string;
  units_sold: string;
  total_revenue: string;
}

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

  console.log("admin analytics data", data);

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

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Top-Selling Products
        </h3>

        <BaseDataTable
          customStyles={{
            headRow: {
              style: {
                background:
                  "linear-gradient(to bottom right, #f8fafc, #f8fafc)",
                color: "#1b2559",
              },
            },
            pagination: {
              style: {
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              },
            },
            row: {
              style: {
                border: "1px solid",
              },
            },
          }}
          columns={[
            {
              name: "Product Name",
              style:
                "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
              selector: (row: TopProduct) => row.name,
              sortable: true,
            },
            {
              name: "Units Sold",
              style:
                "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
              selector: (row: TopProduct) => row.units_sold,
              sortable: true,
            },
            {
              name: "Total Revenue (PKR)",
              style: "display:flex;justify-content:center; !important",
              selector: (row: TopProduct) => row.total_revenue,
              sortable: true,
            },
          ]}
          data={topProducts}
          pagination
        />
      </div>
    </div>
  );
};

export default AdminAnalytics;
