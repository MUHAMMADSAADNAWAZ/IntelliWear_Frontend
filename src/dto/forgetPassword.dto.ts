import * as yup from "yup";

export class ForgotPasswordDto {
  email: string = '';

  static yupSchema() {
    return yup.object({
      email: yup.string().required("Please Enter Your Email").nullable(),
    });
  }

  static initialValues() {
    return {
        email: '',
    };
}
}
