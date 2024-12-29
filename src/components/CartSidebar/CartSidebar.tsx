import CloseIcon from '@mui/icons-material/Close';
import { BiRightArrowAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CartItem, closeCart, removeFromCart, selectCart, updateChecked, updateQuantity } from '@redux/slices/cartSlice';
import { RootState } from '@redux/store';
import { ROUTE_CHECKOUT } from '@routes/constants';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  console.log("cartItems" , cartItems);
  

  const totalPrice = cartItems
    .filter((item) => item.checked) 
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cart = useSelector(selectCart);
  const isOpen = cart.cartVisibility;

  const navigate = useNavigate()

  const handleNavigateCheckout = () =>{
    if(cartItems.length === 0){
      toast.error("You need to add items to cart before going to checkout")
    }
    else{
      navigate(ROUTE_CHECKOUT)
      dispatch(closeCart())
    }
  }

  return (
    <div className={`fixed top-0 right-0 h-full overflow-y-auto bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 w-full md:w-80 z-50`}>
      <div className="p-4 border-b flex justify-between">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <CloseIcon onClick={() => { dispatch(closeCart()) }} className='cursor-pointer' />
      </div>
      <div className="p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item: CartItem) => (
            <div key={`${item.id}-${item.size}`} className="flex items-center justify-between mb-4">
              <input
                type="checkbox"
                checked={item.checked} 
                onChange={(e) => {
                  dispatch(updateChecked({ id: item.id, size: item.size, checked: e.target.checked }));
                }}
              />
              <img src={item.img} alt={item.name} className="pl-2 w-16 h-16 object-cover" />
              <div className="flex flex-col flex-grow ml-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500">Size: {item.size}</span>
                <span className="text-gray-500">Price: Rs.{item.price}</span>
                <span className="text-gray-500">Quantity: {item.quantity}</span>
                <input
                  type="number"
                  min="1"
                  className="w-12 mt-1 border border-gray-300 outline-none"
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1 && value <= 5) {
                      dispatch(updateQuantity({ id: item.id, quantity: value, size: item.size }));
                    } else if (value < 1) {
                      dispatch(updateQuantity({ id: item.id, quantity: 1, size: item.size }));
                    } else if (value > 5) {
                      dispatch(updateQuantity({ id: item.id, quantity: 5, size: item.size }));
                    }
                  }}
                />
              </div>
              <button onClick={() => dispatch(removeFromCart({ id: item.id, size: item.size }))} className="text-red-500">Remove</button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>Rs {totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-blue-500 text-white p-3 rounded flex items-center justify-center gap-5" onClick={handleNavigateCheckout}> <p>Proceed to Checkout</p> <BiRightArrowAlt style={{ fontSize: 25}} /></button>
      </div>
    </div>
  );
};

export default CartSidebar;
