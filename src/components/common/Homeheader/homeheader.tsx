import { Button } from "../Button"
import { Input } from "../Input"
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import MicIcon from '@mui/icons-material/Mic';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import logo from "../../../assets/logo3.jpg"
import { NavLink, useNavigate } from "react-router-dom";
import { ROUTE_HOME, ROUTE_LOGIN, ROUTE_SIGNUP , ROUTE_MEN_CLOTHING , ROUTE_WOMEN_CLOTHING , ROUTE_CHILDREN_CLOTHING } from "../../../routes/constants";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/slices/userSlice";
import { toast } from "react-toastify";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import { selectCart , clearCart , toggleCart } from "../../../redux/slices/cartSlice";
import CartSidebar from "../../CartSidebar/CartSidebar";

const HomeHeader = () => {

  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const email = user?.email;
  // console.log("user" , user);
  // console.log("email" , email);

  const dispatch = useDispatch();

  const handleLogout = () =>{
    dispatch(logout());
    dispatch(clearCart());
    toast.success("Logged out Successfully");
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  // const [isCartOpen, setCartOpen] = useState(false);
  const cart = useSelector(selectCart);
  // console.log("cart" , cart);
  const totalQuantity = cart.totalQuantity;
  
  return (
    <>
    <div className="flex flex-col w-full">

        {/* Main Navbar */}
        <div className="navbar flex items-center justify-around gap-2 p-2 bg-gray-900">
          
        
        {/* Logo */}
        <div className="logo w-[15%] mr-10">
          <img src={logo} alt="website logo" className="w-24 h-20 p-2.5 cursor-pointer" onClick={() => { navigate(ROUTE_HOME) }}/>
          <h1 className="text-3xl font-bold text-yellow-500">IntelliWear</h1>
        </div>

        {/* Search Bar */}
        <div className="search w-[60%] flex items-center justify-center gap-2 border border-blue-400 rounded-lg p-2">
          <Input 
            placeholder="Search"
            className="pt-4 border-none outline-none bg-gray-800 text-white placeholder-gray-500"
          />
          <Button className="bg-yellow-500 text-black hover:bg-yellow-600">Search</Button>
          <ImageSearchIcon style={{ fontSize: 30, color: '#FFD700' }} className="cursor-pointer"/>
          <MicIcon style={{ fontSize: 30, color: '#FFD700' }} className="cursor-pointer"/>
        </div>

        {/* Cart Icon */}
       
        {/* Auth Buttons */}
        <div className="w-[20%] flex gap-2 items-center justify-center">
        {email === undefined ? 
        <>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => { navigate(ROUTE_LOGIN) }}>Login</Button>
          <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={() => { navigate(ROUTE_SIGNUP) }}>SignUp</Button>
        </> : 
        <div className="relative z-20" onClick={toggleDropdown}> 
                <AccountCircleIcon style={{ fontSize: 40, color: '#FFD700' }} className="cursor-pointer"/>
                {isDropdownOpen && ( 
                  <div className="absolute -left-52 bg-white text-gray-700 rounded shadow-lg mt-2 p-2 w-[350px] flex flex-col justify-center items-center gap-2">
                   <p className="text-blue-600 font-bold">Email: <p className=" font-semibold inline"> {email}</p></p> 
                    <Button className="bg-blue-500 text-white hover:bg-blue-600 " onClick={handleLogout}>Logout</Button>
                  </div>
                )}
        </div>
      }
        </div>
      </div>

        <CartSidebar />
    </div>

    <div className="flex items-center gap-40  p-2 text-lg text-gray-300 bg-gray-800 sticky z-10 w-full top-0">

      <div className="flex gap-3 w-2/3 justify-end">
    <NavLink to={ROUTE_MEN_CLOTHING} className={({isActive})=>
      isActive ? "text-yellow-500" : "hover:text-yellow-500 cursor-pointer"
  }>Men</NavLink>
    <NavLink to={ROUTE_WOMEN_CLOTHING} className={({isActive})=> isActive ? "text-yellow-500" : "hover:text-yellow-500     cursor-pointer"}>Women</NavLink>
    <NavLink to={ROUTE_CHILDREN_CLOTHING} className={({isActive})=> isActive ? "text-yellow-500" :     "hover:text-yellow-500 cursor-pointer"}>Children</NavLink>
  </div>

    <div className="cart relative cursor-pointer w-1/3" onClick={()=>{dispatch(toggleCart())}}>
          <ShoppingCartOutlinedIcon style={{ fontSize: 40, color: '#FFD700' }} />
          {totalQuantity > 0 && (
          <span className="absolute top-0 left-6 text-xs bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">{totalQuantity}</span>
        )}
        </div>

    </div>

    </>
  
  )
}

export default HomeHeader
