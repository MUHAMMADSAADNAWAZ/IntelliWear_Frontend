import { Outlet } from "react-router-dom"
import { useSelector } from "react-redux"

import { AdminSidebar } from "@components/AdminSidebar"
import { isLoader } from "@redux/slices/loaderSlice"
import { Loader } from "@components/Loader"

const AdminHome = () => {

  const loader = useSelector(isLoader);

  return (
  
  <div className="flex min-h-screen">

    {loader && <Loader />}

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