import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "@routes/AppRoutes"
import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
import { useTokenRefresh } from "@utils/auth";

function App() {

  useTokenRefresh()

  return (
    <>
    <ToastContainer />
    <ScrollToTop />
    <AppRoutes />
    </>
  )
}

export default App
