import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

import { BaseDataTable } from "@components/BaseDataTable";
import { customers } from "@Data/data";

interface Customer {
    id: number;
    name: string;
    email: string;
    orders: number;
    totalSpend: string;
}

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
