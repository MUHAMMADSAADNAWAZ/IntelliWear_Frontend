import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useQuery } from "@tanstack/react-query"

import { AddProducts } from "@components/Addproducts"
import AdminProductsApi from "@api/adminproducts.api"
import { updateLoader } from "@redux/slices/loaderSlice"

const EditProducts = () => {

  const {productId} = useParams()
  const dispatch = useDispatch()
  const adminproductapi = new AdminProductsApi()

  const getProduct = async () =>{
    dispatch(updateLoader(true));
    const data =  await adminproductapi.getSpecificProduct(productId || "")
    dispatch(updateLoader(false))
    return data;
  }

  const {data} = useQuery({
    queryFn: getProduct,
    queryKey: ['specificproduct'],
    enabled: !!productId
  })


  if (!data?.data) return <p className="font-bold text-center text-3xl">Product Not Found</p>;                

  return (
    <>
      <AddProducts product={data?.data} />
    </>
   
  )
}

export default EditProducts