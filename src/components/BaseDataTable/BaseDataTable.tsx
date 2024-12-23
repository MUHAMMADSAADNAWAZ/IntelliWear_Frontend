import React from "react";
import DataTable from "react-data-table-component";

// const customStyles = {
//     rows: {
//         style: {
//             minHeight: "50px",
//             border:'border-none'
//         },
//     },
//     headCells: {
//         style: {
//             paddingLeft: "8px",
//             paddingRight: "8px",
//         },
//     },
//     cells: {
//         style: {
//             paddingLeft: "8px",
//             paddingRight: "8px",
//             innerWidth: "1px",
//         },
//     },
//     headRow: {
//         style: {

//             minHeight: "35px",
//             color: "red",
//             border: "solid 10px #000",
//         },
//     },
// };

interface TableDataType<T> {
  columns?: any;
  data?: any;
  expandableRows?: boolean;
  selectableRows?: boolean;
  expandableRowsComponent?: any;
  className?: string;
  onSelectedRowsChange?: any;
  disableRow?: any;
  expandableRowDisabled?: ((row: T) => boolean) | null;
  handleSelectedRow?: any;
  pagination?: boolean;
  fixedHeader?: any;
  customStyles?: any;
  // paginationIconFirstPage?: React.ReactNode;
  onPageChange?: (page: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
}

function BaseDataTable<T>({
  columns,
  data,
  selectableRows,
  expandableRows,
  expandableRowsComponent,
  className,
  onSelectedRowsChange,
  disableRow,
  fixedHeader,
  handleSelectedRow,
  expandableRowDisabled,
  customStyles,
  pagination,
//   onPageChange,
//   onRowsPerPageChange,
}: TableDataType<T>) {
  return (
    <DataTable
      pagination={pagination}
      columns={columns}
      paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
      paginationPerPage={10}
      paginationComponentOptions={{ rowsPerPageText: `Showing ` }}
      paginationTotalRows={0}
      paginationDefaultPage={1}
      fixedHeader={fixedHeader}
      selectableRowDisabled={disableRow}
      onSelectedRowsChange={onSelectedRowsChange}
      data={data && data}
      customStyles={customStyles}
      selectableRows={selectableRows}
      expandableRows={expandableRows}
      expandableRowsComponent={expandableRowsComponent}
      className={`${className} w-full `}
      expandableRowDisabled={expandableRowDisabled}
      selectableRowSelected={handleSelectedRow}
    //   onChangePage={(page) => onPageChange?.(page)}
    //   onChangeRowsPerPage={(rowsPerPage) => onRowsPerPageChange?.(rowsPerPage)}
    //   paginationIconFirstPage={null}
    //   paginationIconLastPage={null}
    />
  );
}

export default React.memo(BaseDataTable);
