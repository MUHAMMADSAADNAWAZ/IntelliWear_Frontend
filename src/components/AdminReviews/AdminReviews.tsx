import { useEffect, useState } from "react";

import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AdminReviewApi from "@api/adminreviews.api";
import { BaseDataTable } from "@components/BaseDataTable";
import { ReviewActionMenu } from "@components/ReviewActionMenu";
import { ReviewProps } from "@dto/makereview.dto";
import { updateLoader } from "@redux/slices/loaderSlice";
import { formatDate } from "@utils/convertDate";

const AdminReviews = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [deleteId, setDeleteID] = useState<string>("");

  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const adminreviewapi = new AdminReviewApi();

  const getReviews = async () => {
    dispatch(updateLoader(true));
    const res = await adminreviewapi.getAllReviews(
      rowsPerPage,
      (page - 1) * rowsPerPage
    );
    dispatch(updateLoader(false));
    return res;
  };

  const { data } = useQuery({
    queryKey: ["allreviews", rowsPerPage, page],
    queryFn: getReviews,
  });

  const deleteProduct = async () => {
    dispatch(updateLoader(true));
    return await adminreviewapi.deleteSpecificReview(deleteId);
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Review Deleted Successfully!");
      queryclient.invalidateQueries({ queryKey: ["allreviews"] });
      dispatch(updateLoader(false));
    },
    onError: () => {
      toast.error("Unable to delete the product");
      dispatch(updateLoader(false));
    },
  });

  useEffect(() => {
    const deleteProductAsync = async () => {
      if (deleteId) await mutateAsync();
    };
    deleteProductAsync();
    setDeleteID("");
  }, [deleteId]);

  return (
    <div className="p-6 bg-gray-100 ">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Product Reviews</h2>

      <BaseDataTable
        customStyles={{
          headRow: {
            style: {
              background: "linear-gradient(to bottom right, #f8fafc, #f8fafc)",
              color: "#1b2559",
            },
          },
          table: {
            style: {
              width: "100%",
              tableLayout: "auto",
              overflow: "hidden",
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
            name: "Product",
            style: "border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReviewProps) => (
              <Tooltip title={row?.product_name} placement="top" arrow>
                <div className=" py-4 flex items-center justify-center gap-3">
                  <span>{row?.product_name}</span>
                </div>
              </Tooltip>
            ),
            sortable: true,
          },
          {
            name: "Customer",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReviewProps) => row?.user_name,
            sortable: true,
          },
          {
            name: "Ratings",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReviewProps) => `⭐️ ${row?.rating}/5`,
            sortable: true,
          },
          {
            name: "Review",
            style: "border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReviewProps) => (
              <Tooltip title={row?.comment} arrow placement="top">
                <span>{row?.comment}</span>
              </Tooltip>
            ),

            sortable: true,
          },
          {
            name: "Date",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReviewProps) => formatDate(row?.created_at),
            sortable: true,
          },
          {
            name: "Actions",
            style: "display:flex;justify-content:center !important",
            selector: (row: ReviewProps) => (
              <ReviewActionMenu id={row?.id} setDeleteID={setDeleteID} />
            ),
            sortable: false,
          },
        ]}
        data={data?.data?.results}
        pagination
        paginationServer={true}
        paginationTotalRows={data?.data?.count}
        onRowsPerPageChange={setRowsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default AdminReviews;
