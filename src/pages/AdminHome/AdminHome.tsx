import { Outlet } from "react-router-dom"

import { AdminSidebar } from "@components/AdminSidebar"
const AdminHome = () => {
  return (
  
  <div className="flex min-h-screen">

  <div className="w-64 bg-white shadow-md">
    <AdminSidebar />
  </div>

  <div className="flex-1 p-6 bg-gray-100">
    <Outlet />
  </div>
</div>

  )
}

export default AdminHome