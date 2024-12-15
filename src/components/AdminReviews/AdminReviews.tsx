
import accessory1 from "../../assets/ac1.jpeg"
import accessory2 from "../../assets/ac2.jpeg"
import accessory3 from "../../assets/ac3.jpeg"

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
  // const reviews = useState<Review[]>(dummyReviews);

  // const handleStatusChange = (id: number, newStatus: "Approved" | "Rejected") => {
  //   const updatedReviews = reviews.map((review) =>
  //     review.id === id ? { ...review, status: newStatus } : review
  //   );
  //   setReviews(updatedReviews);
  // };

  return (
    <div className="p-6 bg-gray-100 ">
      <h2 className="text-3xl font-bold mb-6">Product Reviews</h2>

      <div className="bg-white p-4 rounded-lg shadow ">
        <table className=" bg-white text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3 w-[30%]">Product</th>
              <th className="px-6 py-3 w-[10%]">User</th>
              <th className="px-6 py-3 w-[10%]">Rating</th>
              <th className="px-6 py-3 w-[30%]">Review</th>
              {/* <th className="px-6 py-3">Status</th> */}
              <th className="px-6 py-3 w-[20%]">Date</th>
              {/* <th className="px-6 py-3">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {dummyReviews.map((review) => (
              <tr key={review.id} className="border-b ">
                <td className="px-6 py-4 flex items-center gap-3 border-r">
                  <img
                    src={review.productImg}
                    alt={review.productName}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span>{review.productName}</span>
                </td>
                <td className="px-6 py-4 border-r w-[15%]">{review.userName}</td>
                <td className="px-6 py-4 border-r w-[10%]">{`⭐️ ${review.rating}/5`}</td>
                <td className="px-6 py-4 border-r w-[30%] break-all">{review.reviewText}</td>
                {/* <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded ${
                      review.status === "Approved"
                        ? "bg-green-200 text-green-700"
                        : review.status === "Rejected"
                        ? "bg-red-200 text-red-700"
                        : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {review.status}
                  </span>
                </td> */}
                <td className="px-6 py-4 w-[20%]">{review.date}</td>
                {/* <td className="px-6 py-4 flex gap-3">
                  {review.status === "Pending" && (
                    <>
                      <button
                        onClick={() => handleStatusChange(review.id, "Approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleStatusChange(review.id, "Rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    onClick={() =>
                      setReviews(reviews.filter((r) => r.id !== review.id))
                    }
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReviews;
