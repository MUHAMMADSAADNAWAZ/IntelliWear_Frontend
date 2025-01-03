import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { Button, Input, Select, TextArea } from "@components/common";
import { ProductDto } from "@dto/product.dto";
import FileUpload from "@public/FileUpload.svg";
import { ROUTE_ADMIN_PRODUCTS } from "@routes/constants";

interface Product {
  id?: number;
  img?: string;
  name?: string;
  size?: string;
  avaQuantity?: number;
  price?: number;
  description?: string;
}

interface products {
  product?: Product
}

const AddProducts = ({product}: products) => {

    const [uploadedImages, setUploadedImages] = useState<any>();

    const productCategories = ["men", "women", "children", "all"];
    const navigate = useNavigate();

  const form = useFormik({
    initialValues: product ? product : ProductDto.initialValues(),
    validationSchema: ProductDto.yupSchema(),
    onSubmit: (values) => {
      console.log("Product Values are", values);
      toast.success(product ? "Changes made successfully" : "Product added successfully!");
      navigate(ROUTE_ADMIN_PRODUCTS)
    },
  });

  const handleImageClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleDeleteImage = () => {
    form.setFieldValue("image", null); 
    setUploadedImages(null); 
  };

  useEffect(() => {
    if (product?.img) {
      setUploadedImages(product.img);
    }
  }, [product]);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6  text-blue-600">{product ? "Edit Product Details" : "Add Product"}</h2>

      <form className="bg-white rounded-xl p-6" onSubmit={form.handleSubmit}>
        <div className="flex gap-4 pb-5">
          <Input
            labelText="Product Name"
            labelClass=" text-blue-500  "
            placeholder="Enter Name"
            name="name"
            formik={form}
            className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0"
          />
          <Input
            labelText="Product price (PKR)"
            placeholder="Enter Price"
            labelClass=" text-blue-500  "
            name="price"
            formik={form}
            type="number"
            className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0"
          />
        </div>
        <div className="flex gap-4">
        <Input
            labelText="Product Quantity"
            placeholder="Enter Product Quantity"
            labelClass=" text-blue-500"
            name="avaQuantity"
            formik={form}
            type="number"
            className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0"
          />
          <Select
            name="category"
            formik={form}
            placeholder="Select Product Category"
            labelText="Product Category"
            labelClass=" text-blue-500  "
            className={
              "border outline-none rounded-xl focus:border-[#1B2559]  text-[#8b8b8b] "
            }
            options={productCategories?.map((item: string) => {
              return {
                label: item,
                value: item,
              };
            })}
          />
          
        </div>
        <div className="w-full">
          <TextArea
            labelText="Product Description"
            placeholder="Enter Description"
            labelClass=" text-blue-500  "
            className="h-[100px] rounded-md p-2 outline-none"
            name="description"
            formik={form}
          />
        </div>
        <div
          className={`border border-gray-300 p-6 w-full h-[131px] flex items-center mb-6 justify-center rounded-lg shadow-lg hover:shadow-xl transition-shadow `}
        >
          {uploadedImages && (
            <div className="w-full flex items-center justify-between ">
              <img
                src={typeof uploadedImages === "string" ? uploadedImages : URL.createObjectURL(uploadedImages as Blob)}
                alt="Selected"
                className=" max-w-52 max-h-20 "
              />
               {form.touched.img && form.errors.img &&
                    <p className="text-red-500 text-sm text-center pt-4">{form.errors.img}</p>}
              <button
              type="button"
              onClick={handleDeleteImage}
              className="px-6 py-3 font-medium text-white bg-red-500 hover:bg-red-600 rounded-xl cursor-pointer font-PlusJakartaSans text-[14px]  "
            >
              Delete
            </button>
            </div>
            
          )}

          {!uploadedImages && (
            <div className="flex items-center justify-between mb-2 ">
              <div className="flex flex-col items-center my-6">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex flex-col items-center justify-center shadow-md">
                  <img
                    src={FileUpload}
                    alt="upload photo"
                    onClick={handleImageClick}
                    className="cursor-pointer"
                  />
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e?.target?.files && e?.target?.files.length > 0) {
                        setUploadedImages(e?.target?.files[0]);
                        form.setFieldValue("img", e?.target?.files[0])
                      }
                    }}
                  />
                </div>
                {form.touched.img && form.errors.img ? (
                    <p className="text-red-500 text-sm text-center pt-4">{form.errors.img}</p>
                ) :
                <p className="text-gray-700 text-center pt-4">
                  Upload Product Picture
                </p>}
              </div>
            </div>
          )}
         
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            onClick={() => form.resetForm()}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:ring-2 focus:ring-red-300"
          >
            Reset
          </Button>
          <Button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-blue-300"
          >
            {product ? "Apply Changes"  : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
