import ClothInfo from "../HomeClothInfo/HomeClothInfo";
import { clothesdata, shoesData, accessoriesData } from "../../Data/data.ts";

const ClothBlock = () => {
  return (
    <div className="text-gray-900">
      
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Clothes</h2>
      <div className="grid grid-cols-4 gap-4">
        {clothesdata.map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} />
        ))}
      </div>
      <a href="#" className="block text-center text-yellow-500 hover:underline my-4">View All</a>

      
      <h2 className="text-2xl font-semibold text-blue-500 mt-8 mb-4">Footwear</h2>
      <div className="grid grid-cols-4 gap-4">
        {shoesData.map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} />
        ))}
      </div>
      <a href="#" className="block text-center text-yellow-500 hover:underline my-4">View All</a>

    
      <h2 className="text-2xl font-semibold text-blue-500 mt-8 mb-4">Accessories</h2>
      <div className="grid grid-cols-4 gap-4">
        {accessoriesData.map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} />
        ))}
      </div>
      <a href="#" className="block text-center text-yellow-500 hover:underline my-4">View All</a>

    </div>
  );
}

export default ClothBlock;
