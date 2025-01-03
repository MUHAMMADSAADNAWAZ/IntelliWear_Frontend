import { monthlySales } from "@Data/data";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const MonthlySales = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Monthly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <XAxis dataKey="month" />
                <YAxis width={67} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
    </div>
  )
}

export default MonthlySales