import { Route, Routes } from "react-router-dom"
import { ROUTE_HOME , ROUTE_LOGIN , ROUTE_SIGNUP } from "./constants"
import HomeLayout from "../components/HomeLayout/HomeLayout"
import Home from "../pages/Home/Home"
import NotFound from "../pages/NotFound/NotFound"
import Login from "../pages/Login/Login"
import Signup from "../pages/Signup/Signup"

const AppRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path={ROUTE_HOME} element={
          <HomeLayout>
            <Home />
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