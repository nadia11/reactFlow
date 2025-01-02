// // import React from 'react';
// // import * as Dialog from '@radix-ui/react-dialog';
// // import { Icons } from '@/assets/Icons';
// // interface ModalProps {
// //   open: boolean;
// //   onClose: () => void;
// //   children: React.ReactNode;
// // }

// // const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
// //   return (
// //     <Dialog.Root open={open} onOpenChange={onClose}>
// //       <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
// //       <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg w-full max-w-2xl">
// //         {children}
// //         <button
// //           onClick={onClose}
// //           className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
// //         >
// //           <Icons.close/>
// //         </button>
// //       </Dialog.Content>
// //     </Dialog.Root>
// //   );
// // };

// // export default Modal;
// import React from 'react';
// import * as Dialog from '@radix-ui/react-dialog';
// import { Icons } from '@/assets/Icons';

// interface ModalProps {
//   open: boolean;
//   onClose: () => void;
//   children: React.ReactNode;
//   position?: 'center' | 'right'; // Added position prop
// }

// const Modal: React.FC<ModalProps> = ({ open, onClose, children, position = 'center' }) => {
//   const isCenter = position === 'center';
//   const isLeft = position === 'right';

//   return (
//     <Dialog.Root open={open} onOpenChange={onClose}>
//       <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-30" />
//       <Dialog.Content
//         className={`
//           ${isCenter ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' : ''}
//           ${isLeft ? 'fixed top-0 left-0 h-full w-80' : ''}
//           bg-white p-6 rounded shadow-lg
//         `}
//       >
//         {children}
//         <button
//           onClick={onClose}
//           className={`absolute ${isCenter ? 'top-2 right-2' : 'top-4 right-4'} text-gray-700 hover:text-gray-900`}
//         >
//           <Icons.close />
//         </button>
//       </Dialog.Content>
//     </Dialog.Root>
//   );
// };

// export default Modal;
import React from 'react';

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
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
