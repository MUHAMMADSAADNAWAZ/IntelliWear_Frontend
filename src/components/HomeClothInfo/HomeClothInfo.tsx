import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { selectUser } from "../../redux/slices/userSlice";
import { ROUTE_LOGIN } from "../../routes/constants";

export interface ClothInfoProps {
  id: number;
  img: string;
  name: string;
  size?: string;
  price: number;
  product?: any;
}

const ClothInfo = ({ img, name, price, id, product }: ClothInfoProps) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const email = user?.email;

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
    <div className="cloth-info border border-gray-200 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-6 overflow-hidden">
     
      <Link to={`/product/${id}`}>
        <div className="relative">
          <img
            src={img}
            alt={name}
            className="h-64 w-full object-cover rounded-t-md transition-transform duration-300 hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg text-gray-800">{name}</h2>
          <p className="text-blue-500 font-semibold">Price: {price} Rs</p>
        </div>
        <Button
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 mt-2 rounded-md transition-colors duration-200"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ClothInfo;
