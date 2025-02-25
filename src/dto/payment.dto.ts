import * as yup from "yup";

export class PaymentDto {
  payment: string = "";
  easypaisaPhone: string = "";
  cardNumber: string = "";
  expiryDate: string = "";
  cvv: string = "";

  static yupSchema() {
    return yup.object({
        payment: yup.string().required("Please Select payment method ").nullable(),
      easypaisaPhone: yup.string()
      .when('payment', {
        is: (value: string) => value === 'easypaisa' || value === 'jazzcash',
        then: (schema) => schema
          .required("Please enter your 11 digit phone number")
          .matches(/^\d{11}$/, "Phone number must be exactly 11 digits")
          .nullable(),
        otherwise: (schema) => schema.nullable(),
      }),
      cardNumber: yup.string()
        .when('payment', {
          is: (value: string) => value === 'credit-card' || value === 'debit-card',
          then: (schema) => schema
            .required("Please enter your 16 digit card number")
            .matches(/^\d{16}$/, "Card number must be exactly 16 digits")
            .nullable(),
          otherwise: (schema) => schema.nullable(),
        }),
      expiryDate: yup.string()
        .when('payment', {
          is: (value: string) => value === 'credit-card' || value === 'debit-card',
          then: (schema) => schema
            .required("Please enter the expiry date (MM/YY)")
            .nullable(),
          otherwise: (schema) => schema.nullable(),
        }),
      cvv: yup.string()
        .when('payment', {
          is: (value: string) => value === 'credit-card' || value === 'debit-card',
          then: (schema) => schema
            .required("Please enter your CVV")
            .matches(/^\d{3,4}$/, "CVV must be 3 or 4 digits")
            .nullable(),
          otherwise: (schema) => schema.nullable(),
        }),
      
    });
  }

  static initialValues() {
    return {
      payment: "",
      easypaisaPhone: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
     
    };
  }
}
