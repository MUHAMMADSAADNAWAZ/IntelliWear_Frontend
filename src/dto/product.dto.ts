import * as yup from "yup";

export class ProductDto {
  name?: string;
  price?: number;
  product_type?: string;
  gender?: string;
  description?: string;
  image?: File;
  sizes: { size: string; quantity: number }[] = [];


  static yupSchema() {
    return yup.object({
      name: yup.string().required("Please enter product name ").nullable(),
      price: yup.string().required("Please enter product price").nullable(),
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
        sizes: yup.array().of(
          yup.object().shape({
            size: yup.string().required("Size is required"),
            quantity: yup.number().min(1, "Quantity must be at least 1").required("Quantity is required"),
          })
        ),
    });
  }

  static initialValues() {
    return {
      name: "",
      price: "",
      product_type: "",
      gender: "",
      description: "",
      image: null,
      sizes: [], 
    };
  }
}

// Home Product prop type
export interface HomeProductProps{
  id: string;
  image: string;
  description: string;
  name: string;
  price: string;
  product_type: string;
}