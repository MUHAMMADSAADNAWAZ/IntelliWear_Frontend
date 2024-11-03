export interface ClothInfoProps {
  img: string;
  name: string;
  price: string;
}

const ClothInfo = ({ img, name, price }: ClothInfoProps) => {
  return (
    <div className="cloth-info border border-gray-300 rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <img src={img} alt={name} className="h-40 w-full object-cover rounded-md mb-4" loading="eager" />
      <p className="font-semibold text-gray-800">Name: {name}</p>
      <p className="text-blue-500 font-bold">Price: {price}</p>
    </div>
  );
}

export default ClothInfo;
