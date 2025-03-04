import * as yup from "yup";

export class ProductDto {
  name?: string;
  price?: number;
  stock?: number;
  product_type?: string;
  gender?: string;
  description?: string;
  image?: File;

  static yupSchema() {
    return yup.object({
      name: yup.string().required("Please enter product name ").nullable(),
      price: yup.string().required("Please enter product price").nullable(),
      stock: yup
        .string()
        .required("Please enter product stock")
        .nullable(),
      product_type: yup
        .string()
        .required("Please choose product category")
        .nullable(),
      gender: yup
        .string()
        .required("Please choose product gender")
        .nullable(),
      description: yup
        .string()
        .required("Please enter product quantity")
        .nullable(),
      image: yup
        .mixed()
        .required("Please upload a product image")
        .test("fileType", "Only image files are allowed", (value) => {
          if (typeof value === "string") {
            return true;
          }

          if (value instanceof File) {
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value.type
            );
          }

          return false;
        }),
    });
  }

  static initialValues() {
    return {
      name: "",
      price: "",
      stock: "",
      product_type: "",
      gender: "",
      description: "",
      image: null,
    };
  }
}
