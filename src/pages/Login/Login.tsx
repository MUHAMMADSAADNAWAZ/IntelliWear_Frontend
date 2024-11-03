
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components/common";
import { useFormik } from "formik";
import { LoginDto } from "../../dto/Login.dto";
import clothImage from "../../assets/clothes9.jpg";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import logo from "../../assets/logo3.jpg"
import { ROUTE_HOME } from "../../routes/constants";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/userSlice";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const handlePassword = () => {
        setShowPassword(!showPassword);
    } ;

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const form = useFormik({
        initialValues: LoginDto.initialValues(),
        validationSchema: LoginDto.yupSchema(),
        onSubmit: async (values) => {
            console.log("login Dto Values are", values);
            const userData = {email: values.email};
            dispatch(login(userData));
            toast.success("Login Successfully!");
            navigate("/");
        },
    });

    return (
        <div className="flex min-h-screen">
        
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${clothImage})` }}>
               
            </div>

           
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <form onSubmit={form.handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">

                <div className="mb-6 text-center">
                        <img src={logo} alt="Website Logo" className="mx-auto mb-2 w-24 h-24  cursor-pointer"  onClick={()=>{navigate(ROUTE_HOME)}}/>
                        <h1 className="text-3xl font-bold text-yellow-500">IntelliWear</h1>
                </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                    <div className="mb-4">
                    <Input
                        placeholder="Enter Your Email"
                        labelText="Email"
                        labelClass="text-blue-500 font-semibold"
                        required
                        name="email"
                        formik={form}
                    />
                    </div>

                    <div className="mb-4">
                    <Input
                        placeholder="Enter Your Password"
                        labelText="Password"
                        labelClass="text-blue-500 font-semibold"
                        required
                        name="password"
                        type={showPassword ? "" : "password"}
                        formik={form}
                        icon={
                            showPassword ? (
                              <FaRegEyeSlash
                                color=""
                                className=" w-8 h-8  font-Arimo cursor-pointer"
                                onClick={handlePassword}
                              />
                            ) : (
                              <IoEyeOutline
                                color=""
                                className=" w-8 h-8  font-Arimo cursor-pointer"
                                onClick={handlePassword}
                              />
                            )
                          }
                    />
                    </div>

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 mb-4">Login</Button>

                    <div className="text-center">
                        <Link to="/signup" className="text-blue-500 hover:underline">Don't have an account? Sign up here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
