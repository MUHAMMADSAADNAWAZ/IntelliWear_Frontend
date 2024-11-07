import { Route, Routes } from "react-router-dom"
import { 
  ROUTE_ACCESSORIES, 
  ROUTE_CLOTHES, 
  ROUTE_FOOTWEAR,
  ROUTE_HOME ,
  ROUTE_LOGIN , 
  ROUTE_SIGNUP,
  ROUTE_MEN_CLOTHING,
  ROUTE_WOMEN_CLOTHING,
  ROUTE_CHILDREN_CLOTHING,
  ROUTE_PRODUCT_DETAILS,
 } from "./constants"
import HomeLayout from "../components/HomeLayout/HomeLayout"
import Home from "../pages/Home/Home"
import NotFound from "../pages/NotFound/NotFound"
import Login from "../pages/Login/Login"
import Signup from "../pages/Signup/Signup"
import Clothes from "../pages/Clothes/Clothes"
import Footwear from "../pages/Footwear/Footwear"
import Accessories from "../pages/Accessories/Accessories"
import MenClothing from "../pages/MenClothing/MenClothing"
import WomenClothing from "../pages/WomenClothing/WomenClothing"
import ChildrenClothing from "../pages/ChildrenClothing/ChildrenClothing"
import ProductDetails from "../pages/ProductDetails/ProductDetails"

const AppRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path={ROUTE_HOME} element={
          <HomeLayout>
            <Home />
          </HomeLayout>
        } />

        <Route path={ROUTE_CLOTHES} element={
          <HomeLayout>
            <Clothes />
          </HomeLayout>
        } />

        <Route path={ROUTE_FOOTWEAR} element={
          <HomeLayout>
            <Footwear />
          </HomeLayout>
        } />

        <Route path={ROUTE_ACCESSORIES} element={
          <HomeLayout>
            <Accessories />
          </HomeLayout>
        } />

        <Route path={ROUTE_MEN_CLOTHING} element={
          <HomeLayout>
            <MenClothing />
          </HomeLayout>
        } />

        <Route path={ROUTE_WOMEN_CLOTHING} element={
          <HomeLayout>
            <WomenClothing />
          </HomeLayout>
        } />

        <Route path={ROUTE_CHILDREN_CLOTHING} element={
          <HomeLayout>
            <ChildrenClothing />
          </HomeLayout>
        } />

        <Route path={ROUTE_PRODUCT_DETAILS} element={
          <HomeLayout>
            <ProductDetails />
          </HomeLayout>
        } />

        <Route path={ROUTE_LOGIN} element={<Login />} />

        <Route path={ROUTE_SIGNUP} element={<Signup />} />

        <Route path="*" element={<NotFound />} />

      </Routes>
    </div>
  )
}

export default AppRoutes