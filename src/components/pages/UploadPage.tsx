import { useState } from 'react';
import { Upload, FileVideo, CheckCircle, BarChart3, X } from 'lucide-react';
import { useApp } from '../AppContext';

export const UploadPage = () => {
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
