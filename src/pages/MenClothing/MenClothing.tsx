import { accessoriesData, clothesData, footwearData } from "@Data/data"
import { Clothes } from "@pages/Clothes";

interface Clothing {
  heading: string;
  category: string;
}

const MenClothing = ({heading , category} : Clothing) => {

  const clothes = clothesData.filter(item => item.category === category || item.category === "all");
  const footwear = footwearData.filter(element => element.category === category || element.category === "all");
  const accessories = accessoriesData.filter(clothing => clothing.category === category || clothing.category === "all");

  return (
    <div className="text-gray-900 my-4">

    <h1 className="text-4xl text-center font-bold text-yellow-500 mb-6">{heading}</h1>    
      
        {clothes.length > 0 &&
      <Clothes heading="Clothes" data={clothes} /> }
    
      {footwear.length > 0 &&
      <Clothes heading="Footwear" data={footwear} />}
    
     {accessories.length > 0 &&
      <Clothes heading="Accessories" data={accessories} /> }

    </div>
  )
}

export default MenClothing