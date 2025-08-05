import { useState } from 'react';
import { History, Search, Calendar, FileVideo, Eye, Download, Trash2 } from 'lucide-react';
import { useApp } from '../AppContext';

export const HistoryPage = () => {
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
                Browse and manage all your past video analyses
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
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
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

        {/* Results */}
        {filteredPredictions.length === 0 ? (
          <div className="text-center py-16">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}>
              <History className={`w-12 h-12 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              No History Found
            </h3>
            <p className={`max-w-md mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm || filterStatus !== 'all' 
                ? "No predictions match your search criteria"
                : "Upload your first video to start building your prediction history"
              }
            </p>
          </div>
        ) : (
          <>
            {/* Results List */}
            <div className="space-y-4">
              {filteredPredictions.map((prediction) => (
                <div
                  key={prediction.id}
                  className={`rounded-2xl border p-6 hover:shadow-lg transition-all duration-300 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700' 
                      : 'bg-white border-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`p-3 rounded-xl ${
                        darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                      }`}>
                        <FileVideo className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {prediction.name}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            prediction.status === 'completed' 
                              ? darkMode
                                ? 'bg-green-900/30 text-green-400'
                                : 'bg-green-100 text-green-800'
                              : darkMode
                                ? 'bg-yellow-900/30 text-yellow-400'
                                : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {prediction.status}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className={`w-4 h-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                              {prediction.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                              Confidence:
                            </span>
                            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {(prediction.confidence * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {prediction.labels.map((label, index) => (
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
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-4">
                      <button className={`p-3 rounded-lg transition-colors ${
                        darkMode 
                          ? 'hover:bg-gray-700 text-gray-400' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}>
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className={`p-3 rounded-lg transition-colors ${
                        darkMode 
                          ? 'hover:bg-gray-700 text-gray-400' 
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}>
                        <Download className="w-5 h-5" />
                      </button>
                      <button className={`p-3 rounded-lg transition-colors ${
                        darkMode 
                          ? 'hover:bg-red-900/30 text-red-400' 
                          : 'hover:bg-red-50 text-red-600'
                      }`}>
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-8">
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Showing {filteredPredictions.length} of {predictions.length} predictions
              </p>
              <div className="flex gap-2">
                <button className={`px-4 py-2 border rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}>
                  Previous
                </button>
                <button className={`px-4 py-2 border rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700' 
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}>
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
