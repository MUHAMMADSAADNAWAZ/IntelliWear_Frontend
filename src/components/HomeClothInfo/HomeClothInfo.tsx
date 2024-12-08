import { Link, useNavigate } from "react-router-dom";
import { Button } from "../common";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../../redux/slices/userSlice";
import { ROUTE_LOGIN } from "../../routes/constants";


export interface ClothInfoProps {
  id: number;
  img: string;
  name: string;
  size?: string;
  price: number;
  product?: any
}

const ClothInfo = ({ img, name, price , id , product }: ClothInfoProps) => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const email = user?.email;

  const navigate = useNavigate()

  const handleAddToCart = () =>{
    if(email === undefined){
      toast.info("You need to login first before adding products to cart.");
      navigate(ROUTE_LOGIN)
    }
    else{
      toast.success("Product added to cart successfully");
      product.size = "X-Small";
      dispatch(addToCart(product));
    }
  }

  return (

    <div className="cloth-info border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300  mb-4">

    <Link to={`/product/${id}`}>
      <img src={img} alt={name} className="h-[75%] w-full object-cover rounded-t-md mb-6 cursor-pointer" />
    </Link>

      <div className="flex items-center justify-center px-1 h-auto mx-2">
      
      <div className=" flex flex-col w-1/2 ">
      <p className="font-semibold text-gray-800 "> {name}</p>
      <p className="text-blue-500 font-bold ">Price: {price} Rs</p>
      </div>
    
      <Button className="bg-yellow-500 px-3 py-2 hover:bg-yellow-600 text-center w-1/2" onClick={handleAddToCart}>Add to Cart</Button>
      </div>

    </div>
  );
}

export default ClothInfo;
