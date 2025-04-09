import AdminCarouselApi from "@api/admincarousal.api";
import CustomerProductsApi from "@api/customerproducts.api";
import { Carousal } from "@components/Carousal";
import { HomeClothBlock } from "@components/HomeClothBlock";
import { updateLoader } from "@redux/slices/loaderSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Home = ({ search }: { search?: boolean }) => {

  const dispatch = useDispatch()
  const location = useLocation();
  const admincarouselapi = new AdminCarouselApi()
  const customerproductsapi = new CustomerProductsApi()

  const getAllCarousels = async () =>{
    dispatch(updateLoader(true));
    const data = await admincarouselapi.getAllCarousalImages();
    // dispatch(updateLoader(false));
    return data;
  }

  const {data} = useQuery({
    queryKey: ["allcarousel"],
    queryFn: getAllCarousels
  })

  const getCustomerHomeProducts = async () =>{
    dispatch(updateLoader(true));
    const data = await customerproductsapi.getHomeProducts();
    dispatch(updateLoader(false));
    return data;
  }

  const {data: homeProductsData} = useQuery({
    queryKey: ["homeproducts"],
    queryFn: getCustomerHomeProducts
  })

  const imageSearchData = location.state?.data; 

  return (
    <div className="w-full py-4">
      
    {!search && <Carousal data={data?.data}/>}
      <div className="mt-8">
        <HomeClothBlock data={search ? imageSearchData?.products : homeProductsData?.data} />  
      </div>
    </div>
  );
}

export default Home;
