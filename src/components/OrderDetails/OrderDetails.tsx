import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import { getStatusColor } from "@components/AdminOrderMenu/OrderMenu";
import { Order } from "@dto/payment.dto";
import { formatDate } from "@utils/convertDate";

interface OrderDetailsDialogProps {
  open: boolean;
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsDialog = ({
  open,
  order,
  onClose,
}: OrderDetailsDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="bg-gray-100 font-bold text-lg">
        Order Details
      </DialogTitle>
      <DialogContent className="p-5 bg-gray-50">
        <Box className="mb-4">
          <p className="font-bold">
            Order ID: <span className="font-normal">{order?.id}</span>
          </p>
          <p className="font-bold">
            Customer Name:{" "}
            <span className="font-normal">{order?.shipping_address?.name}</span>
          </p>
          <p className={`font-bold ${getStatusColor(order.status)}`}>
            Status: <span className="font-normal">{order?.status}</span>
          </p>
          <p className="font-bold">
            Date:{" "}
            <span className="font-normal">{formatDate(order?.created_at)}</span>
          </p>
        </Box>

        <Box className="mb-4">
          <p className="font-bold text-xl mb-2">Order Items</p>
          {order?.items.map((item, index) => (
            <div
              key={index}
              className="text-sm mb-2 flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{item?.product_name}</span>
                <span className="text-gray-600"> - Size: {item?.size}</span>
              </div>
              <span>
                {item?.quantity} x {item?.price} Rs
              </span>
            </div>
          ))}
        </Box>

        <Box className="mb-4">
          <p className="font-bold">
            Shipping Address:{" "}
            <span className="font-normal">
              {order?.shipping_address?.address}
            </span>
          </p>
          <p className="font-bold">
            Shipping City:{" "}
            <span className="font-normal">{order?.shipping_address?.city}</span>
          </p>
          <p className="font-bold">
            Payment Method:{" "}
            <span className="font-normal">
              {order?.payment?.payment_method === "cod" ? "Cash on Delivery" : "Stripe"}
            </span>
          </p>
          {order?.payment?.transaction_id && (
            <p className="font-bold">
              Transcation ID:{" "}
              <span className="font-normal">
                {order?.payment?.transaction_id}
              </span>
            </p>
          )}
        </Box>

        <Box className="mt-4">
          <p className="font-bold">
            Total: <span className="font-normal">{order?.total_price} Rs</span>
          </p>
        </Box>
      </DialogContent>
      <DialogActions className="p-2 bg-gray-100">
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          className="rounded-full"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetailsDialog;
