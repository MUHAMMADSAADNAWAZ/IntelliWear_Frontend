import * as yup from "yup";

export class ProductDto {
  name?: string;
  price?: number;
  quantity?: number;
  category?: string;
  description?: string;
  image?: File;

  static yupSchema() {
    return yup.object({
      name: yup.string().required("Please enter product name ").nullable(),
      price: yup.string().required("Please enter product price").nullable(),
      quantity: yup.string().required("Please enter product quantity").nullable(),
      category: yup
        .string()
        .required("Please choose products category")
        .nullable(),
      description: yup.string().required("Please enter product quantity").nullable(),
      image: yup
        .mixed()
        .required("Please upload a product image")
        .test("fileType", "Only image files are allowed", (value) => {
          if (!value || !(value instanceof File)) {
            return false; 
          }
          return ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
        }),
    });
  }

  static initialValues() {
    return {
      name: "",
      price: "",
      category: "",
      description: "",
      image: null,
    };
  }
}
