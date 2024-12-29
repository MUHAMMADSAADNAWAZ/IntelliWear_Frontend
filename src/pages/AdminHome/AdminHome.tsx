import { Outlet } from "react-router-dom"

import { AdminSidebar } from "@components/AdminSidebar"
const AdminHome = () => {
  return (
  //   <div className="flex">
   
  //  <AdminSidebar />
   
  //   <div className="flex-1 p-6 bg-gray-100">
      
  //   <Outlet />

  //   </div>

  // </div>
  <div className="flex min-h-screen">
  {/* Sidebar */}
  <div className="w-64 bg-white shadow-md">
    <AdminSidebar />
  </div>

  {/* Main Content */}
  <div className="flex-1 p-6 bg-gray-100">
    <Outlet />
  </div>
</div>

  )
}

export default AdminHome