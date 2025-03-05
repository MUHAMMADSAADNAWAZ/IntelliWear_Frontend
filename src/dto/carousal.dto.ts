import * as yup from "yup";

export class CarousalDto {
  title?: string;
  image?: File;

  static yupSchema() {
    return yup.object({
      title: yup.string().required("Please enter carousal image title ").nullable(),
      image: yup
        .mixed()
        .required("Please upload a Carousal image")
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
      title: "",
      image: null,
    };
  }
}

export interface CarousalProps{
  id: string;
  title: string;
  image: string;
}