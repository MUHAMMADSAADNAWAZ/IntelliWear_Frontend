import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import CustomerOrdersApi from "@api/customerorder.api";
import { orders } from "@Data/data";
import { updateLoader } from "@redux/slices/loaderSlice";

const MyOrders = () => {

  const dispatch = useDispatch()
  const customerorderapi = new CustomerOrdersApi()

  const getOrders = async () =>{
    dispatch(updateLoader(true));
    const res = await customerorderapi.getCustomerOrder();
    dispatch(updateLoader(false))
    return res;
  }

  const {data} = useQuery({
    queryKey: ["customerorders"],
    queryFn: getOrders
  })

  console.log("orders data is" , data)

  return (
    <div className="w-full md:min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-blue-600 mb-6">My Orders</h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">You have no orders yet.</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="mb-6 p-3 md:p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm md:text-xl font-semibold text-gray-700">Order ID: {order.id}</p>
                  <p className="text-sm md:text-base text-gray-500">Date: {order.date}</p>
                </div>
                <span
                  className={` p-2 md:px-4 text-xs md:text-sm font-medium rounded-lg ${
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
                    <p className="font-medium text-sm md:text-base">{item.name} (x{item.qty})</p>
                    <p className="font-bold text-sm md:text-base">PKR {item.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center text-sm md:text-lg font-bold text-gray-800">
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

