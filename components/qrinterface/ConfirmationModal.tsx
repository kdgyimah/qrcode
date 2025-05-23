'use client';

import React from 'react';

interface ConfirmationModalProps {
  onDiscard: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({ onDiscard, onCancel }: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
        <h4 className="text-lg font-semibold mb-2">Unsaved Data</h4>
        <p className="text-sm text-gray-600 mb-4">
          Do you want to discard the changes and switch to the new feature?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            onClick={onDiscard}
          >
            Discard
          </button>
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
