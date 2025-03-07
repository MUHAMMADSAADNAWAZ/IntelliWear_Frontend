import { Route, Routes } from "react-router-dom";
import {
  ROUTE_ACCESSORIES,
  ROUTE_CLOTHES,
  ROUTE_FOOTWEAR,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_MEN_CLOTHING,
  ROUTE_WOMEN_CLOTHING,
  ROUTE_CHILDREN_CLOTHING,
  ROUTE_PRODUCT_DETAILS,
  ROUTE_ADMIN_HOME,
  ROUTE_ADMIN_ANALYTICS,
  ROUTE_ADMIN_REVIEWS,
  ROUTE_MYPROFILE,
  ROUTE_ADMIN_PROFILE,
  ROUTE_ADMIN_ADD_PRODUCTS,
  ROUTE_ADMIN_ORDERS,
  ROUTE_ADMIN_PENDING_ORDERS,
  ROUTE_ADMIN_INPROGRESS_ORDERS,
  ROUTE_ADMIN_COMPLETED_ORDERS,
  ROUTE_ADMIN_REFUND_ORDERS,
  ROUTE_ADMIN_CANCELED_ORDERS,
  ROUTE_ADMIN_CLOTHPRODUCTS,
  ROUTE_ADMIN_FOOTWEARPRODUCTS,
  ROUTE_ADMIN_ACCESSORIEPRODUCTS,
  ROUTE_ADMIN_CUSTOMERS,
  ROUTE_MYORDERS,
  ROUTE_ADMIN_EDIT_PRODUCTS,
  ROUTE_CHECKOUT,
  ROUTE_ADMIN_PRODUCTS,
  ROUTE_RESET_PASSWORD,
  ROUTE_ADMIN_CHATBOT,
  ROUTE_CHATBOT,
  ROUTE_ADMIN_CAROUSAL,
} from "@routes/constants";
import { clothesData, footwearData, accessoriesData } from "@Data/data";
import { useSelector } from "react-redux";
import { selectUser } from "@redux/slices/userSlice";
import { HomeLayout } from "@components/HomeLayout";
import { Home } from "@pages/Home";
import { Clothes } from "@pages/Clothes";
import { MenClothing } from "@pages/MenClothing";
import { ProductDetails } from "@pages/ProductDetails";
import { MyProfile } from "@pages/MyProfile";
import { MyOrders } from "@pages/MyOrders";
import { Login } from "@pages/Login";
import { Signup } from "@pages/Signup";
import { ProtectedRoute } from "@components/ProtectedRoutes";
import { AdminHome } from "@pages/AdminHome";
import { AdminProducts } from "@components/AdminProducts";
import { AddProducts } from "@components/Addproducts";
import { Customers } from "@components/Customers";
import { AdminProfile } from "@components/AdminProfile";
import { OrderMenu } from "@components/AdminOrderMenu";
import { AdminAnalytics } from "@components/AdminAnalytics";
import { AdminReviews } from "@components/AdminReviews";
import { NotFound } from "@pages/NotFound";
import { EditProducts } from "@components/EditProducts";
import { Checkout } from "@pages/Checkout";
import { ResetPassword } from "@pages/ResetPassword";
import { AdminChatbot } from "@components/AdminChatbot";
import { CarousalManager } from "@components/CarousalManager";

const AppRoutes = () => {
  const user = useSelector(selectUser);
  const role = user ? user?.user_info?.user_type : undefined;

  return (
    <div>
      <Routes>
        <Route
          path={ROUTE_HOME}
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_CLOTHES}
          element={
            <HomeLayout>
              <Clothes heading="Clothes" data={clothesData} />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_FOOTWEAR}
          element={
            <HomeLayout>
              <Clothes heading="Footwear" data={footwearData} />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_ACCESSORIES}
          element={
            <HomeLayout>
              <Clothes heading="Accessories" data={accessoriesData} />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_MEN_CLOTHING}
          element={
            <HomeLayout>
              <MenClothing heading="Men’s Style Picks" category="men" />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_WOMEN_CLOTHING}
          element={
            <HomeLayout>
              <MenClothing heading="Women’s Style Picks" category="women" />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_CHILDREN_CLOTHING}
          element={
            <HomeLayout>
              <MenClothing
                heading="Children’s Style Picks"
                category="children"
              />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_PRODUCT_DETAILS}
          element={
            <HomeLayout>
              <ProductDetails />
            </HomeLayout>
          }
        />

        <Route
          path={ROUTE_ADMIN_HOME}
          element={
            <ProtectedRoute
              isAuthenticated={true}
              role={role}
              allowedRoles={["customer"]}
            >
              <HomeLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTE_CHATBOT} element={<AdminChatbot />} />
          <Route path={ROUTE_MYPROFILE} element={<MyProfile />} />
          <Route path={ROUTE_MYORDERS} element={<MyOrders />} />
          <Route path={ROUTE_CHECKOUT} element={<Checkout />} />
        </Route>

        <Route path={ROUTE_RESET_PASSWORD} element={<ResetPassword />} />

        <Route path={ROUTE_LOGIN} element={<Login />} />

        <Route path={ROUTE_SIGNUP} element={<Signup />} />

        <Route
          path={ROUTE_ADMIN_HOME}
          element={
            <ProtectedRoute
              isAuthenticated={true}
              role={role}
              allowedRoles={["admin"]}
            >
              <AdminHome />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminProducts name="All Products" />} />
          <Route
            path={ROUTE_ADMIN_PRODUCTS}
            element={<AdminProducts name="All Products" />}
          />
          <Route
            path={ROUTE_ADMIN_CLOTHPRODUCTS}
            element={<AdminProducts name="CLOTHES" />}
          />
          <Route
            path={ROUTE_ADMIN_FOOTWEARPRODUCTS}
            element={<AdminProducts name="SHOES" />}
          />
          <Route
            path={ROUTE_ADMIN_ACCESSORIEPRODUCTS}
            element={<AdminProducts name="ACCESSORIES" />}
          />
          <Route path={ROUTE_ADMIN_ADD_PRODUCTS} element={<AddProducts />} />
          <Route path={ROUTE_ADMIN_EDIT_PRODUCTS} element={<EditProducts />} />
          <Route path={ROUTE_ADMIN_CAROUSAL} element={<CarousalManager />} />
          <Route path={ROUTE_ADMIN_CUSTOMERS} element={<Customers />} />
          <Route path={ROUTE_ADMIN_PROFILE} element={<AdminProfile />} />
          <Route path={ROUTE_ADMIN_CHATBOT} element={<AdminChatbot />} />
          <Route path={ROUTE_ADMIN_ORDERS} element={<OrderMenu name="All" />} />
          <Route
            path={ROUTE_ADMIN_PENDING_ORDERS}
            element={<OrderMenu name="Pending" />}
          />
          <Route
            path={ROUTE_ADMIN_INPROGRESS_ORDERS}
            element={<OrderMenu name="In Progress" />}
          />
          <Route
            path={ROUTE_ADMIN_COMPLETED_ORDERS}
            element={<OrderMenu name="Completed" />}
          />
          <Route
            path={ROUTE_ADMIN_CANCELED_ORDERS}
            element={<OrderMenu name="Canceled" />}
          />
          <Route
            path={ROUTE_ADMIN_REFUND_ORDERS}
            element={<OrderMenu name="Refund" />}
          />
          <Route path={ROUTE_ADMIN_ANALYTICS} element={<AdminAnalytics />} />
          <Route path={ROUTE_ADMIN_REVIEWS} element={<AdminReviews />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
