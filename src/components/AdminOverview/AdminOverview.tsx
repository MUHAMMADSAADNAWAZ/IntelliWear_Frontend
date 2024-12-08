// const AdminOverview = () => {
//   return (
//     <div>AdminOverview</div>
//   )
// }

// export default AdminOverview

const AdminOverview: React.FC = () => {
  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Overview</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
          <p className="text-2xl font-bold text-blue-500">$12,345</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700">Today's Sales</h2>
          <p className="text-2xl font-bold text-green-500">$1,234</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700">Pending Reviews</h2>
          <p className="text-2xl font-bold text-orange-500">8</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700">Low Inventory</h2>
          <p className="text-2xl font-bold text-red-500">5 Items</p>
        </div>
      </div>

      {/* Charts and Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Analytics</h2>
          {/* Placeholder for Chart */}
          <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Chart Placeholder</span>
          </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Recent Activities</h2>
          <ul className="space-y-2">
            <li className="text-gray-600">• New order placed: Order #12345</li>
            <li className="text-gray-600">• Product restocked: Product XYZ</li>
            <li className="text-gray-600">• Review submitted by User123</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
