import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { ShoppingBag } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ChevronUpIcon from '@mui/icons-material/ExpandLess';
import ChevronDownIcon from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';

import { menuItems, orderCategories, productCategories } from '@Data/data';
import { logout } from '@redux/slices/userSlice';
import { ROUTE_ADMIN_PRODUCTS } from '@routes/constants';
import {clearMessages} from "@redux/slices/botSlice"
import { clearCart } from '@redux/slices/cartSlice';

const AdminSidebar = () => {
  const [open, setOpen] = useState<string>("");
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  console.log("location" , location.pathname);
  useEffect(()=>{
    if(location.pathname === "/"){
      setOpen("products");
      navigate(ROUTE_ADMIN_PRODUCTS)
    }
  },[location.pathname])
  
  
  return (
    <div className=" bg-white h-screen border-r border-gray-200 text-gray-800 flex flex-col sticky top-0 shadow-sm overflow-y-auto">
      <div className="text-center py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-600">IntelliWear</h2>
        <p className="text-sm text-gray-500">Admin Panel</p>
      </div>

      <ul className="flex flex-col p-4 space-y-2">

      <li className="rounded-lg transition-colors duration-200">
          <button
            onClick={() => setOpen(open === "products"? "" : "products")}
            className="w-full flex items-center justify-between p-2 font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <InventoryIcon className="text-blue-500 opacity-75" />
              <span>Products</span>
            </div>
            {open === "products" ? (
              <ChevronUpIcon className="text-gray-600" />
            ) : (
              <ChevronDownIcon className="text-gray-600" />
            )}
          </button>

            <div
            className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
              open === "products" ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <ul className="ml-6 mt-1 space-y-1">
              {productCategories.map((order) => (
                <li key={order.path}>
                  <NavLink
                    to={order.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {order.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            </div>
        </li>

      <li className="rounded-lg transition-colors duration-200">
          <button
            onClick={() => setOpen(open === "orders" ? "" : "orders")}
            className="w-full flex items-center justify-between p-2 font-medium text-gray-700 hover:text-blue-600 rounded-lg hover:bg-blue-50"
          >
            <div className="flex items-center gap-3">
              <ShoppingBag className="text-blue-500 opacity-75" />
              <span>Orders</span>
            </div>
            {open === "orders" ? (
              <ChevronUpIcon className="text-gray-600" />
            ) : (
              <ChevronDownIcon className="text-gray-600" />
            )}
          </button>

          <div
            className={`overflow-hidden transition-max-height duration-1000 ease-in-out ${
              open === "orders" ? 'max-h-screen' : 'max-h-0'
            }`}
          >
            <ul className="ml-6 mt-1 space-y-1">
              {orderCategories.map((order) => (
                <li key={order.path} >
                  <NavLink
                    to={order.path}
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {order.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </li>

        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`rounded-lg ${item.name === 'Logout' ? 'hover:bg-red-50' : 'hover:bg-blue-50'} transition-colors duration-200`}
            onClick={() => {
              if (item.name === 'Logout') {
                dispatch(logout());
                dispatch(clearMessages())
                dispatch(clearCart());
                toast.success('Logged out Successfully');
              }
              setOpen("")
            }}
          >
            <NavLink
              to={item?.elementNav}
              className={({ isActive }) =>
                `${
                  isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:text-blue-600'
                } font-medium flex items-center gap-3 p-2 rounded-lg`
              }
            >
              <div className={`${
                item.name === 'Logout' ? 'text-red-500' : 'text-blue-500'
              } opacity-75`}>
                <item.icon />
              </div>
              <span className={`${item.name === 'Logout' ? 'text-red-500' : ''} text-md`}>
                {item.name}
              </span>
            </NavLink>
          </li>
        ))}

       
      </ul>

      <div className="mt-auto p-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} IntelliWear Admin
        </p>
      </div>
    </div>
  );
};

export default AdminSidebar;
