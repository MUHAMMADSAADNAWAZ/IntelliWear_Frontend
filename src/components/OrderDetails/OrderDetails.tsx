import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { Order } from '@components/AdminOrderMenu/OrderMenu';

interface OrderDetailsDialogProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsDialog = ({ open, order, onClose }: OrderDetailsDialogProps) => {
  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'text-green-500'; // Green
      case 'Pending':
        return 'text-orange-500'; // Orange
      case 'In Progress':
        return 'text-blue-500'; // Blue
      case 'Canceled':
        return 'text-red-500'; // Red
      case 'Refund':
        return 'text-purple-500'; // Purple
      default:
        return 'text-black'; // Default color
    }
  };

  const calculateTotal = () => {
    return order.items.reduce((total, item) => total + item.avaQuantity * item.price, 0);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-gray-100 font-bold text-lg">Order Details</DialogTitle>
      <DialogContent className="p-5 bg-gray-50">
        <Box className="mb-4">
          <p className="font-bold">Order ID: <span className="font-normal">{order.id}</span></p>
          <p className="font-bold">Customer Name: <span className="font-normal">{order.customer}</span></p>
          <p className={`font-bold ${getStatusColor(order.status)}`}>Status: <span className="font-normal">{order.status}</span></p>
          <p className="font-bold">Date: <span className="font-normal">{order.date}</span></p>
        </Box>

        <Box className="mb-4">
          <p className="font-bold text-xl mb-2">Order Items</p>
          {order.items.map((item, index) => (
            <p key={index} className="text-sm mb-1">
              {item.name} - {item.avaQuantity} x {item.price} Rs
            </p>
          ))}
        </Box>

        <Box className="mb-4">
          <p className="font-bold">Shipping Address: <span className="font-normal">{order.shippingAddress}</span></p>
          <p className="font-bold">Payment Method: <span className="font-normal">{order.paymentMethod}</span></p>
          {order.trackingNumber && (
            <p className="font-bold">Tracking Number: <span className="font-normal">{order.trackingNumber}</span></p>
          )}
        </Box>

        <Box className="mt-4">
          <p className="font-bold">Total: <span className="font-normal">{calculateTotal()} Rs</span></p>
        </Box>
      </DialogContent>
      <DialogActions className="p-2 bg-gray-100">
        <Button onClick={onClose} color="primary" variant="outlined" className="rounded-full">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
