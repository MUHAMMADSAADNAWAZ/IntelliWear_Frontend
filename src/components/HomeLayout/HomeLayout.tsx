import { ReactNode } from "react";

import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import { HomeHeader } from "@components/common";
import { Loader } from "@components/Loader";
import { Footer } from "@components/Footer";
import { FloatingChatbot } from "@components/AdminChatbot";
import { isLoader } from "@redux/slices/loaderSlice";
// import { ROUTE_CHATBOT } from '@routes/constants';

interface HomeLayoutProps {
  children?: ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const loader = useSelector(isLoader);

  return (
    <div className=" flex flex-col min-h-screen  w-full">

      <HomeHeader />
      
      <div className="w-full flex flex-grow justify-center">
        <>
          {loader && <Loader />}
          {children}
          <Outlet />
        </>
      </div>

      <div className="w-full">
        <Footer />
      </div>

      <FloatingChatbot />
    </div>
  );
};

export default HomeLayout;
