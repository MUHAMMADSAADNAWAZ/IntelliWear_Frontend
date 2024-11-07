import { useParams } from "react-router-dom";
import { accessoriesData, clothesData, footwearData } from "../../Data/data";
import { useState } from "react";
import { Button, Input, Select } from "../../components/common";
import { useDispatch, useSelector } from "react-redux";
import { addToCart , selectProduct, updateQuantity } from "../../redux/slices/cartSlice";
import { ClothInfoProps } from "../../components/HomeClothInfo/HomeClothInfo";

const ProductDetails = () => {

  const options = {
    sizes : ["X-Small" , "Small" , "Medium" , "Large" , "X-Large"],
   } 

  const { productId } = useParams();

  const product = clothesData.find(item => item.id === Number(productId)) ||
                  footwearData.find(item => item.id === Number(productId)) ||
                  accessoriesData.find(item => item.id === Number(productId));

  const [quantity, setQuantity] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");

  const dispatch = useDispatch();

  const cartItems = useSelector(selectProduct);

  if (!product) return <p className="font-bold text-center text-3xl">Product Not Found</p>;

  const existingItem = cartItems.find((item : ClothInfoProps) => item.id === product.id)

  const handleAddToCart = () =>{
    if(existingItem){
      dispatch(updateQuantity({id: product.id , quantity}))
    }
    else{
      dispatch(addToCart({...product , quantity}))
    }
  }

  return (
    <div className="flex flex-row gap-6 p-6 bg-gray-100 w-full">

      <div className="w-1/2">
        <img src={product.img} alt={product.name} className="w-full max-h-screen rounded-md shadow-lg" />
      </div>
      
      <div className="w-1/2 flex flex-col space-y-4">
      
        <h2 className="text-2xl font-bold text-gray-800">Name : {product.name}</h2>
        <p className="text-xl text-gray-600 font-semibold">Price : {product.price}</p>
        <p className="text-gray-700 text-lg font-medium">Description : {product.desc}</p>

        <hr />

        <div className="flex items-center gap-3 mt-4">
          
          <Select
            id="size"
            placeholder="Select Size"
            labelText={`Select Size : ${selectedSize}`}
            labelClass="text-[#FF6900] font-medium"
          
            onChange={(e) => setSelectedSize(e.target.value)}
            options={options.sizes.map((element : string) =>{
                return {
                    label: element,
                    value: element
                }
            })}
            
            className={
                " border-t-2 border-b-2 mt-4 border-l-2 border-r-2 rounded-xl p-2 focus:border-[#FF6900] text-[#8b8b8b]"
              }
          >
          
          </Select>
        </div>

        <div className="flex gap-4 ">
          
        <Input 
          type="number"
          id="quantity"
          placeholder="Select Quantity"
        //   value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          min="1"
          max="5"
          />
          
          <Button className="w-1/3 bg-yellow-500 px-3 py-2 hover:bg-yellow-600 " onClick={handleAddToCart}>Add to Cart</Button>
          <button className="w-1/3 py-2 bg-green-600 text-white rounded hover:bg-green-700">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
