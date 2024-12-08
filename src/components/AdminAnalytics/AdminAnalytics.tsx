// const AdminAnalytics = () => {
//   return (
//     <div>AdminAnalytics</div>
//   )
// }

// export default AdminAnalytics

import React from "react";

const AdminAnalytics: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Analytics Overview</h2>

      {/* Sales Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Total Sales</h3>
          <p className="text-2xl font-bold text-green-500">$25,000</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Orders</h3>
          <p className="text-2xl font-bold text-blue-500">1,500</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Avg Order Value</h3>
          <p className="text-2xl font-bold text-purple-500">$60</p>
        </div>
      </div>

      {/* Charts */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales</h3>
        <div className="h-64 bg-gray-200 rounded">
          {/* Placeholder for chart component */}
          <p className="text-center text-gray-500">Chart goes here</p>
        </div>
      </div>

      {/* Top-Selling Products */}
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
            <tr className="border-b">
              <td className="px-6 py-4">Stylish Bracelet</td>
              <td className="px-6 py-4">120</td>
              <td className="px-6 py-4">$3,000</td>
            </tr>
            <tr className="border-b">
              <td className="px-6 py-4">Leather Wallet</td>
              <td className="px-6 py-4">95</td>
              <td className="px-6 py-4">$4,275</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Sporty Cap</td>
              <td className="px-6 py-4">85</td>
              <td className="px-6 py-4">$1,572</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnalytics;
