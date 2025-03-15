import { useEffect, useState } from "react";

import { useFormik } from "formik";
import { toast } from "react-toastify";

import Carousal from "@components/Carousal/Carousal"
import { Button, Input } from "@components/common";
import { BaseDataTable } from "@components/BaseDataTable";
import { CarousalDto, CarousalProps } from "@dto/carousal.dto";
import FileUpload from "@public/FileUpload.svg";
import { ActionsMenu } from "@components/ActionMenu";
import AdminCarouselApi from "@api/admincarousal.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { updateLoader } from "@redux/slices/loaderSlice";

const CarousalManager = () => {

    const [deleteId , setDeleteID] = useState<string>("")
    const [editID , setEditID] = useState<string>("")
    const [uploadedImages, setUploadedImages] = useState<any>();

    const dispatch = useDispatch()
    const queryclient = useQueryClient()
    const admincarouselapi = new AdminCarouselApi()

    const createCarousal = async (payload: FormData) =>{
      dispatch(updateLoader(true))
      return await admincarouselapi.createCarousal(payload)
    }

    const {mutateAsync} = useMutation({
      mutationFn: createCarousal,
      onSuccess: () =>{
        toast.success("New Carousal is added Successfully")
        form?.resetForm({})
        dispatch(updateLoader(false))
        setUploadedImages(null); 
        queryclient.invalidateQueries({queryKey: ["allcarousel"]})
      },
      onError: () =>{
        toast.error("Unable to add new Carousel")
        dispatch(updateLoader(false))
      }
    })

    const form = useFormik({
        initialValues: CarousalDto.initialValues(),
        validationSchema: CarousalDto.yupSchema(),
        onSubmit: async (values) =>{
          const formData = new FormData();
          if (values.title) formData.append("title", values.title);

          const isFile = (file: any): file is File => {
            return file instanceof File;
          };
          
          if (isFile(values.image)) {
            formData.append("image", values.image);
          } else if (typeof values.image === "string" && (values.image as string).trim() !== "") {
            formData.append("image_url", values.image); 
          }

          editID ? await mutateUpdateCarousel(formData) : await mutateAsync(formData)
          setEditID("")
        }
    })

    const getAllCarousels = async () =>{
      dispatch(updateLoader(true));
      const data = await admincarouselapi.getAllCarousalImages();
      dispatch(updateLoader(false));
      return data;
    }

    const {data} = useQuery({
      queryKey: ["allcarousel"],
      queryFn: getAllCarousels
    })

    const getSpecificCarouselDetails = async () =>{
      dispatch(updateLoader(true));
      const data = await admincarouselapi.getSpecificCarousalImage(editID);
      dispatch(updateLoader(false));
      return data;
    }

    const {data: specificCarouselData} = useQuery({
      queryKey: ["specificcarousel" , editID],
      queryFn: getSpecificCarouselDetails,
      enabled: !!editID
    })

    const updateCarouselDetails = async (payload: FormData) =>{
      dispatch(updateLoader(true));
      return await admincarouselapi.updatePartialSpecificCarousalImage(editID , payload)
    }

    const {mutateAsync: mutateUpdateCarousel} = useMutation({
      mutationFn: updateCarouselDetails,
      onSuccess: () =>{
        toast.success("Carousal is updated Successfully")
        form?.resetForm({})
        dispatch(updateLoader(false))
        setUploadedImages(null); 
        queryclient.invalidateQueries({queryKey: ["allcarousel"]})
      },
      onError: () =>{
        toast.error("Unable to update Carousel")
        dispatch(updateLoader(false))
      }
    })

    const deleteCarousel = async () =>{
      dispatch(updateLoader(true))
      return await admincarouselapi.deleteSpecificCarousalImage(deleteId)
    }

    const {mutateAsync: mutateDeleteCarousel} = useMutation({
      mutationFn: deleteCarousel,
      onSuccess: () =>{
        toast.success("Carousal is deleted Successfully")
        dispatch(updateLoader(false)) 
        queryclient.invalidateQueries({queryKey: ["allcarousel"]})
      },
      onError: () =>{
        toast.error("Unable to delete Carousel")
        dispatch(updateLoader(false))
      }
    })

    const handleImageClick = () => {
        document.getElementById("fileInput")?.click();
      };
    
    const handleDeleteImage = () => {
        form.setFieldValue("image", null); 
        setUploadedImages(null); 
    };

    useEffect(()=>{
      if(specificCarouselData?.data){
        form.setValues(specificCarouselData?.data)
      }
      if (specificCarouselData?.data?.image_url) {
        setUploadedImages(specificCarouselData?.data?.image_url);
        form?.setFieldValue("image" , specificCarouselData?.data?.image_url)
      }
    },[specificCarouselData])

    useEffect(()=>{
      const deleteCarouselAsync = async () => {
        if(deleteId)
        await mutateDeleteCarousel();
      };
      deleteCarouselAsync()
      setDeleteID("")
    },[deleteId])

  return (
    <div className="p-6 bg-gray-100 rounded-t-xl flex flex-col gap-6">
    <h2 className="text-3xl font-bold mb-6 text-blue-600">Carousal Manager</h2>

    <Carousal data={data?.data}/>

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
            {editID ? "Update Carousel Info" : "Add Carousal Image"}
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
          name: "Carousel Title",
          style: "display:flex;border-right: 1px solid #e0e0e0 !important",
          selector: (row: CarousalProps) => (row.title),
          sortable: true,
        },
        {
          name: "Carousel Image",
          style: "display:flex;;border-right: 1px solid #e0e0e0 !important",
          selector: (row: CarousalProps) => ( <img src={row.image_url} alt={row.title} className="h-16 w-16 object-cover rounded py-2" />),
          sortable: false,
        },
        {
          name: "Actions",
          style: "display:flex; !important",
          selector: (row: CarousalProps) => (
            <ActionsMenu
              id = {row?.id}
              setDeleteID={setDeleteID}
              name = "carousel"
              setEditID={setEditID}
            />
          ),
          sortable: false,
        }, 

      ]}
      data={data?.data}
      />


    </div>    
  )
}

export default CarousalManager