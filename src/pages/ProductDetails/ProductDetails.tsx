import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

import CustomerProductsApi from "@api/customerproducts.api";
import { Button, Select } from "@components/common";
import { ClothInfoProps } from "@components/HomeClothInfo/HomeClothInfo";
import { addToCart, selectProduct, updateQuantity } from "@redux/slices/cartSlice";
import { selectUser } from "@redux/slices/userSlice";
import { ROUTE_CHECKOUT, ROUTE_LOGIN } from "@routes/constants";
import { updateLoader } from "@redux/slices/loaderSlice";
import { getImageUrl } from "@utils/getImageUrl";

const ProductDetails = () => {

  const [quantity, setQuantity] = useState(1);
  const [size, setSelectedSize] = useState("");
  
  const user = useSelector(selectUser);
  const cartItems = useSelector(selectProduct);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = user?.user_info?.email;
  const customerproductapi = new CustomerProductsApi()

  const { productId } = useParams();

  const productDetails = async () =>{
    dispatch(updateLoader(true));
    const res = await customerproductapi.getProductDetails(productId);
    dispatch(updateLoader(false));
    return res;
  }

  const {data} = useQuery({
    queryKey: ["productdetails" , productId],
    queryFn: productDetails,
    enabled: !!productId
  })

  const existingItem = cartItems.find((item : ClothInfoProps) => item.id === data?.data?.results.id && item.size === size)

  const handleAddToCart = () =>{
    if(email === undefined){
      toast.info("You need to login first before adding products to cart.");
      navigate(ROUTE_LOGIN)
    }
    else if(existingItem){
      toast.success("Product quantity updated successfully");
      dispatch(updateQuantity({id: data?.data?.results.id , quantity , size}))
    }
    else{
      toast.success("Product added to cart successfully");
      dispatch(addToCart({...data?.data?.results , quantity , size}))
    }
  }

  const handleBuyNow = () =>{
    handleAddToCart()
    if(email)
    navigate(ROUTE_CHECKOUT)
  }

  const addQuantity = (quan: number) =>{
    if(quantity + quan > 5){
      return
    }
    else if(quantity + quan < 1){
      return
    }
    else{
      setQuantity(quantity+quan)
    }
  }

  const imageUrl = getImageUrl(data?.data?.results?.image)

  useEffect(()=>{
    setSelectedSize(data?.data?.results?.sizes[0]?.size)
  },[data?.data?.results?.sizes[0]?.size])

  console.log("data?.data?.results" , data?.data?.results)

  return (
    <div className="flex flex-row gap-6 p-6 bg-gray-100 w-full">

      <div className="w-1/2">
        <img src={imageUrl} alt={data?.data?.results?.name} className="w-full max-h-screen rounded-md shadow-lg" />
      </div>
      
      <div className="w-1/2 flex flex-col space-y-4">
      
        <h2 className="text-2xl font-bold text-gray-800">{data?.data?.results?.name}</h2>
        <p className="text-xl text-gray-600 font-semibold">Price : {data?.data?.results?.price} Rs</p>
        <p className="text-gray-700 text-lg font-medium">Description : {data?.data?.results?.description}</p>

        <hr />

        <div className="flex items-center gap-3 mt-4">
          
          <Select
            id="size"
            placeholder="Select Size"
            labelText={`Selected Size : ${size}`}
            labelClass="text-[#FF6900] font-medium"
            value={size}
            onChange={(e) => setSelectedSize(e.target.value)}
            options={data?.data?.results?.sizes?.map((element : {size: string , quantity: number}) =>{
                return {
                    label: element?.size,
                    value: element?.size
                }
            })}
            
            className={
                " border-t-2 border-b-2 mt-4 border-l-2 border-r-2 rounded-xl p-2 focus:border-[#FF6900] text-[#8b8b8b]"
              }
          >
          
          </Select>
        </div>

        <div className="flex gap-4 ">
          
        {/* <Input 
          type="number"
          id="quantity"
          wrapperClass="w-1/5"
          className="bg-red-500"
          placeholder="1"
          // value={quantity}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1 && value <= 5) {
              setQuantity(value); 
            } else if (value < 1) {
              setQuantity(1); 
            } else if (value > 5) {
              setQuantity(5);
            }
          }}
          min="1"
          max="5"
          /> */}
          <div className="flex gap-2 items-center justify-center w-[22%] h-12 border-2 bg-white text-black border-[#e9e9e9] ">
            <Button onClick={() =>{addQuantity(1)}} className="bg-white text-black h-8 hover:bg-gray-100 rounded-none w-1/3 ml-2">+</Button>
            <p>{quantity}</p>
            <Button onClick={() =>{addQuantity(-1)}} className="bg-white text-black h-8 hover:bg-gray-100 rounded-none w-1/3 mr-2">-</Button>
          </div>
          
          <Button className="w-[40%] bg-blue-500 px-3 py-2 hover:bg-blue-600 " onClick={handleAddToCart}>Add to Cart</Button>
          <Button className="w-[40%] bg-yellow-500 px-3 py-2 hover:bg-yellow-600 " onClick={handleBuyNow}>Buy Now</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
