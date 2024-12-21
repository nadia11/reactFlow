import React, { useState } from 'react';
import Modal from '../components/ui/modal'; // Import the Modal component
import * as Dialog from '@radix-ui/react-dialog';
import { myBotsData } from '@/MocData/myBots';
import  Pagination from '../components/ui/pagination';

const MyBots: React.FC = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  // Filter data based on search query
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const filteredData = myBotsData.filter((bot) =>
    bot.name.toLowerCase().includes(search.toLowerCase())
  );
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  // Paginate the data

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chatbots</h1>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Watch Tutorial
        </a>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Fallback Message
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded-md">
            Chatbot Timer
          </button>
        </div>
        <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            onClick={handleModalOpen}
            className="bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add Chatbot
          </button>
        </Dialog.Trigger>
        </Dialog.Root>
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search Your Bots..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full max-w-md"
        />
      </div>
      <table className="w-full bg-white border border-gray-200 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Triggered</th>
            <th className="p-4 text-left">Steps Finished</th>
            <th className="p-4 text-left">Finished</th>
            <th className="p-4 text-left">Modified On</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((bot) => (
            <tr key={bot.id} className="border-t">
              <td className="p-4">{bot.name}</td>
              <td className="p-4">{bot.triggered}</td>
              <td className="p-4">{bot.stepsFinished}</td>
              <td className="p-4">{bot.finished}</td>
              <td className="p-4">{bot.modifiedOn}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="flex items-center justify-between mt-4">
        <div>
          Rows per page: {rowsPerPage} | Page {currentPage} of {totalPages}
        </div>
        <div className="flex space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div> */}
      <Pagination
        totalRows={filteredData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Modal */}
      {isModalOpen && <Modal onClose={handleModalClose} />}
    </div>
  );
};

export default MyBots;
