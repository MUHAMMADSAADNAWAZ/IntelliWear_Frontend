

import { useFormik } from "formik";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import clothImage from "@assets/clothes9.jpg";
import logo from "@assets/logo3_bg_removed.png.png";
import { Button, Input } from "@components/common";
import { LoginDto } from "@dto/Login.dto";
import { login } from "@redux/slices/userSlice";
import { ROUTE_ADMIN_HOME, ROUTE_HOME, ROUTE_SIGNUP } from "@routes/constants";
import { ForgotPassword } from "@components/ForgotPassword";
import UserApi from "@api/user.api";
import { isLoader, updateLoader } from "@redux/slices/loaderSlice";
import { Loader } from "@components/Loader";
import { ForgotPasswordDto } from "@dto/forgetPassword.dto";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [forgotOpen , setForgotOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loader = useSelector(isLoader)
    const userapi = new UserApi()

    const form = useFormik({
        initialValues: LoginDto.initialValues(),
        validationSchema: LoginDto.yupSchema(),
        onSubmit: async (values) => {
            await mutateAsync(values);
        },
    });
    
    const loginUser = async (payload: LoginDto) =>{
        dispatch(updateLoader(true))
        return await userapi.login(payload)
    }

    const {mutateAsync} = useMutation({
        mutationFn: loginUser,
        onSuccess: (res: any) => {
            toast.success("Login Successfully!");
            dispatch(login(res?.data));
            res?.data?.user_info?.user_type === "admin" ? navigate(ROUTE_ADMIN_HOME) : navigate(ROUTE_HOME)
            dispatch(updateLoader(false))    
        },
        onError: () =>{
            toast.error("Unable to Login!");
            dispatch(updateLoader(false))
        }
    })

    const forgotPasswordForm = useFormik({
        initialValues: ForgotPasswordDto.initialValues(),
        validationSchema: ForgotPasswordDto.yupSchema(),
        onSubmit: async (values) => {
          await mutateForgotPassword(values)
          forgotPasswordForm.resetForm()
        },
    });

    const forgotPassword = async (payload : ForgotPasswordDto) =>{
        dispatch(updateLoader(true))
        return await userapi.forgotPassword(payload)
    }

    const {mutateAsync: mutateForgotPassword} = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () =>{
          toast.success("Email Sent Successfully!");
          setForgotOpen(false);
          dispatch(updateLoader(false))
        },
        onError: () =>{
            toast.error("Unable to send Email!")
            dispatch(updateLoader(false))
        }
    })

    const handlePassword = () => {
        setShowPassword(!showPassword);
    } ;

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

            {forgotOpen && <ForgotPassword setForgotOpen={setForgotOpen} form={forgotPasswordForm} />}

            {loader && <Loader />}
        </div>
    );
};

export default Login;
