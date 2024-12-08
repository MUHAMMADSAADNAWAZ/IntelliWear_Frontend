import { useFormik } from "formik";
import { Button, Input } from "../../components/common";
import { MyProfileDto } from "../../dto/myprofile.dto";
import { toast } from "react-toastify";

const MyProfile = () => {
  const form = useFormik({
    initialValues: MyProfileDto.initialValues(),
    validationSchema: MyProfileDto.yupSchema(),
    onSubmit: (values) => {
      console.log("my profile dto values are", values);
      toast.success("Information Updated Successfully");
    },
  });

  return (
    <div className="profile w-full p-4">
      <h1 className="text-center py-4 text-5xl font-bold">My Profile</h1>

      <form onSubmit={form.handleSubmit}>
        <div className="flex flex-col gap-4 my-5">
          <div className="flex gap-3 ">
            <div className="w-1/2">
              <Input
                placeholder="First Name"
                labelClass=""
                name="first_name"
                formik={form}
                labelText="First Name"
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Last Name"
                labelClass=""
                name="last_name"
                formik={form}
                labelText="Last Name"
              />
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-1/2">
              <Input
                placeholder="Email"
                labelClass=""
                name="email"
                formik={form}
                labelText="Email"
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Phone"
                labelClass=""
                name="phone"
                formik={form}
                labelText="Phone Number"
              />
            </div>
          </div>
          <div className="flex gap-3 ">
            <div className="w-1/2">
              <Input
                placeholder="Address"
                labelClass=""
                name="address"
                formik={form}
                labelText="Address"
              />
            </div>
          </div>
        </div>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default MyProfile;
