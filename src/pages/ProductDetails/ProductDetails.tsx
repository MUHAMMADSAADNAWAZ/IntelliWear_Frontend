import { useEffect, useState } from "react";

import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomerProductsApi from "@api/customerproducts.api";
import { Button, Select } from "@components/common";
import { addToCart, CartItem, selectProduct, updateQuantity } from "@redux/slices/cartSlice";
import { selectUser } from "@redux/slices/userSlice";
import { ROUTE_LOGIN } from "@routes/constants";
import { updateLoader } from "@redux/slices/loaderSlice";
import { getImageUrl } from "@utils/getImageUrl";
import { AddToCartPayload } from "@dto/product.dto";

interface sizeType{
  size: string;
  id: number;
  quantity: number;
}

const ProductDetails = () => {

  const [quantity, setQuantity] = useState<number>(1);
  const [size, setSelectedSize] = useState<sizeType | null>(null);

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

  
  const addToCartReq = async (addCartPayload: AddToCartPayload) =>{
    dispatch(updateLoader(true));
    return await customerproductapi.addProductToCart(addCartPayload);
  }
  
  const {mutateAsync} = useMutation({
    mutationFn: addToCartReq,
    onSuccess: () =>{
      toast.success("Product added to cart successfully")
      dispatch(updateLoader(false))
    },
    onError: (error: any) =>{
      toast.error( error?.response?.data?.error || "Failed to add product to cart");
      dispatch(updateLoader(false))
    }
  })

  const updateProductQuantity = async (payload: {cart_item_id : number , quantity: number}) =>{
    dispatch(updateLoader(true));
    return await customerproductapi.updateCart(payload);
  }
  
  const {mutateAsync: mutateUpdateQuantity} = useMutation({
    mutationFn: updateProductQuantity,
    onSuccess: () =>{
      toast.success("Product quantity updated successfully!")
      dispatch(updateLoader(false))
    },
    onError: (error: any) =>{
      toast.error( error?.response?.data?.error || "Unable to update procut quantity");
      dispatch(updateLoader(false))
    }
  })

  const handleAddToCart = async () => {
    if (!email) {
      toast.info("You need to login first before adding products to cart.");
      navigate(ROUTE_LOGIN);
      return;
    }
  
    if (!size) {
      toast.error("Please select a size before adding to cart.");
      return;
    }
  
    const existingItem = cartItems.find(
      (item: CartItem) => item.id === data?.data?.results.id && item.size.id === size.id
    );
  
    // const newQuantity = (existingItem ? existingItem.quantity : 0);
    const maxQuantity = size?.quantity;
  
    if (quantity > maxQuantity) {
      toast.error(`Only ${maxQuantity} items available in stock.`);
      return;
    }
  
    try {
      if (existingItem) {
        const response = await mutateUpdateQuantity({
          cart_item_id: existingItem.cart_item_id, 
          quantity: quantity,
        });
  
        if (response?.data?.message) {
          dispatch(updateQuantity({ id: existingItem.id, quantity: quantity, size }));
        }
      } else {
        const response = await mutateAsync({
          product_id: data?.data?.results.id,
          quantity,
          size_id: size.id,
        });
  
        if (response?.data?.cart_item_id) {
          dispatch(
            addToCart({
              ...data?.data?.results,
              quantity,
              size,
              cart_item_id: response.data.cart_item_id, 
            })
          );
        }
      }
    } catch (error) {
      toast.error("Failed to update cart. Please try again.");
    }
  };
  
  const imageUrl = getImageUrl(data?.data?.results?.image)

  const addQuantity = (quan: number) => {
    const selectedSizeData = data?.data?.results?.sizes?.find((s: { id: number }) => s.id === size?.id);
    const maxQuantity = selectedSizeData ? selectedSizeData.quantity : 5; 
  
    if (quantity + quan > maxQuantity) {
      return; 
    } else if (quantity + quan < 1) {
      return; 
    } else {
      setQuantity(quantity + quan);
    }
  };
  

  useEffect(()=>{
    setSelectedSize(data?.data?.results?.sizes[0])
  },[data?.data?.results?.sizes[0]])

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
            labelText={`Selected Size : ${size?.size}`}
            labelClass="text-[#FF6900] font-medium"
            value={size?.id}
            onChange={(e) => {
              const selected = data?.data?.results?.sizes.find((s: sizeType) => s.id === Number(e.target.value));
              if (selected) {
                setSelectedSize(selected); 
                setQuantity(1); 
              }
            }}
            options={data?.data?.results?.sizes?.map((element : {size: string , quantity: number, id:number}) =>{
                return {
                    label: element?.size,
                    value: element?.id
                }
            })}
            
            className={
                " border-t-2 border-b-2 mt-4 border-l-2 border-r-2 rounded-xl p-2 focus:border-[#FF6900] text-[#8b8b8b]"
              }
          >
          
          </Select>
        </div>

        <div className="flex gap-4 ">
          
          <div className="flex gap-2 items-center justify-center w-[22%] h-12 border-2 bg-white text-black border-[#e9e9e9] ">
            <Button onClick={() =>{addQuantity(1)}} className="bg-white text-black h-8 hover:bg-gray-100 rounded-none w-1/3 ml-2">+</Button>
            <p>{quantity}</p>
            <Button onClick={() =>{addQuantity(-1)}} className="bg-white text-black h-8 hover:bg-gray-100 rounded-none w-1/3 mr-2">-</Button>
          </div>
          
          <Button className="w-[80%] bg-blue-500 px-3 py-2 hover:bg-blue-600 transition-all duration-300 group/button" onClick={handleAddToCart}><ShoppingCart
            size={20} 
            className="group-hover/button:animate-bounce"
          />Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
