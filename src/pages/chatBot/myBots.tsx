import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/ui/pagination';
import { Icons } from '@/assets/Icons';
import toast from 'react-hot-toast';
import api from '@/configs/api'; // Your API interceptor
import Modal
 from '@/components/ui/modal';
const MyBots: React.FC = () => {
  const [chatbots, setChatbots] = useState([]); // Store chatbots fetched from the API
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedChatbotId, setSelectedChatbotId] = useState<number | null>(null);

  const navigate = useNavigate();

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredData = chatbots.filter((bot: any) =>
    bot.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const fetchChatbots = async (page: number, limit: number = 10) => {
    try {
      const response = await api.get('/nodes/chatbots', {
        params: { page, limit },
      });
      setChatbots(response.data.chatbots); // Update the chatbot state
    } catch (error) {
      console.error('Failed to fetch chatbots:', error);
      toast.error('Failed to load chatbots');
    }
  };

  const handleDeleteChatbot = async (id: number) => {
    try {
      await api.delete(`nodes/chatbot/${id}`);
      toast.success('Chatbot deleted successfully');
      fetchChatbots(currentPage, rowsPerPage); // Refresh the chatbot list
    } catch (error) {
      console.error('Failed to delete chatbot:', error);
      toast.error('Failed to delete chatbot');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows: number) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchChatbots(currentPage, rowsPerPage); // Fetch chatbots on component mount
  }, [currentPage, rowsPerPage]);

  return (
    <div className="p-6 bg-gray-50 w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Chatbots</h1>
        <a
          href="https://www.youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:underline"
        >
          Watch Tutorial
        </a>
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
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((bot: any) => (
            <tr
              key={bot.id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/bot?chatId=${bot.id}`)} // Navigate to /bot with chatId
            >
              <td className="p-4">{bot.name}</td>
              <td className="p-4">{bot.triggered || 0}</td>
              <td className="p-4">{bot.stepsFinished || 0}</td>
              <td className="p-4">{bot.finished || 0}</td>
              <td className="p-4">{bot.updatedAt}</td>
              <td className="flex items-center justify-center p-4">
                <button
                  className="bg-slate-200 rounded-2xl p-2 mr-1"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when editing
                    navigate(`/bot?chatId=${bot.id}`)

                  }}
                >
                  <Icons.edit className="size-5" strokeWidth="1" />
                </button>
                <button
                  className="bg-slate-200 rounded-2xl p-2"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation when deleting
                    setDeleteModalOpen(true);
                    setSelectedChatbotId(bot.id);
                  }}
                >
                  <Icons.trash className="size-5" strokeWidth="1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalRows={filteredData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Delete Confirmation Modal */}
      <Modal open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        {/* <Dialog.Title className="text-xl font-bold mb-4">Confirm</Dialog.Title> */}
        <p className="mb-4">Do you want to remove this chatbot?</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setDeleteModalOpen(false)}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedChatbotId) handleDeleteChatbot(selectedChatbotId);
              setDeleteModalOpen(false);
            }}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Yes
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MyBots;
