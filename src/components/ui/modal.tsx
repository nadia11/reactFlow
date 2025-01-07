import React from 'react';
import { Icons } from '@/assets/Icons';
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  position?: 'center' | 'right'; // 'center' for middle modal, 'right' for right-aligned modal
}

const Modal: React.FC<ModalProps> = ({ open, onClose, children, position = 'center' }) => {
  if (!open) return null; // Don't render the modal if it's not open

  return (
<div
  className={`fixed inset-0 z-50 flex ${
    position === 'center' ? 'items-center justify-center' : 'items-end justify-end'
  }`}
  style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
  onClick={onClose} // Close modal on overlay click
>
      <div
        className={`relative bg-white rounded shadow-lg ${
          position === 'center'
            ? 'p-6 w-full max-w-lg transform'
            : 'p-6 h-full w-80 right-0 top-0'
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing on modal content click
      >
        {children}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <Icons.close/>
        </button>
      </div>
    </div>
  );
};

export default Modal;
