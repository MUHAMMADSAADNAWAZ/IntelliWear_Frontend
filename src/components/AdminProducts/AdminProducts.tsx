import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AdminProductsApi from "@api/adminproducts.api";
import { ActionsMenu } from "@components/ActionMenu";
import { BaseDataTable } from "@components/BaseDataTable";
import { updateLoader } from "@redux/slices/loaderSlice";

import './AdminProducts.css';
interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  stock: number;
  product_type: string;
  description: string;
  gender: string;
}

const AdminProducts = ({name} : {name?: string}) => {

  const [page , setPage] = useState<number>(1);
  const [rowsPerPage , setRowsPerPage] = useState<number>(10)
  const [deleteId , setDeleteID] = useState<string>("")

  const dispatch = useDispatch()
  const queryclient = useQueryClient()
  const adminproductsapi = new AdminProductsApi()

  const getAdminProducts = async () =>{
    dispatch(updateLoader(true))
    const res =  await adminproductsapi.getAllProducts(name === "All Products" ? "" : name , rowsPerPage , (page-1)*rowsPerPage);
    dispatch(updateLoader(false))
    return res;
  }

  const {data} = useQuery({
    queryKey: ["allproducts" , name , rowsPerPage , page],
    queryFn:getAdminProducts,
  })

  const deleteProduct = async () =>{
    dispatch(updateLoader(true))
    return await adminproductsapi.deleteProduct(deleteId)
  }

  const {mutateAsync} = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () =>{
      toast.success("Product Deleted Successfully!")
      queryclient.invalidateQueries({ queryKey: ["allproducts"] })
      dispatch(updateLoader(false))
    },
    onError: () =>{
      toast.error("Unable to delete the product")
      dispatch(updateLoader(false))
    }
  })

  const genderForm = (gender: string) =>{
    switch (gender) {
      case 'A':
        return "All"
      case 'M':
        return "Men"
      case 'W':
        return "Women"
      case 'C':
        return "Children"
    
      default:
        return "None"
    }
  }

  useEffect(() => {
    const deleteProductAsync = async () => {
      if(deleteId)
      await mutateAsync();
    };
    deleteProductAsync();
    setDeleteID("");
  }, [deleteId]);

  return (
    <div className="p-6 bg-gray-100 rounded-t-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">{name}</h2>

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
          name: "Image",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => ( <img src={row?.image} alt={row?.name} className="h-16 w-16 object-cover rounded py-2" />),
          sortable: false,
        },
        {
          name: "Name",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (row?.name),
          sortable: true,
        },
        {
          name: "Category",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (row?.product_type),
          sortable: true,
        },
        {
          name: "Gender",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (genderForm(row?.gender) ),
          sortable: true,
        },
        {
          name: "Quantity",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (row?.stock),
          sortable: true,
        },
        {
          name: "Price (PKR)",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (row?.price),
          sortable: true,
        },
        {
          name: "Actions",
          style: "display:flex;justify-content:center !important",
          selector: (row: Product) => (
            <ActionsMenu
              id = {row?.id}
              setDeleteID={setDeleteID}
            />
          ),
          sortable: false,
        }, 

      ]}
      data={data?.data?.results}
      pagination={true}
      paginationServer={true} 
      paginationTotalRows={data?.data?.count}
      onRowsPerPageChange={setRowsPerPage}
      onPageChange={setPage}
      />
    </div>
  );
};

export default AdminProducts;
