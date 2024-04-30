// DeleteConfirmationModal.js
import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, task }) => {
    console.log('isOpen:', isOpen);
    console.log('task:', task);
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white p-4 rounded shadow-md">
        <p>Are you sure you want to delete "{task}"?</p>
        <div className="mt-4 flex justify-end">
          <button className="mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={onConfirm}>
            Delete
          </button>
          <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;