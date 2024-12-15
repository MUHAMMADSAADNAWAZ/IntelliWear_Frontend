import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import BarChartIcon from '@mui/icons-material/BarChart';
import RateReviewIcon from '@mui/icons-material/RateReview';
// import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { NavLink } from 'react-router-dom';
import { ROUTE_ADMIN_ANALYTICS, ROUTE_ADMIN_HOME, ROUTE_ADMIN_PRODUCTS, ROUTE_ADMIN_REVIEWS, ROUTE_LOGIN } from '../../routes/constants';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/userSlice';
import { toast } from 'react-toastify';

const AdminSidebar = () => {
  const menuItems = [
    { name: 'Overview', icon: <DashboardIcon /> , elementNav: ROUTE_ADMIN_HOME },
    { name: 'Products', icon: <InventoryIcon /> , elementNav: ROUTE_ADMIN_PRODUCTS },
    { name: 'Analytics', icon: <BarChartIcon /> , elementNav: ROUTE_ADMIN_ANALYTICS },
    { name: 'Reviews', icon: <RateReviewIcon /> , elementNav: ROUTE_ADMIN_REVIEWS },
    // { name: 'Profile', icon: <PersonOutlinedIcon /> , elementNav: ROUTE_ADMIN_PROFILE },
    { name: 'Logout', icon: <LogoutIcon /> , elementNav: ROUTE_LOGIN },
  ];

  const dispatch = useDispatch();

  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col sticky top-0">
    
      <div className="text-center py-4 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
      </div>

      <ul className="flex flex-col p-4 space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className=" p-2 hover:bg-gray-700 rounded-lg cursor-pointer"
            onClick={() => {
              if (item.name === "Logout") {
                dispatch(logout());
                toast.success("Logged out Successfully");
              }
            }}            
          >
            <NavLink to={item.elementNav}className={({ isActive }: { isActive: boolean }) =>
            `${isActive ? "text-blue-500" : ""}  font-bold flex items-center gap-3 p-2`}>

            <div className="text-blue-400">{item.icon}</div>
            <span className="text-lg">{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>

    </div>
  );
};

export default AdminSidebar;
