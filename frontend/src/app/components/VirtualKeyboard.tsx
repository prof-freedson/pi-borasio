'use client';

import React from 'react';
import { X } from 'lucide-react';

interface VirtualKeyboardProps {
  onClose: () => void;
  onKeyPress: (key: string) => void;
}

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ onClose, onKeyPress }) => {
  const keyRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ['ESPAÇO'],
  ];

  const handleKeyPress = (key: string) => {
    if (key === 'ESPAÇO') {
      onKeyPress(' ');
    } else {
      onKeyPress(key);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100002] bg-gray-200 dark:bg-gray-800 p-4 shadow-lg rounded-t-lg animate-slide-up">
      <div className="flex justify-end mb-2">
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
          aria-label="Fechar teclado virtual"
        >
          <X size={20} />
        </button>
      </div>
      <div className="space-y-2">
        {keyRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-2">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyPress(key)}
                className={`p-2 rounded-md font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-sm transition-all ${key === 'ESPAÇO' ? 'flex-grow' : 'w-12 h-12 flex items-center justify-center'}`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VirtualKeyboard;