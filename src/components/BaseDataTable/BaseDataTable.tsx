import React from "react";
import DataTable from "react-data-table-component";

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
