import React from 'react';

interface PaginationProps {
  totalRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(startRow + rowsPerPage - 1, totalRows);

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onRowsPerPageChange(Number(e.target.value));
  };

  return (
    <div className="flex items-center justify-between mt-4 text-sm text-gray-700">
      {/* Rows per page */}
      <div className="flex items-center space-x-2">
        <span>Rows per page:</span>
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </select>
      </div>

      {/* Page range */}
      <div>
        {startRow}-{endRow} of {totalRows}
      </div>

      {/* Previous / Next Buttons */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`text-gray-700 ${
            currentPage === 1
              ? 'cursor-not-allowed text-gray-400'
              : 'hover:text-blue-600'
          }`}
        >
          ← Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`text-gray-700 ${
            currentPage === totalPages
              ? 'cursor-not-allowed text-gray-400'
              : 'hover:text-blue-600'
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Pagination;
