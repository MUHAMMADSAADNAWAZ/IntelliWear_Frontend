import { useState } from 'react';

import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { BaseDataTable } from '@components/BaseDataTable';
import { OrderDetailsDialog } from '@components/OrderDetails';
import OrdersActionMenu from '@components/OrdersActionMenu/OrderActionsMenu';
import { updateLoader } from '@redux/slices/loaderSlice';
import AdminOrdersApi from '@api/adminorders.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Order } from '@dto/payment.dto';

export const getStatusColor = (status: string) => {
  switch (status) {
    case "in_process":
        return "text-blue-700";
      case "pending":
        return "text-yellow-700";
      case "shipped":
        return "text-purple-700";
      case "delivered":
        return "text-green-700";
      case "cancelled":
        return "text-red-700";
      default:
        return "text-gray-700";
  }
};

const OrderMenu = ({ name }: { name: string }) => {

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
   const [page , setPage] = useState<number>(1);
   const [rowsPerPage , setRowsPerPage] = useState<number>(10)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const dispatch = useDispatch();
  const queryclient = useQueryClient();
  const adminordersapi = new AdminOrdersApi()

  const getAllOrders = async () =>{
    dispatch(updateLoader(true));
    const res = await adminordersapi.getAllOrders(name === "All" ? "" : name , rowsPerPage , (page-1)*rowsPerPage);
    dispatch(updateLoader(false));
    return res;
  }

  const {data} = useQuery({
    queryKey: ["allorders" , name , rowsPerPage , page],
    queryFn:getAllOrders,
  })

  const updateOrderStatus = async ({ order_id, status }: { order_id: number, status: string }) => {
    dispatch(updateLoader(true));
    return await adminordersapi.updateOrderStatus(order_id, status);
  }
  
  const {mutateAsync} = useMutation({
      mutationFn: updateOrderStatus,
    onSuccess: (res: any) =>{
      queryclient.invalidateQueries({queryKey: ["allorders"]});
      dispatch(updateLoader(false));
      toast.success(res?.data?.message || "Order Status update successfully!")
    },
    onError: () =>{
      dispatch(updateLoader(false));
      toast.success("Unable to update order status!")
    }
  })

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

    const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-t-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">{name?.charAt(0).toUpperCase() + name?.slice(1)} Orders</h2>

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
          name: "Order ID",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Order) => (row?.id),
          sortable: true,
        },
        {
          name: "Customer Name",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Order) => (row?.shipping_address?.name || "-"),
          sortable: true,
        },
        {
          name: "Customer Name",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Order) => (row?.total_price || "-"),
          sortable: true,
        },
        {
          name: "Order Status",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Order) => (
            <span className={`${getStatusColor(row?.status)}`}>
              {row?.status}
            </span>
          ),
          sortable: true,
        },
        {
          name: "Actions",
          style: "display:flex;justify-content:center !important",
          selector: (row: Order) => (
            <OrdersActionMenu
            onViewDetails={() => handleViewDetails(row)}
              onChangeStatus={async (newStatus: string) => {
                await mutateAsync({ order_id: row?.id, status: newStatus });
              }}
              status={row?.status}
            />
          ),
          sortable: false,
        }, 

      ]}
      data={data?.data?.results}
      paginationServer
      pagination
      paginationTotalRows={data?.data?.count}
      onRowsPerPageChange={setRowsPerPage}
      onPageChange={setPage}
      />

      <OrderDetailsDialog
        open={isDetailsOpen}
        order={selectedOrder}
        onClose={handleCloseDetails}
      />
    </div>
  );
};

export default OrderMenu;