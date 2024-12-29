import * as yup from "yup";

export class ProductDto {
  name?: string;
  price?: number;
  avaQuantity?: number;
  category?: string;
  description?: string;
  img?: File;

  static yupSchema() {
    return yup.object({
      name: yup.string().required("Please enter product name ").nullable(),
      price: yup.string().required("Please enter product price").nullable(),
      avaQuantity: yup
        .string()
        .required("Please enter product quantity")
        .nullable(),
      category: yup
        .string()
        .required("Please choose products category")
        .nullable(),
      description: yup
        .string()
        .required("Please enter product quantity")
        .nullable(),
      img: yup
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
      avaQuantity: "",
      category: "",
      description: "",
      img: null,
    };
  }
}
