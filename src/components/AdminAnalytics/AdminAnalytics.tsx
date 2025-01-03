import { BaseDataTable } from "@components/BaseDataTable";
import { MonthlySales } from "@components/MonthlySales";
import { SalesAnalyticsComponent } from "@components/SalesAnalyticsComponent";
import { Analytics, topProducts } from "@Data/data";

interface TopProduct {
  name: string;
  units_sold: string;
  total_revenue: string;
}

const AdminAnalytics= () => {
  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">Analytics Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
       
        {Analytics.map((analtics)=>{
          return <SalesAnalyticsComponent name={analtics.name} price={analtics.price} color={analtics.color} />
        })}

      </div>

      <MonthlySales />

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Top-Selling Products</h3>

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
                  name: "Product Name",
                  style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
                  selector: (row: TopProduct) => (row.name),
                  sortable: true,
                },
                {
                  name: "Units Sold",
                  style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
                  selector: (row: TopProduct) => (row.units_sold),
                  sortable: true,
                },
                {
                  name: "Total Revenue (PKR)",
                  style: "display:flex;justify-content:center; !important",
                  selector: (row: TopProduct) => (row.total_revenue),
                  sortable: true,
                },
              ]}
              data={topProducts}
              pagination
              />
        
      </div>
    </div>
  );
};

export default AdminAnalytics;