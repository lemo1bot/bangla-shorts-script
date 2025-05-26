
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
      <p className="ml-4 text-lg text-gray-700">লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
    </div>
  );
};
