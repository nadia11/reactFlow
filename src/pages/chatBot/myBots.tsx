// import React, { useState } from 'react';
// import Modal from '../../components/ui/modal'; // Import the Modal component
// import * as Dialog from '@radix-ui/react-dialog';
// import { myBotsData } from '@/MocData/myBots';
// import  Pagination from '../../components/ui/pagination';
// import { Icons } from '@/assets/Icons';
// import toast from 'react-hot-toast';

// const MyBots: React.FC = () => {
//   const [search, setSearch] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [rowsPerPage, setRowsPerPage] = useState(2);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [isFallbackModalOpen, setIsFallbackModalOpen] = useState(false);
//   const [isFallbackEnabled, setIsFallbackEnabled] = useState(true);
//   const [isTimerModalOpen, setIsTimerModalOpen] = useState(false); // Renamed state
//   const [isExitNotificationEnabled, setIsExitNotificationEnabled] = useState(false);
//   const [timeoutMinutes, setTimeoutMinutes] = useState(30);
//   const [exitNotificationMinutes, setExitNotificationMinutes] = useState(5);
//   const [exitNotificationMessage, setExitNotificationMessage] = useState(
//     "Please type or select from the options above if you would like to continue, else this conversation will reset and you may have to share your responses again."
//   );
//   const [fallbackMessage, setFallbackMessage] = useState(
//     "Sorry, we don't quite understand what you mean, please select or input from the options below."
//   );
//   const [maxFallbackRetries, setMaxFallbackRetries] = useState(3);
//   // Filter data based on search query
//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const filteredData = myBotsData.filter((bot) =>
//     bot.name.toLowerCase().includes(search.toLowerCase())
//   );
//   const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
//   const handleRowsPerPageChange = (rows: number) => {
//     setRowsPerPage(rows);
//     setCurrentPage(1); // Reset to first page when rows per page changes
//   };
//   const handleSave = () => {
//     toast.success("Chatbot timer settings saved!");
//     setIsTimerModalOpen(false);
//     console.log({
//       timeoutMinutes,
//       isExitNotificationEnabled,
//       exitNotificationMinutes,
//       exitNotificationMessage,
//     });
//   };
//   const handleFallbackSave = () => {
//     setIsFallbackModalOpen(false);
//     // Implement save logic here
//     console.log("Fallback message saved:", fallbackMessage, maxFallbackRetries);
//   };
//   // Paginate the data

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//   };

//   const handleModalOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleDeleteClick = () => {
//     setDeleteModalOpen(true); // Open the delete modal
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteModalOpen(false); // Close the delete modal
//   };
//   return (
//     <div className="p-6 bg-gray-50 w-full">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Chatbots</h1>
//         <a
//           href="https://www.youtube.com"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-green-500 hover:underline"
//         >
//           Watch Tutorial
//         </a>
//       </div>
//       <div className="flex justify-between items-center mb-4">
//         <div className="flex items-center space-x-2">
//           <button className="bg-green-500 text-white px-4 py-2 rounded-md"   onClick={() => setIsFallbackModalOpen(true)}>
//             Fallback Message
//           </button>
//           <button className="bg-green-500 text-white px-4 py-2 rounded-md"   onClick={() => setIsTimerModalOpen(true)}>
//             Chatbot Timer
//           </button>
//         </div>
//         <Dialog.Root>
//         <Dialog.Trigger asChild>
//           <button
//             onClick={handleModalOpen}
//             className="bg-green-600 text-white px-4 py-2 rounded-md"
//           >
//             Add Chatbot
//           </button>
//         </Dialog.Trigger>
//         </Dialog.Root>
//       </div>
//       <div className="flex items-center mb-4">
//         <input
//           type="text"
//           placeholder="Search Your Bots..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="p-2 border border-gray-300 rounded w-full max-w-md"
//         />
//       </div>
//       <table className="w-full bg-white border border-gray-200 rounded-md">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-4 text-left">Name</th>
//             <th className="p-4 text-left">Triggered</th>
//             <th className="p-4 text-left">Steps Finished</th>
//             <th className="p-4 text-left">Finished</th>
//             <th className="p-4 text-left">Modified On</th>
//             <th className="p-4 text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentData.map((bot) => (
//             <tr key={bot.id} className="border-t">
//               <td className="p-4">{bot.name}</td>
//               <td className="p-4">{bot.triggered}</td>
//               <td className="p-4">{bot.stepsFinished}</td>
//               <td className="p-4">{bot.finished}</td>
//               <td className="p-4">{bot.modifiedOn}</td>
//               <td className='flex items-center justify-center p-4'><button className='bg-slate-200 rounded-2xl p-2 mr-1'><Icons.copy className='size-5' strokeWidth="1"/></button><button className='bg-slate-200 rounded-2xl p-2 mr-1'><Icons.edit className='size-5' strokeWidth="1"/></button><button className='bg-slate-200 rounded-2xl p-2'  onClick={handleDeleteClick}><Icons.trash className='size-5' strokeWidth="1"/></button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Pagination
//         totalRows={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         currentPage={currentPage}
//         onPageChange={handlePageChange}
//         onRowsPerPageChange={handleRowsPerPageChange}
//       />

//       {/* Modal */}
//       <Modal open={isModalOpen} onClose={handleModalClose}>
//         <Dialog.Title className="text-xl font-bold mb-4">Add New Chatbot</Dialog.Title>
//         <form>
//           <div className="mb-4">
//             <label htmlFor="chatbotName" className="block mb-2 text-gray-700">
//               Chatbot Name
//             </label>
//             <input
//               type="text"
//               id="chatbotName"
//               placeholder="Chatbot Name"
//               className="p-2 border border-gray-300 rounded w-full"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//           >
//             Add
//           </button>
//         </form>
//       </Modal>
//       <Modal open={isFallbackModalOpen} onClose={() => setIsFallbackModalOpen(false)}>
//         <h2 className="text-lg font-bold mb-4">Fallback Message</h2>
//         <div className="mb-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={isFallbackEnabled}
//               onChange={(e) => setIsFallbackEnabled(e.target.checked)}
//               className="form-checkbox"
//             />
//             <span>Enable fallback message</span>
//           </label>
//         </div>
//         {isFallbackEnabled && ( <div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-2">
//             Set fallback message if no keyword is matched in the chatbot:
//           </label>
//           <textarea
//             value={fallbackMessage}
//             onChange={(e) => setFallbackMessage(e.target.value)}
//             className="w-full p-2 border rounded resize-none"
//             rows={4}
//           />
//         </div>
//         <div className="mb-4 flex items-center gap-2">
//           <span>Fallback message will be triggered up to</span>
//           <select
//             value={maxFallbackRetries}
//             onChange={(e) => setMaxFallbackRetries(Number(e.target.value))}
//             className="border p-2 rounded"
//           >
//             {[1, 2, 3, 4, 5].map((retry) => (
//               <option key={retry} value={retry}>
//                 {retry}
//               </option>
//             ))}
//           </select>
//           <span>times before chatbot ends.</span>
//         </div>
//         <button
//           onClick={handleFallbackSave}
//           className="bg-green-500 text-white px-4 py-2 rounded-md"
//         >
//           Save
//         </button>
//         </div>)}
//       </Modal>
//       <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
//       <Dialog.Title className="text-xl font-bold mb-4">Confirm</Dialog.Title>
//       <p className="mb-4">Do you want to remove this chatbot?</p>
//       <div className="flex justify-end space-x-4">
//         <button
//           onClick={handleCloseDeleteModal}
//           className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={() => {
           
//            handleCloseDeleteModal();
//           }}
//           className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//         >
//           Yes
//         </button>
//       </div>
//     </Modal>
//     <Modal open={isTimerModalOpen} onClose={() => setIsTimerModalOpen(false)}>
//         <h2 className="text-lg font-bold mb-4">Chatbot Timer Settings</h2>

//         {/* Timeout Settings */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium">
//             If user does not reply more than
//           </label>
//           <div className="flex items-center gap-2">
//             <input
//               type="number"
//               value={timeoutMinutes}
//               onChange={(e) => setTimeoutMinutes(Number(e.target.value))}
//               className="w-16 border rounded px-2 py-1"
//               min={1}
//             />
//             <span>minutes, the chatbot will end automatically.</span>
//           </div>
//         </div>

//         {/* Enable Exit Notification */}
//         <div className="mb-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="checkbox"
//               checked={isExitNotificationEnabled}
//               onChange={(e) => setIsExitNotificationEnabled(e.target.checked)}
//               className="form-checkbox text-green-500"
//             />
//             <span>Enable exit chatbot notification</span>
//           </label>
//         </div>

//         {/* Exit Notification Settings */}
//         {isExitNotificationEnabled && (
//           <>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">
//                 Exit chatbot notification:
//               </label>
//               <textarea
//                 value={exitNotificationMessage}
//                 onChange={(e) => setExitNotificationMessage(e.target.value)}
//                 className="w-full p-2 border rounded resize-none"
//                 rows={4}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-sm font-medium">
//                 This exit chatbot notification will show
//               </label>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="number"
//                   value={exitNotificationMinutes}
//                   onChange={(e) =>
//                     setExitNotificationMinutes(Number(e.target.value))
//                   }
//                   className="w-16 border rounded px-2 py-1"
//                   min={1}
//                 />
//                 <span>minutes before the chatbot ends.</span>
//               </div>
//             </div>
//           </>
//         )}

//         {/* Save Button */}
//         <button
//           onClick={handleSave}
//           className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
//         >
//           Save
//         </button>
//       </Modal>
//     </div>
//   );
// };

// export default MyBots;
import React, { useEffect, useState } from 'react';
import Modal from '../../components/ui/modal';
import * as Dialog from '@radix-ui/react-dialog';
import Pagination from '../../components/ui/pagination';
import { Icons } from '@/assets/Icons';
import toast from 'react-hot-toast';
import api from '@/configs/api'; // Your API interceptor

const MyBots: React.FC = () => {
  const [chatbots, setChatbots] = useState([]); // Store chatbots fetched from the API
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredData = chatbots.filter((bot: any) =>
    bot.name.toLowerCase().includes(search.toLowerCase())
  );

  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const fetchChatbots = async (page: number, limit: number = 10) => {
    try {
      const response = await api.get('nodes/chatbots', {
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
      await api.delete(`/chatbots/${id}`);
      toast.success('Chatbot deleted successfully');
      fetchChatbots(1,10); // Refresh the chatbot list
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
    fetchChatbots(); // Fetch chatbots on component mount
  }, []);

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
            <tr key={bot.id} className="border-t">
              <td className="p-4">{bot.name}</td>
              <td className="p-4">{bot.triggered || 0}</td>
              <td className="p-4">{bot.stepsFinished || 0}</td>
              <td className="p-4">{bot.finished || 0}</td>
              <td className="p-4">{bot.updatedAt}</td>
              <td className="flex items-center justify-center p-4">
                <button
                  className="bg-slate-200 rounded-2xl p-2 mr-1"
                  onClick={() => toast.success('Edit chatbot functionality pending')}
                >
                  <Icons.edit className="size-5" strokeWidth="1" />
                </button>
                <button
                  className="bg-slate-200 rounded-2xl p-2"
                  onClick={() => setDeleteModalOpen(true)}
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

      <Modal open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Dialog.Title className="text-xl font-bold mb-4">Confirm</Dialog.Title>
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
              handleDeleteChatbot(1); // Replace with the chatbot ID
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
