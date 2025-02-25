import { ReactNode } from "react";

import ChatIcon from '@mui/icons-material/Chat';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { selectCart } from "@redux/slices/cartSlice";
import { HomeHeader } from "@components/common";
import {Footer} from "@components/Footer";
import { selectUser } from '@redux/slices/userSlice';
import { ROUTE_CHATBOT } from '@routes/constants';

interface HomeLayoutProps {
    children?: ReactNode;
}

const HomeLayout = ({children} : HomeLayoutProps) => {

  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser)
  const location = useLocation()

  const cartVisibility = cart.cartVisibility;

  return (
    <div className=" flex flex-col min-h-screen  w-full">

      {/* <div className=" w-full"> */}
        <HomeHeader />
      {/* </div> */}

        <div className="w-full flex flex-grow justify-center">
          {children}
          <Outlet />
        </div>

      <div className="w-full">
        <Footer />
      </div>

      {location?.pathname === "/chatbot" ? "" :<button
        className={` ${cartVisibility ? "right-96" : "right-6"} fixed bottom-6  bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600`}
        onClick={() => user?.email ? navigate(ROUTE_CHATBOT) : toast.info("You need to login first to chat with us")}
      >
        <ChatIcon className="text-lg md:text-2xl"/>
      </button>}


    </div>
  )
}

export default HomeLayout