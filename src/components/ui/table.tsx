import React from "react";
import Pagination from "./pagination";

interface TableProps<T> {
  columns: string[];
  data: T[];
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  renderRow: (row: T) => React.ReactNode; // Render function for table rows
}

const Table = <T extends unknown>({
  columns,
  data,
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
  renderRow,
}: TableProps<T>) => {
  return (
    <div>
      {/* Table */}
      <table className="w-full bg-white border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="p-4 text-left border-b border-gray-300">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{data.map((row) => renderRow(row))}</tbody>
      </table>

      {/* Pagination */}
      <Pagination
        totalRows={totalRows}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </div>
  );
};

export default Table;
