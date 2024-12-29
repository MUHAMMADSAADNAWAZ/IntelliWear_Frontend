import { HomeClothInfo } from "@components/HomeClothInfo";
import { accessoriesData, clothesData, footwearData } from "@Data/data"

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
      
      <h2 className="text-2xl font-semibold text-blue-500 pl-4">Clothes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 p-4">
        {clothes.length > 0 ? (clothes.map((element, index) => (
          <HomeClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} description={element.description} />
        ))) : (<p className="text-center text-lg font-semibold col-span-full">No items available right now</p>)}
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 pl-4">Footwear</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 p-4">
        {footwear.length > 0 ?( footwear.map((element, index) => (
          <HomeClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} description={element.description} />
        ))) : (<p className="text-center text-lg font-semibold col-span-full">No items available right now</p>)}
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 pl-4">Accessories</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {accessories.length > 0 ? (accessories.map((element, index) => (
        <HomeClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} description={element.description} />
      ))) : (<p className="text-center text-lg font-semibold col-span-full">No items available right now</p>)}
    </div>

    </div>
  )
}

export default MenClothing