import { useState } from 'react';
import { BarChart3, FileVideo, Eye, Download, X, CheckCircle, Clock, TrendingUp, Share2 } from 'lucide-react';
import { useApp } from '../AppContext';

export const ResultsPage = () => {
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
                      Analysis Date:
                    </span>
                    <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {selectedResult.date}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                      Status:
                    </span>
                    <span className={`font-medium capitalize ${darkMode ? 'text-white' : 'text-gray-900'}`}>
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
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Confidence Score
                    </span>
                    <div className="flex items-center gap-3 mt-1">
                      <div className={`flex-1 h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${selectedResult.confidence * 100}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {(selectedResult.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Detection Labels
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedResult.labels.map((label: string, index: number) => (
                        <span
                          key={index}
                          className={`px-3 py-1 rounded-lg text-sm font-medium ${
                            darkMode 
                              ? 'bg-gray-600 text-gray-200' 
                              : 'bg-gray-200 text-gray-800'
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
