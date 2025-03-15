import { useState } from "react";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Tooltip } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import AdminCustomerListingApi from "@api/admincustomerlisting.api";
import { BaseDataTable } from "@components/BaseDataTable";
import { updateLoader } from "@redux/slices/loaderSlice";

interface Customer {
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpend: string;
}

const Customers = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const dispatch = useDispatch();
  const customerlistingapi = new AdminCustomerListingApi();

  const getAdminProducts = async () => {
    dispatch(updateLoader(true));
    const res = await customerlistingapi.getAllCustomers(
      rowsPerPage,
      (page - 1) * rowsPerPage
    );
    dispatch(updateLoader(false));
    return res;
  };

  const { data } = useQuery({
    queryKey: ["allcustomers", rowsPerPage, page],
    queryFn: getAdminProducts,
  });

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
          headCells: {
            style: {
              display: "flex",
              justifyContent: "center",
              paddingLeft: "8px",
              paddingRight: "8px",
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
            name: "Customer Name",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: Customer) => row?.name,
            sortable: true,
          },
          {
            name: "Phone",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: Customer) => row?.phone,
            sortable: true,
          },
          {
            name: "Email",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
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
                      <span>{row?.email}</span>
                      <CopyToClipboard text={row?.email} onCopy={handleCopy}>
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
                  <span className="break-all">{row?.email}</span>
                </div>
              </Tooltip>
            ),
            sortable: true,
          },
          {
            name: "Orders",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: Customer) => row?.orders || "-",
            sortable: true,
          },
          {
            name: "Total Spent (PKR)",
            style:
              "display:flex;justify-content:center;border-right: 1px solid #e0e0e0 !important",
            selector: (row: Customer) => row?.totalSpend || "-",
            sortable: true,
          },
        ]}
        data={data?.data?.results}
        pagination
        paginationServer={true}
        paginationTotalRows={data?.data?.count}
        onRowsPerPageChange={setRowsPerPage}
        onPageChange={setPage}
      />
    </div>
  );
};

export default Customers;
