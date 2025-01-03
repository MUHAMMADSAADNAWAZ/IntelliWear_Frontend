import * as yup from "yup";

export class CheckoutDto {
  name?: string;
  city?: string;
  address?: string;
  phone?: string;
  payment?: string;

  static yupSchema() {
    return yup.object({
      name: yup.string().required("Please enter your name ").nullable(),
      city: yup.string().required("Please chooose your city ").nullable(),
      address: yup.string().required("Please enter your address ").nullable(),
        phone: yup.string()
                  .required("Please Enter your 11 digit Phone Number")
                  .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
                  .nullable(),
      payment: yup.string().required("Please Select payment method ").nullable(),
      
    });
  }

  static initialValues() {
    return {
      city: "",
      address: "",
      phone: "",
      payment: "",
    };
  }
}
