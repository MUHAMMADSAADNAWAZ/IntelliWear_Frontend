import { clothesData , footwearData , accessoriesData } from "@Data/data";
import ActionsMenu from "@components/ActionMenu/ActionMenu";
import BaseDataTable from "@components/BaseDataTable/BaseDataTable";


import './AdminProducts.css'

interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

const AdminProducts = ({name} : {name?: string}) => {

  const allProducts: Product[] = (() => {
    switch (name) {
      case 'Clothes':
        return [...clothesData];
      case 'Footwear':
        return [...footwearData];
      case 'Accessories':
        return [...accessoriesData];
      default:
        return [...clothesData, ...footwearData, ...accessoriesData];
    }
  })();

  return (
    <div className="p-6 bg-gray-100 rounded-t-xl">
      <h2 className="text-3xl font-bold mb-6 text-blue-600">{name}</h2>

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
          selector: (row: Product) => (row.id),
          sortable: true,
        },
        {
          name: "Image",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => ( <img src={row.img} alt={row.name} className="h-16 w-16 object-cover rounded py-2" />),
          sortable: true,
        },
        {
          name: "Name",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (row.name),
          sortable: true,
        },
        {
          name: "Category",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (row.category),
          sortable: true,
        },
        {
          name: "Price (PKR)",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Product) => (row.price),
          sortable: true,
        },
        {
          name: "Actions",
          style: "display:flex;justify-content:center !important",
          selector: (row: Product) => (
            <ActionsMenu
              onEdit={() => {
                console.log("Edit clicked for product:", row.name);
              }}
              onDelete={() => {
                console.log("Delete clicked for product:", row.name);
              }}
            />
          ),
          sortable: false,
        }, 

      ]}
      data={allProducts}
      pagination
      />
    </div>
  );
};

export default AdminProducts;
