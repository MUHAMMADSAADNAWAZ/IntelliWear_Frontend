import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {

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
