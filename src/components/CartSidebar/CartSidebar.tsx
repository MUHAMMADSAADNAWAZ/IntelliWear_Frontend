import CloseIcon from "@mui/icons-material/Close";
import { BiRightArrowAlt } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import CustomerProductsApi from "@api/customerproducts.api";
import {
  CartItem,
  closeCart,
  removeFromCart,
  selectCart,
  updateChecked,
} from "@redux/slices/cartSlice";
import { RootState } from "@redux/store";
import { ROUTE_CHECKOUT } from "@routes/constants";
import { getImageUrl } from "@utils/getImageUrl";
import { updateLoader } from "@redux/slices/loaderSlice";

const CartSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cart = useSelector(selectCart);

  const customerproductapi = new CustomerProductsApi();

  console.log("cartItems", cartItems);

  const handleCartItemDelete = async (id: number) => {
    dispatch(updateLoader(true));
    return await customerproductapi.deleteProductFromCart(id);
  };

  const { mutateAsync } = useMutation({
    mutationFn: handleCartItemDelete,
    onSuccess: () => {
      toast.success("Cart item successfully removed!");
      dispatch(updateLoader(false));
    },
    onError: () => {
      toast.error("Unable to remove cart item!");
      dispatch(updateLoader(false));
    },
  });

  const totalPrice = cartItems
    .filter((item: CartItem) => item.checked)
    .reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

  const isOpen = cart.cartVisibility;

  const handleNavigateCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("You need to add items to cart before going to checkout");
    } else {
      navigate(ROUTE_CHECKOUT);
      dispatch(closeCart());
    }
  };

  const handleRemoveFromCart = async (cart_item_id: number) => {
    await mutateAsync(cart_item_id);
    dispatch(removeFromCart({ cart_item_id }));
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full overflow-y-auto bg-white shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 w-full md:w-96 z-50`}
    >
      <div className="p-4 border-b flex justify-between">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <CloseIcon
          onClick={() => {
            dispatch(closeCart());
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item: CartItem) => (
            <div
              key={`${item.cart_item_id}`}
              className="flex items-center justify-between mb-4"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) => {
                  dispatch(
                    updateChecked({
                      id: item.id,
                      size: item.size,
                      checked: e.target.checked,
                    })
                  );
                }}
              />
              <img
                src={getImageUrl(item?.image)}
                alt={item?.name}
                className="pl-2 w-16 h-16 object-cover"
              />
              <div className="flex flex-col flex-grow ml-2">
                <span className="font-medium">{item?.name}</span>
                <span className="text-gray-500">Size: {typeof item.size === 'string' ? item.size : item.size.size}</span>
                <span className="text-gray-500">Price: Rs.{item?.price}</span>
                <span className="text-gray-500">
                  Quantity: {item?.quantity}
                </span>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item?.cart_item_id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>Rs {totalPrice.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-4 bg-blue-500 text-white p-3 rounded flex items-center justify-center gap-5"
          onClick={handleNavigateCheckout}
        >
          {" "}
          <p>Proceed to Checkout</p>{" "}
          <BiRightArrowAlt style={{ fontSize: 25 }} />
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
