import AnalyticsComponent from "../SalesAnalyticsComponent/AnalyticsComponent";

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

const topProducts = [
  {
    name: "Stylish Bracelet",
    units_sold: "60",
    total_revenue: "40,000 Rs"
  },
  {
    name: "Leather Wallet",
    units_sold: "50",
    total_revenue: "15,000 Rs"
  },
  {
    name: "Sports Cap",
    units_sold: "85",
    total_revenue: "11,560 Rs"
  },
]

const AdminAnalytics= () => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
       
        {Analytics.map((analtics)=>{
          return <AnalyticsComponent name={analtics.name} price={analtics.price} color={analtics.color} />
        })}

      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales</h3>
        <div className="h-64 bg-gray-200 rounded">
          <p className="text-center text-gray-500">Chart goes here</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top-Selling Products</h3>
        <table className="min-w-full bg-white text-left text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3">Product</th>
              <th className="px-6 py-3">Units Sold</th>
              <th className="px-6 py-3">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {
              topProducts.map((product)=>{
              return  <tr className="border-b">
              <td className="px-6 py-4">{product.name}</td>
              <td className="px-6 py-4">{product.units_sold}</td>
              <td className="px-6 py-4">{product.total_revenue}</td>
              </tr>
              })
              
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnalytics;
