

import { useFormik } from "formik";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import clothImage from "@assets/clothes9.jpg";
import logo from "@assets/logo3_bg_removed.png.png";
import { Button, Input } from "@components/common";
import { LoginDto } from "@dto/Login.dto";
import { login } from "@redux/slices/userSlice";
import { ROUTE_ADMIN_HOME, ROUTE_HOME, ROUTE_SIGNUP } from "@routes/constants";
import { ForgotPassword } from "@components/ForgotPassword";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [forgotOpen , setForgotOpen] = useState(false);

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
            const role = values.email === "admin@gmail.com" ? "admin" : "buyer"
            const userData = {email: values.email , role: role};
            dispatch(login(userData));
            toast.success("Login Successfully!");
            values.email === "admin@gmail.com" ? navigate(ROUTE_ADMIN_HOME) : navigate(ROUTE_HOME)
        },
    });

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
        
            <div className="w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${clothImage})` }}>
               
            </div>

            <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 py-5 md:py-0 min-h-screen">
                <form onSubmit={form.handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">

                <div className="text-center">
                        <img src={logo} alt="Website Logo" className="mx-auto mb-2 w-44 h-44 cursor-pointer"  onClick={()=>{navigate(ROUTE_HOME)}}/>
                        {/* <h1 className="text-3xl font-bold text-yellow-500">IntelliWear</h1> */}
                </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

                    <div className="mb-4">
                    <Input
                        placeholder="Enter Your Email"
                        labelText="Email"
                        labelClass="text-blue-500 font-semibold font-poppins"
                        required
                        name="email"
                        type="email"
                        formik={form}
                    />
                    </div>

                    <div className="mb-4">
                    <Input
                        placeholder="Enter Your Password"
                        labelText="Password"
                        labelClass="text-blue-500 font-semibold font-poppins"
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

                    <div className="my-3 flex justify-end">
                    <p className="text-blue-500 hover:underline cursor-pointer" onClick={() => setForgotOpen(true)}>Forgot Password ?</p>
                    </div>

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 mb-4">Login</Button>

                    <div className="text-center">
                        <Link to={ROUTE_SIGNUP} className="text-blue-500 hover:underline">Don't have an account? Sign up here</Link>
                    </div>
                </form>
            </div>

            {forgotOpen && <ForgotPassword setForgotOpen={setForgotOpen} />}
        </div>
    );
};

export default Login;
