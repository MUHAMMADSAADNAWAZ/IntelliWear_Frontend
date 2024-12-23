const orders = [
  {
    id: 1,
    date: "10-01-2024",
    status: "Delivered",
    items: [
      { name: "T-Shirt", qty: 2, price: 1500 },
      { name: "Sneakers", qty: 1, price: 3000 },
    ],
    total: 6000,
  },
  {
    id: 2,
    date: "05-01-2024",
    status: "In Progress",
    items: [
      { name: "Hoodie", qty: 1, price: 2500 },
      { name: "Backpack", qty: 1, price: 4000 },
    ],
    total: 6500,
  },
];

const MyOrders = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">My Orders</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="mb-6 p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xl font-semibold text-gray-700">Order ID: {order.id}</p>
                  <p className="text-gray-500">Date: {order.date}</p>
                </div>
                <span
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="mb-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-gray-600 mb-2"
                  >
                    <p className="font-medium">{item.name} (x{item.qty})</p>
                    <p className="font-bold">PKR {item.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center text-lg font-bold text-gray-800">
                <p>Total : PKR {order.total}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;

