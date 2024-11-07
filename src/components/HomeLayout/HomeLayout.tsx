import { ReactNode } from "react";
import HomeHeader from "../common/Homeheader/homeheader";
import Footer from "../Footer/Footer";

interface HomeLayoutProps {
    children?: ReactNode;
}

const HomeLayout = ({children} : HomeLayoutProps) => {
  return (
    <div className=" flex flex-col min-h-screen  w-full gap-3">

      <div className=" w-full sticky">
        <HomeHeader />
      </div>

        <div className="w-full flex flex-grow justify-center">
          {children}
        </div>
      

      <div className="w-full">
        <Footer />
      </div>

    </div>
  )
}

export default HomeLayout