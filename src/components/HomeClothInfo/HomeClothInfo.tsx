import { ShoppingCart } from 'lucide-react';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addToCart } from "@redux/slices/cartSlice";
import { selectUser } from "@redux/slices/userSlice";
import { ROUTE_LOGIN } from "@routes/constants";

export interface ClothInfoProps {
  id: number;
  img: string;
  name: string;
  size?: string;
  description?: string;
  price: number;
  product?: any;
}

const ClothInfo = ({ img, name, price, id, product , description }: ClothInfoProps) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const email = user?.user_info?.email;

  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (email === undefined) {
      toast.info("You need to login first before adding products to cart.");
      navigate(ROUTE_LOGIN);
    } else {
      toast.success("Product added to cart successfully");
      product.size = "X-Small";
      dispatch(addToCart(product));
    }
  };

  return (
    <div className="group bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col">
    

      <Link to={`/product/${id}`} className="block">
        <div className="overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className=" inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
      </Link>

      <div className="p-4 space-y-3 h-full flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 w-2/3">
            {name}
          </h2>
          <span className="text-blue-600 font-semibold text-lg">
            Rs: {price}
          </span>
        </div>

        {description && (
          <p className="text-gray-600 text-sm line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
       )} 

        <button 
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 group/button mt-auto"
        >
          <ShoppingCart
            size={20} 
            className="group-hover/button:animate-bounce"
          />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ClothInfo;
