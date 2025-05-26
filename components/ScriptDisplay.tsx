
import React from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';

interface ScriptDisplayProps {
  script: string;
  onCopy: () => void;
}

export const ScriptDisplay: React.FC<ScriptDisplayProps> = ({ script, onCopy }) => {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          তৈরিকৃত স্ক্রিপ্ট (Generated Script)
        </h2>
        <button
          onClick={onCopy}
          className="p-2 text-sm text-primary hover:text-primary-dark bg-primary-light/20 hover:bg-primary-light/40 rounded-md transition-colors duration-150 flex items-center"
          title="স্ক্রিপ্ট কপি করুন"
        >
          <ClipboardIcon className="h-5 w-5 mr-1" />
          কপি
        </button>
      </div>
      <div className="bg-gray-50 p-4 border border-gray-200 rounded-lg shadow-inner max-h-96 overflow-y-auto custom-scroll">
        <pre className="whitespace-pre-wrap text-gray-700 text-base leading-relaxed">
          {script}
        </pre>
      </div>
    </div>
  );
};
