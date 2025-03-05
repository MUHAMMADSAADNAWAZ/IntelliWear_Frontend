import AdminCarouselApi from "@api/admincarousal.api";
import { Carousal } from "@components/Carousal";
import { HomeClothBlock } from "@components/HomeClothBlock";
import { updateLoader } from "@redux/slices/loaderSlice";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const Home = () => {

  const dispatch = useDispatch()
  const admincarouselapi = new AdminCarouselApi()

  const getAllCarousels = async () =>{
    dispatch(updateLoader(true));
    const data = await admincarouselapi.getAllCarousalImages();
    dispatch(updateLoader(false));
    return data;
  }

  const {data} = useQuery({
    queryKey: ["allcarousel"],
    queryFn: getAllCarousels
  })

  return (
    <div className="w-full py-4">
      
    <Carousal data={data?.data}/>
      <div className="mt-8">
        <HomeClothBlock />
        
      </div>
    </div>
  );
}

export default Home;
