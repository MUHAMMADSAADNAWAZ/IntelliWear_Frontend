import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { Button, Input } from "@components/common";
import { MyProfileDto } from "@dto/myprofile.dto";
import { PasswordDto } from "@dto/password.dto";
import { selectUser } from "@redux/slices/userSlice";

const AdminProfile = () => {
  const user = useSelector(selectUser);
  const email = user?.email;

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

  const passwordForm = useFormik({
    initialValues: PasswordDto.initialValues(),
    validationSchema: PasswordDto.yupSchema(),
    onSubmit: (values) => {
      console.log("Password values are", values);
      toast.success("Password Updated Successfully");
    }
})

  return (
    <div className="admin-profile w-full min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-8 ">
      <h1 className="text-center py-4 text-4xl font-bold text-blue-500 border-b-2 border-blue-500 mb-6">
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
                placeholder="Password"
                labelClass="text-blue-500"
                name="password"
                formik={passwordForm}
                labelText="Password"
                className="bg-gray-50 text-gray-800"
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
