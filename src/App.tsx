import React, { useState } from 'react';
import { AppProvider, useApp } from './components/AppContext';
import { Toast } from './components/Toast';
import { LoadingOverlay } from './components/LoadingOverlay';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './components/pages/DashboardPage';
import { UploadPage } from './components/pages/UploadPage';
import { ResultsPage } from './components/pages/ResultsPage';
import { HistoryPage } from './components/pages/HistoryPage';
import { ProfilePage } from './components/pages/ProfilePage';

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
