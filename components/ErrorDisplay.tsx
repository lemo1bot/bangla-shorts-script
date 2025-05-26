
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onClose?: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onClose }) => {
  return (
    <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow relative" role="alert">
      <strong className="font-bold">ত্রুটি! (Error!)</strong>
      <span className="block sm:inline ml-2">{message}</span>
      {onClose && (
         <button 
            onClick={onClose} 
            className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700 hover:text-red-900"
            aria-label="Close error message"
          >
          <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>বন্ধ করুন</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
        </button>
      )}
    </div>
  );
};
