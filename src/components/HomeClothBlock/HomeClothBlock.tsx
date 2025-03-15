import { Link } from "react-router-dom";

import { HomeProductProps } from "@dto/product.dto";
import { Clothes } from "@pages/Clothes";
import { ROUTE_ACCESSORIES, ROUTE_CLOTHES, ROUTE_FOOTWEAR } from "@routes/constants.ts";

const ClothBlock = ({ data }: { data: HomeProductProps[] }) => {

  return (
    <div className="text-gray-900">
      
      <Clothes heading="Clothes" data={data?.filter(item => item?.product_type === "CLOTHES")} />
      <Link to={ROUTE_CLOTHES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

      <Clothes heading="Footwear" data={data?.filter(item => item?.product_type === "SHOES")} />
      <Link to={ROUTE_FOOTWEAR} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

      <Clothes heading="Accessories" data={data?.filter(item => item?.product_type === "ACCESSORIES")} />
      <Link to={ROUTE_ACCESSORIES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

    </div>
  );
}

export default ClothBlock;
