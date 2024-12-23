import { Carousal } from "@components/Carousal";
import { HomeClothBlock } from "@components/HomeClothBlock";

const Home = () => {
  return (
    <div className="w-full py-4">
      
    <Carousal />
      <div className="mt-8">
        <HomeClothBlock />
        
      </div>
    </div>
  );
}

export default Home;
