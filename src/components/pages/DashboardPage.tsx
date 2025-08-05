import { BarChart3, CheckCircle, Clock, FileVideo } from 'lucide-react';
import { useApp } from '../AppContext';

export const DashboardPage = () => {
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
