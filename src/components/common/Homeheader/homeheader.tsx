import { Button } from "../Button";
import { Input } from "../Input";
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import SearchIcon from "@mui/icons-material/Search";
import MicIcon from "@mui/icons-material/Mic";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import logo from "../../../assets/logo3_bg_removed.png.png";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
  ROUTE_MEN_CLOTHING,
  ROUTE_WOMEN_CLOTHING,
  ROUTE_CHILDREN_CLOTHING,
  ROUTE_MYPROFILE,
} from "../../../routes/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useRef, useState } from "react";
import {
  selectCart,
  clearCart,
  toggleCart,
} from "../../../redux/slices/cartSlice";
import CartSidebar from "../../CartSidebar/CartSidebar";
import { LogoutIcon, UserIcon } from "../../../svg";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

const HomeHeader = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const email = user?.email;
  // console.log("user" , user);
  // console.log("email" , email);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
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
      className=" flex justify-start items-center px-4 gap-2 hover:bg-[#F4F5F9] h-[42px] w-[160px] font-Arimo font-normal text-base text-[#1F1F1FF1] rounded-lg"
    >
      <UserIcon color="#1f1f1f" />
      My Profile
    </div>,
    <div
      onClick={handleLogout}
      className=" flex justify-start items-center  w-[160px] px-4 gap-2 hover:bg-[#F4F5F9] h-[42px] font-Arimo font-normal text-base text-[#E42727F1] rounded-lg "
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

  return (
    <>
      <div className="flex flex-col w-full">
        {/* Main Navbar */}
        <div className="navbar flex items-center justify-around gap-2 bg-white border-b border-gray-200 shadow-sm">
          {/* Logo */}
          <div className="logo w-1/12 flex items-center gap-4">
            <img
              src={logo}
              alt="website logo"
              className="w-24 h-24 p-2.5 cursor-pointer"
              onClick={() => {
                navigate(ROUTE_HOME);
              }}
            />
          </div>

          {/* Search Bar */}
          <div className="search w-1/2 flex items-center justify-center gap-2 border border-green-300 p-2 rounded-lg bg-gray-50">
            <Input
              placeholder="Search"
              className="py-4 border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0"
              iconBackground={true}
              icon={
                <SearchIcon
                  style={{ fontSize: 25, color: "#4A5568" }}
                  className="cursor-pointer"
                />
              }
            />
            <div className="bg-gray-100 p-2 rounded-full">
              <MicIcon
                style={{ fontSize: 25, color: "#4A5568" }}
                className="cursor-pointer"
              />
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <ImageSearchIcon
                style={{ fontSize: 25, color: "#4A5568" }}
                className="cursor-pointer"
              />
            </div>
          </div>

          <div
            className="cart relative cursor-pointer"
            onClick={() => {
              dispatch(toggleCart());
            }}
          >
            <div className="bg-gray-100 p-2 rounded-full">
              <ShoppingBagOutlinedIcon
                style={{ fontSize: 30, color: "#4A5568" }}
              />
            </div>
            {totalQuantity > 0 && (
              <span className="absolute -bottom-1 left-5 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center text-white">
                {totalQuantity}
              </span>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="w-1/5 flex gap-2 items-center justify-center">
            {email === undefined ? (
              <>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                  onClick={() => {
                    navigate(ROUTE_LOGIN);
                  }}
                >
                  Login
                </Button>
                <Button
                  className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md"
                  onClick={() => {
                    navigate(ROUTE_SIGNUP);
                  }}
                >
                  SignUp
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <IconButton
                  onClick={handleOpenUserMenu}
                  ref={avatarRef}
                  sx={{ p: 0 }}
                >
                  <Avatar>SN</Avatar>
                </IconButton>
                <p className="text-gray-800 text-lg">Saad Nawaz</p>
                <Menu
                  ref={menuRef}
                  sx={{ mt: "45px" }}
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

        <div className="flex items-center justify-center p-1 text-lg text-gray-800 bg-gray-100 sticky z-50 w-full top-0">
          <div className="flex gap-3">
            <NavLink
              to={ROUTE_MEN_CLOTHING}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600 cursor-pointer"
              }
            >
              Men
            </NavLink>
            <NavLink
              to={ROUTE_WOMEN_CLOTHING}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600 cursor-pointer"
              }
            >
              Women
            </NavLink>
            <NavLink
              to={ROUTE_CHILDREN_CLOTHING}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600"
                  : "hover:text-blue-600 cursor-pointer"
              }
            >
              Children
            </NavLink>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default HomeHeader;

// <>
//   <div className="flex flex-col w-full">
//     {/* Main Navbar */}
//     <div className="navbar flex items-center justify-around gap-2 bg-gray-900">
//       {/* Logo */}
//       <div className="logo w-1/12 flex items-center gap-4">
//         <img
//           src={logo}
//           alt="website logo"
//           className="w-24 h-24 p-2.5 cursor-pointer"
//           onClick={() => {
//             navigate(ROUTE_HOME);
//           }}
//         />
//         {/* <h1 className="text-3xl font-bold text-yellow-500">IntelliWear</h1> */}
//       </div>

//       {/* Search Bar */}
//       <div className="search w-1/2 flex items-center justify-center gap-2 border border-blue-400 p-2 rounded-lg">

//         <Input
//           placeholder="Search"
//           className="py-4 border-none outline-none bg-gray-800 text-white placeholder-gray-500 h-10 px-0 "
//           icon={
//             <SearchIcon
//               style={{ fontSize: 25, color: "#FFD700" }}
//               className="cursor-pointer"
//             />
//           }
//         />
//         <div className="bg-gray-800 p-2 rounded-full">
//           <MicIcon
//             style={{ fontSize: 25, color: "#FFD700" }}
//             className="cursor-pointer"
//           />
//           </div>
//           <div className="bg-gray-800 p-2 rounded-full">
//         <ImageSearchIcon
//           style={{ fontSize: 25, color: "#FFD700" }}
//           className="cursor-pointer "
//           />
//           </div>
//       </div>

//       <div
//         className="cart relative cursor-pointer "
//         onClick={() => {
//           dispatch(toggleCart());
//         }}
//       >
//         <div className="bg-gray-800 p-2 rounded-full">
//         <ShoppingBagOutlinedIcon
//           style={{ fontSize: 30, color: "#FFD700" }}
//         />
//         </div>
//         {totalQuantity > 0 && (
//           <span className="absolute -bottom-1 left-5 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">
//             {totalQuantity}
//           </span>
//         )}
//       </div>

//       {/* Auth Buttons */}
//       <div className="w-1/5 flex gap-2 items-center justify-center ">
//         {email === undefined ? (
//           <>
//             <Button
//               className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2"
//               onClick={() => {
//                 navigate(ROUTE_LOGIN);
//               }}
//             >
//               Login
//             </Button>
//             <Button
//               className="bg-blue-500 text-white hover:bg-blue-600 px-3 py-2"
//               onClick={() => {
//                 navigate(ROUTE_SIGNUP);
//               }}
//             >
//               SignUp
//             </Button>
//           </>
//         ) : (

//           <div className="flex items-center gap-2  ">
//             <IconButton
//               onClick={handleOpenUserMenu}
//               ref={avatarRef}
//               sx={{ p: 0 }}
//             >
//               <Avatar>SN</Avatar>
//             </IconButton>
//             <p className="text-white text-lg">Saad Nawaz</p>
//             <Menu
//               ref={menuRef}
//               sx={{ mt: "45px" }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: "top",
//                 horizontal: "right",
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: "top",
//                 horizontal: "center",
//               }}
//               disableScrollLock={true}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting, id) => (
//                 <MenuItem
//                   key={id}
//                   onClick={handleCloseUserMenu}
//                   sx={{
//                     backgroundColor: "#FFFFFF",
//                     height: "100%",
//                     fontFamily: "Arimo",
//                     "&:hover": {
//                       backgroundColor: "transparent", // Custom hover color
//                       color: "none", // Change text color on hover if needed
//                     },
//                   }}
//                 >
//                   {setting}
//                 </MenuItem>
//               ))}
//             </Menu>
//           </div>
//         )}
//       </div>
//     </div>

//     <CartSidebar />
//   </div>

//   <div className="flex items-center justify-center p-1 text-lg text-white bg-gray-800 sticky z-10 w-full top-0">
//     <div className="flex gap-3">
//       <NavLink
//         to={ROUTE_MEN_CLOTHING}
//         className={({ isActive }) =>
//           isActive
//             ? "text-yellow-500"
//             : "hover:text-yellow-500 cursor-pointer"
//         }
//       >
//         Men
//       </NavLink>
//       <NavLink
//         to={ROUTE_WOMEN_CLOTHING}
//         className={({ isActive }) =>
//           isActive
//             ? "text-yellow-500"
//             : "hover:text-yellow-500     cursor-pointer"
//         }
//       >
//         Women
//       </NavLink>
//       <NavLink
//         to={ROUTE_CHILDREN_CLOTHING}
//         className={({ isActive }) =>
//           isActive
//             ? "text-yellow-500"
//             : "hover:text-yellow-500 cursor-pointer"
//         }
//       >
//         Children
//       </NavLink>
//     </div>
//   </div>
// </>
