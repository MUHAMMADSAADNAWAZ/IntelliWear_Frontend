import ClothInfo from "../HomeClothInfo/HomeClothInfo";
import { clothesData, footwearData, accessoriesData } from "../../Data/data.ts";
import { Link } from "react-router-dom";
import { ROUTE_CLOTHES , ROUTE_FOOTWEAR , ROUTE_ACCESSORIES } from "../../routes/constants.ts";
import { useEffect } from "react";

const ClothBlock = () => {

  const preloadImages = (srcArray : any) => {
    srcArray.forEach((src: any) => {
      const img = new Image();
      img.src = src;
    });
  };
  
  useEffect(() => {
    const allImages = [...clothesData, ...footwearData, ...accessoriesData].map((item) => item.img);
    preloadImages(allImages);
  }, []);
  

  return (
    <div className="text-gray-900">
      
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Clothes</h2>
      <div className="grid grid-cols-4 gap-4">
        {clothesData.slice(0,8).map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
        ))}
      </div>
      <Link to={ROUTE_CLOTHES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

      
      <h2 className="text-2xl font-semibold text-blue-500 mt-8 mb-4">Footwear</h2>
      <div className="grid grid-cols-4 gap-4">
        {footwearData.slice(0,8).map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
        ))}
      </div>
      <Link to={ROUTE_FOOTWEAR} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

    
      <h2 className="text-2xl font-semibold text-blue-500 mt-8 mb-4">Accessories</h2>
      <div className="grid grid-cols-4 gap-4">
        {accessoriesData.slice(0,8).map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
        ))}
      </div>
      <Link to={ROUTE_ACCESSORIES} className="block text-center text-yellow-500 hover:underline my-4">View All</Link>

    </div>
  );
}

export default ClothBlock;
