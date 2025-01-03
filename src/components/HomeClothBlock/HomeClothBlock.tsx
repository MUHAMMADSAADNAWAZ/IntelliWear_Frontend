import { Link } from "react-router-dom";

import { accessoriesData, clothesData, footwearData } from "@Data/data";
import { ROUTE_ACCESSORIES, ROUTE_CLOTHES, ROUTE_FOOTWEAR } from "@routes/constants.ts";
import { Clothes } from "@pages/Clothes";

const ClothBlock = () => {

  return (
    <div className="text-gray-900">
      
      <Clothes heading="Clothes" data={clothesData.slice(0,8)} />
      <Link to={ROUTE_CLOTHES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

      <Clothes heading="Footwear" data={footwearData.slice(0,8)} />
      <Link to={ROUTE_FOOTWEAR} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

      <Clothes heading="Accessories" data={accessoriesData.slice(0,8)} />
      <Link to={ROUTE_ACCESSORIES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

    </div>
  );
}

export default ClothBlock;
