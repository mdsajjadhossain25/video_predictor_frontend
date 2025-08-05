import { useState } from 'react';
import { User, Mail, Phone, Building, FileText, Edit3, Check, X, BarChart3, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../AppContext';

export const ProfilePage = () => {
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
    if (!formData.name || !formData.email) {
      addNotification('Name and email are required', 'error');
      return;
    }
    
    setUser(prev => ({
      ...prev!,
      ...formData
    }));
    setIsEditing(false);
    addNotification('Profile updated successfully!', 'success');
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
      <div className="max-w-4xl mx-auto space-y-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className={`rounded-2xl border p-8 transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <div className="flex items-center justify-between mb-8">
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Personal Information
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                      darkMode 
                        ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-900/50' 
                        : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                    }`}
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <Check className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8">
                <img 
                  src={user?.avatar} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full border-4 border-gray-200"
                />
                <div>
                  <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Profile Picture
                  </h3>
                  <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    JPG, GIF or PNG. 1MB max.
                  </p>
                  <button className={`px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                  }`}>
                    Change Avatar
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isEditing
                            ? darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                            : darkMode
                              ? 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                              : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isEditing
                            ? darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-200 text-gray-900'
                            : darkMode
                              ? 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                              : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="+1 (555) 123-4567"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isEditing
                            ? darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                            : darkMode
                              ? 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                              : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Company
                    </label>
                    <div className="relative">
                      <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                        darkMode ? 'text-gray-500' : 'text-gray-400'
                      }`} />
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                        disabled={!isEditing}
                        placeholder="Your Company"
                        className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          isEditing
                            ? darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                            : darkMode
                              ? 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                              : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  <div className="relative">
                    <FileText className={`absolute left-3 top-3 w-5 h-5 ${
                      darkMode ? 'text-gray-500' : 'text-gray-400'
                    }`} />
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      rows={4}
                      className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none ${
                        isEditing
                          ? darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
                          : darkMode
                            ? 'bg-gray-700/50 border-gray-600 text-gray-300 cursor-not-allowed'
                            : 'bg-gray-50 border-gray-200 text-gray-600 cursor-not-allowed'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="space-y-6">
            <div className={`rounded-2xl border p-6 transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Activity Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-blue-900/30' : 'bg-blue-100'
                    }`}>
                      <BarChart3 className={`w-4 h-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Total Predictions
                    </span>
                  </div>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stats.totalPredictions}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-green-900/30' : 'bg-green-100'
                    }`}>
                      <CheckCircle className={`w-4 h-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Completed
                    </span>
                  </div>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stats.completedPredictions}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      darkMode ? 'bg-purple-900/30' : 'bg-purple-100'
                    }`}>
                      <Clock className={`w-4 h-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Avg. Confidence
                    </span>
                  </div>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stats.averageConfidence}%
                  </span>
                </div>
              </div>
            </div>

            {/* Account Settings */}
            <div className={`rounded-2xl border p-6 transition-colors ${
              darkMode 
                ? 'bg-gray-800 border-gray-700' 
                : 'bg-white border-gray-100'
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Settings
              </h3>
              
              <div className="space-y-3">
                <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}>
                  <div className="font-medium text-sm">Change Password</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Update your password
                  </div>
                </button>
                
                <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}>
                  <div className="font-medium text-sm">Notification Settings</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Manage your notifications
                  </div>
                </button>
                
                <button className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-50 text-gray-700'
                }`}>
                  <div className="font-medium text-sm">Privacy Settings</div>
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Control your privacy
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
