import { useNavigate } from "react-router-dom";

import { getImageUrl } from '@utils/getImageUrl';

export interface ClothInfoProps {
  id: string;
  img: string;
  name: string;
  size?: string;
  description?: string;
  price: string;
  product?: any;
}


const ClothInfo = ({ img, name, price, id , description }: ClothInfoProps) => {

  const navigate = useNavigate();

  const imageUrl = getImageUrl(img)

  return (
    <div className="group bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100 flex flex-col">
    
        <div className="overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-64 object-fill group-hover:scale-110 transition-transform duration-300"
          />
          <div className=" inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </div>
  
      <div className="p-4 h-3/5 flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 w-2/3">
            {name}
          </h2>
          <span className="text-blue-600 font-semibold text-lg">
            Rs: {price}
          </span>
        </div>

        {description && (
          <p className="text-gray-600 text-sm line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity">
            {description}
          </p>
       )} 

        <button 
          onClick={() => navigate(`/product/${id}`)}
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 "
        >
          
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ClothInfo;
