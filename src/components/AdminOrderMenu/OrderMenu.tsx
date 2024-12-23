import { useState, useEffect } from 'react';
// import { NavLink } from 'react-router-dom';
// import { Button } from '@mui/material';
import BaseDataTable from '@components/BaseDataTable/BaseDataTable';
import OrdersActionMenu from '@components/OrdersActionMenu/OrderActionsMenu';
import { toast } from 'react-toastify';

const OrderMenu = ({ name }: { name?: string }) => {

  interface Order {
    id: number;
    customer: string;
    status: string;
    date: string;
  }
  
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {

    const allOrders = [
      { id: 1, customer: 'John Doe', status: 'Completed', date: '2024-12-19' },
      { id: 2, customer: 'Jane Smith', status: 'Pending', date: '2024-12-20' },
      { id: 3, customer: 'Mike Johnson', status: 'In Progress', date: '2024-12-21' },
      { id: 4, customer: 'Emily Davis', status: 'Completed', date: '2024-12-22' },
      { id: 5, customer: 'Chris Brown', status: 'Canceled', date: '2024-12-23' },
      { id: 6, customer: 'Sarah Wilson', status: 'Refund', date: '2024-12-24' },
      { id: 7, customer: 'David Lee', status: 'Completed', date: '2024-12-25' },
      { id: 8, customer: 'Anna White', status: 'Pending', date: '2024-12-26' },
      { id: 9, customer: 'James Green', status: 'In Progress', date: '2024-12-27' },
      { id: 10, customer: 'Laura Black', status: 'Completed', date: '2024-12-28' },
      { id: 11, customer: 'Robert King', status: 'Canceled', date: '2024-12-29' },
      { id: 12, customer: 'Linda Scott', status: 'Refund', date: '2024-12-30' },
      { id: 13, customer: 'Michael Young', status: 'Completed', date: '2024-12-31' },
      { id: 14, customer: 'Jessica Adams', status: 'Pending', date: '2025-01-01' },
      { id: 15, customer: 'Daniel Baker', status: 'In Progress', date: '2025-01-02' },
      { id: 16, customer: 'Nancy Carter', status: 'Completed', date: '2025-01-03' },
      { id: 17, customer: 'Paul Mitchell', status: 'Canceled', date: '2025-01-04' },
      { id: 18, customer: 'Karen Perez', status: 'Refund', date: '2025-01-05' },
    ];

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
              onViewDetails={() => {
                console.log("View Details for order:", row.id);
              }}
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
    </div>
  );
};

export default OrderMenu;
