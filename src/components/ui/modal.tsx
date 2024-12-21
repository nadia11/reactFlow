import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <Dialog.Root open={true}>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-md">
        <Dialog.Title className="text-xl font-bold mb-4">Add New Chatbot</Dialog.Title>
        <form>
          <div className="mb-4">
            <label htmlFor="chatbotName" className="block mb-2 text-gray-700">
              Chatbot Name
            </label>
            <input
              type="text"
              id="chatbotName"
              placeholder="Chatbot Name"
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
        >
          X
        </button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
