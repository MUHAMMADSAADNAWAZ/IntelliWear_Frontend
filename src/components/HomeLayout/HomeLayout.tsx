import { ReactNode } from "react";
import HomeHeader from "../common/Homeheader/homeheader";
import Footer from "../Footer/Footer";

interface HomeLayoutProps {
    children?: ReactNode;
}

const HomeLayout = ({children} : HomeLayoutProps) => {
  return (
    <div className=" flex flex-col  w-full ">
      <div className=" w-full sticky top-0 z-50">
        <HomeHeader />
      </div>
      <div className="w-full   ">
        <div className="flex justify-center">{children}</div>
      </div>
      <Footer />
    </div>
  )
}

export default HomeLayout