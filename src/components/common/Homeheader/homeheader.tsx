
import { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MicIcon from "@mui/icons-material/Mic";
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "@assets/IntelliWear-logo-for-website-removebg-preview.png";
import { CartSidebar } from "@components/CartSidebar";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  clearCart,
  selectCart,
  toggleCart,
} from "@redux/slices/cartSlice";
import { clearMessages } from "@redux/slices/botSlice";
import { logout, selectUser } from "@redux/slices/userSlice";
import {
  ROUTE_CHILDREN_CLOTHING,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_MEN_CLOTHING,
  ROUTE_MYORDERS,
  ROUTE_MYPROFILE,
  ROUTE_SIGNUP,
  ROUTE_WOMEN_CLOTHING,
} from "@routes/constants";
import { LogoutIcon, UserIcon } from "@svg";

const HomeHeader = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const email = user?.user_info?.user?.email;
  // console.log("user" , user);
  // console.log("email" , email);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearMessages());
    navigate(ROUTE_HOME);
    toast.success("Logged out Successfully");
  };

  const cart = useSelector(selectCart);
  // console.log("cart" , cart);
  const totalQuantity = cart.totalQuantity;

  const settings = [
    <div
      onClick={() => {
        navigate(ROUTE_MYPROFILE);
      }}
      className=" flex justify-start items-center px-2 md:px-4 gap-2 hover:bg-[#F4F5F9] h-auto md:h-10 md:w-40 font-poppins font-normal text-base text-[#1F1F1FF1] rounded-lg"
    >
      <UserIcon color="#1f1f1f" />
      My Profile
    </div>,
    <div
      onClick={() => {
        navigate(ROUTE_MYORDERS);
      }}
      className=" flex justify-start items-center px-2 md:px-4 gap-2  hover:bg-[#F4F5F9] h-auto md:h-10 w-auto md:w-40 font-poppins font-normal text-base text-[#1F1F1FF1] rounded-lg"
    >
      <ReceiptOutlinedIcon />
      My Orders
    </div>,
    <div
      onClick={handleLogout}
      className=" flex justify-start items-center px-2 md:px-4 gap-2 w-auto md:w-40  hover:bg-[#F4F5F9] h-auto md:h-10 font-poppins font-normal text-base text-[#E42727F1] rounded-lg "
    >
      <LogoutIcon />
      Log Out
    </div>,
  ];

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(anchorElUser ? null : event.currentTarget);
  };

  const getInitials = (name?: string) => {
    if (!name) return '';
    return name
      .split(' ')
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <>
       <div className="w-full flex items-center justify-around bg-white border-b border-gray-200 py-2">

          <div className="logo w-28 md:w-40 flex items-center ">
            <img
              src={logo}
              alt="website logo"
              className=" p-2.5 cursor-pointer"
              onClick={() => {
                navigate(ROUTE_HOME);
              }}
            />
          </div>

          {/* Search Bar */}
          <div className="search w-3/5 flex items-center justify-center shadow-inner bg-gray-50 gap-1 md:gap-2 p-1.5 md:p-2 rounded-xl ">
          <div className="w-full">

            <Input
              placeholder="Search"
              className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-0 md:h-10 px-0"
              iconBackground={true}
              wrapperClass="rounded-3xl"
              icon={
                <SearchIcon
                  style={{ color: "#4A5568" }}
                  className="cursor-pointer text-xs md:text-lg"
                />
              }
              />
              </div>
            <div className="bg-gray-100 p-1.5 md:p-2 rounded-full w-1/6 md:w-auto flex items-center justify-center">
              <MicIcon
                style={{ color: "#4A5568" }}
                className="cursor-pointer text-xs md:text-lg"
              />
            </div>
            <div className="bg-gray-100 p-1.5 md:p-2 rounded-full w-1/6 md:w-auto flex items-center justify-center">
              <ImageSearchIcon
                style={{ color: "#4A5568" }}
                className="cursor-pointer text-xs md:text-lg"
              />
            </div>
          </div>

          <div
            className="cart relative cursor-pointer mx-4 md:mx-0 md:ml-4"
            onClick={() => {
              dispatch(toggleCart());
            }}
          >
            <div className="bg-gray-100 p-1.5 md:p-2 rounded-full">
              <ShoppingBagOutlinedIcon
                style={{ color: "#4A5568" }}
                className="text-sx md:text-lg"
              />
            </div>
            {totalQuantity > 0 && (
              <span className="absolute -bottom-1 left-5 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="w-1/6 flex flex-col sm:flex-row gap-1 md:gap-2 items-end justify-end mr-2">
            {email === undefined ? (
              <>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 text-xs lg:text-base font-normal lg:font-medium p-1 px-2 lg:px-3 lg:py-2 rounded-md"
                  onClick={() => {
                    navigate(ROUTE_LOGIN);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 text-xs lg:text-base font-normal lg:font-medium p-1 lg:px-3 lg:py-2 rounded-md"
                  onClick={() => {
                    navigate(ROUTE_SIGNUP);
                  }}
                >
                  SignUp
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2 relative">
                <IconButton
                  onClick={handleOpenUserMenu}
                  ref={avatarRef}
                  sx={{ p: 0  }}
                >
                  <Avatar>{getInitials(user?.user_info?.user?.name)}</Avatar>
                </IconButton>
             

                <p className="text-gray-800 text-sm md:text-lg hidden md:block">{user?.user_info?.user?.name}</p>
                <Menu
                  ref={menuRef}
                  sx={{ mt: "45px" , position: "absolute" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  disableScrollLock={true}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, id) => (
                    <MenuItem
                      key={id}
                      onClick={handleCloseUserMenu}
                      sx={{
                        backgroundColor: "#FFFFFF",
                        height: "100%",
                        fontFamily: "Arimo",
                        "&:hover": {
                          backgroundColor: "transparent", // Custom hover color
                          color: "none", // Change text color on hover if needed
                        },
                      }}
                    >
                      {setting}
                    </MenuItem>
                  ))}
                </Menu>
                {/* Menu component remains the same */}
              </div>
            )}
          </div>
        </div>

        <CartSidebar />

        <div className="flex items-center justify-center p-1 text-base md:text-lg text-gray-800 bg-white shadow-lg sticky z-20 w-full top-0 font-semibold">
          <div className="flex gap-10">
            <NavLink
              to={ROUTE_MEN_CLOTHING}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-600 cursor-pointer"
              }
            >
              Men
            </NavLink>
            <NavLink
              to={ROUTE_WOMEN_CLOTHING}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-600 cursor-pointer"
              }
            >
              Women
            </NavLink>
            <NavLink
              to={ROUTE_CHILDREN_CLOTHING}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-600 cursor-pointer"
              }
            >
              Children
            </NavLink>
          </div>
        </div>
        
    </>
  );
};

export default HomeHeader;
