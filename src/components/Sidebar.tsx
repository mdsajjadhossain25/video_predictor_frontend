import { Home, Upload, BarChart3, History, User } from 'lucide-react';
import { useApp } from './AppContext';

export const Sidebar: React.FC<{
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
}> = ({ currentPage, setCurrentPage, sidebarOpen }) => {
  const { darkMode } = useApp();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, description: 'Overview & Stats' },
    { id: 'upload', label: 'Upload & Predict', icon: Upload, description: 'Analyze Videos' },
    { id: 'results', label: 'Results', icon: BarChart3, description: 'View Predictions' },
    { id: 'history', label: 'History', icon: History, description: 'Past Analyses' },
    { id: 'profile', label: 'Profile', icon: User, description: 'Account Settings' }
  ];

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => {}}
        />
      )}
      
      <aside className={`fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 border-r transform transition-all duration-300 z-40 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 shadow-lg lg:shadow-none ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="p-6">
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Navigation
            </h2>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage your video predictions
            </p>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    currentPage === item.id
                      ? darkMode
                        ? 'bg-blue-900/50 text-blue-300 border border-blue-700 shadow-sm'
                        : 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                      : darkMode
                        ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    currentPage === item.id 
                      ? darkMode
                        ? 'bg-blue-800' 
                        : 'bg-blue-100'
                      : darkMode
                        ? 'bg-gray-600 group-hover:bg-gray-500'
                        : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">{item.label}</p>
                    <p className="text-xs opacity-75">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </nav>
          
          <div className={`mt-8 p-4 rounded-xl border ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-700 to-gray-600 border-gray-600' 
              : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-gray-600' : 'bg-blue-100'
              }`}>
                <BarChart3 className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Quick Stats
              </h3>
            </div>
            <div className={`space-y-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <div className="flex justify-between">
                <span>Total Videos</span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex justify-between">
                <span>Completed</span>
                <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>2</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
