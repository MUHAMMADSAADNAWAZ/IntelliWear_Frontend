import { Button } from "../Button"
import { Input } from "../Input"
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import MicIcon from '@mui/icons-material/Mic';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from "../../../assets/logo3.jpg"
import { useNavigate } from "react-router-dom";
import { ROUTE_LOGIN, ROUTE_SIGNUP } from "../../../routes/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";

const HomeHeader = () => {

  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const email = user?.email;
  // console.log("user" , user);
  // console.log("email" , email);

  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout());
    toast.success("Logged out Successfully");
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  

  return (
    <div className="flex flex-col  sticky top-10 z-50">

        {/* Main Navbar */}
        <div className="navbar flex items-center justify-around gap-2 p-2 bg-gray-900">
          
        
        {/* Logo */}
        <div className="logo w-[15%] mr-10">
          <img src={logo} alt="website logo" className="w-24 h-20 p-2.5 cursor-pointer" />
          <h1 className="text-3xl font-bold text-yellow-500">IntelliWear</h1>
        </div>

        {/* Search Bar */}
        <div className="search w-[55%] flex items-center justify-center gap-2 border border-blue-400 rounded-lg p-2">
          <Input 
            placeholder="Search"
            className="pt-4 border-none outline-none bg-gray-800 text-white placeholder-gray-500"
          />
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Search</Button>
          <ImageSearchIcon style={{ fontSize: 30, color: '#FFD700' }} className="cursor-pointer"/>
          <MicIcon style={{ fontSize: 30, color: '#FFD700' }} className="cursor-pointer"/>
        </div>

        {/* Cart Icon */}
        <div className="cart w-[10%] ">
          <ShoppingCartOutlinedIcon style={{ fontSize: 40, color: '#FFD700' }} className="cursor-pointer"/>
        </div>

        {/* Auth Buttons */}
        <div className="w-[20%] flex gap-2 items-center justify-center">
        {email === undefined ? 
        <>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => { navigate(ROUTE_LOGIN) }}>Login</Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => { navigate(ROUTE_SIGNUP) }}>SignUp</Button>
        </> : 
        <div className="relative" onClick={toggleDropdown}> 
                <AccountCircleIcon style={{ fontSize: 40, color: '#FFD700' }} className="cursor-pointer"/>
                {isDropdownOpen && ( 
                  <div className="absolute -left-52 bg-white text-gray-700 rounded shadow-lg mt-2 p-2 w-[365px] flex flex-col justify-center items-center gap-2">
                   <p className="text-green-600 font-bold">Email: <p className="text-purple-600 font-semibold inline"> {email}</p></p> 
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 " onClick={handleLogout}>Logout</Button>
                  </div>
                )}
        </div>
      }
        </div>
      </div>

      {/* Category Links */}
      <div className="flex items-center justify-center gap-3 p-2 text-lg text-gray-300 bg-gray-800">
        <p className="hover:text-yellow-500 cursor-pointer">Men</p>
        <p className="hover:text-yellow-500 cursor-pointer">Women</p>
        <p className="hover:text-yellow-500 cursor-pointer">Children</p>
      </div>

    </div>
  
  )
}

export default HomeHeader
