import { Tooltip } from "@mui/material";
import { BaseDataTable } from "@components/BaseDataTable";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

interface Customer {
    id: number;
    name: string;
    email: string;
    orders: number;
    totalSpend: string;
}

const customers = [
    {
      id: 1,
      name: "Ahmed Khan",
      email: "ahmed.khan@example.com",
      orders: 4,
      totalSpend: 4000,
    },
    {
      id: 2,
      name: "Sara Ahmed",
      email: "sara.ahmed@example.com",
      orders: 6,
      totalSpend: 6000,
    },
    {
      id: 3,
      name: "Ali Raza",
      email: "ali.raza@example.com",
      orders: 2,
      totalSpend: 2000,
    },
    {
      id: 4,
      name: "Fatima Noor",
      email: "fatima.noor@example.com",
      orders: 7,
      totalSpend: 7000,
    },
    {
      id: 5,
      name: "Usman Tariq",
      email: "usman.tariq@example.com",
      orders: 5,
      totalSpend: 5000,
    },
    {
      id: 6,
      name: "Zainab Malik",
      email: "zainab.malik@example.com",
      orders: 3,
      totalSpend: 3000,
    },
    {
      id: 7,
      name: "Bilal Shah",
      email: "bilal.shah@example.com",
      orders: 8,
      totalSpend: 8000,
    },
    {
      id: 8,
      name: "Hina Farooq",
      email: "hina.farooq@example.com",
      orders: 1,
      totalSpend: 1000,
    },
    {
      id: 9,
      name: "Rizwan Ali",
      email: "rizwan.ali@example.com",
      orders: 10,
      totalSpend: 10000,
    },
    {
      id: 10,
      name: "Ayesha Siddiqui",
      email: "ayesha.siddiqui@example.com",
      orders: 4,
      totalSpend: 4000,
    },
    {
      id: 11,
      name: "Hassan Butt",
      email: "hassan.butt@example.com",
      orders: 6,
      totalSpend: 6000,
    },
    {
      id: 12,
      name: "Nida Khan",
      email: "nida.khan@example.com",
      orders: 9,
      totalSpend: 9000,
    },
    {
      id: 13,
      name: "Tariq Mehmood",
      email: "tariq.mehmood@example.com",
      orders: 2,
      totalSpend: 2000,
    },
    {
      id: 14,
      name: "Sana Javed",
      email: "sana.javed@example.com",
      orders: 3,
      totalSpend: 3000,
    },
    {
      id: 15,
      name: "Kamran Aslam",
      email: "kamran.aslam@example.com",
      orders: 7,
      totalSpend: 7000,
    },
  ];
  

const Customers = () => {

    const [showTooltip, setShowTooltip] = useState(false);

  const handleCopy = () => {
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000); 
  };


  return (

<div className="p-6 bg-gray-100 rounded-t-xl">
<h2 className="text-3xl font-bold mb-6 text-blue-600">Customers</h2>
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
          name: "Customer ID",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Customer) => (row.id),
          sortable: true,
        },
        {
          name: "Name",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Customer) => (row.name),
          sortable: true,
        },
        // {
        //   name: "Email",
        //   style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
        //   selector: (row: Customer) => (row.email),
        //   sortable: true,
        // },
        {
            name: "Email",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: Customer) => (
              <Tooltip
                title={
                  showTooltip ? (
                    "Copied to Clipboard"
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        
                      }}
                    >
                      <span>{row.email}</span>
                      <CopyToClipboard text={row.email} onCopy={handleCopy}>
                        <ContentCopyIcon
                          style={{ cursor: "pointer", fontSize: "16px" }}
                        />
                      </CopyToClipboard>
                    </div>
                  )
                }
                placement="top"
                arrow
              >
                <div>
                  <span className="break-all">{row.email}</span>
                </div>
              </Tooltip>
            ),
            sortable: true,
          },
        {
          name: "Orders",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Customer) => (row.orders),
          sortable: true,
        },
        {
          name: "Total Spent (PKR)",
          style: "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
          selector: (row: Customer) => (row.totalSpend),
          sortable: true,
        },
        // {
        //   name: "Actions",
        //   style: "display:flex;justify-content:center !important",
        //   selector: (row: Product) => (
        //     <ActionsMenu
        //       onEdit={() => {
        //         console.log("Edit clicked for product:", row.name);
        //       }}
        //       onDelete={() => {
        //         console.log("Delete clicked for product:", row.name);
        //       }}
        //     />
        //   ),
        //   sortable: false,
        // }, 

      ]}
      data={customers}
      pagination
      />

</div>
  );
};

export default Customers;
