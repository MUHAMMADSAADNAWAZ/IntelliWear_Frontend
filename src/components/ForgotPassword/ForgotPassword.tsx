import { useFormik } from "formik";
import { toast } from "react-toastify";

import { Button, Input } from "@components/common";
import { ForgotPasswordDto } from "@dto/forgetPassword.dto";
import { CancelIcon } from "@svg";

interface ForgotPasswordProps {
  setForgotOpen: (open: boolean) => void;
}

const ForgotPassword = ({ setForgotOpen }: ForgotPasswordProps) => {
  const form = useFormik({
    initialValues: ForgotPasswordDto.initialValues(),
    validationSchema: ForgotPasswordDto.yupSchema(),
    onSubmit: (values) => {
      console.log("Forgot Password Dto Values are", values);
      toast.success("Email Sent Successfully!");
      setForgotOpen(false);
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={form.handleSubmit}
        className="rounded-lg shadow-lg w-full max-w-xl p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100"
      >
        <div className="flex items-center justify-between mb-6">
          <p className="font-Arimo font-bold text-xl text-indigo-500">
            Forgot Password
          </p>
          <div
            className="cursor-pointer p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            onClick={() => {
              setForgotOpen(false);
              form.setErrors({});
            }}
          >
            <CancelIcon />
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <p className="font-Arimo text-lg text-gray-700">
            Enter your email to reset your password. We’ll send you a link to set a new password.
          </p>
          <Input
            labelClass="font-Arimo text-indigo-500"
            placeholder="Enter Your Email"
            labelText="Email"
            name="email"
            formik={form}
          />
        </div>

        <Button
          className={`bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white w-full p-3 rounded-xl font-bold text-lg transition-all ${
            form?.isSubmitting ? "cursor-not-allowed opacity-75" : ""
          }`}
          type="submit"
          disabled={form?.isSubmitting}
        >
          Send
        </Button>
      </form>
    </div>
  );
};

export default ForgotPassword;
