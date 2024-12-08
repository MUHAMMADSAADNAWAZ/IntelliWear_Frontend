import { Outlet } from "react-router-dom"
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar"

const AdminHome = () => {
  return (
    <div className="flex">
   
   <AdminSidebar />
   
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Welcome to Admin Dashboard</h1>
      
      <Outlet />

    </div>

  </div>
  )
}

export default AdminHome