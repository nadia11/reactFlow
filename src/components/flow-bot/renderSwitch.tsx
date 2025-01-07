import React, { useState, useEffect } from 'react';
import { useNodeStore } from '@/store/node-data';
import { NodeType } from '@/types';
import MessageForm from '../form/message-form';
import ButtonsForm from '../form/buttons-form';
import CardForm from '../form/card-form';
import Modal from '../ui/modal'; // Your reusable modal component

export const RenderSwitch = () => {
  const { state, dispatch } = useNodeStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    dispatch({ type: 'SET_SELECTED_NODE', payload: null }); // Clear the selected node
  };
  // Automatically open the modal when a node is selected
  useEffect(() => {
    if (state.selectedNode) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [state.selectedNode]);

  const renderForm = () => {
    switch (state.selectedNode?.type) {
      case NodeType.MESSAGE:
        return <MessageForm onClose={handleCloseModal}/>;
      case NodeType.BUTTONS:
        return <ButtonsForm onClose={handleCloseModal}/>;
      case NodeType.CARD:
        return <CardForm onClose={handleCloseModal}/>;
      default:
        return <p className="text-gray-500">No node selected</p>;
    }
  };

  return (
    <div>
      {/* Modal Component */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        {renderForm()}
      </Modal>
    </div>
  );
};

