import { useMemo, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';
import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import MicIcon from "@mui/icons-material/Mic";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import logo from "@assets/IntelliWear-logo-for-website-removebg-preview.png";
import CustomerProductsApi from "@api/customerproducts.api";
import { CartSidebar } from "@components/CartSidebar";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { clearCart, selectCart, toggleCart } from "@redux/slices/cartSlice";
import { clearMessages } from "@redux/slices/botSlice";
import { logout, selectUser } from "@redux/slices/userSlice";
import {
  ROUTE_CHILDREN_CLOTHING,
  ROUTE_HOME,
  ROUTE_LOGIN,
  ROUTE_MEN_CLOTHING,
  ROUTE_MYORDERS,
  ROUTE_MYPROFILE,
  ROUTE_SEARCHED_PRODUCTS,
  ROUTE_SIGNUP,
  ROUTE_WOMEN_CLOTHING,
} from "@routes/constants";
import { LogoutIcon, UserIcon } from "@svg";
import { updateLoader } from "@redux/slices/loaderSlice";
import { useMutation } from "@tanstack/react-query";


const HomeHeader = () => {
  const [open, setOpen] = useState(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const email = user?.user_info?.email;

  const dispatch = useDispatch();

  const cart = useSelector(selectCart);
  const totalQuantity = cart.totalQuantity;
  const customerproductsapi = new CustomerProductsApi();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
    setOpen(false);
    try {
      dispatch(updateLoader(true));
      const res = await customerproductsapi?.serahcImageProducts(formData);
      navigate(ROUTE_SEARCHED_PRODUCTS , { state : { data : res?.data } });  
      dispatch(updateLoader(false));
    } catch (err) {
      console.log(err);
      dispatch(updateLoader(false));
    }
  };

  const nlpSearch = async (query : string) =>{
    dispatch(updateLoader(true));
    const res = await customerproductsapi?.nlpSearchProducts(query);
    navigate(ROUTE_SEARCHED_PRODUCTS , { state : { data : res?.data } });  
    return res;
  }

  const {mutateAsync} = useMutation({
    mutationFn: nlpSearch,
    onSuccess: () =>{
      dispatch(updateLoader(false));
    },
    onError: () =>{
      dispatch(updateLoader(false));
    }
  })
    
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearMessages());
    navigate(ROUTE_HOME);
    toast.success("Logged out Successfully");
  };

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

  const SpeechRecognition =
    (window as any).SpeechRecognition ||
    (window as any).webkitSpeechRecognition;

  let recognition: typeof SpeechRecognition | null = null;

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false; // Stop after one phrase
    recognition.interimResults = false; // Only final result
    recognition.lang = "en-US"; // Change language if needed
  }

  const startListening = () => {
    if (!recognition) {
      toast.error("Speech recognition is not supported in this browser.");
      return;
    }

    setIsListening(true);
    recognition.start();

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(anchorElUser ? null : event.currentTarget);
  };

  const getInitials = (name?: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .slice(0, 2)
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  
const debouncedSearch = useMemo(() => debounce((query: string) => {
  mutateAsync(query);
}, 400), []);

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
              value={isListening ? "listening..." : text}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
              debouncedSearch(e.target.value);
              }}
              searchText={text}
              debouncedSearch={debouncedSearch}
              icon={
              <SearchIcon
                style={{ color: "#4A5568" }}
                className="cursor-pointer text-xs md:text-lg"
              />
              }
            />
            </div>
          <div
            className={`relative bg-gray-100 p-1.5 md:p-2 rounded-full w-1/6 md:w-auto flex items-center justify-center ${
              isListening ? "bg-red-500 text-white" : "bg-gray-100"
            }`}
            onClick={startListening}
          >
            <MicIcon
              style={{ color: isListening ? "#ffffff" : "#4A5568" }}
              className="cursor-pointer text-xs md:text-lg"
            />
            {isListening && (
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-700 rounded-full animate-ping"></span>
            )}
          </div>
          <div className="bg-gray-100 p-1.5 md:p-2 rounded-full w-1/6 md:w-auto flex items-center justify-center"
           onClick={() => setOpen(true)}
          >
            <ImageSearchIcon
              style={{ color: "#4A5568" }}
              className="cursor-pointer text-xs md:text-lg"
            />
          </div>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-[90%] max-w-md space-y-4">
              <h2 className="text-lg font-semibold text-center">
                Upload Image
              </h2>

              <input type="file" onChange={handleImageUpload} />

              <button
                className="bg-black text-white px-4 py-2 rounded w-full"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
                sx={{ p: 0 }}
              >
                <Avatar>{getInitials(user?.user_info?.name)}</Avatar>
              </IconButton>

              <p className="text-gray-800 text-sm md:text-lg hidden lg:block">
                {user?.user_info?.name}
              </p>
              <Menu
                ref={menuRef}
                sx={{ mt: "45px", position: "absolute" }}
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
