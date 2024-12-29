import ChatIcon from '@mui/icons-material/Chat';
import { ReactNode } from "react";
import { useSelector } from "react-redux";

import { selectCart } from "@redux/slices/cartSlice";
import { HomeHeader } from "@components/common";
import {Footer} from "@components/Footer";

interface HomeLayoutProps {
    children?: ReactNode;
}

const HomeLayout = ({children} : HomeLayoutProps) => {

  const cart = useSelector(selectCart);
  const cartVisibility = cart.cartVisibility;

  return (
    <div className=" flex flex-col min-h-screen  w-full">

      {/* <div className=" w-full"> */}
        <HomeHeader />
      {/* </div> */}

        <div className="w-full flex flex-grow justify-center">
          {children}
        </div>

      <div className="w-full">
        <Footer />
      </div>

      <button
        className={` ${cartVisibility ? "right-96" : "right-6"} fixed bottom-6  bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600`}
      >
        <ChatIcon className="text-lg md:text-2xl"/>
      </button>

    </div>
  )
}

export default HomeLayout