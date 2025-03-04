import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

import { Button, Input, Select, TextArea } from "@components/common";
import { ProductDto } from "@dto/product.dto";
import FileUpload from "@public/FileUpload.svg";
import { ROUTE_ADMIN_PRODUCTS } from "@routes/constants";
import AdminProductsApi from "@api/adminproducts.api";
import { updateLoader } from "@redux/slices/loaderSlice";

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
}

interface products {
  product?: Product
}

const AddProducts = ({product}: products) => {

  const [uploadedImages, setUploadedImages] = useState<any>();
  
  const navigate = useNavigate();
  const dispatch = useDispatch()
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

    const addProduct = async (payload: FormData) =>{
      dispatch(updateLoader(true));
      return await adminproductapi.createProduct(payload)
    }

    const {mutateAsync} = useMutation({
      mutationFn: addProduct,
      onSuccess: () =>{
        toast.success("Product added successfully!");
        navigate(ROUTE_ADMIN_PRODUCTS)
        dispatch(updateLoader(false))
      },
      onError: () =>{
        toast.error("Unable to add new product")
        dispatch(updateLoader(false))
      }
    })
      
  const updateProduct = async (payload: FormData) =>{
    dispatch(updateLoader(true));
    return await adminproductapi.updatePartialProduct(payload , product?.id || "")
  }  

  const {mutateAsync: mutateUpdateProduct} = useMutation({
    mutationFn: updateProduct,
    onSuccess: () =>{
      toast.success("Product updated successfully!");
      navigate(ROUTE_ADMIN_PRODUCTS)
      dispatch(updateLoader(false))
    },
    onError: () =>{
      toast.error("Unable to update product")
      dispatch(updateLoader(false))
    }
  })

  const form = useFormik({
    initialValues: product ? product : ProductDto.initialValues(),
    validationSchema: ProductDto.yupSchema(),
    onSubmit: async (values) => {
      const formData = new FormData();
      if (values.name) formData.append("name", values.name);
      if (values.price) formData.append("price", values.price.toString());
      if (values.stock) formData.append("stock", values.stock.toString());
      if (values.product_type) formData.append("product_type", values.product_type);
      if (values.gender) formData.append("gender", values.gender);
      if (values.description) formData.append("description", values.description);
    
      const isFile = (file: any): file is File => {
        return file instanceof File;
      };
      
      // Usage:
      if (isFile(values.image)) {
        formData.append("image", values.image);
      } else if (typeof values.image === "string" && values.image.trim() !== "") {
        formData.append("image_url", values.image); 
      }
      
    product?.id ? await mutateUpdateProduct(formData) : await mutateAsync(formData);
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
    if(product){
      form.setValues(product)
    }
    if (product?.image) {
      setUploadedImages(product?.image);
      form?.setFieldValue("image" , product?.image)
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
            name="stock"
            formik={form}
            type="number"
            className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0"
          />
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
          
        </div>
        <div className="flex gap-4">
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
               {form.touched.image && form.errors.image &&
                    <p className="text-red-500 text-sm text-center pt-4">{form.errors.image}</p>}
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
                        form.setFieldValue("image", e?.target?.files[0])
                      }
                    }}
                  />
                </div>
                {form.touched.image && form.errors.image ? (
                    <p className="text-red-500 text-sm text-center pt-4">{form.errors.image}</p>
                ) :
                <p className="text-gray-700 text-center pt-4">
                  Upload Product Picture
                </p>}
              </div>
            </div>
          )}
         
        </div>
        <div className="flex gap-4 justify-end">
         {!product && <Button
            type="button"
            onClick={() => form.resetForm()}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300 focus:ring-2 focus:ring-red-300"
          >
            Reset
          </Button>}
          <Button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-blue-300"
          >
            {product ? "Update Product"  : "Add Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
