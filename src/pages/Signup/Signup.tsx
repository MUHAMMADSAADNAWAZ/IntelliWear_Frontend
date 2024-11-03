
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../components/common";
import { useFormik } from "formik";
import { SignUpDto } from "../../dto/Signup.dto";
import clothImage from "../../assets/clothes10.jpg";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import logo from "../../assets/logo3.jpg"
import { ROUTE_HOME } from "../../routes/constants";


const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    
    const handlePassword = () => {
        setShowPassword(!showPassword);
    } ;

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    } ;

    const navigate = useNavigate();

    const form = useFormik({
        initialValues: SignUpDto.initialValues(),
        validationSchema: SignUpDto.yupSchema(),
        onSubmit: async (values) => {
            console.log("signup Dto Values are", values);
            toast.success("Account created Successfully!");
            navigate("/login");
        },
    });

    return (
        <div className="flex min-h-screen">
            
            <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${clothImage})` }}>
                
            </div>

            
            <div className="w-1/2 flex items-center justify-center bg-gray-100">
                <form onSubmit={form.handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-3/4 max-w-md">

                <div className="mb-6 text-center " >
                        <img src={logo} alt="Website Logo" className="mx-auto mb-2 w-24 h-24 cursor-pointer" onClick={()=>{navigate(ROUTE_HOME)}}/>
                        <h1 className="text-3xl font-bold text-yellow-500">IntelliWear</h1>
                </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Signup</h2>

                    <div className="mb-4">
                    <Input
                        placeholder="Enter Your Name"
                        labelText="Name"
                        labelClass="text-blue-500 font-semibold"
                        required
                        name="name"
                        formik={form}
                    />
                    </div>

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
                        placeholder="Enter Your Phone Number"
                        labelText="Phone Number"
                        labelClass="text-blue-500 font-semibold"
                        required
                        name="phone"
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

                    <div className="mb-4">
                    <Input
                        placeholder="Confirm Your Password"
                        labelText="Confirm Password"
                        labelClass="text-blue-500 font-semibold"
                        required
                        name="confirm_password"
                        type={showConfirmPassword ? "" : "password"}
                        formik={form}
                        icon={
                            showConfirmPassword ? (
                              <FaRegEyeSlash
                                color=""
                                className=" w-8 h-8  font-Arimo cursor-pointer"
                                onClick={handleConfirmPassword}
                              />
                            ) : (
                              <IoEyeOutline
                                color=""
                                className=" w-8 h-8  font-Arimo cursor-pointer"
                                onClick={handleConfirmPassword}
                              />
                            )
                          }
                    />
                    </div>

                    <Button type="submit" className="w-full bg-blue-500 text-white hover:bg-blue-600 mb-4">Signup</Button>

                    <div className="text-center">
                        <Link to="/login" className="text-blue-500 hover:underline">Already have an account? Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;