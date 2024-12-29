import { useParams } from "react-router-dom"

import { AddProducts } from "@components/Addproducts"
import { accessoriesData, clothesData, footwearData } from "@Data/data"

const EditProducts = () => {

  const {productId} = useParams()

  const product = clothesData.find(item=> item.id === Number(productId)) ||
                  footwearData.find(item=> item.id === Number(productId)) ||    
                  accessoriesData.find(item=> item.id === Number(productId))

  if (!product) return <p className="font-bold text-center text-3xl">Product Not Found</p>;                

  return (
    <>
      <AddProducts product={product} />
    </>
   
  )
}

export default EditProducts