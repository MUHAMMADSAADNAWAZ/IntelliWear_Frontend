import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { BaseDataTable } from '@components/BaseDataTable';
import { OrderDetailsDialog } from '@components/OrderDetails';
import OrdersActionMenu from '@components/OrdersActionMenu/OrderActionsMenu';
import { allOrders } from '@Data/data';

export interface Order {
  id: number;
  customer: string;
  status: string;
  date: string;
  items: { name: string; avaQuantity: number; price: number }[];
  shippingAddress: string;
  paymentMethod: string;
  trackingNumber: string;
}

const OrderMenu = ({ name }: { name?: string }) => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {

    if (name === 'All') {
      setOrders(allOrders);
    } else {
      setOrders(allOrders.filter(order => order.status === name));
    }
  }, [name]);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'green';
    case 'Pending':
      return 'orange';
    case 'In Progress':
      return 'blue';
    case 'Canceled':
      return 'red';
    case 'Refund':
      return 'purple';
    default:
      return 'black';
  }
};

const handleChangeStatus = (id: number, newStatus: string) => {
  setOrders((prevOrders) =>
    prevOrders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    )
  );
  toast.success(`Order ${id} status successfully changed to "${newStatus}"`);
};

  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
  };

    const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-t-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">{name} Orders</h2>

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
          selector: (row: Order) => (row.id),
          sortable: true,
        },
        {
          name: "Customer Name",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Order) => (row.customer),
          sortable: true,
        },
        {
          name: "Order Status",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Order) => (
            <span style={{ color: getStatusColor(row.status) }}>
              {row.status}
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
              onChangeStatus={(newStatus: string) => {
                handleChangeStatus(row.id, newStatus);
              }}
            />
          ),
          sortable: false,
        }, 

      ]}
      data={orders}
      pagination
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