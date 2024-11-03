import Carousal from "../../components/Carousal/Carousal";
import ClothBlock from "../../components/HomeClothBlock/HomeClothBlock";

const Home = () => {
  return (
    <div className="w-full px-8 py-4 bg-gray-100 text-gray-900">
      <Carousal />
      <div className="mt-8">
        <ClothBlock />
      </div>
    </div>
  );
}

export default Home;
