import ClothInfo from "../../components/HomeClothInfo/HomeClothInfo"
import { accessoriesData, clothesData, footwearData } from "../../Data/data"

const WomenClothing = () => {
  return (
    <div className="text-gray-900 my-4">

    <h1 className="text-4xl text-center font-bold text-yellow-500 mb-6">Women’s Style Picks</h1>    
      
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Clothes</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {clothesData.filter(item => item.category === "women" || item.category === "all").map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Footwear</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {footwearData.filter(element => element.category === "women" || element.category === "all").map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Accessories</h2>
    <div className="grid grid-cols-4 gap-4">
      {accessoriesData.filter(clothing => clothing.category === "women" || clothing.category === "all").map((element, index) => (
        <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
      ))}
    </div>

    </div>
  )
}

export default WomenClothing