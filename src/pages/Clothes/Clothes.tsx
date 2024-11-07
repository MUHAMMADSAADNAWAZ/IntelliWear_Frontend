import ClothInfo from "../../components/HomeClothInfo/HomeClothInfo"
import { clothesData } from "../../Data/data"

const Clothes = () => {

  return (
    <div className="text-gray-900 my-4">
      
      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Clothes</h2>
      <div className="grid grid-cols-4 gap-4">
        {clothesData.map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} />
        ))}
      </div>

    </div>
  )
}

export default Clothes