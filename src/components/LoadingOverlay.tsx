import { FileVideo } from 'lucide-react';
import { useApp } from './AppContext';

export const LoadingOverlay = () => {
  const { darkMode } = useApp();
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className={`rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-6 max-w-sm mx-4 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="relative">
          <div className={`w-16 h-16 border-4 rounded-full animate-spin ${
            darkMode 
              ? 'border-gray-600 border-t-blue-400' 
              : 'border-blue-200 border-t-blue-600'
          }`}></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <FileVideo className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
        </div>
        <div className="text-center">
          <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Processing Video
          </h3>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
            Our AI is analyzing your video. This may take a few moments...
          </p>
        </div>
        <div className={`w-full rounded-full h-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
          <div className={`h-2 rounded-full animate-pulse ${
            darkMode ? 'bg-blue-400' : 'bg-blue-600'
          }`} style={{ width: '65%' }}></div>
        </div>
      </div>
    </div>
  );
};
