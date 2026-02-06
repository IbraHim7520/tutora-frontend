import React from 'react';
import { Spinner } from '../ui/spinner';

const CustomLoader = () => {
  return (
    /** * h-screen ebong w-full screen-er thik majhkane niye ashbe.
     * bg-white/50 backdrop-blur-sm use kora hoyeche jate background halka dekha jay (jodi dorkar hoy).
     */
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md transition-opacity duration-300">
      <div className="flex flex-col items-center space-y-4 animate-in fade-in zoom-in duration-500">
        
        {/* Spinner Box */}
        <div className="relative flex items-center justify-center">
          {/* Outer Ring Animation (Optional visual flair) */}
          <div className="absolute h-16 w-16 animate-ping rounded-full bg-indigo-100 opacity-75"></div>
          
          <Spinner className="size-10 text-indigo-600 relative z-10" />
        </div>

        {/* Loading Text with subtle pulse */}
        <div className="text-center">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight animate-pulse">
            Loading Content
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            Please wait a moment...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;