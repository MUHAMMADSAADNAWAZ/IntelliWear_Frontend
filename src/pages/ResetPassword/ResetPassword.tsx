import {  useState } from "react";

import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";

import { ROUTE_LOGIN } from "@routes/constants";
import { Button, Input } from "@components/common";
import UserApi from "@api/user.api";
import { ResetPasswordDto } from "@dto/resetPassword.dto";
import { useDispatch, useSelector } from "react-redux";
import { isLoader, updateLoader } from "@redux/slices/loaderSlice";
import { Loader } from "@components/Loader";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {uid , token} = useParams()
  const loader = useSelector(isLoader);
  const dispatch = useDispatch()
  const userapi = new UserApi()

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const navigate = useNavigate();

  const form = useFormik({
    initialValues: ResetPasswordDto.initialValues(),
    validationSchema: ResetPasswordDto.yupSchema(),
    onSubmit: (values) => {
      mutateAsync(values)
      
    },
  });

  const resetPassword = async (payload : ResetPasswordDto) =>{
    dispatch(updateLoader(true))
    return await userapi.resetPassword(payload , uid || "" , token || "")
  }

  const {mutateAsync} = useMutation({
    mutationFn: resetPassword,
    onSuccess: () =>{
      toast.success("Password Reset Successfully!");
      navigate(ROUTE_LOGIN);
      dispatch(updateLoader(false))
    },
    onError: () =>{
      toast.error("Unable to update Password")
      dispatch(updateLoader(false))
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center">
      <form
        onSubmit={form.handleSubmit}
        className="w-[90%] max-w-md p-8 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-indigo-600 text-center mb-6">
          Reset Password
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Enter your new password and confirm it to reset your password.
        </p>

        <div className="space-y-4">
          <Input
            placeholder="Enter Your Password"
            labelText="New Password"
            labelClass="text-blue-500 font-semibold"
            required
            name="new_password"
            type={showPassword ? "" : "password"}
            formik={form}
            icon={
              showPassword ? (
                <FaRegEyeSlash
                  color=""
                  className=" w-8 h-8  font-Arimo cursor-pointer "
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

        <Button
          type="submit"
          className={`w-full mt-6 p-3 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 font-bold text-lg transition ${
            form.isSubmitting ? "cursor-not-allowed opacity-75" : ""
          }`}
          disabled={form.isSubmitting}
        >
          Reset Password
        </Button>
      </form>

      {loader && <Loader />}
    </div>
  );
};

export default ResetPassword;
