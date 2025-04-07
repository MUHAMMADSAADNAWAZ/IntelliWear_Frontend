import { useEffect, useState } from "react";

import { Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AdminReturnOrderRequestsApi from "@api/adminreturnrequest.api";
import { BaseDataTable } from "@components/BaseDataTable";
import { ReturnRequestActionsMenu } from "@components/ReturnRequestActionMenu";
import { updateLoader } from "@redux/slices/loaderSlice";
import { formatDate } from "@utils/convertDate";

interface ReturnOrderRequest {
  id: number;
  order_item: number;
  product_name: string;
  size: string;
  ordered_quantity: number;
  quantity: number;
  price: string;
  reason: string;
  image: string;
  status: "Pending" | "Approved" | "Rejected";
  created_at: string;
}

const ReturnOrderRequests = () => {
  const [id, setId] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const adminreturnrequestsapi = new AdminReturnOrderRequestsApi();

  const getAllRequests = async () => {
    dispatch(updateLoader(true));
    const res = await adminreturnrequestsapi.getAllRequests();
    dispatch(updateLoader(false));
    return res;
  };

  const { data } = useQuery({
    queryKey: ["allreturnrequests"],
    queryFn: getAllRequests,
  });

  const updateRequestStatus = async ({
    id,
    status,
  }: {
    id: number;
    status: string;
  }) => {
    dispatch(updateLoader(true));
    return await adminreturnrequestsapi.updateRequestStatus(id, status);
  };

  const { mutateAsync } = useMutation({
    mutationFn: (variables: { id: number; status: string }) =>
      updateRequestStatus(variables),
    onSuccess: () => {
      toast.success("Status updated Successfully !");
      dispatch(updateLoader(false));
      queryclient.invalidateQueries({ queryKey: ["allreturnrequests"] });
    },
    onError: () => {
      toast.error("Unable to update status !");
      dispatch(updateLoader(false));
    },
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-600 bg-yellow-100 px-2 py-1";
      case "approved":
        return "text-green-600 bg-green-100 px-2 py-1";
      case "rejected":
        return "text-red-600 bg-red-100 px-2 py-1";
      default:
        return "text-gray-600 bg-gray-100 px-2 py-1 rounded";
    }
  };

  useEffect(() => {
    const updateStatus = async () => {
      if (status !== "") {
        try {
          await mutateAsync({ id, status });
          setId(0);
          setStatus("");
        } catch (error) {
          console.error("Error updating status:", error);
        }
      }
    };

    updateStatus();
  }, [status]);

  return (
    <div className="p-6 bg-gray-100 ">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">
        Return Order Requests
      </h2>

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
          //   {
          //     name: "Order Item Number",
          //     style:
          //       "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          //     selector: (row: ReturnOrderRequest) => row?.order_item,
          //     sortable: true,
          //   },
          {
            name: "Product Name",
            style: "display:flex;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) => (
              <Tooltip title={row?.product_name} arrow placement="top">
                <span>{row?.product_name}</span>
              </Tooltip>
            ),
            sortable: true,
          },
          {
            name: "Product Price",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) => `${row?.price}`,
            sortable: true,
          },

          {
            name: "Product Image",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) => (
              <img
                src={row?.image}
                alt={"image not found"}
                className="h-16 w-16 object-cover rounded py-2"
              />
            ),
            sortable: true,
          },
          {
            name: "Reason",
            style: "border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) => (
              <Tooltip title={row?.reason} arrow placement="top">
                <span>{row?.reason}</span>
              </Tooltip>
            ),
            sortable: true,
          },
          {
            name: "Size - Ordered Quantity",
            style: "border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) =>
              `${row?.size} - ${row?.ordered_quantity}`,

            sortable: true,
          },
          {
            name: "Returned Request Quantity",
            style: "border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) => `${row?.quantity}`,

            sortable: true,
          },
          {
            name: "Date",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) => formatDate(row?.created_at),
            sortable: true,
          },
          {
            name: "Request Status",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: ReturnOrderRequest) => (
              <span className={getStatusColor(row?.status)}>{row?.status}</span>
            ),
            sortable: true,
          },
          {
            name: "Actions",
            style: "display:flex;justify-content:center !important",
            selector: (row: ReturnOrderRequest) => {
              return row.status === "Pending"
                ? (setId(row.id),
                  (<ReturnRequestActionsMenu setStatus={setStatus} />))
                : null;
            },
            sortable: false,
          },
        ]}
        data={data?.data}
      />
    </div>
  );
};

export default ReturnOrderRequests;
