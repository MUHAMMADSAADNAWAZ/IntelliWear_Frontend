import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, CartesianGrid, Cell } from "recharts";
interface OrderStatusData {
  cancelled: number;
  shipped: number;
  delivered: number;
  in_process: number;
  // pending: number;
}

interface MonthlySalesProps {
  orderStatusData: OrderStatusData;
}

const MonthlySales = ({ orderStatusData }: MonthlySalesProps) => {

  const data = [
    { name: "Cancelled", Orders: orderStatusData?.cancelled, fill: "#FF4D4D" },
    { name: "Shipped", Orders: orderStatusData?.shipped, fill: "#8E44AD" },
    { name: "Delivered", Orders: orderStatusData?.delivered, fill: "#2ECC71" },
    { name: "In Process", Orders: orderStatusData?.in_process, fill: "#4DA6FF" },
    // { name: "Pending", Orders: orderStatusData.pending, fill: "#F39C12" },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Order Status Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Legend />

          <Bar dataKey="Orders" barSize={30}>
            {data?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlySales;
