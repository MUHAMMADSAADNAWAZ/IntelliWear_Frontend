import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import CustomerApi from "@api/customer.api";
import UserApi from "@api/user.api";
import { Button, Input } from "@components/common";
import { PasswordDto } from "@dto/password.dto";
import { CustomerPayloadProps, MyProfileDto } from "@dto/myprofile.dto";
import { updateLoader } from "@redux/slices/loaderSlice";
import { update } from "@redux/slices/userSlice";

const MyProfile = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const customerapi = new CustomerApi();
  const api = new UserApi()

  const getUserDetails = async () => {
    dispatch(updateLoader(true));
    const res = await customerapi.getCustomerInfo();
    dispatch(update(res?.data))
    dispatch(updateLoader(false));
    return res;
  };

  const { data } = useQuery({
    queryKey: ["customerinfo"],
    queryFn: getUserDetails,
  });

  const updateCustomerInfo = async (payload: CustomerPayloadProps) => {
    dispatch(updateLoader(true));
    return await customerapi.updateCustomerInfo(payload);
  };

  const { mutateAsync } = useMutation({
    mutationFn: updateCustomerInfo,
    onSuccess: () => {
      toast.success("Information Updated Successfully!");
      dispatch(updateLoader(false));
    },
    onError: () => {
      toast.error("Unable to update information.");
      dispatch(updateLoader(false));
    },
  });

  const form = useFormik({
    initialValues: MyProfileDto.initialValues(),
    validationSchema: MyProfileDto.yupSchema(),
    onSubmit: async (values) => {
      await mutateAsync(values);
    },
  });

  const updatePassword = async (payload: PasswordDto) => {
    dispatch(updateLoader(true));
    return await api.updatePassword(payload);
  };

  const { mutateAsync: mutateUpdatePassword } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password Updated Successfully");
      passwordForm?.resetForm();
      dispatch(updateLoader(false));
      setShowOldPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
    },
    onError: () => {
      toast.error("Unable to update password");
      dispatch(updateLoader(false));
    },
  });

  const passwordForm = useFormik({
    initialValues: PasswordDto.initialValues(),
    validationSchema: PasswordDto.yupSchema(),
    onSubmit: async (values) => {
      await mutateUpdatePassword(values);
    },
  });

  const handlePassword = () => {
    setShowOldPassword(!showOldPassword);
  };

  const handleNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };

  const handleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    form?.setValues(data?.data || {});
  }, [data]);

  return (
    <div className="profile w-full min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-8">
      <h1 className="text-center py-4 text-2xl md:text-4xl font-bold text-blue-500 border-b-2 border-blue-500 mb-6">
        My Profile
      </h1>

      <form
        onSubmit={form.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl"
      >
        <div className="flex flex-col gap-6">
          <div className="flex md:flex-row flex-col gap-6">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Enter Name"
                labelClass="text-blue-500"
                name="name"
                formik={form}
                labelText="Name"
                className="bg-gray-50 text-gray-800"
              />
            </div>

            <div className="w-full md:w-1/2">
              <Input
                placeholder="Enter Address"
                labelClass="text-blue-500"
                name="address"
                formik={form}
                labelText="Address"
                className="bg-gray-50 text-gray-800"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Email"
                labelClass="text-blue-500"
                name="email"
                formik={form}
                disabled
                labelText="Email"
              />
            </div>
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Enter Phone Number"
                labelClass="text-blue-500"
                name="phone"
                formik={form}
                labelText="Phone Number"
                className="bg-gray-50   text-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Update Info
          </Button>
        </div>
      </form>

      <form
        onSubmit={passwordForm.handleSubmit}
        className="bg-white p-8 shadow-lg w-full max-w-4xl rounded-b-lg"
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className=" w-full md:w-1/2">
              <Input
                placeholder="Old Password"
                labelClass="text-blue-500"
                name="old_password"
                formik={passwordForm}
                labelText="Old Password"
                className="bg-gray-50 text-gray-800"
                type={showOldPassword ? "" : "password"}
                icon={
                  showOldPassword ? (
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
            </div>
            <div className="w-1/2 hidden md:block"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Input
                placeholder="New Password"
                labelClass="text-blue-500"
                name="new_password"
                formik={passwordForm}
                labelText="New Password"
                className="bg-gray-50 text-gray-800"
                type={showNewPassword ? "" : "password"}
                icon={
                  showNewPassword ? (
                    <FaRegEyeSlash
                      color=""
                      className=" w-8 h-8  font-Arimo cursor-pointer "
                      onClick={handleNewPassword}
                    />
                  ) : (
                    <IoEyeOutline
                      color=""
                      className=" w-8 h-8  font-Arimo cursor-pointer"
                      onClick={handleNewPassword}
                    />
                  )
                }
              />
            </div>
            <div className="w-full md:w-1/2">
              <Input
                placeholder="Confirm Password"
                labelClass="text-blue-500"
                name="confirm_password"
                formik={passwordForm}
                labelText="Confirm Password"
                className="bg-gray-50 text-gray-800"
                type={showConfirmPassword ? "" : "password"}
                icon={
                  showConfirmPassword ? (
                    <FaRegEyeSlash
                      color=""
                      className=" w-8 h-8  font-Arimo cursor-pointer "
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
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Update Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
