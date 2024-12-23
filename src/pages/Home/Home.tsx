import Carousal from "@components/Carousal/Carousal";
import ClothBlock from "@components/HomeClothBlock/HomeClothBlock";

const Home = () => {
  return (
    <div className="w-full py-4">
      <Carousal />
      <div className="mt-8">
        <ClothBlock />
        
      </div>
    </div>
  );
}

export default Home;
