import { useState } from "react";

import { useFormik } from "formik";
import { toast } from "react-toastify";

import Carousal from "@components/Carousal/Carousal"
import { Button, Input } from "@components/common";
import { BaseDataTable } from "@components/BaseDataTable";
import { CarousalDto, CarousalProps } from "@dto/carousal.dto";
import FileUpload from "@public/FileUpload.svg";

const CarousalManager = () => {

    const [uploadedImages, setUploadedImages] = useState<any>();

    const form = useFormik({
        initialValues: CarousalDto.initialValues(),
        validationSchema: CarousalDto.yupSchema(),
        onSubmit: (values) =>{
            console.log("New carousal sto values are" , values)
            toast.success("New Carousal Image is added Successfully")
        }
    })

    const handleImageClick = () => {
        document.getElementById("fileInput")?.click();
      };
    
    const handleDeleteImage = () => {
        form.setFieldValue("image", null); 
        setUploadedImages(null); 
    };

  return (
    <div className="p-6 bg-gray-100 rounded-t-xl flex flex-col gap-6">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Carousal Manager</h2>

    <Carousal />

    <form className="bg-white rounded-xl p-6 mt-10" onSubmit={form.handleSubmit}>
        <div className="flex gap-4 pb-5">
          <Input
            labelText="Carousal Title"
            labelClass=" text-blue-500  "
            placeholder="Enter Carousal Title"
            name="title"
            formik={form}
            className="border-none outline-none bg-gray-50 text-gray-800 placeholder-gray-500 h-10 px-0"
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
                  Upload Carousal Picture
                </p>}
              </div>
            </div>
          )}
         
        </div>
        <div className="flex gap-4 justify-end">
          <Button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:ring-2 focus:ring-blue-300"
          >
            Add Carousal Image
          </Button>
        </div>
      </form>

      <BaseDataTable 
      customStyles={{
        headRow: {
          style: {
            background: "linear-gradient(to bottom right, #f8fafc, #f8fafc)",
            color: "#1b2559",
          },
        },
        pagination: {
          style: {
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          },
        },
        row: {
          style: {
            border: "1px solid",
          },
        },
      }}
      columns={[
        {
          name: "Product ID",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: CarousalProps) => (row.title),
          sortable: true,
        },
        {
          name: "Image",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: CarousalProps) => ( <img src={row.image} alt={row.title} className="h-16 w-16 object-cover rounded py-2" />),
          sortable: false,
        },
        {
          name: "Actions",
          style: "display:flex;justify-content:center !important",
          selector: () => (
            // <ActionsMenu
            //   id = {row?.id}
            //   onDelete={() => {
            //     console.log("Delete clicked for product:", row.name);
            //   }}
            // />
            <p>hi</p>
          ),
          sortable: false,
        }, 

      ]}
      data={[]}
      />


    </div>    
  )
}

export default CarousalManager