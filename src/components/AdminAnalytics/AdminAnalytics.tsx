import BaseDataTable from "@components/BaseDataTable/BaseDataTable";
import AnalyticsComponent from "@components/SalesAnalyticsComponent/AnalyticsComponent"; 
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Analytics =[
  {
    name: "Total Sales",
    price: "890,000 Rs",
    color: "text-blue-500"
  },
  {
    name: "Today's Sales",
    price: "100,000 Rs",
    color: "text-red-500"
  },
  {
    name: "Orders",
    price: "1500",
    color: "text-green-500"
  },
  {
    name: "Avg Order Value",
    price: "5000 Rs",
    color: "text-orange-500"
  },
]

const monthlySales = [
  { month: "Jan", revenue: 50000 },
  { month: "Feb", revenue: 75000 },
  { month: "Mar", revenue: 90000 },
  { month: "Apr", revenue: 110000 },
  { month: "May", revenue: 120000 },
];

interface TopProduct {
  name: string;
  units_sold: string;
  total_revenue: string;
}

const topProducts = [
  {
    name: "Stylish Bracelet",
    units_sold: "60",
    total_revenue: "40,000"
  },
  {
    name: "Leather Wallet",
    units_sold: "50",
    total_revenue: "15,000"
  },
  {
    name: "Sports Cap",
    units_sold: "85",
    total_revenue: "11,560"
  },
]

const AdminAnalytics= () => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
       
        {Analytics.map((analtics)=>{
          return <AnalyticsComponent name={analtics.name} price={analtics.price} color={analtics.color} />
        })}

      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlySales}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top-Selling Products</h3>

         <BaseDataTable
              customStyles={{
                headRow: {
                  style: {
                    background: "linear-gradient(to bottom right, #f8fafc, #f8fafc)",
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
                  style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
                  selector: (row: TopProduct) => (row.name),
                  sortable: true,
                },
                {
                  name: "Units Sold",
                  style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
                  selector: (row: TopProduct) => (row.units_sold),
                  sortable: true,
                },
                {
                  name: "Total Revenue (PKR)",
                  style: "display:flex;justify-content:center; !important",
                  selector: (row: TopProduct) => (row.total_revenue),
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