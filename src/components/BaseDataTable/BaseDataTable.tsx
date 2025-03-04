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
  paginationTotalRows?: number;
  paginationServer?: boolean;
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
  paginationTotalRows,
  onPageChange,
  onRowsPerPageChange,
  paginationServer,
}: TableDataType<T>) {
  return (
    <DataTable
      pagination={pagination}
      paginationServer={paginationServer}
      columns={columns}
      paginationRowsPerPageOptions={[5, 10, 20, 30, 50]}
      paginationPerPage={10}
      paginationComponentOptions={{ rowsPerPageText: `Showing ` }}
      paginationTotalRows={paginationTotalRows}
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
      onChangePage={(page) => onPageChange?.(page)}
      onChangeRowsPerPage={(rowsPerPage) => onRowsPerPageChange?.(rowsPerPage)}
      paginationIconFirstPage={null}
      paginationIconLastPage={null}
    />
  );
}

export default React.memo(BaseDataTable);
