
import { Tooltip } from "@mui/material";
import accessory1 from "@assets/ac1.jpeg"
import accessory2 from "@assets/ac2.jpeg"
import accessory3 from "@assets/ac3.jpeg"
import BaseDataTable from "@components/BaseDataTable/BaseDataTable";

interface Review {
  id: number;
  productName: string;
  productImg: string;
  userName: string;
  rating: number; 
  reviewText: string;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

const dummyReviews: Review[] = [
  {
    id: 1,
    productName: "Stylish Bracelet",
    productImg: accessory1,
    userName: "Aqdas Ikram",
    rating: 4,
    reviewText: "Loved the quality and design!",
    status: "Pending",
    date: "15-12-2024",
  },
  {
    id: 2,
    productName: "Beautiful Necklace",
    productImg: accessory3,
    userName: "Jane Smith",
    rating: 5,
    reviewText: "Perfect for everyday use.",
    status: "Approved",
    date: "28-12-2024",
  },
  {
    id: 3,
    productName: "Gold Earrings",
    productImg: accessory2,
    userName: "Parveen Shakir",
    rating: 3,
    reviewText: "Good, but expected better packaging.",
    status: "Rejected",
    date: "01-10-2020",
  },
];

const AdminReviews = () => {

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
          name: "Product ID",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Review) => (row.id),
          sortable: true,
        },
        {
          name: "Product",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Review) => (
              <Tooltip title={row.productName} placement="top" arrow>
            <div className=" py-4 flex items-center justify-center gap-3">
            <span>{row.productName}</span>
          </div>
          </Tooltip>
          ),
          sortable: true,
        },
        {
          name: "Customer",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Review) => (row.userName),
          sortable: true,
        },
        {
          name: "Ratings",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Review) => (`⭐️ ${row.rating}/5`),
          sortable: true,
        },
        {
          name: "Review",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Review) => (
            <Tooltip title={row.reviewText} arrow placement="top">
                <span>{row.reviewText}</span>
             </Tooltip>
          ),
          
          sortable: true,
        },
        {
          name: "Date",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Review) => (row.date),
          sortable: true,
        },
      ]}
      data={dummyReviews}
      pagination
      />

    </div>
  );
};

export default AdminReviews;
