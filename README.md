# Video Predictor Frontend

A modern, AI-powered video analysis application built with React, TypeScript, and Tailwind CSS. This application provides an intuitive interface for uploading videos, running AI predictions, and viewing detailed analysis results with comprehensive dark mode support.

## 🚀 Features

- **Video Upload & Analysis**: Drag-and-drop interface for easy video file uploads
- **AI-Powered Predictions**: Real-time video analysis with confidence scores
- **Interactive Dashboard**: Comprehensive overview of prediction analytics and performance
- **Results Management**: View, filter, and manage prediction results with detailed insights
- **History Tracking**: Complete history of all video predictions with search functionality
- **User Profile Management**: Customizable user profiles with statistics
- **Dark Mode Support**: Full dark/light theme toggle with localStorage persistence
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Real-time Notifications**: Toast notifications for user feedback
- **Progress Tracking**: Live upload and processing progress indicators

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4.1
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Context API
- **Routing**: Single Page Application (SPA)

## 📦 Installation

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/mdsajjadhossain25/video_predictor_frontend.git
   cd video_predictor_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Demo UI

### Dashboard Overview
The main dashboard provides a comprehensive view of your video prediction analytics:
- Real-time statistics cards (Total Predictions, Completed, Processing, Average Confidence)
- Recent predictions list with status indicators
- Performance metrics visualization
- Quick action buttons

### Upload & Predict Page
Intuitive video upload interface featuring:
- Drag-and-drop file upload area
- File format validation (MP4, AVI, MOV, WMV)
- Real-time upload progress tracking
- Processing status indicators
- Feature highlight cards

### Results Page
Comprehensive results management:
- Grid layout for prediction results
- Filtering options (All, Completed, Processing)
- Confidence score visualizations
- Detailed result modals
- Download and sharing capabilities
- Statistics summary cards

### History Page
Complete prediction history tracking:
- Search functionality by video name
- Status filtering options
- Sortable columns (Date, Name, Confidence)
- Detailed history records

### Profile Settings
User account management:
- Editable profile information
- User statistics overview
- Account preferences
- Profile customization options

### Dark Mode Support
- Seamless theme switching
- Consistent dark mode across all components
- Automatic theme persistence
- Optimized color schemes for both themes

## 🏗 Project Structure

```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── index.css              # Global styles
├── vite-env.d.ts          # Vite type declarations
└── assets/                # Static assets
    └── react.svg
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=your_api_endpoint
VITE_APP_NAME=Video Predictor
```

### Tailwind CSS Configuration

The project uses Tailwind CSS v4.1 with custom configurations for:
- Dark mode support
- Custom color schemes
- Responsive breakpoints
- Component-specific styles

## 🌟 Key Components

### Global State Management
- **AppContext**: Centralized state management using React Context
- **Theme Management**: Dark/light mode with localStorage persistence
- **Notification System**: Toast notifications for user feedback
- **Loading States**: Global loading overlay for async operations

### Core Features
- **File Upload**: Drag-and-drop with progress tracking
- **Data Visualization**: Progress bars, confidence scores, statistics
- **Modal System**: Detailed views and confirmations
- **Responsive Navigation**: Sidebar with mobile-first design

## 🎯 Usage

1. **Upload Videos**: Navigate to the Upload page and drag-drop your video files
2. **Monitor Progress**: Track upload and processing progress in real-time
3. **View Results**: Check the Results page for detailed analysis
4. **Manage History**: Browse all past predictions in the History section
5. **Customize Profile**: Update your profile information and preferences
6. **Toggle Theme**: Switch between light and dark modes

## 🔮 Future Enhancements

- Real backend API integration
- Video preview functionality
- Batch upload support
- Advanced filtering and sorting
- Export capabilities
- User authentication
- Team collaboration features
- Advanced analytics dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**MD Sajjad Hossain**
- GitHub: [@mdsajjadhossain25](https://github.com/mdsajjadhossain25)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for the beautiful icons
- Vite for the fast build tool

---

*Built with ❤️ using React, TypeScript, and Tailwind CSS*
