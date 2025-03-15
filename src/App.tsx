import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "@routes/AppRoutes"
import ScrollToTop from "@components/ScrollToTop/ScrollToTop";
import useAuthManager from "@utils/useAuthManager";

function App() {

  useAuthManager()

  return (
    <>
    <ToastContainer />
    <BrowserRouter>
    <ScrollToTop />
    <AppRoutes />
    </BrowserRouter>
    </>
  )
}

export default App
