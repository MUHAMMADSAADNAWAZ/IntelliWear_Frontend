import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Button, Input } from "@components/common";
import { MyProfileDto } from "@dto/myprofile.dto";
import { PasswordDto } from "@dto/password.dto";
import { selectUser } from "@redux/slices/userSlice";
import UserApi from "@api/user.api";
import { useMutation } from "@tanstack/react-query";
import { updateLoader } from "@redux/slices/loaderSlice";
import { FaRegEyeSlash } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";

const AdminProfile = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const email = user?.user_info?.user?.email;
  const api = new UserApi();

  const form = useFormik({
    initialValues: {
      ...MyProfileDto.initialValues(),
    },
    validationSchema: MyProfileDto.yupSchema(),
    onSubmit: (values) => {
      console.log("Admin profile values are", values);
      toast.success("Profile Updated Successfully");
    },
  });

  const updatePassword = async (payload: PasswordDto) => {
    dispatch(updateLoader(true));
    return await api.updatePassword(payload);
  };

  const { mutateAsync } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      toast.success("Password Updated Successfully");
      passwordForm?.resetForm();
      dispatch(updateLoader(false));
      setShowOldPassword(false)
      setShowNewPassword(false)
      setShowConfirmPassword(false)
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
      await mutateAsync(values);
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

  return (
    <div className="admin-profile w-full min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-8 ">
      <h1 className="py-4 text-4xl font-bold text-blue-500 border-b-2 border-blue-500 mb-6">
        Admin Profile
      </h1>

      <form
        onSubmit={form.handleSubmit}
        className="bg-white p-8 shadow-lg w-full max-w-4xl rounded-t-lg"
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="w-1/2">
              <Input
                placeholder="First Name"
                labelClass="text-blue-500"
                name="first_name"
                formik={form}
                labelText="First Name"
                className="bg-gray-50 text-gray-800"
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Last Name"
                labelClass="text-blue-500"
                name="last_name"
                formik={form}
                labelText="Last Name"
                className="bg-gray-50 text-gray-800"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-1/2">
              <Input
                placeholder="Email"
                labelClass="text-blue-500"
                name="email"
                value={email}
                disabled
                labelText="Email"
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Phone"
                labelClass="text-blue-500"
                name="phone"
                formik={form}
                labelText="Phone Number"
                className="bg-gray-50 text-gray-800"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Update Profile
          </Button>
        </div>
      </form>

      <form
        onSubmit={passwordForm.handleSubmit}
        className="bg-white p-8 shadow-lg w-full max-w-4xl rounded-b-lg"
      >
        <div className="flex flex-col gap-6">
          <div className="flex gap-6">
            <div className="w-1/2">
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
            <div className="w-1/2"></div>
          </div>

          <div className="flex gap-6">
            <div className="w-1/2">
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
            <div className="w-1/2">
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

export default AdminProfile;
