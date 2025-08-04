import React, { useState, useContext, createContext, useEffect, useRef } from 'react';
import { ChevronDown, Upload, BarChart3, History, User, Menu, X, Bell, Sun, Moon, Download, Search, Filter, LogOut, Settings, Home, FileVideo, Clock, CheckCircle, AlertTriangle, Eye, Share2, TrendingUp, Camera } from 'lucide-react';

// Context for global state
const AppContext = createContext<{
  user: { name: string; email: string; avatar: string; bio?: string; phone?: string; company?: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ name: string; email: string; avatar: string; bio?: string; phone?: string; company?: string } | null>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  notifications: { id: number; message: string; type: 'info' | 'success' | 'error' | 'warning' }[];
  addNotification: (message: string, type?: 'info' | 'success' | 'error' | 'warning') => void;
  removeNotification: (id: number) => void;
  predictions: {
    id: number;
    name: string;
    date: string;
    status: string;
    confidence: number;
    result: string;
    labels: string[];
  }[];
  setPredictions: React.Dispatch<React.SetStateAction<{
    id: number;
    name: string;
    date: string;
    status: string;
    confidence: number;
    result: string;
    labels: string[];
  }[]>>;
}>({
  user: null,
  setUser: () => {},
  darkMode: false,
  setDarkMode: () => {},
  loading: false,
  setLoading: () => {},
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {},
  predictions: [],
  setPredictions: () => {}
});

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
  });
  
  // Initialize dark mode from localStorage
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'info' | 'success' | 'error' | 'warning' }[]>([]);
  const [predictions, setPredictions] = useState([
    {
      id: 1,
      name: 'sample_video_1.mp4',
      date: '2025-08-01',
      status: 'completed',
      confidence: 0.95,
      result: 'https://example.com/result1.mp4',
      labels: ['Object Detection', 'High Confidence']
    },
    {
      id: 2,
      name: 'test_footage.mp4',
      date: '2025-07-30',
      status: 'completed',
      confidence: 0.87,
      result: 'https://example.com/result2.mp4',
      labels: ['Motion Analysis', 'Medium Confidence']
    }
  ]);

  // Save dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const addNotification = (message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      darkMode,
      setDarkMode,
      loading,
      setLoading,
      notifications,
      addNotification,
      removeNotification,
      predictions,
      setPredictions
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Toast Notification Component
const Toast = ({ notification }: { notification: { id: number; message: string; type: 'info' | 'success' | 'error' | 'warning' } }) => {
  const { removeNotification, darkMode } = useApp();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [notification.id, removeNotification]);

  const getToastStyles = () => {
    if (darkMode) {
      switch (notification.type) {
        case 'success':
          return 'bg-green-900/80 border-green-700 text-green-300';
        case 'error':
          return 'bg-red-900/80 border-red-700 text-red-300';
        case 'warning':
          return 'bg-yellow-900/80 border-yellow-700 text-yellow-300';
        case 'info':
          return 'bg-blue-900/80 border-blue-700 text-blue-300';
        default:
          return 'bg-gray-800/80 border-gray-600 text-gray-300';
      }
    } else {
      switch (notification.type) {
        case 'success':
          return 'bg-green-50 border-green-200 text-green-800';
        case 'error':
          return 'bg-red-50 border-red-200 text-red-800';
        case 'warning':
          return 'bg-yellow-50 border-yellow-200 text-yellow-800';
        case 'info':
          return 'bg-blue-50 border-blue-200 text-blue-800';
        default:
          return 'bg-gray-50 border-gray-200 text-gray-800';
      }
    }
  };

  const getIcon = () => {
    const iconClass = darkMode ? 'w-5 h-5' : 'w-5 h-5';
    switch (notification.type) {
      case 'success':
        return <CheckCircle className={`${iconClass} ${darkMode ? 'text-green-400' : 'text-green-600'}`} />;
      case 'error':
        return <AlertTriangle className={`${iconClass} ${darkMode ? 'text-red-400' : 'text-red-600'}`} />;
      case 'warning':
        return <AlertTriangle className={`${iconClass} ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />;
      case 'info':
        return <Bell className={`${iconClass} ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />;
      default:
        return <Bell className={`${iconClass} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />;
    }
  };

  return (
    <div className={`
      flex items-center justify-between p-4 rounded-xl border shadow-lg backdrop-blur-sm
      animate-in slide-in-from-right-5 duration-300 min-w-80
      ${getToastStyles()}
    `}>
      <div className="flex items-center gap-3">
        {getIcon()}
        <p className="font-medium">{notification.message}</p>
      </div>
      <button
        onClick={() => removeNotification(notification.id)}
        className={`p-1 rounded-lg transition-colors ${
          darkMode 
            ? 'hover:bg-white hover:bg-opacity-10' 
            : 'hover:bg-black hover:bg-opacity-10'
        }`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Loading Overlay Component
const LoadingOverlay = () => {
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

// Navbar Component
const Navbar: React.FC<{ 
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

// Sidebar Component
const Sidebar: React.FC<{
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

// Dashboard Page
const DashboardPage = () => {
  const { predictions, darkMode } = useApp();
  
  const stats = [
    { 
      label: 'Total Predictions', 
      value: predictions.length, 
      icon: BarChart3, 
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      darkBgColor: 'dark:bg-blue-900/20',
      darkTextColor: 'dark:text-blue-400'
    },
    { 
      label: 'Completed', 
      value: predictions.filter(p => p.status === 'completed').length, 
      icon: CheckCircle, 
      color: 'bg-gradient-to-r from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      darkBgColor: 'dark:bg-green-900/20',
      darkTextColor: 'dark:text-green-400'
    },
    { 
      label: 'Processing', 
      value: predictions.filter(p => p.status === 'processing').length, 
      icon: Clock, 
      color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      darkBgColor: 'dark:bg-yellow-900/20',
      darkTextColor: 'dark:text-yellow-400'
    },
    { 
      label: 'Average Confidence', 
      value: `${(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length * 100).toFixed(1)}%`, 
      icon: BarChart3, 
      color: 'bg-gradient-to-r from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      darkBgColor: 'dark:bg-purple-900/20',
      darkTextColor: 'dark:text-purple-400'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className={`rounded-2xl p-8 shadow-sm border transition-colors ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Dashboard Overview
            </h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Monitor your video prediction analytics and performance
            </p>
          </div>
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
            <BarChart3 className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`rounded-2xl p-6 shadow-sm border hover:shadow-md transition-all ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${darkMode ? stat.darkBgColor : stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${darkMode ? stat.darkTextColor : stat.textColor}`} />
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </div>
                </div>
              </div>
              <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </h3>
              <div className={`h-1 ${stat.color} rounded-full mt-3`}></div>
            </div>
          );
        })}
      </div>

      {/* Recent Predictions */}
      <div className={`rounded-2xl shadow-sm border transition-colors ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-100'
      }`}>
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Predictions
              </h2>
              <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Latest video analysis results
              </p>
            </div>
            <button className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
              darkMode 
                ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}>
              View All
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          {predictions.slice(0, 3).map(pred => (
            <div key={pred.id} className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${
                  darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <FileVideo className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {pred.name}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {pred.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  pred.status === 'completed' 
                    ? darkMode 
                      ? 'bg-green-900/30 text-green-400' 
                      : 'bg-green-100 text-green-700'
                    : darkMode 
                      ? 'bg-yellow-900/30 text-yellow-400' 
                      : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {pred.status}
                </span>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {(pred.confidence * 100).toFixed(1)}%
                </span>
                <button className={`text-sm font-medium transition-colors ${
                  darkMode 
                    ? 'text-blue-400 hover:text-blue-300' 
                    : 'text-blue-600 hover:text-blue-700'
                }`}>
                  View →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Upload & Predict Page
const UploadPage = () => {
  const { setLoading, addNotification, setPredictions, predictions, darkMode } = useApp();
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!file) {
      addNotification('Please select a video file first', 'warning');
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate API call
    setTimeout(() => {
      const newPrediction = {
        id: predictions.length + 1,
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        status: 'completed',
        confidence: Math.random() * 0.3 + 0.7,
        result: 'https://example.com/result_new.mp4',
        labels: ['Object Detection', 'High Confidence']
      };
      
      setPredictions([newPrediction, ...predictions]);
      setLoading(false);
      setUploadProgress(0);
      setFile(null);
      addNotification('Prediction completed successfully!', 'success');
    }, 3000);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className={`rounded-2xl p-8 shadow-sm border transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Upload & Predict
              </h1>
              <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Upload your video files to get AI-powered predictions and analysis. 
                Our advanced algorithms will process your content and provide detailed insights.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <Upload className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className={`rounded-2xl shadow-sm border p-8 transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all ${
              dragActive 
                ? darkMode
                  ? 'border-blue-400 bg-blue-900/20' 
                  : 'border-blue-400 bg-blue-50'
                : darkMode
                  ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-700/50'
                  : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <Upload className={`w-10 h-10 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Drop your video files here
            </h3>
            <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              or click to browse from your computer
            </p>
            <label className="inline-block">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <span className={`px-8 py-3 rounded-xl cursor-pointer transition-colors font-medium inline-flex items-center gap-2 ${
                darkMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                <Upload className="w-4 h-4" />
                Choose Video File
              </span>
            </label>
            <p className={`text-xs mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              Supports MP4, AVI, MOV, WMV (Max 100MB)
            </p>
          </div>

          {/* File Preview */}
          {file && (
            <div className={`mt-8 p-6 rounded-xl ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${
                    darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                  }`}>
                    <FileVideo className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {file.name}
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {(file.size / (1024 * 1024)).toFixed(2)} MB • {file.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setFile(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-600 text-gray-400' 
                      : 'hover:bg-gray-200 text-gray-500'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <div className={`mt-6 p-6 rounded-xl ${
              darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
            }`}>
              <div className={`flex justify-between text-sm mb-3 ${
                darkMode ? 'text-blue-300' : 'text-blue-800'
              }`}>
                <span className="font-medium">Uploading and processing...</span>
                <span className="font-bold">{uploadProgress}%</span>
              </div>
              <div className={`w-full rounded-full h-2 ${
                darkMode ? 'bg-blue-800/50' : 'bg-blue-200'
              }`}>
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 text-center">
            <button
              onClick={handlePredict}
              disabled={!file}
              className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                file
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {file ? 'Start AI Analysis' : 'Select a video file first'}
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-6 rounded-xl border text-center transition-colors ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-green-900/30' : 'bg-green-100'
            }`}>
              <CheckCircle className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Fast Processing
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get results in seconds with our optimized AI models
            </p>
          </div>
          <div className={`p-6 rounded-xl border text-center transition-colors ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
            }`}>
              <BarChart3 className={`w-6 h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Accurate Analysis
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              High-precision predictions with confidence scores
            </p>
          </div>
          <div className={`p-6 rounded-xl border text-center transition-colors ${
            darkMode 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-100'
          }`}>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
            }`}>
              <FileVideo className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Multiple Formats
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Support for all popular video file formats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Prediction Results Page
const ResultsPage = () => {
  const { predictions, darkMode } = useApp();
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const filteredResults = predictions.filter(prediction => {
    if (filter === 'all') return true;
    if (filter === 'completed') return prediction.status === 'completed';
    if (filter === 'processing') return prediction.status === 'processing';
    return true;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className={`rounded-2xl p-8 shadow-sm border transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Prediction Results
                </h1>
                <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                  View and analyze your AI prediction results
                </p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                <BarChart3 className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex gap-2 mt-6 md:mt-0">
              {['all', 'completed', 'processing'].map((filterOption) => (
                <button
                  key={filterOption}
                  onClick={() => setFilter(filterOption)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    filter === filterOption
                      ? 'bg-blue-600 text-white shadow-lg'
                      : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {filterOption}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredResults.length === 0 ? (
          <div className="text-center py-16">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <BarChart3 className={`w-12 h-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No Results Found
            </h3>
            <p className={`max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {filter === 'all' 
                ? "Upload a video to see your prediction results here"
                : `No ${filter} predictions found`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResults.map((result) => (
              <div
                key={result.id}
                className={`rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-100'
                }`}
                onClick={() => setSelectedResult(result)}
              >
                {/* Result Header */}
                <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                      }`}>
                        <FileVideo className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {result.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {result.date}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      result.status === 'completed' 
                        ? darkMode
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-green-100 text-green-800'
                        : darkMode
                          ? 'bg-yellow-900/30 text-yellow-400'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {result.status}
                    </span>
                  </div>

                  {/* Confidence Score */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Confidence Score
                      </span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(result.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-2 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}>
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                        style={{ width: `${result.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="flex flex-wrap gap-2">
                    {result.labels.map((label: string, index: number) => (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          darkMode 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`p-4 flex gap-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className={`flex-1 px-3 py-2 border rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-600' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                  }`}>
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {filteredResults.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className={`p-6 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                }`}>
                  <BarChart3 className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Total Predictions
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {predictions.length}
              </p>
            </div>

            <div className={`p-6 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-green-900/30' : 'bg-green-100'
                }`}>
                  <CheckCircle className={`w-5 h-5 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Completed
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {predictions.filter(p => p.status === 'completed').length}
              </p>
            </div>

            <div className={`p-6 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'
                }`}>
                  <Clock className={`w-5 h-5 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Processing
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {predictions.filter(p => p.status === 'processing').length}
              </p>
            </div>

            <div className={`p-6 rounded-xl border transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${
                  darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                }`}>
                  <TrendingUp className={`w-5 h-5 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Avg. Confidence
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {predictions.length > 0 
                  ? (predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length * 100).toFixed(1)
                  : 0
                }%
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Result Detail Modal */}
      {selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between ${
              darkMode ? 'border-gray-700' : 'border-gray-100'
            }`}>
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Prediction Details
              </h3>
              <button
                onClick={() => setSelectedResult(null)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-400' 
                    : 'hover:bg-gray-100 text-gray-500'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* File Info */}
              <div>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  File Information
                </h4>
                <div className={`p-4 rounded-xl space-y-2 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      File Name:
                    </span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedResult.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Process Date:
                    </span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedResult.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Status:
                    </span>
                    <span className={`font-medium capitalize ${
                      selectedResult.status === 'completed' 
                        ? darkMode ? 'text-green-400' : 'text-green-600'
                        : darkMode ? 'text-yellow-400' : 'text-yellow-600'
                    }`}>
                      {selectedResult.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              <div>
                <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Analysis Results
                </h4>
                <div className={`p-4 rounded-xl space-y-4 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                }`}>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                        Confidence Score
                      </span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(selectedResult.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className={`w-full rounded-full h-3 ${
                      darkMode ? 'bg-gray-600' : 'bg-gray-200'
                    }`}>
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full"
                        style={{ width: `${selectedResult.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <span className={`block mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Detected Labels:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedResult.labels.map((label: string, index: number) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            darkMode 
                              ? 'bg-blue-900/30 text-blue-300' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Result
                </button>
                <button className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                  darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// History Page
const HistoryPage = () => {
  const { predictions, darkMode } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  const filteredPredictions = predictions.filter(pred => {
    const matchesSearch = pred.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || pred.status === filterStatus;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'confidence') return b.confidence - a.confidence;
    return 0;
  });

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className={`rounded-2xl p-8 shadow-sm border transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Prediction History
              </h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Track and manage all your video prediction history
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <History className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`rounded-2xl border p-6 mb-8 transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <input
                type="text"
                placeholder="Search by video name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <div className="relative">
                <Filter className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`pl-10 pr-8 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="all">All Status</option>
                  <option value="completed">Completed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`pl-4 pr-8 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="date">Sort by Date</option>
                  <option value="name">Sort by Name</option>
                  <option value="confidence">Sort by Confidence</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredPredictions.length === 0 ? (
          <div className="text-center py-16">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <Clock className={`w-12 h-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No History Found
            </h3>
            <p className={`max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm 
                ? `No predictions found matching "${searchTerm}"`
                : "Start uploading videos to see your prediction history here"
              }
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className={`hidden lg:block rounded-2xl border overflow-hidden transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`border-b ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600' 
                      : 'bg-gray-50 border-gray-100'
                  }`}>
                    <tr>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Video Details
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Date & Status
                      </th>
                      <th className={`px-6 py-4 text-left text-sm font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        Performance
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Labels
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredPredictions.map(pred => (
                      <tr key={pred.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-lg">
                              <FileVideo className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900 truncate max-w-xs">{pred.name}</p>
                              <p className="text-sm text-gray-500">Video File</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{pred.date}</p>
                            <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                              pred.status === 'completed'
                                ? 'bg-green-100 text-green-800'
                                : pred.status === 'processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {pred.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-semibold text-gray-900">
                                {(pred.confidence * 100).toFixed(1)}%
                              </span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${pred.confidence * 100}%` }}
                                ></div>
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">Confidence Score</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {pred.labels.slice(0, 2).map((label: string, index: number) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                              >
                                {label}
                              </span>
                            ))}
                            {pred.labels.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                                +{pred.labels.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
              {filteredPredictions.map(pred => (
                <div key={pred.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg">
                        <FileVideo className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 truncate">{pred.name}</h3>
                        <p className="text-sm text-gray-500">{pred.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      pred.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : pred.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {pred.status}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Confidence Score</span>
                      <span className="font-semibold text-gray-900">
                        {(pred.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${pred.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {pred.labels.map((label: string, index: number) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Previous
                </button>
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">1</span>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  2
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  3
                </button>
                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Profile Page
const ProfilePage = () => {
  const { user, setUser, addNotification, predictions, darkMode } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
    phone: user?.phone || '',
    company: user?.company || ''
  });

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        ...formData
      });
      setIsEditing(false);
      addNotification('Profile updated successfully!', 'success');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
      phone: user?.phone || '',
      company: user?.company || ''
    });
    setIsEditing(false);
  };

  const stats = {
    totalPredictions: predictions.length,
    completedPredictions: predictions.filter(p => p.status === 'completed').length,
    averageConfidence: predictions.length > 0 
      ? (predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length * 100).toFixed(1)
      : 0
  };

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className={`rounded-2xl p-8 shadow-sm border transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-100'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Profile Settings
              </h1>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Manage your account information and preferences
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <User className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className={`rounded-2xl border p-8 text-center transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="relative inline-block mb-6">
                <img
                  src={user?.avatar}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
                />
                <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {user?.name}
              </h2>
              <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {user?.email}
              </p>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-700' : 'bg-blue-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Predictions
                    </span>
                    <span className={`font-bold text-lg ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {stats.totalPredictions}
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-700' : 'bg-green-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Completed
                    </span>
                    <span className={`font-bold text-lg ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}>
                      {stats.completedPredictions}
                    </span>
                  </div>
                </div>
                <div className={`p-4 rounded-xl ${
                  darkMode ? 'bg-gray-700' : 'bg-purple-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Avg. Confidence
                    </span>
                    <span className={`font-bold text-lg ${
                      darkMode ? 'text-purple-400' : 'text-purple-600'
                    }`}>
                      {stats.averageConfidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className={`rounded-2xl border p-8 transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                  }`}>
                    <User className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Personal Information
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isEditing
                      ? darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  ) : (
                    <p className={`py-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {user?.name}
                    </p>
                  )}
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  ) : (
                    <p className={`py-3 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {user?.email}
                    </p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={handleSave}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'upload':
        return <UploadPage />;
      case 'results':
        return <ResultsPage />;
      case 'history':
        return <HistoryPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <AppProvider>
      <AppContent 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        renderPage={renderPage}
      />
    </AppProvider>
  );
};

// App Content Component (needs to be separate to use context)
const AppContent: React.FC<{
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  renderPage: () => React.ReactNode;
}> = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen, renderPage }) => {
  const { loading, notifications, darkMode } = useApp();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      {loading && <LoadingOverlay />}
      
      <Navbar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        setCurrentPage={setCurrentPage}
      />
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        sidebarOpen={sidebarOpen}
      />
      
      <main className={`transition-all duration-300 pt-16 lg:ml-64`}>
        {renderPage()}
      </main>

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {notifications.map(notification => (
          <Toast key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
};

export default App;
