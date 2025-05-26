
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputSectionProps {
  topic: string;
  onTopicChange: (topic: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ topic, onTopicChange, onSubmit, isLoading }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="topicInput" className="block text-lg font-medium text-gray-800 mb-1">
          আপনার ভিডিওর বিষয় (Your Video Topic)
        </label>
        <textarea
          id="topicInput"
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition duration-150 ease-in-out custom-scroll"
          placeholder="যেমন: বাংলাদেশের সবচেয়ে বড় ধোঁকা..."
          value={topic}
          onChange={(e) => onTopicChange(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white 
                     ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark'}
                     transition duration-150 ease-in-out`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            জেনারেট হচ্ছে...
          </>
        ) : (
          <>
            <SparklesIcon className="h-5 w-5 mr-2" />
            স্ক্রিপ্ট তৈরি করুন (Generate Script)
          </>
        )}
      </button>
    </div>
  );
};
