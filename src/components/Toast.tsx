import { useEffect } from 'react';
import { CheckCircle, AlertTriangle, Bell, X } from 'lucide-react';
import { useApp } from './AppContext';

export const Toast = ({ notification }: { notification: { id: number; message: string; type: 'info' | 'success' | 'error' | 'warning' } }) => {
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
