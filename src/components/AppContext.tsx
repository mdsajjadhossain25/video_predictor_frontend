import React, { createContext, useContext, useState, useEffect } from 'react';

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

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
