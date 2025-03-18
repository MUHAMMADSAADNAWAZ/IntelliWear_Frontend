import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CustomerOrdersApi from "@api/customerorder.api";
import { updateLoader } from "@redux/slices/loaderSlice";
import CustomerProductsApi from "@api/customerproducts.api";
import { setCart } from "@redux/slices/cartSlice";
import { formatDate } from "@utils/convertDate";
import { Button } from "@components/common";

interface OrderItem {
  product: string;
  product_name: string;
  size: number;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  user: number;
  total_price: string;
  status: string;
  items: OrderItem[];
  created_at: string;
}

const MyOrders = () => {
  const dispatch = useDispatch();
  const customerorderapi = new CustomerOrdersApi();
  const customerproductapi = new CustomerProductsApi();
  const queryclient = useQueryClient();

  const getOrders = async () => {
    dispatch(updateLoader(true));
    const res = await customerorderapi.getCustomerOrder();
    dispatch(updateLoader(false));
    return res;
  };

  const { data } = useQuery({
    queryKey: ["customerorders"],
    queryFn: getOrders,
  });

  const getCustomerCart = async () => {
    return await customerproductapi.getCustomerCart();
  };

  const { data: cartData } = useQuery({
    queryKey: ["getcartitems"],
    queryFn: getCustomerCart,
  });

  useEffect(() => {
    if (cartData?.data?.cart_items) {
      dispatch(setCart(cartData?.data?.cart_items));
    }
  }, [cartData?.data?.cart_items]);

  const cancelOrder = async (order_id: number) => {
    dispatch(updateLoader(true));
    return await customerorderapi.cancelOrder(order_id);
  };

  const { mutateAsync } = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("Order is cancelled successfully!");
      dispatch(updateLoader(false));
      queryclient.invalidateQueries({ queryKey: ["customerorders"] });
    },
    onError: () => {
      toast.error("Unable to cancel your order!");
      dispatch(updateLoader(false));
    },
  });

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "in_process":
        return "bg-blue-100 text-blue-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full md:min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-2xl md:text-4xl font-extrabold text-blue-600 mb-6">
        My Orders
      </h1>
      <div className="bg-white rounded-lg shadow-md p-8">
        {data?.data?.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">
            You have no orders yet.
          </p>
        ) : (
          data?.data?.map((order: Order) => (
            <div
              key={order?.id}
              className="mb-6 p-3 md:p-6 bg-gray-50 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm md:text-xl font-semibold text-gray-700">
                    Order ID: {order?.id}
                  </p>
                  <p className="text-sm md:text-base text-gray-500">
                    Date: {formatDate(order?.created_at)}
                  </p>
                </div>

                <div className="flex gap-4">
                  {(order?.status === "in_process" ||
                    order?.status === "pending") && (
                    <Button
                      className="bg-red-500 p-2 md:px-4 text-xs md:text-sm font-medium rounded-lg hover:bg-red-600"
                      onClick={() => mutateAsync(order?.id)}
                    >
                      Cancel Order
                    </Button>
                  )}
                  <span
                    className={` p-2 md:px-4 text-xs md:text-sm font-medium rounded-lg ${getStatusStyles(
                      order?.status
                    )}`}
                  >
                    {order?.status}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                {order?.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-gray-600 mb-2 p-2 hover:bg-gray-50 rounded"
                  >
                    <div className="flex flex-col">
                      <p className="font-medium text-sm md:text-base">
                        {item?.product_name}
                      </p>
                      <div className="flex gap-4 text-xs md:text-sm text-gray-500">
                        <span>Quantity: {item?.quantity}</span>
                        <span>Size: {item?.size}</span>
                      </div>
                    </div>
                    <p className="font-bold text-sm md:text-base">
                      PKR {item?.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-end items-center text-sm md:text-lg font-bold text-gray-800">
                <p>Total : PKR {order?.total_price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
