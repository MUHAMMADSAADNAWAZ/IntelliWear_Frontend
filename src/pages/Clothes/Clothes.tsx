import { Pagination } from "@mui/material";

import ClothInfo from "@components/HomeClothInfo/HomeClothInfo";
import { HomeProductProps } from "@dto/product.dto";
interface ClothProps {
  heading: string;
  data: HomeProductProps[];
  count?: number;
  page?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const Clothes = ({ heading, data, count , page , handlePageChange }: ClothProps) => {
  return (
    <div className="text-gray-900 my-4">
      <h2 className="text-3xl font-bold text-indigo-600 pl-4 pb-4">
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
        {data?.map((element, index) => (
          <ClothInfo
            key={index}
            img={element.image}
            name={element.name}
            price={element.price}
            id={element.id}
            product={element}
            description={element.description}
          />
        ))}
      </div>

      {count && (
        <div className="w-full pt-10 pb-5 flex items-center justify-center">
          <Pagination 
          count={count && Math.ceil(count / 32)} 
          page={page}
          onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export default Clothes;
