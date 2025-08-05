import { useState, useRef, useEffect } from 'react';
import { FileVideo, Bell, Sun, Moon, User, Settings, LogOut, ChevronDown, X, Menu } from 'lucide-react';
import { useApp } from './AppContext';

export const Navbar: React.FC<{ 
  sidebarOpen: boolean; 
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}> = ({ sidebarOpen, setSidebarOpen, setCurrentPage }) => {
  const { user, darkMode, setDarkMode, addNotification } = useApp();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={`shadow-lg border-b px-6 py-4 fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-700'
            }`}
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileVideo className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Video Predictor
              </h1>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                AI-Powered Analysis
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              addNotification('You have 3 new notifications', 'info');
            }}
            className={`relative p-3 rounded-full transition-colors ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button
            onClick={() => {
              setDarkMode(!darkMode);
              addNotification(`${!darkMode ? 'Dark' : 'Light'} mode enabled`, 'success');
            }}
            className={`p-3 rounded-full transition-colors ${
              darkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <img src={user?.avatar} alt="User" className="w-10 h-10 rounded-full border-2 border-gray-200" />
              <div className="hidden sm:block text-left">
                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {user?.name || 'Guest'}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {user?.email}
                </p>
              </div>
              <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            </button>

            {dropdownOpen && (
              <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-lg border py-2 z-50 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className={`px-4 py-3 border-b ${
                  darkMode 
                    ? 'border-gray-700' 
                    : 'border-gray-100'
                }`}>
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setCurrentPage('profile');
                    setDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700 text-gray-300' 
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <User className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className="text-sm">Profile Settings</span>
                </button>
                <button className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}>
                  <Settings className={`w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className="text-sm">App Settings</span>
                </button>
                <hr className={`my-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />
                <button className={`w-full px-4 py-3 text-left flex items-center gap-3 text-red-600 transition-colors ${
                  darkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'
                }`}>
                  <LogOut className="w-4 h-4" />
                  <span className="text-sm">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
