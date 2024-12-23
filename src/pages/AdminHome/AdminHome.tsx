import { AdminSidebar } from "@components/AdminSidebar"
import { Outlet } from "react-router-dom"
const AdminHome = () => {
  return (
    <div className="flex">
   
   <AdminSidebar />
   
    <div className="flex-1 p-6 bg-gray-100">
      
      <Outlet />

    </div>

  </div>
  )
}

export default AdminHome