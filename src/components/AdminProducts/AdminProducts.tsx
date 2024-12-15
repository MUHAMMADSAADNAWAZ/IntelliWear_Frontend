import { clothesData , footwearData , accessoriesData } from "../../Data/data";

interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  category: string;
  desc: string;
}

const AdminProducts = () => {
 
  const allProducts: Product[] = [...clothesData, ...footwearData, ...accessoriesData];

  const handleEdit = (id: number) => {
    console.log(`Edit product with ID: ${id}`);
  }

  const handleDelete = (id: number) => {
    console.log(`Delete product with ID: ${id}`);
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Products</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white text-left text-sm">
          <thead className="bg-gray-200 text-gray-700 uppercase">
            <tr>
              <th className="px-6 py-3">Product ID</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">
                  <img src={product.img} alt={product.name} className="h-16 w-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.price.toFixed(2)} Rs</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
