import ClothInfo, { ClothInfoProps } from "@components/HomeClothInfo/HomeClothInfo";

interface ClothProps{
  heading: string;
  data: ClothInfoProps[]
}

const Clothes = ({heading, data} :ClothProps ) => {

  return (
    <div className="text-gray-900 my-4">
      
      <h2 className="text-3xl font-bold text-indigo-600 pl-4 pb-4">{heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {data.map((element, index) => (
          <ClothInfo key={index} img={element.img} name={element.name} price={element.price} id={element.id} product={element} description={element.description} />
        ))}
      </div>

    </div>
  )
}

export default Clothes