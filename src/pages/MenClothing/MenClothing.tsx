import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import CustomerProductsApi from "@api/customerproducts.api";
import { HomeProductProps } from "@dto/product.dto";
import { Clothes } from "@pages/Clothes";
import { updateLoader } from "@redux/slices/loaderSlice";
import { ROUTE_ACCESSORIES, ROUTE_CLOTHES, ROUTE_FOOTWEAR } from "@routes/constants";
interface Clothing {
  heading: string;
  category: string;
}

const MenClothing = ({ heading, category }: Clothing) => {
  const [gender, setGender] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerproductsapi = new CustomerProductsApi();

  const getGenderProducts = async () => {
    dispatch(updateLoader(true));
    const res = await customerproductsapi.getGenderBasedProducts(gender);
    dispatch(updateLoader(false));
    return res;
  };

  const { data } = useQuery({
    queryKey: ["genderproducts", gender],
    queryFn: getGenderProducts,
    enabled: !!gender,
  });

  const clothes = data?.data?.filter(
    (item: HomeProductProps) =>
      item?.product_type === "CLOTHES" || item?.product_type === "ALL"
  );
  const footwear = data?.data?.filter(
    (element: HomeProductProps) =>
      element.product_type === "SHOES" || element?.product_type === "ALL"
  );
  const accessories = data?.data?.filter(
    (clothing: HomeProductProps) =>
      clothing?.product_type === "ACCESSORIES" ||
      clothing?.product_type === "ALL"
  );


  const goToClothes = (route: string) => {
    navigate(route, { state: { gender: gender } }); 
  };

  useEffect(() => {
    switch (category) {
      case "men":
        setGender("M");
        break;
      case "women":
        setGender("W");
        break;
      case "children":
        setGender("C");
        break;
      default:
        setGender("");
    }
  }, [category]);

  return (
    <div className="text-gray-900 my-4">
      <h1 className="text-4xl text-center font-bold text-yellow-500 mb-6">
        {heading}
      </h1>

      {clothes?.length > 0 && (
        <>
          <Clothes heading="Clothes" data={clothes} />
          <button className="w-full block text-center text-yellow-500 hover:underline my-4" onClick={() => goToClothes(ROUTE_CLOTHES)}>View All</button>
        </>
      )}

      {footwear?.length > 0 && (
        <>
          <Clothes heading="Footwear" data={footwear} />
          <button className="w-full block text-center text-yellow-500 hover:underline my-4" onClick={() => goToClothes(ROUTE_FOOTWEAR)}>View All</button>
        </>
      )}

      {accessories?.length > 0 && (
        <>
          <Clothes heading="Accessories" data={accessories} />
          <button className="w-full block text-center text-yellow-500 hover:underline my-4" onClick={() => goToClothes(ROUTE_ACCESSORIES)}>View All</button>
        </>
      )}
    </div>
  );
};

export default MenClothing;
