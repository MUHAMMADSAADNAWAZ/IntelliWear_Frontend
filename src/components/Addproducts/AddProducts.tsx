import { useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AdminProductsApi from "@api/adminproducts.api";
import { Button, Input, Select, TextArea } from "@components/common";
import { accessoriesUnits, clothesSizes, shoeSizes } from "@Data/data";
import { ProductDto } from "@dto/product.dto";
import FileUpload from "@public/FileUpload.svg";
import { updateLoader } from "@redux/slices/loaderSlice";
import { ROUTE_ADMIN_PRODUCTS } from "@routes/constants";

interface Product {
  id?: string;
  image?: string;
  name?: string;
  size?: string;
  stock?: number;
  price?: number;
  description?: string;
  product_type?: string;
  gender?: string;
  sizes?: { size: string; quantity: number }[];
}

interface products {
  product?: Product;
}

const AddProducts = ({ product }: products) => {
  const [tempSize, setTempSize] = useState("");
  const [tempQuantity, setTempQuantity] = useState("");
  const [tempAccessoryUnit , setTempAccessoryUnit] = useState("")
  const [tempAccessorySize , setTempAccessorySize] = useState("")
  const [uploadedImages, setUploadedImages] = useState<any>();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminproductapi = new AdminProductsApi();

  const PRODUCT_TYPES = [
    { label: "Clothes", value: "CLOTHES" },
    { label: "Shoes", value: "SHOES" },
    { label: "Accessories", value: "ACCESSORIES" },
  ];

  const GENDER_CHOICES = [
    { label: "All", value: "A" },
    { label: "Men", value: "M" },
    { label: "Women", value: "W" },
    { label: "Children", value: "C" },
  ];

  const addProduct = async (payload: FormData) => {
    dispatch(updateLoader(true));
    return await adminproductapi.createProduct(payload);
  };

  const { mutateAsync } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast.success("Product added successfully!");
      navigate(ROUTE_ADMIN_PRODUCTS);
      dispatch(updateLoader(false));
    },
    onError: () => {
      toast.error("Unable to add new product");
      dispatch(updateLoader(false));
    },
  });

  const updateProduct = async (payload: FormData) => {
    dispatch(updateLoader(true));
    return await adminproductapi.updatePartialProduct(
      payload,
      product?.id || ""
    );
  };

  const { mutateAsync: mutateUpdateProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success("Product updated successfully!");
      navigate(ROUTE_ADMIN_PRODUCTS);
      dispatch(updateLoader(false));
    },
    onError: () => {
      toast.error("Unable to update product");
      dispatch(updateLoader(false));
    },
  });

  const form = useFormik({
    initialValues: product ? product : ProductDto.initialValues(),
    validationSchema: ProductDto.yupSchema(),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.name) formData.append("name", values.name);
      if (values.price) formData.append("price", values.price.toString());
      if (values.product_type)
        formData.append("product_type", values.product_type);
      if (values.gender) formData.append("gender", values.gender);
      if (values.description)
        formData.append("description", values.description);

      const isFile = (file: any): file is File => {
        return file instanceof File;
      };

      if (isFile(values.image)) {
        formData.append("image", values.image);
      } else if (
        typeof values.image === "string" &&
        values.image.trim() !== ""
      ) {
        formData.append("image_url", values.image);
      }

if (values.sizes) formData.append("sizes", JSON.stringify(values.sizes));

      console.log("Submitting Product:", values);

      product?.id
        ? await mutateUpdateProduct(formData)
        : await mutateAsync(formData);
    },
  });

  const handleImageClick = () => {
    document.getElementById("fileInput")?.click();
  };

  const handleDeleteImage = () => {
    form.setFieldValue("image", null);
    setUploadedImages(null);
  };

  const addSize = () => {
    if (form.values.product_type === "ACCESSORIES") {
      if (!tempAccessoryUnit || !tempAccessorySize || !tempQuantity) {
        toast.error("Please select an accessory unit, enter a size, and specify the quantity.");
        return;
      }
    } else {
      if (!tempSize || !tempQuantity) {
        toast.error("Please select a size and enter the quantity.");
        return;
      }
    }
  
    let newSize;
  
    if (form.values.product_type === "ACCESSORIES" && tempAccessoryUnit !== "Standard Sizes") {
      newSize = {
        size: `${tempAccessorySize}${tempAccessoryUnit}`, 
        quantity: Number(tempQuantity),
      };
    } else if(form.values.product_type === "ACCESSORIES" && tempAccessoryUnit === "Standard Sizes") {
      newSize = {
        size: `${tempAccessorySize}`, 
        quantity: Number(tempQuantity),
      };
    }
    else {
      newSize = { size: tempSize, quantity: Number(tempQuantity) };
    }
  
    const existingSize = form.values.sizes?.find((s) => s.size === newSize.size);
  
    if (existingSize) {
      toast.error("This size already exists!");
      return;
    }
  
    form.setFieldValue("sizes", [...(form.values.sizes || []), newSize]);
  
    setTempSize("");
    setTempQuantity("");
    setTempAccessorySize("");
    setTempAccessoryUnit("");
  };
  
  useEffect(() => {
    if (product) {
      form.setValues(product);
    }
    if (product?.image) {
      setUploadedImages(product?.image);
      form?.setFieldValue("image", product?.image);
    }
  }, [product]);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6  text-blue-600">
        {product ? "Edit Product Details" : "Add Product"}
      </h2>

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
        <Select
            name="gender"
            formik={form}
            placeholder="Select Gender"
            labelText="Gender"
            labelClass=" text-blue-500  "
            className={
              "border outline-none rounded-xl focus:border-[#1B2559]  text-[#8b8b8b] "
            }
            options={GENDER_CHOICES?.map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })}
          />
          <Select
            name="product_type"
            formik={form}
            placeholder="Select Product Category"
            labelText="Product Category"
            labelClass=" text-blue-500  "
            className={
              "border outline-none rounded-xl focus:border-[#1B2559]  text-[#8b8b8b] "
            }
            options={PRODUCT_TYPES?.map((item) => {
              return {
                label: item.label,
                value: item.value,
              };
            })}
          />
        </div>

        {form?.values?.product_type !== "" && (
          <div className="flex flex-col gap-4 rounded-lg mb-2.5 p-5 bg-blue-50 border border-blue-300 shadow-md">
            <Alert severity="info" className=" !font-medium !font-poppins">
              You can add multiple product sizes with their respective
              quantities. Enter product size and quantity one by one.
            </Alert>
            <div className="flex gap-4">
              <Input
                labelText="Product Quantity"
                placeholder="Enter Product Quantity"
                labelClass=" text-blue-500"
                name="stock"
                type="number"
                value={tempQuantity}
                onChange={(e) => setTempQuantity(e.target.value)}
                className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0 "
              />

              {form?.values?.product_type === "CLOTHES" && (
                <Select
                  name="size"
                  placeholder="Select Clothe Size"
                  labelText="Clothes Size"
                  labelClass=" text-blue-500  "
                  className={
                    "border outline-none rounded-xl focus:border-[#1B2559]  text-[#8b8b8b] bg-white pt-2 pb-2.5"
                  }
                  value={tempSize}
                  onChange={(e) => setTempSize(e.target.value)}
                  options={clothesSizes?.map((item) => {
                    return {
                      label: item,
                      value: item,
                    };
                  })}
                />
              )}
              {form?.values?.product_type === "SHOES" && (
                <Select
                  name="size"
                  placeholder="Select Shoe Size"
                  labelText="Shoe Size"
                  labelClass=" text-blue-500  "
                  className={
                    "border outline-none rounded-xl focus:border-[#1B2559]  text-[#8b8b8b]  bg-white pt-2 pb-2.5"
                  }
                  value={tempSize}
                  onChange={(e) => setTempSize(e.target.value)}
                  options={shoeSizes?.map((item) => {
                    return {
                      label: item,
                      value: item,
                    };
                  })}
                />
              )}
              {form?.values?.product_type === "ACCESSORIES" && (
                <Select
                  name="size"   
                  placeholder="Select Accessory Unit"
                  labelText="Accessory Unit"
                  labelClass=" text-blue-500  "
                  className={
                    "border outline-none rounded-xl focus:border-[#1B2559]  text-[#8b8b8b]  bg-white pt-2 pb-2.5"
                  }
                  value={tempAccessoryUnit}
                  onChange={(e) => setTempAccessoryUnit(e.target.value)}
                 
                  options={accessoriesUnits?.map((item) => {
                    return {
                      label: item,
                      value: item,
                    };
                  })}
                />
              )}

              {form?.values?.product_type === "ACCESSORIES" && tempAccessoryUnit !== "Standard Sizes" && (
                <Input
                  labelText="Accessory Size"
                  placeholder="Enter Accessory Size"
                  labelClass=" text-blue-500"
                  name="stock"
                  type="number"
                  value={tempAccessorySize}
                  onChange={(e) => setTempAccessorySize(e.target.value)}
                  className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0"
                />
              )}

              {form?.values?.product_type === "ACCESSORIES" && tempAccessoryUnit === "Standard Sizes" && (
                <Select
                name="size"
                placeholder="Select Accessory Size"
                labelText="Accessory Size"
                labelClass=" text-blue-500  "
                className={
                  "border outline-none rounded-xl focus:border-[#1B2559]  text-[#8b8b8b] bg-white pt-2 pb-2.5"
                }
                value={tempAccessorySize}
                onChange={(e) => setTempAccessorySize(e.target.value)}
                options={clothesSizes?.map((item) => {
                  return {
                    label: item,
                    value: item,
                  };
                })}
              />
              )}
            </div>
            <Button
              type="button"
              onClick={addSize}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Add Size
            </Button>

            <div className="flex flex-wrap gap-2">
              {form?.values?.sizes?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center bg-blue-100 px-3 py-1 rounded-lg"
                >
                  <span className="text-blue-800">
                    {item.size} - {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      form.setFieldValue(
                        "sizes",
                        form?.values?.sizes?.filter((_, i) => i !== index)
                      )
                    }
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

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
                src={
                  typeof uploadedImages === "string"
                    ? uploadedImages
                    : URL.createObjectURL(uploadedImages as Blob)
                }
                alt="Selected"
                className=" max-w-52 max-h-20 "
              />
              {form.touched.image && form.errors.image && (
                <p className="text-red-500 text-sm text-center pt-4">
                  {form.errors.image}
                </p>
              )}
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
                        form.setFieldValue("image", e?.target?.files[0]);
                      }
                    }}
                  />
                </div>
                {form.touched.image && form.errors.image ? (
                  <p className="text-red-500 text-sm text-center pt-4">
                    {form.errors.image}
                  </p>
                ) : (
                  <p className="text-gray-700 text-center pt-4">
                    Upload Product Picture
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-4 justify-end">
          {!product && (
            <Button
              type="button"
              onClick={() => form.resetForm()}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:ring-2 focus:ring-red-300"
            >
              Reset
            </Button>
          )}
          <Button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-blue-300"
          >
            {product ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
