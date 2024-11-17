import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, selectCart, updateQuantity } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { CartItem , closeCart} from '../../redux/slices/cartSlice';
import CloseIcon from '@mui/icons-material/Close';


const CartSidebar = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state : RootState) => state.cart.items);
  const totalPrice = useSelector((state : RootState) => state.cart.totalPrice);

  const cart = useSelector(selectCart);
  const isOpen = cart.cartVisibility;

  return (
    <div className={`fixed top-0 right-0 h-full overflow-y-auto bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 w-80 z-50`}>
      <div className="p-4 border-b flex justify-between">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <CloseIcon onClick={() => {dispatch(closeCart())}} className='cursor-pointer' />
        
      </div>
      <div className="p-4 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          cartItems.map((item : CartItem) => (
            <div key={`${item.id}-${item.size}`} className="flex items-center justify-between mb-4">
              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover" />
              <div className="flex flex-col flex-grow ml-2">
                <span className="font-medium">{item.name}</span>
                <span className="text-gray-500">Size: {item.size}</span>
                <span className="text-gray-500">Price: Rs.{item.price}</span>
                <span className="text-gray-500">Quantity: {item.quantity}</span>
                <input
                 type="number"
                 min="1"
                 className="w-12 mt-1 border border-gray-300 outline-none"
                 value={item.quantity }
                 onChange={(e) => {
                   const value = Number(e.target.value);
                  // console.log("value" , value);
                  // console.log("item.quantity" , item.quantity);
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
              <button onClick={() => dispatch(removeFromCart({ id: item.id , size:item.size }))} className="text-red-500">Remove</button>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>Rs{totalPrice.toFixed(2)}</span>
        </div>
        <button className="w-full mt-4 bg-yellow-500 text-white py-2 rounded">Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default CartSidebar;
