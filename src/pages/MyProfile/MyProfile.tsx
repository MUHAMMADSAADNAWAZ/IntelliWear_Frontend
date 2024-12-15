import { useFormik } from "formik";
import { Button, Input } from "../../components/common";
import { MyProfileDto } from "../../dto/myprofile.dto";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";

const MyProfile = () => {

  const user = useSelector(selectUser)
  const email = user?.email;

  const form = useFormik({
    initialValues: MyProfileDto.initialValues(),
    validationSchema: MyProfileDto.yupSchema(),
    onSubmit: (values) => {
      console.log("my profile dto values are", values);
      toast.success("Information Updated Successfully");
    },
  });

  return (
    <div className="profile w-full min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center p-8">
     
      <h1 className="text-center py-4 text-4xl font-bold text-blue-500 border-b-2 border-blue-500 mb-6">
        My Profile
      </h1>

      <form
        onSubmit={form.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl"
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
                className="bg-gray-50   text-gray-800"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-1/2">
              <Input
                placeholder="Email"
                labelClass="text-blue-500"
                name="email"
                // formik={form}
                value={email}
                disabled
                labelText="Email"
                // className="bg-gray-50 text-gray-800"
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Phone"
                labelClass="text-blue-500"
                name="phone"
                formik={form}
                labelText="Phone Number"
                className="bg-gray-50   text-gray-800"
              />
            </div>
          </div>

          <div>
            <Input
              placeholder="Address"
              labelClass="text-blue-500"
              name="address"
              formik={form}
              labelText="Address"
              className="bg-gray-50 text-gray-800"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            type="submit"
            className="bg-yellow-500 hover:bg-ywllow-600 text-white font-semibold px-6 py-3 rounded-lg transition-all"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
