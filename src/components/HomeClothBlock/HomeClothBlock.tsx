import ClothInfo from "@components/HomeClothInfo/HomeClothInfo.tsx";
import { clothesData, footwearData, accessoriesData } from "@Data/data";
import { Link } from "react-router-dom";
import { ROUTE_CLOTHES , ROUTE_FOOTWEAR , ROUTE_ACCESSORIES } from "@routes/constants.ts";

const ClothBlock = () => {

  return (
    <div className="text-gray-900">
      
      <h2 className="text-2xl font-semibold text-blue-500 pl-4">Clothes</h2>
      <div className="grid grid-cols-4 gap-4 p-4">
        {clothesData.slice(0,8).map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} description={element.description} />
        ))}
      </div>
      <Link to={ROUTE_CLOTHES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

      
      <h2 className="text-2xl font-semibold text-blue-500 mt-8 pl-4">Footwear</h2>
      <div className="grid grid-cols-4 gap-4 p-4">
        {footwearData.slice(0,8).map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} description={element.description} />
        ))}
      </div>
      <Link to={ROUTE_FOOTWEAR} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

    
      <h2 className="text-2xl font-semibold text-blue-500 mt-8 pl-4">Accessories</h2>
      <div className="grid grid-cols-4 gap-4 p-4">
        {accessoriesData.slice(0,8).map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} description={element.description} />
        ))}
      </div>
      <Link to={ROUTE_ACCESSORIES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

    </div>
  );
}

export default ClothBlock;
