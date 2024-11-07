import ClothInfo from "../../components/HomeClothInfo/HomeClothInfo"
import { footwearData } from "../../Data/data"

const Footwear = () => {

  return (
    <div className="text-gray-900 my-4">
      
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Footwear</h2>
      <div className="grid grid-cols-4 gap-4">
        {footwearData.map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
        ))}
      </div>

    </div>
  )
}

export default Footwear