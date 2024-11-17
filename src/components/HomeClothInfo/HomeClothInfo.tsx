import { Link } from "react-router-dom";
import { Button } from "../common";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { selectUser } from "../../redux/slices/userSlice";


export interface ClothInfoProps {
  id: number;
  img: string;
  name: string;
  size: string;
  price: number;
  product?: any
}

const ClothInfo = ({ img, name, price , id , product }: ClothInfoProps) => {

  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const email = user?.email;

  const handleAddToCart = () =>{
    if(email === undefined){
      toast.info("You need to login first before adding products to cart.");
    }
    else{
      toast.success("Product added to cart successfully");
      product.size = "X-Small";
      dispatch(addToCart(product));
    }
  }

  return (

    <div className="cloth-info border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
    <Link to={`/product/${id}`}>

      <img src={img} alt={name} className="h-40 w-full object-cover rounded-md mb-4" />
      <p className="font-semibold text-gray-800">Name: {name}</p>
      <p className="text-blue-500 font-bold">Price: {price}</p>
    
    </Link>
      <Button className="bg-yellow-500 mt-2 px-3 py-2 hover:bg-yellow-600 w-full text-center" onClick={handleAddToCart}>Add to Cart</Button>
    </div>
  );
}

export default ClothInfo;
