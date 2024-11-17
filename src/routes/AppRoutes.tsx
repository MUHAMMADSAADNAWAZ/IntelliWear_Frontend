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
import MenClothing from "../pages/MenClothing/MenClothing"
import ProductDetails from "../pages/ProductDetails/ProductDetails"
import { clothesData , footwearData , accessoriesData  } from "../Data/data"

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
            <Clothes heading="Clothes" data={clothesData} />
          </HomeLayout>
        } />

        <Route path={ROUTE_FOOTWEAR} element={
          <HomeLayout>
            <Clothes heading="Footwear" data={footwearData} />
          </HomeLayout>
        } />

        <Route path={ROUTE_ACCESSORIES} element={
          <HomeLayout>
            <Clothes heading="Accessories" data={accessoriesData} />
          </HomeLayout>
        } />

        <Route path={ROUTE_MEN_CLOTHING} element={
          <HomeLayout>
            <MenClothing heading="Men’s Style Picks" category="men" />
          </HomeLayout>
        } />

        <Route path={ROUTE_WOMEN_CLOTHING} element={
          <HomeLayout>
            <MenClothing heading="Women’s Style Picks" category="women" />
          </HomeLayout>
        } />

        <Route path={ROUTE_CHILDREN_CLOTHING} element={
          <HomeLayout>
            <MenClothing heading="Children’s Style Picks" category="children" />
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